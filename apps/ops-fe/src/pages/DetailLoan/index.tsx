import DebiturDisplay from '@/components/DebiturDisplay';
import LoanDisplay from '@/components/LoanDIsplay';
import { Button, Card, Container, Divider, Group, Text } from '@mantine/core';
import { useParams } from 'react-router-dom';

export const DetailLoan = () => {
  const { noPengajuan } = useParams() as { noPengajuan: string };
  return (
    <Container sx={{ position: 'relative' }} fluid>
      <Group align="start">
        <LoanDisplay noPengajuan={noPengajuan} />
        <Card>
          <Text size="lg" weight="bold">
            Actions
          </Text>
          <Divider my={20} />
          <Button>EDIT</Button>
        </Card>
      </Group>
    </Container>
  );
};
