import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Container, TextInput, PasswordInput, Button, Box, Group, } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { zSignInForm } from '@api/auth/dto';
import { useSignIn } from 'src/services/auth';
const SignIn = () => {
    const form = useForm({
        schema: zodResolver(zSignInForm),
        initialValues: {
            phone: '',
            password: '',
        },
    });
    const { data, mutate } = useSignIn({
        onSuccess: (data) => {
            console.log(data.token);
        },
        onError: (error) => {
            console.log(error);
        },
    });
    const signIn = (values, event) => {
        event.preventDefault();
        mutate(values);
    };
    return (_jsx(Container, { size: "xs", px: "xs", children: _jsx(Box, { sx: { maxWidth: 200 }, mx: "auto", children: _jsxs("form", { onSubmit: form.onSubmit(signIn), children: [_jsx(TextInput, { label: "Phone Number", required: true, ...form.getInputProps('phone') }), _jsx(PasswordInput, { label: "Password", required: true, ...form.getInputProps('password') }), _jsx(Group, { position: "right", mt: "md", children: _jsx(Button, { type: "submit", children: "Sign In" }) })] }) }) }));
};
export default SignIn;
