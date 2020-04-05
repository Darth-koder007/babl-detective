module.exports = function () {
  console.log("arguments", arguments);
  return {
    visitor: {
      JSXAttribute(path, state) {
        if (
          path.node &&
          path.node.name &&
          path.node.name.type &&
          path.node.name.type === "JSXIdentifier" &&
          (path.node.name.name === "style" ||
            path.node.name.name === "className")
        ) {
          state.opts.cb(" from styleprop plugin");
          const type = path.parent.type;
        }
      },
    },
  };
};
