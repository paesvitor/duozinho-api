module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@entities": "./src/entities",
          "@controllers": "./src/controllers",
          "@middlewares": "./src/middlewares",
          "@routes": "./src/routes",
          "@utils": "./src/utils",
        },
      },
    ],
  ],
  ignore: ["**/*.spec.ts"],
};
