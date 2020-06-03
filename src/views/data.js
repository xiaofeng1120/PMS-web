export default {
    data: [
        { day: "05-26", count: "8", week: "二" },
        { day: "05-27", count: "6", week: "三" },
        { day: "05-28", count: "8", week: "四", is_today: true },
        { day: "05-29", count: "6", week: "五" },
        { day: "05-30", count: "7", week: "六" },
        { day: "05-31", count: "9", week: "日" },
        { day: "06-01", count: "12", week: "一" },
        { day: "06-02", count: "10", week: "二" },
        { day: "06-03", count: "26", week: "三" },
        { day: "06-04", count: "25", week: "四" }
    ],
    //roomType的值 0=>空房 1=>入住  2=>预定 3=>脏房
    list: [
        {
            roomName: "单人间",
            roomNumber: "201",
            id: 1,
            day: '',
            item: [
                {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 0,
                    user: { name: "张三先生" },//用户信息
                    price: '180',//房间价格
                },
                {
                    is_locking: true,//是否锁定
                    is_active: false,//是否激活
                    roomType: 1,//是否脏房
                    user: { name: "张三先生" },//用户信息
                    price: '180',//房间价格
                },
                {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 2,//是否脏房
                    user: { name: "张三先生", source: '散客' },//用户信息
                    price: '180',//房间价格
                },
                {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 0,//是否脏房
                    user: { name: "张三先生" },//用户信息
                    price: '180',//房间价格
                },
                {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 0,//是否脏房
                    user: { name: "张三先生" },//用户信息
                    price: '180',//房间价格
                },
                {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 1,//是否脏房
                    user: { name: "李四先生", source: '线下客户' },//用户信息
                    price: '180',//房间价格
                },
                {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 3,//是否脏房
                    user: { name: "张三先生" },//用户信息
                    price: '180',//房间价格
                },
                {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 1,//是否脏房
                    user: { name: "王五先生", source: '散客' },//用户信息
                    price: '180',//房间价格
                },
                {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 1,//是否脏房
                    user: { name: "张三先生", source: '长住客' },//用户信息
                    price: '180',//房间价格
                },
                {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 0,//是否脏房
                    user: { name: "张三先生" },//用户信息
                    price: '180',//房间价格
                },
            ]
        },
        {
            roomName: "单人间",
            roomNumber: "202",
            id: 2,
            day: '',
            item: [


                {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 0,//是否脏房
                    user: { name: "张三先生" },//用户信息
                    price: '180',//房间价格
                },
                {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 2,//是否脏房
                    user: { name: "张三先生", source: '散客' },//用户信息
                    price: '180',//房间价格
                }, {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 0,
                    user: { name: "张三先生" },//用户信息
                    price: '180',//房间价格
                },
                {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 0,//是否脏房
                    user: { name: "张三先生" },//用户信息
                    price: '180',//房间价格
                },
                {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 1,//是否脏房
                    user: { name: "李四先生", source: '线下客户' },//用户信息
                    price: '180',//房间价格
                },
                {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 0,//是否脏房
                    user: { name: "张三先生" },//用户信息
                    price: '180',//房间价格
                },
                {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 1,//是否脏房
                    user: { name: "张三先生", source: '长住客' },//用户信息
                    price: '180',//房间价格
                },
                {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 3,//是否脏房
                    user: { name: "张三先生" },//用户信息
                    price: '180',//房间价格
                },
                {
                    is_locking: true,//是否锁定
                    is_active: false,//是否激活
                    roomType: 1,//是否脏房
                    user: { name: "张三先生" },//用户信息
                    price: '180',//房间价格
                }, {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 1,//是否脏房
                    user: { name: "王五先生", source: '散客' },//用户信息
                    price: '180',//房间价格
                },
            ]
        },
        {
            roomName: "单人间",
            roomNumber: "203",
            id: 3,
            day: '',
            item: [
                {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 1,//是否脏房
                    user: { name: "李四先生", source: '线下客户' },//用户信息
                    price: '180',//房间价格
                },
                {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 0,//是否脏房
                    user: { name: "张三先生" },//用户信息
                    price: '180',//房间价格
                },
                {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 1,//是否脏房
                    user: { name: "张三先生", source: '长住客' },//用户信息
                    price: '180',//房间价格
                },
                {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 3,//是否脏房
                    user: { name: "张三先生" },//用户信息
                    price: '180',//房间价格
                },
                {
                    is_locking: true,//是否锁定
                    is_active: false,//是否激活
                    roomType: 1,//是否脏房
                    user: { name: "张三先生" },//用户信息
                    price: '180',//房间价格
                }, {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 1,//是否脏房
                    user: { name: "王五先生", source: '散客' },//用户信息
                    price: '180',//房间价格
                }, {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 0,//是否脏房
                    user: { name: "张三先生" },//用户信息
                    price: '180',//房间价格
                },
                {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 2,//是否脏房
                    user: { name: "张三先生", source: '散客' },//用户信息
                    price: '180',//房间价格
                }, {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 0,
                    user: { name: "张三先生" },//用户信息
                    price: '180',//房间价格
                },
                {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 0,//是否脏房
                    user: { name: "张三先生" },//用户信息
                    price: '180',//房间价格
                },
            ]
        },
        {
            roomName: "单人间",
            roomNumber: "204",
            id:4,
            day: '',
            item: [
                {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 1,//是否脏房
                    user: { name: "张三先生", source: '长住客' },//用户信息
                    price: '180',//房间价格
                },
                {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 3,//是否脏房
                    user: { name: "张三先生" },//用户信息
                    price: '180',//房间价格
                },
                {
                    is_locking: true,//是否锁定
                    is_active: false,//是否激活
                    roomType: 1,//是否脏房
                    user: { name: "张三先生" },//用户信息
                    price: '180',//房间价格
                }, {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 1,//是否脏房
                    user: { name: "王五先生", source: '散客' },//用户信息
                    price: '180',//房间价格
                }, {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 0,//是否脏房
                    user: { name: "张三先生" },//用户信息
                    price: '180',//房间价格
                },
                {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 2,//是否脏房
                    user: { name: "张三先生", source: '散客' },//用户信息
                    price: '180',//房间价格
                }, {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 0,
                    user: { name: "张三先生" },//用户信息
                    price: '180',//房间价格
                },
                {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 0,//是否脏房
                    user: { name: "张三先生" },//用户信息
                    price: '180',//房间价格
                },
                {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 1,//是否脏房
                    user: { name: "李四先生", source: '线下客户' },//用户信息
                    price: '180',//房间价格
                },
                {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 0,//是否脏房
                    user: { name: "张三先生" },//用户信息
                    price: '180',//房间价格
                },
            ]
        },
        {
            roomName: "单人间",
            roomNumber: "205",
            id:5,
            day: '',
            item: [
                {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 1,//是否脏房
                    user: { name: "李四先生", source: '线下客户' },//用户信息
                    price: '180',//房间价格
                },
                {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 0,//是否脏房
                    user: { name: "张三先生" },//用户信息
                    price: '180',//房间价格
                },
                {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 1,//是否脏房
                    user: { name: "张三先生", source: '长住客' },//用户信息
                    price: '180',//房间价格
                },
                {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 3,//是否脏房
                    user: { name: "张三先生" },//用户信息
                    price: '180',//房间价格
                },
                {
                    is_locking: true,//是否锁定
                    is_active: false,//是否激活
                    roomType: 1,//是否脏房
                    user: { name: "张三先生" },//用户信息
                    price: '180',//房间价格
                }, {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 1,//是否脏房
                    user: { name: "王五先生", source: '散客' },//用户信息
                    price: '180',//房间价格
                }, {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 0,//是否脏房
                    user: { name: "张三先生" },//用户信息
                    price: '180',//房间价格
                },
                {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 2,//是否脏房
                    user: { name: "张三先生", source: '散客' },//用户信息
                    price: '180',//房间价格
                }, {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 0,
                    user: { name: "张三先生" },//用户信息
                    price: '180',//房间价格
                },
                {
                    is_locking: false,//是否锁定
                    is_active: false,//是否激活
                    roomType: 0,//是否脏房
                    user: { name: "张三先生" },//用户信息
                    price: '180',//房间价格
                },
            ]
        }
    ]
}