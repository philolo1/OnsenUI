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

    /* Cannot be tested probably cause of a bug in Chai, I opened an issue on GitHub

    expect(function() { document.body.appendChild(element)}).to.throw('Uncaught Error: This ons-tab element is must be child of ons-tabbar element.');

    */
    var parent = new OnsTabbarElement();
    expect(function() {parent.appendChild(element)}).not.to.throw('Uncaught Error: This ons-tab element is must be child of ons-tabbar element.');
  });

  it('has a persistent attribute', function(done) {
    var tabbar = new OnsTabbarElement();
    tabbar.innerHTML += '<ons-tab id="tabbar"></ons-tab>';
    document.body.appendChild(tabbar);
    element = document.getElementById('tabbar');

    setImmediate(function() {
      expect(element.isPersistent()).not.to.be.true;

      element.setAttribute('persistent','');
      expect(element.isPersistent()).to.be.true;

      element.removeAttribute('persistent');
      expect(element.isPersistent()).not.to.be.true;
      done();
    });
  });

  it('has a no-reload attribute', function(done) {
    var tabbar = new OnsTabbarElement();
    tabbar.innerHTML += '<ons-tab id="tabbar"></ons-tab>';
    document.body.appendChild(tabbar);
    element = document.getElementById('tabbar');

    setImmediate(function() {
      expect(element.canReload()).to.be.true;

      element.setAttribute('no-reload','');
      expect(element.canReload()).not.to.be.true;

      element.removeAttribute('no-reload');
      expect(element.canReload()).to.be.true;
      done();
    });
  });

  it('has an icon attribute', function() {
    var tabbar = new OnsTabbarElement();
    document.body.appendChild(tabbar);
    tabbar.innerHTML = '<ons-tab></ons-tab>';
    element = document.querySelector('ons-tab')
    expect(element.querySelector('ons-icon')).not.to.be.ok;

    element.setAttribute('icon','ion-map');
    expect(element.querySelector('ons-icon')).to.be.ok;
    expect(element.querySelector('ons-icon').getAttribute('icon')).to.equal('ion-map');

    element.setAttribute('icon','ion-home');
    expect(element.querySelector('ons-icon').getAttribute('icon')).to.equal('ion-home');
    expect(element.querySelector('ons-icon').getAttribute('icon')).not.to.equal('ion-map');
  });

  it('has a label attribute', function() {
    var tabbar = new OnsTabbarElement();
    document.body.appendChild(tabbar);
    tabbar.innerHTML = '<ons-tab></ons-tab>';
    element = document.querySelector('ons-tab');
    expect(document.getElementsByClassName('tab-bar__label')[0]).not.to.be.ok;

    element.setAttribute('label','text');
    expect(document.getElementsByClassName('tab-bar__label')[0]).to.be.ok;
    expect(document.getElementsByClassName('tab-bar__label')[0].innerHTML).to.equal('text');

    element.setAttribute('label','new text');
    expect(document.getElementsByClassName('tab-bar__label')[0].innerHTML).to.equal('new text');
    expect(document.getElementsByClassName('tab-bar__label')[0].innerHTML).not.to.equal('text');
  });


  it('can be set active', function(done) {
    var tabbar = new OnsTabbarElement();
    document.body.appendChild(tabbar);
    document.body.innerHTML += '<ons-template id="page1"><ons-page></ons-page></ons-template><ons-template id="page2"><ons-page></ons-page></ons-template>';
    tabbar.children[1].innerHTML += '<ons-tab id="tab1" page="page1" active="true"></ons-tab><ons-tab id="tab2" page="page2"></ons-tab>';

    var tab1 = tabbar.querySelector('#tab1')
    var tab2 = tabbar.querySelector('#tab2');
    setImmediate(function() {
      expect(tabbar.getActiveTabIndex()).to.equal(-1);

      tab1.setActive();
      expect(tabbar.getActiveTabIndex()).not.to.equal(-1);
      expect(tabbar.getActiveTabIndex()).to.equal(0);

      tab2.setActive();
      tab1.classList.remove('active');
      expect(tabbar.getActiveTabIndex()).not.to.equal(0);
      expect(tabbar.getActiveTabIndex()).to.equal(1);
      done();
    });
  });
});