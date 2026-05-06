module.exports = () => {
  return {
    postcssPlugin: 'unlayer',
    AtRule: {
      layer(atRule) {
        if (!atRule.nodes) return;
        atRule.replaceWith(...atRule.nodes);
      },
    },
  };
};

module.exports.postcss = true;

