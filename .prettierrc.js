module.exports = {
  singleQuote: true,
  tabWidth: 2,
  importOrder: [
    '^(react/(.*)$)|^(react$)', // Imports by "next"
    '<THIRD_PARTY_MODULES>',
    '^components/(.*)$',
    '^[./]', // Other imports
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
