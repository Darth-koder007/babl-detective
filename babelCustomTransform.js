const fs = require("fs");

module.exports = function (fileName) {
  babel.transform(fs.readFileSync(fileName, "utf8"), {
    sourceType: "module",
    plugins: [
      "@babel/plugin-syntax-jsx",
      [
        "./babel-plugin-import.js",
        {
          importName: ["ireact-components", "chromos"],
          cb: (el) => {
            console.log("holla", el);
          },
        },
      ],
      [
        "./babel-plugin-native-element.js",
        {
          cb: (el) => {
            console.log("holla", el);
          },
        },
      ],
      [
        "./babel-plugin-classname.js",
        {
          cb: (el) => {
            console.log("holla", el);
          },
        },
      ],
      [
        "./babel-plugin-styleprop.js",
        {
          cb: (el) => {
            console.log("holla", el);
          },
        },
      ],
    ],
  });
};
