const babel = require("@babel/core");
const glob = require("glob");
const fs = require("fs");

const mainObj = {
  styleNameAndPropUsageCount: 0,
};

glob("src/*.js", {}, function (err, files) { 
  
 });

const ast = babel.transform(fs.readFileSync("./src/component.js", "utf8"), {
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
