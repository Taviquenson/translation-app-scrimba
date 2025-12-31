import {defineConfig, loadEnv} from "vite"
mode = 'development'
const env = loadEnv(mode, process.cwd(), '');

export default defineConfig({
	plugins: [
		
	],
	define: {
    // This injects the variable directly into your code
    'import.meta.env.VITE_CUSTOM_VAR': JSON.stringify('your_value_here'),
    
    // You can also use it to load from process.env if needed
    'import.meta.env.VITE_BUILD_TIME': JSON.stringify(new Date().toISOString()),
	'import.meta.env.OPENAI_API_KEY': JSON.stringify(env.OPENAI_API_KEY),
  },
})