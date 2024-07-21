import globals from "globals";
import pluginJs from "@eslint/js";


export default [
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    js.configs.recommended,
    {
        files: [
            "src/**/*.js"
        ],
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "off"
        },
        ignores: [
            "node_modules/*",
            "public"
        ],
        "settings": {
            "import/resolver": {
                "alias": {
                    "map": [["@", "./src"]],
                    "extensions": [".js"]
                }
            }
        }
    }
];