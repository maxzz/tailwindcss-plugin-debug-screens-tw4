/// <reference types="node" />
import debugScreensPlugin from '../src/index.js';

// Simple test to verify the plugin works
console.log('🧪 Testing TailwindCSS Debug Screens Plugin...');

// Mock TailwindCSS API
const mockAPI = {
    addComponents: (components: Record<string, any>) => {
        console.log('✅ addComponents called with:', JSON.stringify(components, null, 2));
    },
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
    }
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
