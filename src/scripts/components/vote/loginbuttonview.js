(function () {

    function LoginButtonView(selector, authorizer) {
        this.jContainer = jQuery(selector);
        this.authorizer = authorizer;
        this.authorizer.getLoginStatus().then(this.showLoggedIn.bind(this));
        this.authorizer.on(guardian.facebook.Authorizer.NOT_LOGGED_IN, this.showLoginButton.bind(this));
        this.authorizer.on(guardian.facebook.Authorizer.NOT_AUTHORIZED, this.showAuthorizeButton.bind(this));
        this.authorizer.on(guardian.facebook.Authorizer.GOT_USER_DETAILS, this.showLoggedIn.bind(this));
        this.jContainer.delegate(".login", "click.vote-component", this.handleLoginClick.bind(this));
    }

    LoginButtonView.prototype.showLoggedIn = function (userDetails) {
        if (userDetails && userDetails.name) {
            this.jContainer.find(".user-details").html("<span class='login'>Logged in as " + userDetails.name + "</span>");
        } else {
            this.jContainer.find(".user-details").html("<span class='login'>Logged in</span>");
        }
    };

    LoginButtonView.prototype.showLoginButton = function () {
        if (this.jContainer.find("a.login").length) {
            this.handleLoginClick();
            return;
        }
        this.jContainer.find(".user-details").html("<a class='login' href='http://www.facebook.com/'>Log in to Facebook</a>")
    };

    LoginButtonView.prototype.showAuthorizeButton = function () {
        console.log("Showing authorize button");
        if (this.jContainer.find(".login").length) {
            this.handleLoginClick();
            return;
        }
        this.jContainer.find(".user-details").html("<a class='login' href='http://www.facebook.com/'>Use the Guardian Facebook App</a>")
    };

    LoginButtonView.prototype.handleLoginClick = function () {
        this.jContainer.find(".user-details").empty();
        this.authorizer.authUser();
        return false;
    };

    guardian.facebook.LoginButtonView = LoginButtonView;

})();