/// <reference path="../typings/angular2/angular2.d.ts" />
declare var window: {angular2: any, di: any};

import {
  Compiler,
  Component,
  View,
  bootstrap,
  DynamicComponentLoader,
  ElementRef
} from 'angular2/angular2';

import * as angular2 from 'angular2/angular2';
import * as di from 'angular2/di';

// Annotation section
@Component({
  selector: 'ons-page'
})
@View({
  template: '<div>ons-page content</div>'
})
class OnsPage {
}

// Annotation section
@Component({
  selector: 'my-app'
})
@View({
  template: `
    hoge
    <!--<div><h1>Hello {{ name }}</h1> 
    <span [style.color]="hoge">foobar</span></div> -->
    <div class="nazo"></div>
    <ons-page>hogehoge</ons-page>`
})
class MyAppComponent {
  name: string;
  hoge: string;
  loader: DynamicComponentLoader;
  elementRef: ElementRef;
  injector: di.Injector;
    
  constructor(loader: DynamicComponentLoader, elementRef: ElementRef, compiler: Compiler, injector: di.Injector) {
    this.name = 'Alice';
    this.hoge = 'red';
    this.loader = loader;
    this.elementRef = elementRef;
    this.injector = injector;

    /*
    compiler.compile(OnsPage).then(function(result) {
      console.log(result);
    });
    window.compiler = compiler;*/

    loader.loadIntoNewLocation(OnsPage, elementRef, '.nazo').then(componentRef => {
    });
  }
}

bootstrap(MyAppComponent);
