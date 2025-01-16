import React, { useEffect, useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';
import { Box, Grid, colors } from '@mui/material';
import { Toaster } from 'sonner';
import { showToast } from '@/utils';
import SigninForm from './SigninForm'; // Assuming SigninForm is in the same directory
import SignupForm from './SignupForm'; // Assuming SignupForm is in the same directory
import assets from './assets'; // Assuming assets is in the same directory

export const ScreenMode = {
    SIGN_IN: "SIGN_IN",
    SIGN_UP: "SIGN_UP"
};

const Guest = () => {
    const {
        props: { flash },
    } = usePage();

    const [left, setLeft] = useState(0);
    const [right, setRight] = useState("unset");
    const [width, setWidth] = useState(0);
    const [backgroundImage, setBackgroundImage] = useState(assets.images.signinBg);
    const [currMode, setCurrMode] = useState(ScreenMode.SIGN_IN);
    const [showBackgroundImage, setShowBackgroundImage] = useState(true); // State for background image visibility

    useEffect(() => {
        if (flash.message !== null) {
            showToast(flash.message.message, flash.message.type);
        }
    }, [flash]);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(orientation: portrait)");

        const handleOrientationChange = (event) => {
            setShowBackgroundImage(!event.matches); // Hide background in portrait mode
        };

        mediaQuery.addEventListener('change', handleOrientationChange);

        // Initial check
        handleOrientationChange(mediaQuery);

        return () => {
            mediaQuery.removeEventListener('change', handleOrientationChange);
        };
    }, []);

    const onSwitchMode = (mode) => {
        setWidth(100);

        const timeout1 = setTimeout(() => {
            setCurrMode(mode);
            setBackgroundImage(mode === ScreenMode.SIGN_IN ? assets.images.signinBg : assets.images.signupBg);
        }, 1100);

        const timeout2 = setTimeout(() => {
            setLeft("unset");
            setRight(0);
            setWidth(0);
        }, 1200);

        const timeout3 = setTimeout(() => {
            setRight("unset");
            setLeft(0);
        }, 2500);

        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
            clearTimeout(timeout3);
        };
    };

    return (
        <Grid container sx={{ height: "100vh" }}>
            {/* Form Section */}
            <Grid item xs={12} md={4} sx={{ position: "relative", padding: 3 }}>
                {currMode === ScreenMode.SIGN_IN ? (
                    <SigninForm onSwitchMode={onSwitchMode} />
                ) : (
                    <SignupForm onSwitchMode={onSwitchMode} />
                )}
                {/* Overlay for Form Section */}
                <Box sx={{
                    position: "absolute",
                    top: 0,
                    left: left,
                    right: right,
                    width: `${width}%`,
                    height: "100%",
                    bgcolor: colors.grey[800],
                    transition: "all 1s ease-in-out"
                }} />
            </Grid>

            {/* Background Section */}
            {showBackgroundImage && (
                <Grid item xs={12} md={8} sx={{
                    position: "relative",
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                }}>
                    {/* Overlay for Background Section */}
                    <Box sx={{
                        position: "absolute",
                        top: 0,
                        left: left,
                        right: right,
                        width: `${width}%`,
                        height: "100%",
                        bgcolor: colors.common.white,
                        transition: "all 1s ease-in-out"
                    }} />
                </Grid>
            )}

            <Toaster
                theme="system"
                richColors="true"
                toastOptions={{
                    duration: 3000,
                    dismissible: true,
                }}
            />
        </Grid>
    );
};

export default Guest;
