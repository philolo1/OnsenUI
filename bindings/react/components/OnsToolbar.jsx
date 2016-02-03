var OnsToolbar= React.createClass({ 
  render: function() {
    return <ons-toolbar {...this.props}>
      {this.props.children}
     </ons-toolbar>;
  }
});
