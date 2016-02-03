var ReactTestUtils = React.addons.TestUtils;

var reactUtil = {};
reactUtil.isOnsPage =  function(obj) {
    return ReactTestUtils.isElementOfType(obj, OnsPage);
};

reactUtil.isOnsToolBar = function(obj) {
  return ReactTestUtils.isElementOfType(obj, OnsToolbar);
};
