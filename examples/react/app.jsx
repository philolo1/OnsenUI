var myhelp = document.createElement;


var isPage =  function(page) {
    return ReactTestUtils.isElementOfType(page, OnsPage);
};

var isToolBar = function(obj) {
  return ReactTestUtils.isElementOfType(obj, OnsToolbar);
}


// this will not be called if 
// OnsNavigator is the parent
var OnsPage = React.createClass({

  getInitialState: function() {
    return {
      changeLook: false,
    };
  },

  render: function() {
    // console.log(this.props);
    var toolbar;
    var otherChildren = [];

    for (var i=0; i < this.props.children.length; i++) {

      if (isToolBar(this.props.children[i])) {
        toolbar = this.props.children[i];
      } else {
        otherChildren.push(this.props.children[i]);
      }
    }

    if (!this.state.changeLook) {
      return <ons-page   {...this.props}  _compiled >
        {toolbar}
        <div className="page__background"> </div>
        <div className="page__content">
          {otherChildren}
        </div>
      </ons-page>;
    } else {
      return <ons-page  {...this.props}  _compiled >
        <div className="page__background"> </div>
          <div className="page__content">
            Surprise
          </div>
      </ons-page>
    }
  }, 
});

var OnsNavigator = React.createClass({

  
  componentDidMount: function() {
    // console.log('mounting ons navigator');

    var node = ReactDOM.findDOMNode(this);
    var page = this.props.children;

    if (!isPage(page)) {
      throw new Error("OnsNavigator has to contain exactly one child of type OnsPage");
    }
    
    var lastLink = window.OnsNavigatorElement.rewritables.link;
    window.OnsNavigatorElement.rewritables.link = function(navigatorElement, target, options, callback) {
      var node2 = ReactDOM.findDOMNode(this);

      // console.log('node 2');
    
       if (node.firstChild._pages.length == 1) {
         node.firstChild.innerHTML = target.outerHTML;
       } else {
         // var myNode = node2.firstChild;
         // var index = node.firstChild._pages.length;
         // console.log('delete: ');
         // console.log(myNode.children.length);
         // myNode.removeChild(myNode.children[index-1]);


       }
       lastLink(navigatorElement, target, options, callback);
    }.bind(this);
    
    
     this.elements = [];
     this.elements.push({elem: this.props.children});
    
     // console.log(this.elements);
    
     this.myDom = ReactDOM.render(
       <ons-navigator {...this.props}>
             {page}
       </ons-navigator>, node);
  },

  popPage: function() {
    var navNode = ReactDOM.findDOMNode(this).firstChild;
    navNode.popPage();
    this.elements.pop();

    var help = [];

    for (var i =0; i < this.elements.length; i++) {
      help.push(this.elements[i].elem);
      help.key = i;
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

  pushComponent: function(templateComponent, options) {
    var templateNode = ReactDOM.findDOMNode(templateComponent);

    var node = ReactDOM.findDOMNode(this);
    var templatePage = templateComponent.props.children;

    if (!isPage(templatePage)) {
      throw new Error("OnsNavigator has to contain exactly one child of type OnsPage");
    }


    var prevStyle = templatePage.props.style;

    if (prevStyle) {
      prevStyle.display = 'none' ;
    } else {
      prevStyle = {display: 'none'}
    }


     var myChildren =  React.cloneElement(templatePage, {
       style: prevStyle,
       options: options
        });


    var myElement = ReactTestUtils.renderIntoDocument(myChildren);



    var pageNumber = node.firstChild.pages.length;

    var self = this;

    var help = [];

    for (var i =0; i < this.elements.length; i++) {
      help.push(this.elements[i].elem);
    }

    help.push(myChildren);


      var node2 =ReactDOM.render(
        <ons-navigator >
          {help}
        </ons-navigator>, 
        node
      );

      var myFun = function(event) {
        document.removeEventListener("init", myFun);
            var html =  node2.children[pageNumber].outerHTML;
            html = html.replace('display:none;', '');
          
            var onsNode = node.firstChild;

            onsNode._pushPage(null, {pageHTML: html}).then(function() {
                 node2.removeChild(node2.children[pageNumber]);
              }
            );
    };

    document.addEventListener("init", myFun);
    this.elements.push({elem: templateComponent.props.children});
  }, 
});

var OnsTemplate= React.createClass({
  componentDidMount: function() {
    var node = ReactDOM.findDOMNode(this);
    if (!isPage(this.props.children)) {
      throw new Error("OnsTemplate only child should be of type OnsPage");
    }
  },
  render: function() {
    return <ons-template>
       </ons-template>;
  }
});


var MyText = React.createClass({
  render: function() {
    return    (
      <ons-row>
        <ons-col>
          {this.props.text}
          <ons-button onClick={this.props.clicked}> Press me </ons-button>
        </ons-col>
      </ons-row>
    );
  }

});

var OnsToolbar= React.createClass({ 
  render: function() {
    return <ons-toolbar {...this.props}>
      {this.props.children}
     </ons-toolbar>;
  }
});


var  MyApp2 = React.createClass({ 

  getInitialState: function() {
    return {
      title: 'Push',
      myTitle: 'Title 1',
      text1: 'initial',
      text2: 'initial 2',
    };
  },

  myClick: function() {
    this.refs.myNav.sayHello();
    this.setState({title: 'Push 2', myTitle: 'Title 2'});
  },

  pushPage: function(name) {
    //this.refs.myNav.pushPage();
    this.refs.myNav.pushComponent(this.refs[name], {test: 'hello'});
  },


  popPage: function() {
    //  console.log('pop page');
    this.refs.myNav.popPage();
  },

  myTempClicked: function() {
    //console.log('my Temp clicked');
    console.log(this.refs.myTemp);
    this.refs.myTemp.setState({changeLook: true});
  },

  changeText1: function() {
    console.log('change text');
    this.setState({text1: 'new Text'});
  },
  changeText2: function() {
    this.setState({text2: 'new Text 2'});
  },

  render: function() {
    return    (
      <div>
        <OnsNavigator ref="myNav">
          <OnsPage >
            <OnsToolbar>
              <div className="left"><ons-back-button>Back</ons-back-button></div>
              <div className="center">Title</div>

            </OnsToolbar>
           <div> This is a text </div>
           <ons-button onClick={this.pushPage.bind(this, 'page2')}>Push Page </ons-button>
           <ons-button onClick={this.changeText2}>Change Text 2</ons-button>
           <div> {this.state.text1} </div> 
           <MyText text={this.state.text1} clicked={this.changeText1} />
          </OnsPage>
        </OnsNavigator>

        <OnsTemplate ref="page2">
          <OnsPage  ref="myTemp">
            <OnsToolbar>
              <div className="left"><ons-back-button>Back</ons-back-button></div>
              <div className="center">Page 2</div>

            </OnsToolbar>

           <div> This is page 2 </div>
           <ons-button onClick={this.pushPage.bind(this, 'page3')}>Push Page </ons-button> <br />
           <ons-button onClick={this.popPage}>Pop Page </ons-button>
           <ons-button onClick={this.changeText1}>Change Text</ons-button>
           <div> {this.state.text2} </div> 
           <MyText text={this.state.text2} clicked={this.changeText2}/>
         </OnsPage>
         </OnsTemplate>

         <OnsTemplate ref="page3">
           <OnsPage>
           <OnsToolbar>
             <div className="left"><ons-back-button>Back</ons-back-button></div>
             <div className="center">Page 3</div>

           </OnsToolbar>

            <div> This is page 3 </div>
            <ons-button onClick={this.pushPage.bind(this, 'page4')}>Push Page </ons-button> <br />
            <ons-button onClick={this.popPage}>Pop Page </ons-button>
           <ons-button onClick={this.myTempClicked}>myTemp</ons-button>
          </OnsPage>
         </OnsTemplate>

         <OnsTemplate ref="page4">
           <OnsPage>
            <OnsToolbar>
             <div className="left"><ons-back-button>Back</ons-back-button></div>
             <div className="center">Page 4</div>

           </OnsToolbar>

            <div> This is page 4 </div>
            <ons-button onClick={this.popPage}>Pop Page </ons-button>
            </OnsPage>
         </OnsTemplate>
      </div>
       );
  }
});







 ReactDOM.render(<MyApp2 />, document.getElementById('app'));
