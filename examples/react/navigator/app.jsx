var MyPage = React.createClass({
  getInitialState: function() {
      return { };
  },
  pushPage : function() {
   this.props.pushPage();
  },
  popPage : function() {
   this.props.popPage();
  },

  render: function() {

    return <OnsPage>
      <ons-toolbar>
        <div className="left"><ons-back-button>Back</ons-back-button></div>
        <div className="center"> {this.props.title} </div>
      </ons-toolbar>
      <div style={{textAlign: 'center'}}>
        <br />
      <ons-button modifier="light" onClick={this.props.insertPage}> 
        Insert Page to Background 
      </ons-button>
      <br />
     <ons-button modifier="light" onClick={this.props.popPage}> 
        Pop Page 
      </ons-button>

      </div>
    </OnsPage>
  }
});


var MyNav  = React.createClass({
  getInitialState: function() {
    return {};
  },

  popPage: function() {
    this.refs.navi.popPage();
  },

  insertPage: function() {
    //this.refs.nav
    console.log('insert in background');
    console.log(this.refs.navi)
    this.refs.navi.insertComponent(
      <MyPage title="Back Page"
      insertPage={this.insertPage} popPage={this.popPage}
      
      />);
  },
  
  render: function() {
    return <OnsNavigator ref="navi">
      <MyPage title="Navigator" insertPage={this.insertPage} popPage={this.popPage}/>
    </OnsNavigator>
  }
});

ReactDOM.render(<MyNav />, document.getElementById('app'));
