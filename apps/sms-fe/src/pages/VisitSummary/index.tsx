import { AllVisitByTLResponse } from '@api/visit/dto';
import {
  Box,
  Card,
  Container,
  Divider,
  ScrollArea,
  Stack,
  Text,
} from '@mantine/core';
import { useAuthed } from 'context/auth';
import { useEffect, useRef, useState } from 'react';
import services from 'services';
import { string } from 'zod';

interface VisitData {
  namaPenerima: string;
  alamat: string;
  kota: string;
  kecamatan: string;
  kelurahan: string;
  marketing: string;
  alamatValid: boolean | null;
  visited: boolean;
  interaksi: boolean | null;
  prospek: string | null;
  alasan: string | null;
}

export const ReportVisit = () => {
  const { currentUser } = useAuthed();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [listVisit, setListVisit] = useState<VisitData[]>();

  const parseVisitData = (data: AllVisitByTLResponse[]) => {
    return data.map((d) => {
      return {
        namaPenerima: d.Maspen.namaPenerima,
        alamat: d.Maspen.alamat,
        kota: d.Maspen.dati2,
        kecamatan: d.Maspen.dati3,
        kelurahan: d.Maspen.dati4,
        marketing: d.soKaryawan.nama,
        alamatValid: d.alamatValid,
        visited: d.visited,
        interaksi: d.interaksi,
        prospek: d.prospek,
        alasan: d.alasan,
      };
    });
  };

  useEffect(() => {
    const fetchVisit = async () => {
      setIsLoading(true);
      const res = await services.visit.allVisitByTL(currentUser.nip);
      setListVisit(parseVisitData(res.data));
    };
    fetchVisit();
    setIsLoading(false);
  }, []);

  return (
    <Container>
      <Text weight="bold" align="center">
        REPORT VISIT
      </Text>
      {listVisit && listVisit.length !== 0 && (
        <ScrollArea sx={{ flex: 1 }} type="scroll" mt={8}>
          <Stack spacing="xs">
            {listVisit.map((p, idx) => {
              return (
                <Card
                  key={idx}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                  shadow="sm"
                >
                  <Box>
                    <Text size="xs" weight="bold">
                      MR : {p.marketing}
                    </Text>
                    <Text size="xs" weight="bold">
                      Nama : {p.namaPenerima}
                    </Text>
                    <Text size="xs">
                      Alamat : {p.alamat}, {p.kelurahan}, {p.kecamatan},{' '}
                      {p.kota}{' '}
                    </Text>
                    <Divider label="FEEDBACK" labelPosition="center" />
                    <Text size="xs">
                      Dikunjungi : {p.visited ? 'YA' : 'PENDING'}
                    </Text>
                    {p.alamatValid !== null && (
                      <Text size="xs">
                        Alamat Valid : {p.alamatValid ? 'YA' : 'TIDAK'}
                      </Text>
                    )}
                    {p.interaksi !== null && (
                      <Text size="xs">
                        Interaksi : {p.interaksi ? 'YA' : 'TIDAK'}
                      </Text>
                    )}
                    {p.prospek !== null && (
                      <Text size="xs">Prospek : {p.prospek}</Text>
                    )}
                    {p.alasan !== null && (
                      <Text size="xs">Alasan : {p.alasan}</Text>
                    )}
                  </Box>
                </Card>
              );
            })}
          </Stack>
        </ScrollArea>
      )}
    </Container>
  );
};
