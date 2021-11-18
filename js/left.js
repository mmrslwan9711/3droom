;(function(window, ht) {
    var E = window.Editor;

    var form = new ht.widget.FormPane();
    form.setVPadding(0);
    form.setVGap(0);
    form.addRow([{
        element: '厦门移动金山机房',
        font: '18px arial, sans-serif',
        color: 'white',
        align: 'center',
        vAlign: 'middle'
    }], [0.1], E.topHeight);

    var lv = new ht.widget.ListView();
    lv.setRowHeight(46);
    var labelFont = '16px arial, sans-serif';
    lv.getLabelFont = function() { return labelFont; };
    var labelColor = 'white';
    lv.getLabelColor = function(data) { return labelColor; };
    lv.getIconWidth = function() { return 55; };
    var oldDrawIcon = lv.drawIcon;
    lv.drawIcon = function(g, data, x, y, width, height) {
        oldDrawIcon.call(this, g, data, x, y + 14, width, height - 28);
    };
    lv.drawRowBackground = function(g, data, selected, x, y, width, height) {
        if (!selected) return;
        g.save();
        var lingrad = g.createLinearGradient(x, y, x + width, y);
        lingrad.addColorStop(0, 'rgba(80, 80, 80, 0.2)');
        lingrad.addColorStop(1, 'rgba(255, 255, 255, 0.68)');
        g.fillStyle = lingrad;
        g.fillRect(x, y, width - 2, height);
        g.restore();
    };

    var dm = lv.dm();
    var labelList = [
        '机房概况', '空调', '容积', '报警', '门禁', 'UPS', '电源', '发电机', '温湿度', '视频监控', 
        '温度云图', '历史数据', '着火点', '人员定位', '交换', '数据', '传输', '动环', '机柜状态', '维护记录'
    ];
    var node;
    labelList.forEach(function(l) {
        node = new ht.Node();
        node.setName(l);
        node.setIcon('./assets/icons2/' + l + ' copy.png');
        dm.add(node);
    });

    var sv = E.left = new ht.widget.SplitView(form, lv, 'v', E.topHeight);
    sv.setDividerSize(0);
    sv.setDraggable(false);
    sv.setTogglable(false);

    var view = sv.getView();
    view.style.background = 'rgba(33,0,56,0.4)';
    view.style.position = 'absolute';
    view.style.width = E.leftWidth + 'px';
    view.style.top = '0px';
    view.style.left = '0px';
    view.style.bottom = '0px';
}(window, ht));
