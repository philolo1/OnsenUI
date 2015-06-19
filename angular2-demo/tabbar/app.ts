/// <reference path="../typings/angular2/angular2.d.ts" />
declare var window: {angular2: any, di: any};
declare var OnsTabElement: {prototype: {_createPageElement: Function}};
declare var ons: any;

import {
  Compiler,
  Component,
  View,
  bootstrap,
  DynamicComponentLoader,
  ElementRef,
  ViewRef
} from 'angular2/angular2';

import * as angular2 from 'angular2/angular2';
import * as di from 'angular2/di';

window.angular2 = angular2;
window.di = di;

@Component({
  selector: 'ons-page'
})
@View({
  template: `
  <ons-page>
    <ons-toolbar>
      <div class="center">Page1</div>
    </ons-toolbar>

    <div>page1.html content</div>

    <div style="padding: 15px">
      <input type="text" #text (keyup) value="hogehoge"></input>
      <div>label: {{text.value}}</div>
    </div>

    <div style="padding: 15px">
      <ons-button (click)="doSomething()">Page1#doSomething()</ons-button>
    </div>
  </ons-page>
  `
})
class Page1 {
  constructor() {

  }

  doSomething() {
    alert("hoge");
  }
}

@Component({
  selector: 'ons-page'
})
@View({
  template: `
  <ons-page>
    <ons-toolbar>
      <div class="center">Page2</div>
    </ons-toolbar>

    <div>page2.html content</div>
  </ons-page>
  `
})
class Page2 {
}

@Component({
  selector: 'ons-page'
})
@View({
  template: `
  <ons-page>
    <ons-toolbar>
      <div class="center">Page3</div>
    </ons-toolbar>

    <div>page3.html content</div>
  </ons-page>
  `
})
class Page3 {
}

@Component({
  selector: 'my-app'
})
@View({
  template: `
    <ons-tabbar var="tabbar">
      <ons-tab page="page1.html" active="true">
        <div ons-tab-active>
          HOME
        </div>
        <div ons-tab-inactive>
          home
        </div>
      </ons-tab> 
      <ons-tab
        icon="ion-chatbox-working"
        label="Comments"      
        page="page2.html"></ons-tab>
      <ons-tab
        icon="ion-ios-cog"
        label="Settings"
        page="page3.html"></ons-tab>
    </ons-tabbar>
  `
})
class MyAppComponent {
  constructor() { 
  }
}

// extension
bootstrap(MyAppComponent).then(result => {
  var injector: di.Injector = result.injector;
  var loader: DynamicComponentLoader = injector.get(DynamicComponentLoader);

  var dict = {
    'page1.html': Page1,
    'page2.html': Page2,
    'page3.html': Page3
  };

  // rewrite OnsTabElement method
  OnsTabElement.prototype._createPageElement = function(page, callback) {
    // Component
    if (dict[page]) {
      loader.loadIntoNewLocation(dict[page], new ElementRef(result._hostComponent.hostView, 0)).then(componentRef => {
        callback(componentRef.location.domElement);
      });
    } else {
      ons._internal.getPageHTMLAsync(page, function(error, html) {
        if (error) {
          throw new Error('Error: ' + error);
        }
        var element = ons._util.createElement(html.trim());
        callback(element);
      });
    }
  };
});

