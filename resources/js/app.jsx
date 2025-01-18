import './bootstrap';
import '../css/app.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router
import ErrorBoundary from './Components/ErrorBaundry'

const appName =
    window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

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
                <ErrorBoundary>
                    <App {...props} />
                </ErrorBoundary>
            </Router>
        );
    },
    progress: { color: '#003bf1', showSpinner: true, includeCSS: true },
});
