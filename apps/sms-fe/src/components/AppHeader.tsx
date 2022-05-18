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
    <Header height={60}>
      <Group sx={{ height: '100%' }} px={20} position="apart">
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <ActionIcon
            variant="default"
            onClick={() => toggleDrawer()}
            size={30}
            mr={10}
          >
            <MenuIcon />
          </ActionIcon>
          <Text weight={700} size="lg" color="gray.500">
            SALES MANAGEMENT SYSTEM
          </Text>
        </Box>

        <ActionIcon
          variant="default"
          onClick={() => toggleColorScheme()}
          size={30}
        >
          {colorScheme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </ActionIcon>
      </Group>
    </Header>
  );
};

export default AppHeader;
