import type { Config } from 'tailwindcss';

/// <reference types="node" />

// Define types for TailwindCSS v4.0 plugin API
interface TailwindAPI {
    addBase: (styles: Record<string, any>) => void;
    theme: (path: string) => any;
}

interface PluginOptions {
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    style?: {
        backgroundColor?: string;
        color?: string;
        fontSize?: string;
        fontFamily?: string;
        padding?: string;
        borderRadius?: string;
        zIndex?: string;
        opacity?: string;
    };
    prefix?: string;
    ignore?: string[];
}

/**
 * TailwindCSS v4.0 Debug Screens Plugin
 * 
 * Displays the current screen size in development mode to help with responsive design debugging.
 * Shows breakpoint information in a fixed position overlay.
 */
export default function debugScreensPlugin(options: PluginOptions = {}): any {
    const {
        position = 'bottom-left',
        style = {},
        prefix = '',
        ignore = ['prose']
    } = options;

    const defaultStyle = {
        backgroundColor: '#000',
        color: '#fff',
        fontSize: '12px',
        fontFamily: 'monospace',
        padding: '4px 8px',
        borderRadius: '4px',
        zIndex: '9999',
        opacity: '0.8',
        ...style
    };

    const positionStyles = {
        'top-left': { top: '0', left: '0' },
        'top-right': { top: '0', right: '0' },
        'bottom-left': { bottom: '0', left: '0' },
        'bottom-right': { bottom: '0', right: '0' }
    };

    return function ({ addBase, theme }: TailwindAPI) {
        // Only add debug screens in development mode
        if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'production') {
            return;
        }

        const screens = theme('screens') || {};
        const breakpoints = Object.entries(screens);

        if (breakpoints.length === 0) {
            console.warn('No breakpoints found in Tailwind config');
            return;
        }

        // Base styles for the debug indicator
        const baseStyles = {
            position: 'fixed',
            ...positionStyles[position],
            ...defaultStyle,
            pointerEvents: 'none',
            fontWeight: 'bold',
            letterSpacing: '0.05em'
        };

        // Create CSS for debug indicator
        const debugStyles: Record<string, any> = {
            [`${prefix}.debug-screens::before`]: {
                content: '"XS"',
                ...baseStyles,
                display: 'block'
            }
        };

        // Add breakpoint-specific styles
        breakpoints.forEach(([name, size]) => {
            const breakpointSize = typeof size === 'string' ? size : `${size}px`;

            debugStyles[`@media (min-width: ${breakpointSize})`] = {
                [`${prefix}.debug-screens::before`]: {
                    content: `"${name.toUpperCase()}: ${breakpointSize}+"`
                }
            };
        });

        addBase(debugStyles);

        // Add utility class
        addBase({
            [`.${prefix}debug-screens`]: {
                position: 'relative'
            }
        });
    };
}

// Export types for TypeScript users
export type { PluginOptions };

// Named export for CommonJS compatibility
export { debugScreensPlugin };