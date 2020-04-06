module.exports = function () {
  return {
    visitor: {
      ImportDeclaration(path, state) {
        if (path.node.source && path.node.source.value) {
          const value = path.node.source.value;
          if (
            state.opts &&
            state.opts.importName &&
            Array.isArray(state.opts.importName) &&
            state.opts.importName.includes(value)
          ) {
            const specifiers = path.node.specifiers;
            for (let specifier in specifiers) {
              if (Object.prototype.hasOwnProperty.call(specifiers, specifier)) {
                if (specifiers[specifier].type === "ImportSpecifier") {
                  state.opts.cb(value, specifiers[specifier].imported.name);
                }
              }
            }
          }
        }
      },
    },
  };
};
