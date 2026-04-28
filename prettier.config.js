const config = {
  semi: true,
  singleQuote: true,
  singleAttributePerLine: false,
  htmlWhitespaceSensitivity: 'css',
  printWidth: 80,
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],
  tailwindFunctions: ['clsx', 'cn'],
  tailwindStylesheet: 'src/app/globals.css',
  tabWidth: 2,
  endOfLine: 'auto',
};

export default config;
