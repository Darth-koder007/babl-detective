module.exports = function () {
  return {
    visitor: {
      JSXElement(path, state) {
        if (
          path.node.openingElement &&
          path.node.openingElement.name &&
          path.node.openingElement.name.type &&
          path.node.openingElement.name.type === "JSXIdentifier"
        ) {
          const name = path.node.openingElement.name.name;
          var first = name.charAt(0);
          if (first === first.toLowerCase()) {
            // first character is a lowercase letter
            state.opts.cb(name);
          }
        }
      },
    },
  };
};
