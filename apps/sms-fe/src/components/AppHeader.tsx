import {
  Text,
  ActionIcon,
  Box,
  Group,
  Header,
  useMantineColorScheme,
} from '@mantine/core';
import { ReactElement } from 'react';
import { Menu2, MoonStars, Sun } from 'tabler-icons-react';

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
            <Menu2 size={16} />
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
          {colorScheme === 'dark' ? <Sun size={16} /> : <MoonStars size={16} />}
        </ActionIcon>
      </Group>
    </Header>
  );
};

export default AppHeader;
