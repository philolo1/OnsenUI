var OnsNavigator = React.createClass({
  componentDidMount: function() {
    console.log('mount');
    var node = ReactDOM.findDOMNode(this);
    var page = this.props.children;

    if (!reactUtil.rendersToOnsPage(page)) {
      throw new Error("OnsNavigator has to contain exactly one child of type OnsPage");
    }
    
    var lastLink = window.OnsNavigatorElement.rewritables.link;
    window.OnsNavigatorElement.rewritables.link = function(navigatorElement, target, options, callback) {


      console.log('link');

      if (node.firstChild._pages.length == 1 && !this.insert) {
          node.firstChild.innerHTML = node.firstChild._initialHTML;
       }

       if (this.insert) {
          // for (var i=0; i < node.firstChild._pages.length; i++) {
          //   node.firstChild._pages[i].element = node.firstChild.children[i];
          // }
       }

       lastLink(navigatorElement, target, options, callback);
       console.log('link finished');
    }.bind(this);

     this.elements = [];
     this.elements.push({elem:this.props.children});
    
     this.myDom = ReactDOM.render(
       <ons-navigator {...this.props}>
          {page}
       </ons-navigator>, node
     );
  },

  popPage: function() {
    var navNode = ReactDOM.findDOMNode(this).firstChild;
    navNode.popPage();

    console.log('pop');
    console.log(navNode);
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
  // componentWillReceiveProps: function(newProps) {
  //   var props = newProps || this.props;
  //
  //   var help = [];
  //   this.elements = [];
  //   this.elements.push({elem: props.children});
  //
  //   for (var i =0; i < this.elements.length; i++) {
  //     help.push(this.elements[i].elem);
  //   }
  //
  //   var node = ReactDOM.findDOMNode(this);
  //
  //   ReactDOM.render(
  //     <ons-navigator >
  //       {help}
  //     </ons-navigator>, 
  //     node
  //   );
  // },


  insertComponent: function(reactPage) {
    console.log('insert');
    this.insert = true;
    if (!reactUtil.rendersToOnsPage(reactPage)) {
      throw new Error("The component that react inserts needs to render to <ons-page>");
    }

    var htmlString = ReactDOMServer.renderToStaticMarkup(reactPage);
    var node =  ReactDOM.findDOMNode(this)

    console.log('elements');

    console.log(this.elements);


    this.elements.splice(0, 0, {elem: reactPage});

    console.log(this.elements);

    var help = [];
    for (var i =0; i < this.elements.length; i++) {
      help.push(this.elements[i].elem);
    }

    var elements = this.elements;
    //
    node.firstChild.insertPage(-1, '', {pageHTML: htmlString})
    .then(function() {
       var node2 =ReactDOM.render(
         <ons-navigator >
           {help}
         </ons-navigator>, 
         node
       );
       node.firstChild._pages[0].element = node.firstChild.children[0];
       node.firstChild._pages[1].element = node.firstChild.children[2];
       node.firstChild.removeChild(node.firstChild.children[1]);
    });



  },


  pushComponent: function(reactPage) {
    console.log('push component');
    if (!reactUtil.rendersToOnsPage(reactPage)) {
      throw new Error("The component that react pushes needs to render to <ons-page>");
    }

     this.elements.push({elem:reactPage});

    var htmlString = ReactDOMServer.renderToStaticMarkup(reactPage);

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

       node2._pages[elements.length-1].element = node2.children[elements.length-1];
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
