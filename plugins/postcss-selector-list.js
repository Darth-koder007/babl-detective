const postcss = require("postcss");

module.exports = postcss.plugin("postcss-selector-list", (opts) => {
  return (root) => {
    // Plugin code
    root.walkRules(function (rule) {
      // Pass selector name as argument
      opts.cb(rule.selector);
    });
  };
});
