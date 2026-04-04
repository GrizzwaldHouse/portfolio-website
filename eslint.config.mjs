import nextConfig from "eslint-config-next";

const eslintConfig = [
  ...nextConfig,
  {
    ignores: [
      "service-animal-game/**",
      "service-dog-portfolio/**",
      ".next/**",
      "node_modules/**",
    ],
  },
];

export default eslintConfig;
