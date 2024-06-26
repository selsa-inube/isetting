import { mergeConfig } from "vite";

export default {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: true,
    defaultName: "Documentation",
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      optimizeDeps: {
        include: [],
      },
    });
  },
};
