var OnsTemplate= React.createClass({
  componentDidMount: function() {
    var node = ReactDOM.findDOMNode(this);
    if (!reactUtil.isOnsPage(this.props.children)) {
      throw new Error("OnsTemplate only child should be of type OnsPage");
    }
  },
  render: function() {
    return <ons-template> </ons-template>;
  }
});

