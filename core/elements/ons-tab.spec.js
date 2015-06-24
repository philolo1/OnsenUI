describe('ons-tab', function() {
  it('provides \'OnsTabElement\' global variable', function() {
    expect(window.OnsTabElement).to.be.ok;
  });

  it('provides \'modifier\' attribute', function() {
    var element = new OnsTabElement();
    var parent = new OnsTabbarElement();
    document.body.appendChild(parent);
    parent.appendChild(element);

    element.setAttribute('modifier', 'hoge');

    expect(element.classList.contains('tab-bar--hoge__item')).to.be.true;
    expect(element.children[1].classList.contains('tab-bar--hoge__button')).to.be.true;

    element.setAttribute('modifier', ' foo bar');
    expect(element.classList.contains('tab-bar--foo__item')).to.be.true;
    expect(element.children[1].classList.contains('tab-bar--foo__button')).to.be.true;
    expect(element.classList.contains('tab-bar--bar__item')).to.be.true;
    expect(element.children[1].classList.contains('tab-bar--bar__button')).to.be.true;
    expect(element.classList.contains('tab-bar--hoge__item')).not.to.be.true;
    expect(element.children[1].classList.contains('tab-bar--hoge__button')).not.to.be.true;

    element.classList.add('tab-bar--piyo__item');
    element.children[1].classList.add('tab-bar--piyo__button');
    element.setAttribute('modifier', 'fuga');
    expect(element.classList.contains('tab-bar--piyo__item')).to.be.true;
    expect(element.children[1].classList.contains('tab-bar--piyo__button')).to.be.true;
    expect(element.classList.contains('tab-bar--fuga__item')).to.be.true;
    expect(element.children[1].classList.contains('tab-bar--fuga__button')).to.be.true;
  });

  it('has default properties', function() {
    var element = new OnsTabElement();
    expect(element.classList.contains('tab-bar__item')).to.be.true;
    expect(element._hasDefaultTemplate).to.be.true;
  });

  it('has two default children', function() {
    var element = new OnsTabElement();

    expect(element.children[0]).to.be.ok;
    expect(element.children[1]).to.be.ok;
    expect(element.children[2]).not.to.be.ok;

    expect(element.children[0].nodeName).to.equal('INPUT');
    expect(element.children[0].type).to.equal('radio');
    expect(element.children[0].style.display).to.equal('none');

    expect(element.children[1].nodeName).to.equal('BUTTON');
    expect(element.children[1].classList.contains('tab-bar__button')).to.be.true;
    expect(element.children[1].classList.contains('tab-bar-inner')).to.be.true;
  });

  it('can have only a \'ons-tabbar\' element as father', function() {
    var element = new OnsTabElement();

    /* Cannot be tested cause of a bug in Chai, I opened an issue on GitHub

    expect(function() { document.body.appendChild(element)}).to.throw('Uncaught Error: This ons-tab element is must be child of ons-tabbar element.');

    */
    var parent = new OnsTabbarElement();
    expect(function() {parent.appendChild(element)}).not.to.throw('Uncaught Error: This ons-tab element is must be child of ons-tabbar element.');
  });

  it('has an icon property', function() {
    var tabbar = new OnsTabbarElement();
    document.body.appendChild(tabbar);
    tabbar.innerHTML = '<ons-tab></ons-tab>';
    element = document.querySelector('ons-tab')
    expect(element.querySelector('ons-icon')).not.to.be.ok;

    element.setAttribute('icon','ion-map');
    var icon = element.querySelector('ons-icon');
    expect(element.querySelector('ons-icon')).to.be.ok;
    expect(element.querySelector('ons-icon').getAttribute('icon')).to.equal('ion-map');

    element.setAttribute('icon','ion-home');
    expect(element.querySelector('ons-icon').getAttribute('icon')).to.equal('ion-home');
  });
});