/* Facebook Web Clients 1.0 */

(function () {

    var baseURI = "http://olly.guardian.co.uk:8080",
        cssFile = baseURI + "/static/facebook-components-vote-1.0.css";

    (document.createStyleSheet) ? document.createStyleSheet(cssFile) : jQuery('<link rel="stylesheet" type="text/css" href="' + cssFile + '" />').appendTo('head');

    require([
        baseURI + "/static/facebook-authorizer-1.0.js",
        baseURI + "/static/facebook-ui-donut-1.0.js",
        baseURI + "/static/facebook-components-vote-1.0.js"
    ],
        function () {

            var
                authorizer = new guardian.facebook.Authorizer(document),
                model = new guardian.facebook.VoteModel(),
                view = new guardian.facebook.VoteComponent(".ma-placeholder-facebook-agree-disagree-component", model, guardian.ui.CanvasDonut, authorizer),
                loginButtonView = new guardian.facebook.LoginButtonView(".facebook-auth-status", authorizer),
                controller = new guardian.facebook.VoteController(model, view, authorizer);

            controller.initialise(baseURI);

        });
})();