var MyPage = React.createClass({
  getInitialState: function() {
      return { };
  },
  pushPage : function() {
   this.props.pushPage();
  },
  render: function() {
    return <OnsPage>
      <OnsToolbar>
        <div className="center"> {this.props.title} </div>
      </OnsToolbar>
      <div style={{display: 'flex'}}> 
        <div style={{flex: 1}} />
        <ons-button onClick={this.pushPage}> Push </ons-button>
        <div style={{flex: 1}} />
      </div>
    </OnsPage>
  }
});

var MyNav  = React.createClass({
  getInitialState: function() {
    return { };
  },

  pushPage: function() {
    //console.log('push page');
    this.refs.navi.pushComponent(
      <MyPage title="Navigator2" pushPage={this.pushPage} />
    );
  },

  componentDidMount: function() {
    // console.log('hello');
    // console.log(this.refs.navigator);
  },
  
  render: function() {
    // console.log('render');
    // console.log(this.refs.navigator);
    return <OnsNavigator ref="navi">
      <MyPage title="Navigator" pushPage={this.pushPage} />
    </OnsNavigator>
  }
});

ReactDOM.render(<MyNav />, document.getElementById('app'));
