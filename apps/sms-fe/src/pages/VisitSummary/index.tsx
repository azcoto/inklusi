import { AllVisitByTLResponse, SummaryByTLResponse } from '@api/visit/dto';
import {
  Box,
  Card,
  Container,
  Divider,
  LoadingOverlay,
  ScrollArea,
  Stack,
  Text,
} from '@mantine/core';
import { useAuthed } from 'context/auth';
import { useEffect, useState } from 'react';
import services from 'services';

export const VisitSummary = () => {
  const { currentUser } = useAuthed();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sumVisit, setSumVisit] = useState<SummaryByTLResponse[]>();

  useEffect(() => {
    const fetchVisit = async () => {
      setIsLoading(true);
      const res = await services.visit.sumVisitByTL(currentUser.nip);
      setSumVisit(res.data);
    };
    fetchVisit();
    setIsLoading(false);
  }, []);

  return (
    <Container>
      <Text weight="bold">SUMMARY VISIT</Text>
      <LoadingOverlay visible={isLoading} />
      {sumVisit && (
        <ScrollArea sx={{ flex: 1 }} type="scroll" mt={8}>
          <Stack spacing="xs">
            {sumVisit.map((p, idx) => {
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
                  <Box sx={{ width: '100%' }}>
                    <Text size="sm" weight="bold" align="center">
                      {p.nama}
                    </Text>
                    <Text size="xs">Pending Visit : {p.pending}</Text>
                    <Text size="xs">Jumlah Visit : {p.feedback}</Text>
                    <Divider
                      sx={{ width: '100%' }}
                      label="TIDAK INTERAKSI"
                      labelPosition="center"
                    />
                    <Text size="xs">
                      Alamat Tidak Ditemukan : {p.alamatTidakValid}
                    </Text>
                    <Text size="xs">Tidak Interaksi : {p.tidakInteraksi}</Text>
                    <Divider
                      sx={{ width: '100%' }}
                      label="SALES FEEDBACK"
                      labelPosition="center"
                    />
                    <Text size="xs">Berminat : {p.berminat}</Text>
                    <Text size="xs">Ragu Ragu : {p.raguRagu}</Text>
                    <Text size="xs">Tidak Berminat : {p.tidakBerminat}</Text>
                    <Text size="xs">
                      Tidak Dapat Dilayani : {p.tidakDapatDilayani}
                    </Text>
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
