import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

const customGlobals = {
  TomSelect: "readable",
};

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
);
