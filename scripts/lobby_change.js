// ==UserScript==
// @name         F4 Change Lobby
// @version      0.1.1
// @author       UnitedCatdom
// @include      https://krunker.io/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=krunker.io
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.addEventListener("keyup", (e) => {
        if (e.key == "F4") window.location.href = "https://krunker.io";
    });
})();