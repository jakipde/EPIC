import React, { useEffect } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import TextInput from '@/Components/DaisyUI/TextInput';
import Checkbox from '@/Components/DaisyUI/Checkbox';
import Button from '@/Components/DaisyUI/Button';
import { Stack, Typography, colors } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = ({ onExit, status }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === 'checkbox' ? event.target.checked : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    const handleKeyDown = (e) => {
        if (e.code === 'Enter') {
            post(route('login'));
        }
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

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
                                    placeholder="you@site.com"
                                    value={data.email}
                                    onChange={onHandleChange}
                                    error={errors.email}
                                    autoComplete="email"
                                    autoFocus={true}
                                />
                                <TextInput
                                    label="Password"
                                    name="password"
                                    type="password"
                                    placeholder="password"
                                    value={data.password}
                                    onChange={onHandleChange}
                                    error={errors.password}
                                    onKeyDownCapture={handleKeyDown}
                                />
                                <Checkbox
                                    label="Remember me"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={onHandleChange}
                                    error={errors.remember}
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
                        <Link style={{ cursor: "pointer", fontWeight: 600 }}>Refresh</Link>
                        <Link style={{ cursor: "pointer", fontWeight: 600 }}>Register</Link>
                    </Stack>
                </Stack>
            </Stack>
        </GuestLayout>
    );
};

export default Login;
