// app.jsx
import React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './bootstrap';
import '../css/app.css';

import { CssBaseline } from '@mui/material';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import ErrorBaundry from './Components/ErrorBaundry';
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router

const appName =
    window.document.getElementsByTagName('title')[0]?.innerText || 'Point Management';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx')
        ),
    setup({ el, App, props }) {
        createRoot(el).render(
            <Router> {/* Wrap App in Router */}
                <ErrorBaundry>
                    <CssBaseline />
                    <App {...props} />
                </ErrorBaundry>
            </Router>
        );
    },
    progress: { color: '#003bf1', showSpinner: true, includeCSS: true },
});
