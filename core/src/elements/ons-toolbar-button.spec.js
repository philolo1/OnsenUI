'use strict';

describe('ons-toolbar-button', () => {
  it('provides \'OnsToolbarButton\' global variable', () => {
    expect(window.OnsToolbarButton).to.be.ok;
  });

  it('provides modifier attribute', () => {
    var element = new OnsToolbarButton();
    element.setAttribute('modifier', 'hoge');
    expect(element.classList.contains('toolbar-button--hoge')).to.be.true;

    element.setAttribute('modifier', ' foo bar');
    expect(element.classList.contains('toolbar-button--foo')).to.be.true;
    expect(element.classList.contains('toolbar-button--bar')).to.be.true;
    expect(element.classList.contains('toolbar-button--hoge')).not.to.be.true;

    element.classList.add('toolbar-button--piyo');
    element.setAttribute('modifier', 'fuga');
    expect(element.classList.contains('toolbar-button--piyo')).to.be.true;
    expect(element.classList.contains('toolbar-button--fuga')).to.be.true;
  });

  describe('#_compile()', () => {
    it('does not compile twice', () => {
      let div1 = document.createElement('div');
      let div2 = document.createElement('div');
      div1.innerHTML = '<ons-toolbar-button>Back</ons-toolbar-button>';
      div2.innerHTML = div1.innerHTML;
      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });
});

