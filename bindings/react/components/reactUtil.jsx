var ReactTestUtils = React.addons.TestUtils;

var reactUtil = {};
reactUtil.rendersToOnsPage =  function(obj) {
  // simulate render to see if it is really onsPage
   var htmlString = ReactDOMServer.renderToStaticMarkup(obj);
   return htmlString.startsWith('<ons-page');
};

reactUtil.rendersToOnsToolbar = function(obj) {
  var htmlString = ReactDOMServer.renderToStaticMarkup(obj);
  return htmlString.startsWith('<ons-toolbar');
};
