import React, { useEffect } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import GuestLayout, { ScreenMode } from '@/Layouts/GuestLayout';
import TextInput from '@/Components/DaisyUI/TextInput';
import Button from '@/Components/DaisyUI/Button';
import { Stack, Typography, colors } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Change this line

const Register = ({ onExit }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const navigate = useNavigate(); // Change this line

    const handleLinkClick = (url) => {
        onExit(); // Trigger animation on link click

        // Wait for transition to complete
        const handleTransitionComplete = () => {
            setTimeout(() => {
                navigate(url); // Change this line
            }, 300); // Delay before navigating
        };

        // Pass the transition complete handler to GuestLayout
        return <GuestLayout currMode={ScreenMode.SIGN_UP} onTransitionComplete={handleTransitionComplete} />;
    };

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        onExit(); // Trigger animation on button click

        // Wait for transition to complete
        const handleTransitionComplete = () => {
            setTimeout(() => {
                post(route('register'));
            }, 300); // Delay before navigating
        };

        // Pass the transition complete handler to GuestLayout
        return <GuestLayout currMode={ScreenMode.SIGN_UP} onTransitionComplete={handleTransitionComplete} />;
    };

    return (
        <GuestLayout currMode={ScreenMode.SIGN_UP}>
            <Head title="Register" />
            <Stack justifyContent="center" alignItems="center" sx={{ height: "100%", color: colors.grey[800] }}>
                <Stack spacing={5} sx={{ width: "100%", maxWidth: "500px" }}>
                    <Stack>
                        <Typography variant='h4' fontWeight={600} color={colors.grey[800]}>
                            Create an account
                        </Typography>
                        <Typography color={colors.grey[600]}>
                            Doloribus dolorem impedit aliquam sit veniam
                        </Typography>
                    </Stack>

                    <form onSubmit={submit}>
                        <Stack spacing={4}>
                            <Stack spacing={2}>
                                <TextInput
                                    label="Name"
                                    name="name"
                                    value={data.name}
                                    onChange={onHandleChange}
                                    error={errors.name}
                                />
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
                                <TextInput
                                    label="Confirm Password"
                                    name="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={onHandleChange}
                                    error={errors.password_confirmation}
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
                                Register
                            </Button>
                        </Stack>
                    </form>

                    <Stack direction="row" spacing={2}>
                        <Typography>Already have an account?</Typography>
                        <Link
                            onClick={() => handleLinkClick("/register")} // Use custom click handler
                            style={{ cursor: "pointer", fontWeight: 600 }}
                        >
                            Sign up now
                        </Link>
                    </Stack>
                </Stack>
            </Stack>
        </GuestLayout>
    );
};

export default Register;
