import {
  Text,
  Container,
  Card,
  Stack,
  Box,
  Checkbox,
  ActionIcon,
  LoadingOverlay,
  ScrollArea,
} from '@mantine/core';
import { useAuthed } from 'context/auth';
import { notifySuccess } from 'libs/notify';
import { showNotification } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { BySFResponse } from '@api/visit/dto';
import services from 'services';
import dayjs from 'dayjs';
import exactAge from 'libs/exact-age';
import { AnnotationIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';

const VisitPortal = () => {
  //#region State Hooks
  const navigate = useNavigate();
  const { currentUser } = useAuthed();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [listVisit, setListVisit] = useState<BySFResponse[]>();
  //#endregion

  //#region Data Kota Logic
  useEffect(() => {
    try {
      const fetchVisit = async () => {
        setIsLoading(true);
        const res = await services.visit.bySFVisit(currentUser.nip);
        setListVisit(res.data);
        setIsLoading(false);
      };
      fetchVisit();
    } catch (err) {
      console.log('Notify Error');
    }
  }, []);

  return (
    <>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '85vh',
          position: 'relative',
        }}
      >
        <LoadingOverlay visible={isLoading} />
        {listVisit && listVisit.length !== 0 && (
          <ScrollArea sx={{ flex: 1 }} type="scroll" mt={8}>
            <Stack>
              {listVisit.map((p, idx) => {
                return (
                  <Card
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}
                    key={idx}
                    shadow="sm"
                  >
                    <Box mr={12}>
                      <Text size="xs" weight="bold">
                        Nama : {p.Maspen.namaPenerima}
                      </Text>
                      <Text size="xs">
                        <b>Alamat : </b>
                        {p.Maspen.alamat}
                      </Text>
                      <Text size="xs">
                        <b>Kelurahan : </b>
                        {p.Maspen.dati4}
                      </Text>
                      <Text size="xs">
                        <b>Kecamatan : </b>
                        {p.Maspen.dati3}
                      </Text>
                      <Text size="xs">
                        <b>Kota : </b>
                        {p.Maspen.dati2}
                      </Text>
                      <Text size="xs">
                        <b>Tanggal Lahir : </b>
                        {dayjs(p.Maspen.tgLahirPenerima).format('DD/MM/YYYY')}
                      </Text>
                      <Text size="xs">
                        <b>Usia : </b>
                        {(() => {
                          const { days, months, years } = exactAge(
                            new Date(p.Maspen.tgLahirPenerima),
                          );
                          return `${years} Tahun ${months} Bulan ${days} Hari`;
                        })()}
                      </Text>
                    </Box>
                    <Box sx={{ alignItems: 'flex-start' }}>
                      <ActionIcon
                        onClick={() => {
                          navigate(`/visit/${p.Maspen.notas}`, {
                            replace: true,
                          });
                        }}
                      >
                        <AnnotationIcon color="green" />
                      </ActionIcon>
                    </Box>
                  </Card>
                );
              })}
            </Stack>
          </ScrollArea>
        )}
      </Container>
    </>
  );
};

export default VisitPortal;
