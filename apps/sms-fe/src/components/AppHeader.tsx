import {
  ActionIcon,
  Group,
  Header,
  useMantineColorScheme,
} from '@mantine/core';
import { ReactElement } from 'react';
import { MoonStars, Sun } from 'tabler-icons-react';
import { Logo } from './_logo';

const AppHeader = (): ReactElement => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Header height={60}>
      <Group sx={{ height: '100%' }} px={20} position="apart">
        <Logo colorScheme={colorScheme} />
        <ActionIcon
          variant="default"
          onClick={() => toggleColorScheme()}
          size={30}
        >
          {colorScheme === 'dark' ? <Sun size={16} /> : <MoonStars size={16} />}
        </ActionIcon>
      </Group>
    </Header>
  );
};

export default AppHeader;
