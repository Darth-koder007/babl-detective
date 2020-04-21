const babel = require("@babel/core");
const glob = require("glob");
const fs = require("fs");
const Store = require("./store");
const argv = require("yargs").argv;
const sourcePath = argv.src;
const outputFileName = argv.src + "-output" || "output";

// add a project here in store
Store.addProject(sourcePath);

glob(sourcePath + "/**/*+(.js|.jsx|.ts|.tsx)", {}, function (err, files) {
  files.forEach((filePath) => {
    babel.transform(fs.readFileSync(filePath, "utf8"), {
      sourceType: "module",
      plugins: [
        "@babel/plugin-proposal-class-properties",
        [
          "./plugins/babel-plugin-import.js",
          {
            importName: ["ireact-components", "chromos"],
            cb: (val, name) => {
              Store.updateImportCollection(sourcePath, val, name);
            },
          },
        ],
        [
          "./plugins/babel-plugin-native-element.js",
          {
            cb: (el) => {
              Store.updateNativeElementList(sourcePath, el);
            },
          },
        ],
        [
          "./plugins/babel-plugin-classname.js",
          {
            cb: (className) => {
              Store.updateClassNameList(sourcePath, className);
            },
          },
        ],
        [
          "./plugins/babel-plugin-getprop.js",
          {
            propList: ["style", "className"],
            cb: (prop) => {
              Store.updateStyleNamePropCount(sourcePath);
            },
          },
        ],
      ],
      presets: [
        "@babel/preset-env",
        "@babel/preset-react",
        [
          "@babel/preset-typescript",
          {
            isTSX: true,
            allExtensions: true,
          },
        ],
      ],
    });
  });

  fs.writeFileSync(outputFileName + ".json", JSON.stringify(Store.getStore()));
});
