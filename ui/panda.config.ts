import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  theme: {
    extend: {
      tokens: {
        colors: {
          primary: { value: '#3490dc' },
          secondary: { value: '#ffed4a' },
          background: { value: '#f8fafc' },
          text: { value: '#333' },
        },
        fontSizes: {
          sm: { value: '0.875rem' },
          base: { value: '1rem' },
          lg: { value: '1.125rem' },
          xl: { value: '1.25rem' },
        },
      },
    },
  },
  preflight: true, 
});
