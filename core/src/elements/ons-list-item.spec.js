'use strict';

describe('OnsListItemElement', () => {
  let listItem;

  beforeEach(() => {
    listItem = new OnsListItemElement();
  });

  it('exists', () => {
    expect(window.OnsListItemElement).to.be.ok;
  });

  it('classList contains \'list__item\' by default', () => {
    expect(listItem.classList.contains('list__item')).to.be.true;
  });

  it('provides modifier attribute', () => {
    listItem.setAttribute('modifier', 'hoge');
    expect(listItem.classList.contains('list__item--hoge')).to.be.true;

    listItem.setAttribute('modifier', ' foo bar');
    expect(listItem.classList.contains('list__item--foo')).to.be.true;
    expect(listItem.classList.contains('list__item--bar')).to.be.true;
    expect(listItem.classList.contains('list__item--hoge')).not.to.be.true;

    listItem.classList.add('list__item--piyo');
    listItem.setAttribute('modifier', 'fuga');
    expect(listItem.classList.contains('list__item--piyo')).to.be.true;
    expect(listItem.classList.contains('list__item--fuga')).to.be.true;
  });

  describe('#_onDrag()', () => {
    it('should prevent default if \'lock-on-drag\' attribute is present', () => {
      listItem.setAttribute('lock-on-drag', '');

      let dummyEvent = {
        gesture: new CustomEvent('drag')
      };

      dummyEvent.gesture.direction = 'left';

      let spy = chai.spy.on(dummyEvent.gesture, 'preventDefault');

      listItem._onDrag(dummyEvent);

      expect(spy).to.have.been.called.once;
    });
  });

  describe('#_shouldLockOnDrag()', () => {
    it('returns false if \'lock-on-drag\' element is not present', () => {
      expect(listItem._shouldLockOnDrag()).to.be.false;
    });

    it('returns true if \'lock-on-drag\' element is present', () => {
      listItem.setAttribute('lock-on-drag', '');
      expect(listItem._shouldLockOnDrag()).to.be.true;
    });
  });

  describe('#_onTouch()', () => {
    it('should add change the background color.', () => {
      const color = 'rgb(250, 250, 250)';

      listItem.setAttribute('tappable', color);
      expect(listItem.style.backgroundColor).not.to.equal(color);
      listItem._onTouch();
      expect(listItem.style.backgroundColor).to.equal(color);
    });
  });

  describe('#_onRelease()', () => {
    it('should restore the background color.', () => {
      const origColor = 'rgb(250, 250, 250)';
      const newColor = 'rgb(255, 255, 255)';

      listItem.setAttribute('tappable', newColor);
      listItem.style.backgroundColor = origColor;
      listItem._onTouch();
      expect(listItem.style.backgroundColor).to.equal(newColor);
      listItem._onRelease();
      expect(listItem.style.backgroundColor).to.equal(origColor);
    });
  });

  describe('#_compile()', () => {
    it('does not compile twice', () => {
      let div1 = document.createElement('div');
      let div2 = document.createElement('div');
      div1.innerHTML = '<ons-list-item>Content</ons-list-item>';
      div2.innerHTML = div1.innerHTML;
      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });
});
