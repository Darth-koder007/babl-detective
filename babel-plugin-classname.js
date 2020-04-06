module.exports = function () {
  return {
    visitor: {
      JSXAttribute(path, state) {
        if (
          path.node &&
          path.node.name &&
          path.node.name.type &&
          path.node.name.type === "JSXIdentifier" &&
          path.node.name.name === "className" &&
          path.node.value.type === "StringLiteral"
        ) {
          const value = path.node.value.value;
          state.opts.cb(value);
        }
      },
    },
  };
};
