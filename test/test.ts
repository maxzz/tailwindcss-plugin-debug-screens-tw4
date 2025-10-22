/// <reference types="node" />
import debugScreensPlugin from '../src/index.js';

// Simple test to verify the plugin works
console.log('🧪 Testing TailwindCSS Debug Screens Plugin...');

// Mock TailwindCSS API
const mockAPI = {
    addBase: (styles: Record<string, any>) => {
        console.log('✅ addBase called with styles:', JSON.stringify(styles, null, 2));
    },
    theme: (path: string) => {
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
        return {};
    }
};

// Test the plugin
try {
    const plugin = debugScreensPlugin({
        position: 'top-right',
        style: {
            backgroundColor: '#1f2937',
            color: '#f9fafb'
        }
    });

    console.log('🔧 Plugin created successfully');

    // Call the plugin function
    plugin(mockAPI);

    console.log('✅ Plugin executed successfully!');
    console.log('🎉 All tests passed!');

} catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
}
