/**
 * Custom version of https://github.com/jorenvanhee/tailwindcss-debug-screens for TailwindCSS v4.x
 * Converted to TypeScript with ES6 module format
 * Usage: add class 'debug-screens' on any top element
 */

// Import proper types from TailwindCSS
import type { Config } from 'tailwindcss';

// Extract the PluginAPI type from the Config's plugins array
type ExtractPluginAPI<T> = T extends Array<infer U>
    ? U extends (api: infer API) => void
        ? API
        : U extends { handler: (api: infer API) => void }
            ? API
            : U extends (...args: any[]) => { handler: (api: infer API) => void }
                ? API
                : never
    : never;

type PluginAPI = ExtractPluginAPI<NonNullable<Config['plugins']>>;

export type DebugScreensConfig = {
    style?: Partial<CSSStyleDeclaration>;
    ignore?: string[];
    prefix?: string;
    selector?: string;
    position?: [string, string];
};

type ScreenEntry = [string, string];

/**
 * TailwindCSS v4.x Debug Screens Plugin
 * 
 * Displays the current screen breakpoint in a fixed position overlay.
 * Helps with responsive design debugging by showing which breakpoint is active.
 */
export default function debugScreensPlugin({ addComponents, theme }: PluginAPI): void {
    const screens = theme('screens') || {}; // {sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px'}

    const userStyles = theme('debugScreens.style', {});
    const ignoredScreens = theme('debugScreens.ignore', ['dark']);
    const prefix = theme('debugScreens.prefix', 'Screen: ');
    const selector = theme('debugScreens.selector', '.debug-screens');

    const defaultPosition: [string, string] = ['bottom', 'left'];
    const position = theme('debugScreens.position', defaultPosition);
    const positionY = position[0] || defaultPosition[0];
    const positionX = position[1] || defaultPosition[1];

    const screenEntries = Object.entries(screens) as ScreenEntry[];

    // Build media queries for each breakpoint
    const mediaQueries: Record<string, { content: string; }> = {};

    Object.entries(screens).forEach(([name, size]) => {
        if (typeof size !== 'string' || !size) {
            return;
        }
        const pixelSize = sizeInPixels(size);
        mediaQueries[`@media (min-width: ${size})`] = {
            content: `"${prefix}<${name}> (${pixelSize}${pixelSize ? ':' : ''}${size})"`,
        };
    });

    // Create the debug component
    const debugComponent = {
        [`${selector}::before`]: Object.assign(
            getDebugDisplayCss(prefix, positionY, positionX, screenEntries),
            mediaQueries,
            userStyles
        ),
    };

    addComponents(debugComponent);
}

// Named export for CommonJS compatibility
export { debugScreensPlugin };

/**
 * Generate the CSS for the debug display
 */
function getDebugDisplayCss(prefix: string, positionY: string, positionX: string, screenEntries: ScreenEntry[]): Partial<CSSStyleDeclaration> {
    const firstScreen = screenEntries?.[0];
    const [name, size] = firstScreen ? firstScreen : ['_', '0'];
    const pixelSize = sizeInPixels(size);
    const content = name
        ? `'${prefix}less then <${name}> (${pixelSize}${pixelSize ? ':' : ''}${size})'`
        : `'${prefix}_'`;
    return {
        content,
        position: 'fixed',
        zIndex: '2147483647',
        [positionY]: '6px',
        [positionX]: '4px',
        padding: '0.75rem 0.25rem',
        lineHeight: '1',
        fontSize: '12px',
        fontFamily: 'sans-serif',
        borderRadius: '5px',
        border: '2px solid #6f84f9ff',
        backgroundColor: '#162ba35f',
        color: '#2e3982ff',
        boxShadow: '0 0 2px 2px #7c75fd3d',
    };
}

/**
 * Convert rem values to pixels
 */
function sizeInPixels(size: string): string {
    if (!size || typeof size !== 'string') {
        return '';
    }
    const rv = size.includes('rem')
        ? `${parseInt(size.replace('rem', ''), 10) * 16}px`
        : '';
    return rv;
}
