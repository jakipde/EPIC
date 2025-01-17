import React, { useEffect } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import GuestLayout, { ScreenMode } from '@/Layouts/GuestLayout';
import TextInput from '@/Components/DaisyUI/TextInput';
import Button from '@/Components/DaisyUI/Button';
import { Stack, Typography, colors } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = ({ onExit }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const navigate = useNavigate();

    const handleLinkClick = (url) => {
        onExit();

        const handleTransitionComplete = () => {
            setTimeout(() => {
                navigate(url);
            }, 300);
        };

        return <GuestLayout currMode={ScreenMode.SIGN_IN} onTransitionComplete={handleTransitionComplete} />;
    };

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        onExit();

        const handleTransitionComplete = () => {
            setTimeout(() => {
                post(route('login'));
            }, 300);
        };

        return <GuestLayout currMode={ScreenMode.SIGN_IN} onTransitionComplete={handleTransitionComplete} />;
    };

    return (
        <GuestLayout currMode={ScreenMode.SIGN_IN}>
            <Head title="Log in" />
            <Stack justifyContent="center" alignItems="center" sx={{ height: "100%", color: colors.grey[800] }}>
                <Stack spacing={5} sx={{ width: "100%", maxWidth: "500px" }}>
                    <Stack>
                        <Typography variant='h4' fontWeight={600} color={colors.grey[800]}>
                            Login Page
                        </Typography>
                        <Typography color={colors.grey[600]}>
                            Sponsored by Unsalary 😭
                        </Typography>
                    </Stack>

                    <form onSubmit={submit}>
                        <Stack spacing={4}>
                            <Stack spacing={2}>
                                <TextInput
                                    label="Email"
                                    name="email"
                                    value={data.email}
                                    onChange={onHandleChange}
                                    error={errors.email}
                                />
                                <TextInput
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={data.password}
                                    onChange={onHandleChange}
                                    error={errors.password}
                                />
                            </Stack>
                            <Button
                                variant='contained'
                                size='large'
                                sx={{
                                    bgcolor: colors.grey[800],
                                    "&:hover": { bgcolor: colors.grey[600] }
                                }}
                                processing={processing}
                                type="submit"
                            >
                                Sign in
                            </Button>
                        </Stack>
                    </form>

                    <Stack direction="row" spacing={2}>
                        <Typography>Transition on Development</Typography>
                        <Link
                            onClick={() => handleLinkClick("")}
                            style={{ cursor: "pointer", fontWeight: 600 }}
                        >
                            Refresh
                        </Link>
                        <Link
                            onClick={() => handleLinkClick("")}
                            style={{ cursor: "pointer", fontWeight: 600 }}
                        >
                            Register
                        </Link>
                    </Stack>
                </Stack>
            </Stack>
        </GuestLayout>
    );
};

export default Login;
