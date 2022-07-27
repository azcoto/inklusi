import DebiturDisplay from '@/components/DebiturDisplay';
import { Button, Card, Container, Divider, Group, Text } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';

export const DetailDebitur = () => {
  const { cif } = useParams() as { cif: string };
  const navigate = useNavigate();
  return (
    <Container sx={{ position: 'relative' }} fluid>
      <Group align="start">
        <DebiturDisplay cif={cif} />
        <Card>
          <Text size="lg" weight="bold">
            Actions
          </Text>
          <Divider my={20} />
          <Button
            onClick={() => navigate(`/debitur-edit/${cif}`, { replace: true })}
          >
            EDIT
          </Button>
        </Card>
      </Group>
    </Container>
  );
};
