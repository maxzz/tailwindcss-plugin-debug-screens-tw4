/// <reference types="node" />
import debugScreensPlugin from '../src/index.js';
import type { PluginAPI } from 'tailwindcss/plugin';

// Simple test to verify the plugin works
console.log('🧪 Testing TailwindCSS Debug Screens Plugin...');

// Mock TailwindCSS API with proper typing
const mockAPI: PluginAPI = {
    addBase: () => {},
    addVariant: () => {},
    matchVariant: () => {},
    addUtilities: () => {},
    matchUtilities: () => {},
    addComponents: (components) => {
        console.log('✅ addComponents called with:', JSON.stringify(components, null, 2));
    },
    matchComponents: () => {},
    theme: (path: string, defaultValue?: any) => {
        console.log(`📱 theme('${path}') called`);

        if (path === 'screens') {
            return {
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1536px'
            };
        }
        
        // Return default values for debugScreens config
        if (path === 'debugScreens.style') return defaultValue;
        if (path === 'debugScreens.ignore') return defaultValue;
        if (path === 'debugScreens.prefix') return defaultValue;
        if (path === 'debugScreens.selector') return defaultValue;
        if (path === 'debugScreens.position') return defaultValue;
        
        return defaultValue || {};
    },
    config: () => {},
    prefix: (className: string) => className,
};

// Test the plugin
try {
    console.log('🔧 Testing plugin with default configuration...');

    // Call the plugin function directly (new API style)
    debugScreensPlugin(mockAPI);

    console.log('✅ Plugin executed successfully!');
    console.log('🎉 All tests passed!');

} catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
}
