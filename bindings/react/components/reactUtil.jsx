var ReactTestUtils = React.addons.TestUtils;

var reactUtil = {};
reactUtil.isOnsPage =  function(obj) {

  // simulate render to see if it is really onsPage
  /*  var htmlString = ReactDOMServer.renderToString(obj);
      return htmlString.startsWith('<ons-page');
      */
     return true;
};

reactUtil.isOnsToolBar = function(obj) {
  return ReactTestUtils.isElementOfType(obj, OnsToolbar);
};
