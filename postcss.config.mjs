import path from 'node:path';

const unlayerPath = path.resolve(process.cwd(), 'postcss-unlayer.cjs');

const config = {
  plugins: {
    '@tailwindcss/postcss': {},
    [unlayerPath]: {},
  },
};

export default config;
