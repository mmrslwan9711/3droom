;(function(window, ht) {
    var E = window.Editor;

    var S = E.Server = function(obj) {
        var color = obj.color,
            frontImg = obj.frontImg;

        var node = this._node = new ht.Node();
        node.s({
            'all.color': color,
            'front.image': frontImg
        });
    };

    ht.Default.def('Editor.Server', Object, {
        addToDataModel: function(dm) {
            dm.add(this._node);
        },
        setHost: function() {
            this._node.setHost.apply(this._node, arguments);
        },
        s3: function() {
            this._node.s3.apply(this._node, arguments);
        },
        setElevation: function() {
            this._node.setElevation.apply(this._node, arguments);
        }
    });
}(window, ht));
