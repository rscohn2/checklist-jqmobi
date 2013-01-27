var app = app || {};

$(function () {
    // backbone doesn't know about jqmobi
    Backbone.setDomLibrary($);

    // Kick things off by creating the **App**.
    new app.AppView();

});
