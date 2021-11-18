;(function(window, ht) {
    var E = window.Editor;

    var form = E.top = new ht.widget.FormPane();
    form.setRowHeight(E.topHeight);
    form.setVGap(-E.topHeight);
    form.setVPadding(0);
    form.addRow([null, {
        image: {
            icon: './symbols/inputBG.json',
            stretch: 'centerUniform'
        }
    }], [40, 260]);
    form.addRow([null, null, {
        id: 'searchInput',
        textField: {}
    }, {
        element: '机房可视化管理系统',
        color: 'white',
        font: '18px arial, sans-serif'
    }, null, {
        button: {
            // label: '视图切换',
            icon: './symbols/viewChange.json',
            background: null,
            selectBackground: 'rgb(128,128,128)',
            borderColor: 'rgba(0, 0, 0, 0)',
            onClicked: function() {
                E.focusTo();
            }
        }
    }, null, {
        button: {
            // label: '告警',
            icon: './symbols/alarm.json',
            togglable: true,
            selected: false,
            background: null,
            selectBackground: 'rgb(128,128,128)',
            borderColor: 'rgba(0, 0, 0, 0)',
            onClicked: function(e) {
                E.setAlarmVisible(this.isSelected());
            }
        }
    }, null], [40, 42, 218, 300, 0.1, 50, 10, 50, 10]);
    var textField = form.getViewById('searchInput'),
        input = textField.getElement();
    input.style.background = 'rgba(0, 0, 0, 0)';
    input.style.borderWidth = '0px';
    input.setAttribute('placeholder', '请输入名称搜索');

    var view = form.getView();
    view.style.background = '#A0A0A0';
    view.style.position = 'absolute';
    view.style.left = E.leftWidth + 'px';
    view.style.top = '0px';
    view.style.right = '0px';
    view.style.height = E.topHeight + 'px';
}(window, ht));
