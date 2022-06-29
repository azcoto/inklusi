import { Grid, Text } from '@mantine/core';

interface Props {
  title: string;
  children: React.ReactNode;
}

const Rows = ({ title, children }: Props) => {
  return (
    <>
      <Grid.Col span={5}>
        <Text size="sm">{title}</Text>
      </Grid.Col>
      <Grid.Col span={7}>{children}</Grid.Col>
    </>
  );
};

export default Rows;
