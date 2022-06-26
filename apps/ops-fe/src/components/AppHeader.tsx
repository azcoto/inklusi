import {
  Text,
  ActionIcon,
  Box,
  Group,
  Header,
  useMantineColorScheme,
} from '@mantine/core';
import { ReactElement } from 'react';
import { MenuIcon, MoonIcon, SunIcon } from '@heroicons/react/outline';

interface Props {
  toggleDrawer: () => void;
}

const AppHeader = ({ toggleDrawer }: Props): ReactElement => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <Header
      height={60}
      styles={(theme) => ({
        root: {
          background: theme.colors.blue[7],
        },
      })}
    >
      <Group sx={{ height: '100%' }} px={20} position="apart">
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ActionIcon
            variant="filled"
            onClick={() => toggleDrawer()}
            size={30}
            mr={10}
            color="white"
          >
            <MenuIcon />
          </ActionIcon>
          <Text weight={700} size="md" color="white">
            LOAN OPERATION SYSTEM
          </Text>
        </Box>

        <ActionIcon
          variant="filled"
          onClick={() => toggleColorScheme()}
          size={30}
          color="white"
        >
          {colorScheme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </ActionIcon>
      </Group>
    </Header>
  );
};

export default AppHeader;
