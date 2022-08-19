import KaryawanDisplay from '@/components/KaryawanDisplay';
import DebiturDisplay from '@/components/KaryawanDisplay';
import { Button, Card, Container, Divider, Group, Text } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';

export const DetailKaryawan = () => {
  const { nip } = useParams() as { nip: string };
  const navigate = useNavigate();
  return (
    <Container sx={{ position: 'relative' }} fluid>
      <Group align="start">
        <KaryawanDisplay nip={nip} />
        <Card>
          <Text size="lg" weight="bold">
            Actions
          </Text>
          <Divider my={20} />
          <Button
            onClick={() => navigate(`/debitur-edit/${nip}`, { replace: true })}
          >
            EDIT
          </Button>
        </Card>
      </Group>
    </Container>
  );
};
