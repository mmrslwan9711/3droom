;(function(window, ht) {
    var E = window.Editor;

    var g3d = E.main = new ht.graph3d.Graph3dView();

    var easing = function (t) {
        return 1 - (--t) * t * t * t;
    };

    // 设置中心位置
    var setCenter = function(center, finish) {
        if (!center) return;
        var c = g3d.getCenter().slice(0),
            dx = center[0] - c[0],
            dy = center[1] - c[1],
            dz = center[2] - c[2]+50;
        // 启动 500 毫秒的动画过度
        ht.Default.startAnim({
            duration: 500,
            easing: easing,
            finishFunc: finish || function() {},
            action: function(v, t) {
                g3d.setCenter([
                    c[0] + dx * v,
                    c[1] + dy * v,
                    c[2] + dz * v + 500
                ]);
            }
        });
    };

    // 设置眼睛位置
    var setEye = function(eye, finish) {
        if (!eye) return;
        var e = g3d.getEye().slice(0),
            dx = eye[0] - e[0],
            dy = eye[1] - e[1],
            dz = eye[2] - e[2];
        // 启动 500 毫秒的动画过度
        ht.Default.startAnim({
            duration: 500,
            easing: easing,
            finishFunc: finish || function() {},
            action: function(v, t) {
                g3d.setEye([
                    e[0] + dx * v,
                    e[1] + dy * v,
                    e[2] + dz * v
                ]);
            }
        });
    };

    E.focusTo = function(center, eye) {
        center = center || [0, 0, 0];
        setCenter(center);

        eye = eye || [780, 916, 841];
        setEye(eye);
    };

    E.setAlarmVisible = function(value) {
        E.alarmVisible = value;
        g3d.invalidateAll();
    };

    g3d.isMovable = function() { return false; };
    g3d.mi(function(e) {
        if (e.kind !== 'doubleClickData') 
            return;
        var data = e.data, p3;

        if (data.a('cabinet')) 
            p3 = data.p3();
        else {
            host = data.getHost();
            if (host && host.a('cabinet')) {
                p3 = host.p3();
            }
        }

        if (!p3) return;

        setCenter(p3);
        setEye([p3[0], 211, p3[2] + 247]);
    });

    E.focusTo();

    var view = g3d.getView();
    view.style.background = '#222222';

    var dm = g3d.dm();


    // 创建墙体
    var wall = new ht.CSGShape();
    wall.setClosePath(true);
    wall.setTall(240);
    wall.setElevation(120);
    wall.setThickness(20);
    wall.setPoints([
        {x: -400, y: -600},
        {x: 400, y: -600},
        {x: 400, y: 480},
        {x: 200, y: 480},
        {x: 200, y: 600},
        {x: -400, y: 600}
    ]);
    wall.s({
        'shape.border.width': 20,
        'shape.border.color': '#898989',
        'all.color': '#5D5D5D',
        'front.color': 'lightgray',
        'back.color': 'lightgray',
        'csg.color': '#DDDDDD'
    });
    dm.add(wall);

    // 地板
    var floor = new ht.Shape();
    floor.setClosePath(true);
    floor.setThickness(-1);
    floor.setTall(1);
    floor.setElevation(-0.51);
    floor.setPoints([
        {x: -400, y: -600},
        {x: 400, y: -600},
        {x: 400, y: 480},
        {x: 200, y: 480},
        {x: 200, y: 600},
        {x: -400, y: 600}
    ]);
    floor.s({
        'repeat.uv.length': 40,
        'shape.border.width': 0,
        'shape3d.top.image': './assets/floor.png'
    });
    dm.add(floor);

    // 门
    var door = new ht.DoorWindow();
    door.setTall(200);
    door.setElevation(100);  
    door.setWidth(100);
    door.setHost(wall);
    door.s({
        'attach.index': 2,
        'attach.offset': 100,
        'attach.offset.opposite': true,
        'dw.axis': 'left',
        'all.image': 'door',
        'front.uv': [1,0, 1,1, 0,1, 0,0]
    });
    // door.setExpanded(true, true);
    dm.add(door);

   

    //二楼
    HIGHT=0
    // 创建墙体
    var wall2 = new ht.CSGShape();
    wall2.setClosePath(true);
    wall2.setTall(240);
    wall2.setElevation(HIGHT+360);
    wall2.setThickness(20);
    wall2.setPoints([
        {x: -400, y: -600},
        {x: 400, y: -600},
        {x: 400, y: 600},
        {x: -400, y: 600}
    ]);
    wall2.s({
        'shape.border.width': 20,
        'shape.border.color': '#898989',
        'all.color': '#5D5D5D',
        'front.color': 'lightgray',
        'back.color': 'lightgray',
        'csg.color': '#DDDDDD'
    });

        // 地板
    var floor2 = new ht.Shape();
    floor2.setClosePath(true);
    floor2.setThickness(-1);
    floor2.setTall(1);
    floor2.setElevation(HIGHT+240-0.51);
    floor2.setPoints([
        {x: -400, y: -600},
        {x: 400, y: -600},
        {x: 400, y: 600},
        {x: -400, y: 600}
    ]);
    floor2.s({
        'repeat.uv.length': 40,
        'shape.border.width': 0,
        'shape3d.top.image': './assets/floor.png'
    });
    dm.add(floor2);
    dm.add(wall2);
    var door2 = new ht.DoorWindow();
    door2.setTall(200);
    door2.setElevation(HIGHT+340);  
    door2.setWidth(100);
    door2.setHost(wall2);
    door2.s({
        'attach.index': 2,
        'attach.offset': 100,
        'attach.offset.opposite': true,
        'dw.axis': 'left',
        'all.image': 'door',
        'front.uv': [1,0, 1,1, 0,1, 0,0]
    });
    // door.setExpanded(true, true);
    dm.add(door2);
    
}(window, ht));
