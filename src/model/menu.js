export default [{
    path: '/home',
    name: '首页',
    icon: 'cloude',
    parentName: '',
    children: [{
        path: '/home/all',
        name: '全部',
        icon: 'all',
        parentName: '首页',
    }, {
        path: '/home/video',
        name: '视频',
        icon: 'video',
        parentName: '首页',
    }, {
        path: '/home/music',
        name: '音频',
        icon: 'music',
        parentName: '首页',
    }, {
        path: '/home/image',
        name: '图片',
        icon: 'image',
        parentName: '首页',
    }, {
        path: '/home/doc',
        name: '文档',
        icon: 'doc',
        parentName: '首页',
    }, {
        path: '/home/other',
        name: '其他',
        icon: 'more',
        parentName: '首页',
    }]
}, {
    path: '/share',
    name: '分享',
    icon: 'share',
    parentName: '',
    children: [{
        path: '/share/record',
        name: '分享记录',
        icon: '',
        parentName: '分享',
    }]
}, {
    path: '/recycle',
    name: '回收站',
    icon: 'del',
    parentName: '',
    children: [{
        path: '/recycle/record',
        name: '删除的文件',
        icon: '',
        parentName: '回收站',
    }]
}, {
    path: '/set',
    name: '设置',
    icon: 'settings',
    parentName: '',
    children: [{
        path: '/set/file',
        name: '用户文件',
        icon: '',
        parentName: '设置',
    }, {
        path: '/set/user',
        name: '用户管理',
        icon: '',
        parentName: '设置',
    }, {
        path: '/set/system',
        name: '系统管理',
        icon: '',
        parentName: '设置',
    }]
}] 