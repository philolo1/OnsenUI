var OnsPage = React.createClass({

  getInitialState: function() {
    return {
      changeLook: false,
    };
  },

  render: function() {
    var toolbar;
    var otherChildren = [];

    for (var i=0; i < this.props.children.length; i++) {

      if (reactUtil.isOnsToolBar(this.props.children[i])) {
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
