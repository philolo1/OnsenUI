var ReactTestUtils = React.addons.TestUtils;

var reactUtil = {};
reactUtil.isOnsPage =  function(obj) {
    return ReactTestUtils.isElementOfType(obj, OnsPage);
};

reactUtil.isOnsToolBar = function(obj) {
  return ReactTestUtils.isElementOfType(obj, OnsToolbar);
}

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
    this.refs.myNav.popPage();
  },

  myTempClicked: function() {
    this.refs.myTemp.setState({changeLook: true});
  },

  changeText1: function() {
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
