var OnsTemplate= React.createClass({
  componentDidMount: function() {
    var node = ReactDOM.findDOMNode(this);
    if (!reactUtil.rendersToOnsPage(this.props.children)) {
      throw new Error("OnsTemplate only child should be rendered to OnsPage");
    }
  },
  render: function() {
    return <ons-template> </ons-template>;
  }
});

