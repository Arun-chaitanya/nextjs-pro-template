module.exports = {
  trailingComma: "es5",
  tabWidth: 2,
  printWidth: 120,
  importOrder: [
    "^(?!(@|[./])).*",
    "^@(mui|visx)(.*)$",
    "^@(testing-library)(.*)$",
    "^@(types)(.*)$",
    "^@(api|config|contexts|hocs|hooks|utils)(.*)$",
    "^@(components|views)(.*)$",
    "^@(icons)(.*)$",
    "^[./]",
    "^.*$",
    ".scss$",
  ],
  importOrderSeparation: true,
};
