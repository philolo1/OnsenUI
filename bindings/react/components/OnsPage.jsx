var OnsPage = React.createClass({

  render: function() {
    var toolbar;
    var otherChildren = [];

    for (var i=0; i < this.props.children.length; i++) {
      if (reactUtil.rendersToOnsToolbar(this.props.children[i])) {
        toolbar = this.props.children[i];
      } else {
        otherChildren.push(this.props.children[i]);
      }
    }

    return <ons-page   {...this.props}  _compiled >
        {toolbar}
        <div className="page__background"> </div>
        <div className="page__content">
          {otherChildren}
        </div>
      </ons-page>;
    }, 
});
