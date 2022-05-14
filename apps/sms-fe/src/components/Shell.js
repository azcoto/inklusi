import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Text, AppShell, Drawer, Stack, UnstyledButton, Box, } from '@mantine/core';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AppHeader from './AppHeader';
const Shell = () => {
    const navigate = useNavigate();
    const [opened, setOpened] = useState(false);
    const toggleDrawer = () => {
        setOpened(!opened);
    };
    return (_jsxs(AppShell, { padding: "xs", fixed: true, header: _jsx(AppHeader, { toggleDrawer: toggleDrawer }), children: [_jsx(Drawer, { opened: opened, withCloseButton: false, onClose: () => setOpened(false), padding: "xs", size: "xs", children: _jsxs(Box, { sx: {
                        minHeight: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }, pl: 8, children: [_jsxs(Stack, { children: [_jsx(UnstyledButton, { onClick: () => {
                                        setOpened(false);
                                        navigate('/');
                                    }, children: _jsx(Text, { weight: 'bold', children: "Home" }) }), _jsx(UnstyledButton, { onClick: () => {
                                        setOpened(false);
                                        navigate('/assign-visit');
                                    }, children: _jsx(Text, { weight: 'bold', children: "Assign Visit" }) }), _jsx(UnstyledButton, { onClick: () => {
                                        setOpened(false);
                                        navigate('/visit');
                                    }, children: _jsx(Text, { weight: 'bold', children: "Visit" }) }), _jsx(UnstyledButton, { onClick: () => {
                                        setOpened(false);
                                        navigate('/simulasi');
                                    }, children: _jsx(Text, { weight: 'bold', children: "Simulasi" }) })] }), _jsx(UnstyledButton, { onClick: () => {
                                setOpened(false);
                                navigate('/signin');
                            }, children: _jsx(Text, { weight: 'bold', children: "Logout" }) })] }) }), _jsx(Outlet, {})] }));
};
export default Shell;
