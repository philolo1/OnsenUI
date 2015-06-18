if (typeof __decorate !== "function") __decorate = function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
if (typeof __metadata !== "function") __metadata = function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="../typings/angular2/angular2.d.ts" />
var angular2_1 = require('angular2/angular2');
// Annotation section
var OnsPage = (function () {
    function OnsPage() {
    }
    OnsPage = __decorate([
        angular2_1.Component({
            selector: 'ons-page'
        }),
        angular2_1.View({
            template: '<div>ons-page content</div>'
        }), 
        __metadata('design:paramtypes', [])
    ], OnsPage);
    return OnsPage;
})();
// Annotation section
var MyAppComponent = (function () {
    function MyAppComponent(loader, elementRef, compiler, injector) {
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
        loader.loadIntoNewLocation(OnsPage, elementRef, '.nazo').then(function (componentRef) {
        });
    }
    MyAppComponent = __decorate([
        angular2_1.Component({
            selector: 'my-app'
        }),
        angular2_1.View({
            template: "\n    hoge\n    <!--<div><h1>Hello {{ name }}</h1> \n    <span [style.color]=\"hoge\">foobar</span></div> -->\n    <div class=\"nazo\"></div>\n    <ons-page>hogehoge</ons-page>"
        }), 
        __metadata('design:paramtypes', [angular2_1.DynamicComponentLoader, angular2_1.ElementRef, angular2_1.Compiler, (typeof di !== 'undefined' && di.Injector) || Object])
    ], MyAppComponent);
    return MyAppComponent;
})();
angular2_1.bootstrap(MyAppComponent);
