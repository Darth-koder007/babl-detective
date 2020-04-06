const babel = require("@babel/core");
const glob = require("glob");
const fs = require("fs");
const Store = require("./store");

// add a project here in store
Store.addProject("proj1");

glob("src/*.js", {}, function (err, files) {
  files.forEach((filePath) => {
    babel.transform(fs.readFileSync(filePath, "utf8"), {
      sourceType: "module",
      plugins: [
        "@babel/plugin-syntax-jsx",
        [
          "./plugins/babel-plugin-import.js",
          {
            importName: ["ireact-components", "chromos"],
            cb: (val, name) => {
              Store.updateImportCollection("proj1", val, name);
            },
          },
        ],
        [
          "./plugins/babel-plugin-native-element.js",
          {
            cb: (el) => {
              Store.updateNativeElementList("proj1", el);
            },
          },
        ],
        [
          "./plugins/babel-plugin-classname.js",
          {
            cb: (className) => {
              Store.updateClassNameList("proj1", className);
            },
          },
        ],
        [
          "./plugins/babel-plugin-styleprop.js",
          {
            cb: () => {
              Store.updateStyleNamePropCount("proj1");
            },
          },
        ],
      ],
    });
  });

  fs.writeFileSync("output.json", JSON.stringify(Store.getStore()));
});
