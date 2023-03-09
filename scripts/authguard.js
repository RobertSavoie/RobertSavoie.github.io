"use strict";
var core;
(function (core) {
    let protected_routes = ["contact-list"];
    if (protected_routes.indexOf(router.ActiveLink) > -1) {
        if (!sessionStorage.getItem("user")) {
            location.href = "/login";
        }
    }
})(core || (core = {}));
//# sourceMappingURL=authguard.js.map