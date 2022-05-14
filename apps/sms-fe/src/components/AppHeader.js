import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Text, ActionIcon, Box, Group, Header, useMantineColorScheme, } from '@mantine/core';
import { Menu2, MoonStars, Sun } from 'tabler-icons-react';
const AppHeader = ({ toggleDrawer }) => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    return (_jsx(Header, { height: 60, children: _jsxs(Group, { sx: { height: '100%' }, px: 20, position: "apart", children: [_jsxs(Box, { sx: { display: 'flex', alignItems: 'flex-end' }, children: [_jsx(ActionIcon, { variant: "default", onClick: () => toggleDrawer(), size: 30, mr: 10, children: _jsx(Menu2, { size: 16 }) }), _jsx(Text, { weight: 700, size: "lg", color: "gray.500", children: "SALES MANAGEMENT SYSTEM" })] }), _jsx(ActionIcon, { variant: "default", onClick: () => toggleColorScheme(), size: 30, children: colorScheme === 'dark' ? _jsx(Sun, { size: 16 }) : _jsx(MoonStars, { size: 16 }) })] }) }));
};
export default AppHeader;
