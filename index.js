const babel = require("@babel/core");
const glob = require("glob");
const fs = require("fs");
const Store = require("./store");
const argv = require("yargs").argv;
const sourcePath = argv.src;
const outputFileName = argv.outputFileName + "-output" || "output";
const postcss = require("postcss");
const postcssSass = require("postcss-sass");
const postcssScss = require("postcss-scss");
const postcssLess = require("postcss-less");
const postcssSelectorList = require("./plugins/postcss-selector-list");

// add a project here in store
Store.addProject(sourcePath);

glob(
  sourcePath + "/**/*+(.js|.jsx|.ts|.tsx|.css|.sass|.less|.scss)",
  {},
  function (err, files) {
    let numberOfFilesProcessed = 0;
    files.forEach(async (filePath) => {
      if (/\.+(tsx|ts|jsx|js)+$/.test(filePath)) {
        babel.transform(fs.readFileSync(filePath, "utf8"), {
          sourceType: "module",
          plugins: [
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-proposal-export-default-from",
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

        // Mark file as proccessed
        numberOfFilesProcessed++;
      } else if (/\.+(css|sass|less|scss)+$/.test(filePath)) {
        let opts = {};
        switch (true) {
          case /\.+(sass)+$/.test(filePath):
            opts.syntax = postcssSass;
            break;
          case /\.+(less)+$/.test(filePath):
            opts.syntax = postcssLess;
            break;
          case /\.+(scss)+$/.test(filePath):
            opts.syntax = postcssScss;
            break;
          default:
            break;
        }
        const processor = postcss([
          postcssSelectorList({
            cb: (selector) => {
              Store.updateSelectorList(sourcePath, selector);
            },
          }),
        ]);
        try {
          await processor.process(fs.readFileSync(filePath, "utf8"), opts);
        } catch (e) {
          console.log("error while processing css:", e);
        }
        numberOfFilesProcessed++;
      }
    });

    function checkIfAllFilesProcessed() {
      return numberOfFilesProcessed === files.length;
    }

    let intervalId = setInterval(function () {
      if (checkIfAllFilesProcessed()) {
        fs.writeFileSync(
          outputFileName + ".json",
          JSON.stringify(Store.getStore())
        );
        clearInterval(intervalId);
      }
    }, 1000);
  }
);
