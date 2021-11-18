;(function(window, ht) {
    var document = window.document;

    var E = window.Editor;

    var g3d = E.main;

    window.addEventListener('load', function() {
        g3d.addToDOM();

        // document.body.appendChild(E.left.getView());
        document.body.appendChild(E.top.getView());

        E.top.iv();
    });
}(window, ht));
