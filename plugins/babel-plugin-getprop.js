module.exports = function () {
  return {
    visitor: {
      JSXAttribute(path, state) {
        if (
          path.node &&
          path.node.name &&
          path.node.name.type &&
          path.node.name.type === "JSXIdentifier" &&
          state.opts.propList.includes(path.node.name.name)
        ) {
          state.opts.cb(path.node.name.name);
        }
      },
    },
  };
};
