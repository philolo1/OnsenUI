var OnsNavigator = React.createClass({
  componentDidMount: function() {
    var node = ReactDOM.findDOMNode(this);
    var page = this.props.children;

    if (!reactUtil.rendersToOnsPage(page)) {
      throw new Error("OnsNavigator has to contain exactly one child of type OnsPage");
    }
    
    var lastLink = window.OnsNavigatorElement.rewritables.link;
    window.OnsNavigatorElement.rewritables.link = function(navigatorElement, target, options, callback) {
       if (node.firstChild._pages.length == 1) {
         node.firstChild.innerHTML = target.outerHTML;
       }
       lastLink(navigatorElement, target, options, callback);
    };
    
     this.elements = [];
     this.elements.push({elem: this.props.children});
    
     this.myDom = ReactDOM.render(
       <ons-navigator {...this.props}>
          {page}
       </ons-navigator>, node
     );
  },

  popPage: function() {
    var navNode = ReactDOM.findDOMNode(this).firstChild;
    navNode.popPage();
    this.elements.pop();

    var help = [];

    for (var i =0; i < this.elements.length; i++) {
      help.push(this.elements[i].elem);
    }
  
    var node = ReactDOM.findDOMNode(this);
        var node2 =ReactDOM.render(
            <ons-navigator >
              {help}
            </ons-navigator>, 
            node
          );
  },
  render: function() {
    return <div />;
  }, 
  componentWillReceiveProps: function(newProps) {
    var props = newProps || this.props;

    var help = [];
    // TODO no child
    this.elements[0] = {elem: props.children};

    for (var i =0; i < this.elements.length; i++) {
      help.push(this.elements[i].elem);
    }

    var node = ReactDOM.findDOMNode(this);

    ReactDOM.render(
      <ons-navigator >
        {help}
      </ons-navigator>, 
      node
    );
  },


  pushComponent: function(reactPage) {
    if (!reactUtil.rendersToOnsPage(reactPage)) {
      throw new Error("The component that react pushes needs to render to <ons-page>");
    }

    this.elements.push({elem: reactPage});

    var htmlString = ReactDOMServer.renderToString(reactPage);

    var elements = this.elements;

    var node =  ReactDOM.findDOMNode(this)
    node.firstChild._pushPage(null, {pageHTML: htmlString}).then(function() {
       var help = [];
       for (var i =0; i < elements.length; i++) {
         help.push(elements[i].elem);
       }

       var node2 =ReactDOM.render(
         <ons-navigator >
           {help}
         </ons-navigator>, 
         node
       );

       console.log('node 2');
       console.log(node2.children.length);

       node2._pages[elements.length-1].element = node2.children[elements.length-1];

       console.log(node2.children);

       node2.removeChild(node2.children[elements.length]);
    });
  },

  // pushTemplate: function(templateComponent) {
  //   var templateNode = ReactDOM.findDOMNode(templateComponent);
  //
  //   var node = ReactDOM.findDOMNode(this);
  //   var templatePage = templateComponent.props.children;
  //
  //   if (!reactUtil.isOnsPage(templatePage)) {
  //     throw new Error("OnsNavigator has to contain exactly one child of type OnsPage");
  //   }
  //
  //   var prevStyle = el.props.style;
  //
  //   if (prevStyle) {
  //     prevStyle.display = 'none' ;
  //   } else {
  //     prevStyle = {display: 'none'}
  //   }
  //
  //   var myChildren =  React.cloneElement(el, {
  //     style: prevStyle
  //   });
  //
  //   var pageNumber = node.firstChild.pages.length;
  //
  //   var self = this;
  //
  //   var help = [];
  //
  //   for (var i =0; i < this.elements.length; i++) {
  //     help.push(this.elements[i].elem);
  //   }
  //
  //   help.push(myChildren);
  //
  //
  //     var node2 =ReactDOM.render(
  //       <ons-navigator >
  //         {help}
  //       </ons-navigator>, 
  //       node
  //     );
  //
  //     var myFun = function(event) {
  //       document.removeEventListener("init", myFun);
  //           var html =  node2.children[pageNumber].outerHTML;
  //           html = html.replace('display:none;', '');
  //         
  //           var onsNode = node.firstChild;
  //
  //           onsNode._pushPage(null, {pageHTML: html}).then(function() {
  //                node2.removeChild(node2.children[pageNumber]);
  //             }
  //           );
  //   };
  //
  //   document.addEventListener("init", myFun);
  //   this.elements.push({elem: templateComponent.props.children});
  // }, 
});
