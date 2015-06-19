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
var angular2 = require('angular2/angular2');
var di = require('angular2/di');
window.angular2 = angular2;
window.di = di;
var Page1 = (function () {
    function Page1() {
    }
    Page1.prototype.doSomething = function () {
        alert("hoge");
    };
    Page1 = __decorate([
        angular2_1.Component({
            selector: 'ons-page'
        }),
        angular2_1.View({
            template: "\n  <ons-page>\n    <ons-toolbar>\n      <div class=\"center\">Page1</div>\n    </ons-toolbar>\n\n    <div>page1.html content</div>\n\n    <div style=\"padding: 15px\">\n      <input type=\"text\" #text (keyup) value=\"hogehoge\"></input>\n      <div>label: {{text.value}}</div>\n    </div>\n\n    <div style=\"padding: 15px\">\n      <ons-button (click)=\"doSomething()\">Page1#doSomething()</ons-button>\n    </div>\n  </ons-page>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], Page1);
    return Page1;
})();
var Page2 = (function () {
    function Page2() {
    }
    Page2 = __decorate([
        angular2_1.Component({
            selector: 'ons-page'
        }),
        angular2_1.View({
            template: "\n  <ons-page>\n    <ons-toolbar>\n      <div class=\"center\">Page2</div>\n    </ons-toolbar>\n\n    <div>page2.html content</div>\n  </ons-page>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], Page2);
    return Page2;
})();
var Page3 = (function () {
    function Page3() {
    }
    Page3 = __decorate([
        angular2_1.Component({
            selector: 'ons-page'
        }),
        angular2_1.View({
            template: "\n  <ons-page>\n    <ons-toolbar>\n      <div class=\"center\">Page3</div>\n    </ons-toolbar>\n\n    <div>page3.html content</div>\n  </ons-page>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], Page3);
    return Page3;
})();
var MyAppComponent = (function () {
    function MyAppComponent() {
    }
    MyAppComponent = __decorate([
        angular2_1.Component({
            selector: 'my-app'
        }),
        angular2_1.View({
            template: "\n    <ons-tabbar var=\"tabbar\">\n      <ons-tab page=\"page1.html\" active=\"true\">\n        <div ons-tab-active>\n          HOME\n        </div>\n        <div ons-tab-inactive>\n          home\n        </div>\n      </ons-tab> \n      <ons-tab\n        icon=\"ion-chatbox-working\"\n        label=\"Comments\"      \n        page=\"page2.html\"></ons-tab>\n      <ons-tab\n        icon=\"ion-ios-cog\"\n        label=\"Settings\"\n        page=\"page3.html\"></ons-tab>\n    </ons-tabbar>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], MyAppComponent);
    return MyAppComponent;
})();
// extension
angular2_1.bootstrap(MyAppComponent).then(function (result) {
    var injector = result.injector;
    var loader = injector.get(angular2_1.DynamicComponentLoader);
    var dict = {
        'page1.html': Page1,
        'page2.html': Page2,
        'page3.html': Page3
    };
    // rewrite OnsTabElement method
    OnsTabElement.prototype._createPageElement = function (page, callback) {
        // Component
        if (dict[page]) {
            loader.loadIntoNewLocation(dict[page], new angular2_1.ElementRef(result._hostComponent.hostView, 0)).then(function (componentRef) {
                callback(componentRef.location.domElement);
            });
        }
        else {
            ons._internal.getPageHTMLAsync(page, function (error, html) {
                if (error) {
                    throw new Error('Error: ' + error);
                }
                var element = ons._util.createElement(html.trim());
                callback(element);
            });
        }
    };
});
