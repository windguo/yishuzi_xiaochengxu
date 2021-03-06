var COMMONFN = require('../../utils/util.js');
let isAdFlag = false;
Page({
  data: {
		dialogContent: [],
		infoArray:[],
    autoplay: true,
    interval: 5000,
    duration: 500,
    objectArray: [],
    previewImage: '',
    id: '',
		contentArrayBaoxiao:[],
		userid:'',
    title: '',
    total: 200,
    index: 0,
    fontId: null,
    hiddenss: false,
    fontSize: 30,
    itemWidth: 66,
		userfens:'',
    winHeight: '', // 窗口高度
    voteTitle: null,
    currentTab: 0, // 预设当前项的值
    scrollLeft: 0, // tab标题的滚动条位置
    expertListi: [],
    expertList: [],
    expertListId: [],
    contentArray: [],
    contentArrayJuzi: [],
    textColorArray: [
      {
        color: '#FF8C00',
        name: '深橙色'
      },
      {
        color: '#FFB6C1',
        name: '浅粉红'
      },
      {
        color: '#FFC0CB',
        name: '粉红'
      },
      {
        color: '#DC143C',
        name: '猩红'
      },
      {
        color: '#FFF0F5',
        name: '脸红的淡紫色'
      },
      {
        color: '#DB7093',
        name: '苍白的紫罗兰红色'
      },
      {
        color: '#FF69B4',
        name: '热情的粉红'
      },
      {
        color: '#FF1493',
        name: '深粉色'
      },
      {
        color: '#C71585',
        name: '适中的紫罗兰红色'
      },
      {
        color: '#DA70D6',
        name: '兰花的紫色'
      },
      {
        color: '#D8BFD8',
        name: '蓟'
      },
      {
        color: '#DDA0DD',
        name: '李子'
      },
      {
        color: '#EE82EE',
        name: '紫罗兰'
      },
      {
        color: '#FF00FF',
        name: '洋红'
      },
      {
        color: '#FF00FF',
        name: '灯笼海棠(紫红色)'
      },
      {
        color: '#8B008B',
        name: '深洋红色'
      },
      {
        color: '#800080',
        name: '紫色'
      },
      {
        color: '#BA55D3',
        name: '适中的兰花紫'
      },
      {
        color: '#9400D3',
        name: '深紫罗兰色'
      },
      {
        color: '#9932CC',
        name: '深兰花紫'
      },
      {
        color: '#4B0082',
        name: '靛青'
      },
      {
        color: '#8A2BE2',
        name: '深紫罗兰的蓝色'
      },
      {
        color: '#9370DB',
        name: '适中的紫色'
      },
      {
        color: '#7B68EE',
        name: '适中的板岩暗蓝灰色'
      },
      {
        color: '#6A5ACD',
        name: '板岩暗蓝灰色'
      },
      {
        color: '#483D8B',
        name: '深岩暗蓝灰色'
      },
      {
        color: '#E6E6FA',
        name: '熏衣草花的淡紫色'
      },
      {
        color: '#F8F8FF',
        name: '幽灵的白色'
      },
      {
        color: '#0000FF',
        name: '纯蓝'
      },
      {
        color: '#0000CD',
        name: '适中的蓝色'
      },
      {
        color: '#191970',
        name: '午夜的蓝色'
      },
      {
        color: '#00008B',
        name: '深蓝色'
      },
      {
        color: '#000080',
        name: '海军蓝'
      },
      {
        color: '#4169E1',
        name: '皇军蓝'
      },
      {
        color: '#6495ED',
        name: '矢车菊的蓝色'
      },
      {
        color: '#B0C4DE',
        name: '淡钢蓝'
      },
      {
        color: '#778899',
        name: '浅石板灰'
      },
      {
        color: '#708090',
        name: '石板灰'
      },
      {
        color: '#1E90FF',
        name: '道奇蓝'
      },
      {
        color: '#F0F8FF',
        name: '爱丽丝蓝'
      },
      {
        color: '#4682B4',
        name: '钢蓝'
      },
      {
        color: '#87CEFA',
        name: '淡蓝色'
      },
      {
        color: '#87CEEB',
        name: '天蓝色'
      },
      {
        color: '#00BFFF',
        name: '深天蓝'
      },
      {
        color: '#ADD8E6',
        name: '淡蓝'
      },
      {
        color: '#B0E0E6',
        name: '火药蓝'
      },
      {
        color: '#5F9EA0',
        name: '军校蓝'
      },
      {
        color: '#ffffff',
        name: '白色 #ffffff'
      },
      {
        color: '#F0FFFF',
        name: '蔚蓝色'
      },
      {
        color: '#E1FFFF',
        name: '淡青色'
      },
      {
        color: '#AFEEEE',
        name: '苍白的绿宝石'
      },
      {
        color: '#00FFFF',
        name: '青色'
      },
      {
        color: '#00FFFF',
        name: '水绿色'
      },
      {
        color: '#00CED1',
        name: '深绿宝石'
      },
      {
        color: '#2F4F4F',
        name: '深石板灰'
      },
      {
        color: '#008B8B',
        name: '深青色'
      },
      {
        color: '#008080',
        name: '水鸭色'
      },
      {
        color: '#48D1CC',
        name: '适中的绿宝石'
      },
      {
        color: '#20B2AA',
        name: '浅海洋绿'
      },
      {
        color: '#40E0D0',
        name: '绿宝石'
      },
      {
        color: '#7FFFAA',
        name: '绿玉\碧绿色'
      },
      {
        color: '#00FA9A',
        name: '适中的碧绿色'
      },
      {
        color: '#F5FFFA',
        name: '适中的春天的绿色'
      },
      {
        color: '#00FF7F',
        name: '薄荷奶油'
      },
      {
        color: '#3CB371',
        name: '春天的绿色'
      },
      {
        color: '#2E8B57',
        name: '海洋绿'
      },
      {
        color: '#F0FFF0',
        name: '蜂蜜'
      },
      {
        color: '#90EE90',
        name: '淡绿色'
      },
      {
        color: '#98FB98',
        name: '苍白的绿色'
      },
      {
        color: '#8FBC8F',
        name: '深海洋绿'
      },
      {
        color: '#32CD32',
        name: '酸橙绿'
      },
      {
        color: '#00FF00',
        name: '酸橙色'
      },
      {
        color: '#228B22',
        name: '森林绿'
      },
      {
        color: '#008000',
        name: '纯绿'
      },
      {
        color: '#006400',
        name: '深绿色'
      },
      {
        color: '#7FFF00',
        name: '查特酒绿'
      },
      {
        color: '#7CFC00',
        name: '草坪绿'
      },
      {
        color: '#ADFF2F',
        name: '绿黄色'
      },
      {
        color: '#556B2F',
        name: '橄榄土褐色'
      },
      {
        color: '#6B8E23',
        name: '米色(浅褐色)'
      },
      {
        color: '#FAFAD2',
        name: '浅秋麒麟黄'
      },
      {
        color: '#FFFFF0',
        name: '象牙'
      },
      {
        color: '#FFFFE0',
        name: '浅黄色'
      },
      {
        color: '#FFFF00',
        name: '纯黄'
      },
      {
        color: '#808000',
        name: '橄榄'
      },
      {
        color: '#BDB76B',
        name: '深卡其布'
      },
      {
        color: '#FFFACD',
        name: '柠檬薄纱'
      },
      {
        color: '#EEE8AA',
        name: '灰秋麒麟'
      },
      {
        color: '#F0E68C',
        name: '卡其布'
      },
      {
        color: '#FFD700',
        name: '金'
      },
      {
        color: '#FFF8DC',
        name: '玉米色'
      },
      {
        color: '#DAA520',
        name: '秋麒麟'
      },
      {
        color: '#FFFAF0',
        name: '花的白色'
      },
      {
        color: '#FDF5E6',
        name: '老饰带'
      },
      {
        color: '#F5DEB3',
        name: '小麦色'
      },
      {
        color: '#FFE4B5',
        name: '鹿皮鞋'
      },
      {
        color: '#FFA500',
        name: '橙色'
      },
      {
        color: '#FFEFD5',
        name: '番木瓜'
      },
      {
        color: '#FFEBCD',
        name: '漂白的杏仁'
      },
      {
        color: '#FFDEAD',
        name: '白'
      },
      {
        color: '#FAEBD7',
        name: '古代的白色'
      },
      {
        color: '#D2B48C',
        name: '晒黑'
      },
      {
        color: '#DEB887',
        name: '结实的树'
      },
      {
        color: '#FFE4C4',
        name: '(浓汤)乳脂,番茄等'
      },
      {
        color: '#FAF0E6',
        name: '亚麻布'
      },
      {
        color: '#CD853F',
        name: '秘鲁'
      },
      {
        color: '#FFDAB9',
        name: '桃色'
      },
      {
        color: '#F4A460',
        name: '沙棕色'
      },
      {
        color: '#D2691E',
        name: '巧克力'
      },
      {
        color: '#8B4513',
        name: '马鞍棕色'
      },
      {
        color: '#FFF5EE',
        name: '海贝壳'
      },
      {
        color: '#A0522D',
        name: '黄土赭色'
      },
      {
        color: '#FFA07A',
        name: '浅鲜肉(鲑鱼)色'
      },
      {
        color: '#FF7F50',
        name: '珊瑚'
      },
      {
        color: '#FF4500',
        name: '橙红色'
      },
      {
        color: '#E9967A',
        name: '深鲜肉(鲑鱼)色'
      },
      {
        color: '#FF6347',
        name: '番茄'
      },
      {
        color: '#FFE4E1',
        name: '薄雾玫瑰'
      },
      {
        color: '#FA8072',
        name: '鲜肉(鲑鱼)色'
      },
      {
        color: '#FFFAFA',
        name: '雪'
      },
      {
        color: '#F08080',
        name: '淡珊瑚色'
      },
      {
        color: '#BC8F8F',
        name: '玫瑰棕色'
      },
      {
        color: '#CD5C5C',
        name: '印度红'
      },
      {
        color: '#FF0000',
        name: '纯红'
      },
      {
        color: '#A52A2A',
        name: '棕色'
      },
      {
        color: '#B22222',
        name: '耐火砖'
      },
      {
        color: '#8B0000',
        name: '深红色'
      },
      {
        color: '#800000',
        name: '栗色'
      },
      {
        color: '#FFFFFF',
        name: '纯白'
      },
      {
        color: '#F5F5F5',
        name: '白烟'
      },
      {
        color: '#DCDCDC',
        name: 'Gainsboro'
      },
      {
        color: '#D3D3D3',
        name: '浅灰色'
      },
      {
        color: '#C0C0C0',
        name: '银白色'
      },
      {
        color: '#A9A9A9',
        name: '深灰色'
      },
      {
        color: '#808080',
        name: '灰色'
      },
      {
        color: '#696969',
        name: '暗淡的灰色'
      },
      {
        color: '#000000',
        name: '纯黑'
      }
    ],
    textColorArrayIndex: 0,
    backgroundColorArray: [
      {
        backgroundColor: '#ffffff',
        name: '白色'
      },
      {
        backgroundColor: '#F0FFFF',
        name: '蔚蓝色'
      },
      {
        backgroundColor: '#E1FFFF',
        name: '淡青色'
      },
      {
        backgroundColor: '#AFEEEE',
        name: '苍白的绿宝石'
      },
      {
        backgroundColor: '#00FFFF',
        name: '青色'
      },
      {
        backgroundColor: '#00FFFF',
        name: '水绿色'
      },
      {
        backgroundColor: '#00CED1',
        name: '深绿宝石'
      },
      {
        backgroundColor: '#2F4F4F',
        name: '深石板灰'
      },
      {
        backgroundColor: '#008B8B',
        name: '深青色'
      },
      {
        backgroundColor: '#008080',
        name: '水鸭色'
      },
      {
        backgroundColor: '#48D1CC',
        name: '适中的绿宝石'
      },
      {
        backgroundColor: '#20B2AA',
        name: '浅海洋绿'
      },
      {
        backgroundColor: '#40E0D0',
        name: '绿宝石'
      },
      {
        backgroundColor: '#7FFFAA',
        name: '绿玉\碧绿色'
      },
      {
        backgroundColor: '#00FA9A',
        name: '适中的碧绿色'
      },
      {
        backgroundColor: '#F5FFFA',
        name: '适中的春天的绿色'
      },
      {
        backgroundColor: '#00FF7F',
        name: '薄荷奶油'
      },
      {
        backgroundColor: '#3CB371',
        name: '春天的绿色'
      },
      {
        backgroundColor: '#2E8B57',
        name: '海洋绿'
      },
      {
        backgroundColor: '#F0FFF0',
        name: '蜂蜜'
      },
      {
        backgroundColor: '#90EE90',
        name: '淡绿色'
      },
      {
        backgroundColor: '#98FB98',
        name: '苍白的绿色'
      },
      {
        backgroundColor: '#8FBC8F',
        name: '深海洋绿'
      },
      {
        backgroundColor: '#32CD32',
        name: '酸橙绿'
      },
      {
        backgroundColor: '#00FF00',
        name: '酸橙色'
      },
      {
        backgroundColor: '#228B22',
        name: '森林绿'
      },
      {
        backgroundColor: '#008000',
        name: '纯绿'
      },
      {
        backgroundColor: '#006400',
        name: '深绿色'
      },
      {
        backgroundColor: '#7FFF00',
        name: '查特酒绿'
      },
      {
        backgroundColor: '#7CFC00',
        name: '草坪绿'
      },
      {
        backgroundColor: '#ADFF2F',
        name: '绿黄色'
      },
      {
        backgroundColor: '#556B2F',
        name: '橄榄土褐色'
      },
      {
        backgroundColor: '#6B8E23',
        name: '米色(浅褐色)'
      },
      {
        backgroundColor: '#FAFAD2',
        name: '浅秋麒麟黄'
      },
      {
        backgroundColor: '#FFFFF0',
        name: '象牙'
      },
      {
        backgroundColor: '#FFFFE0',
        name: '浅黄色'
      },
      {
        backgroundColor: '#FFFF00',
        name: '纯黄'
      },
      {
        backgroundColor: '#808000',
        name: '橄榄'
      },
      {
        backgroundColor: '#BDB76B',
        name: '深卡其布'
      },
      {
        backgroundColor: '#FFFACD',
        name: '柠檬薄纱'
      },
      {
        backgroundColor: '#EEE8AA',
        name: '灰秋麒麟'
      },
      {
        backgroundColor: '#F0E68C',
        name: '卡其布'
      },
      {
        backgroundColor: '#FFD700',
        name: '金'
      },
      {
        backgroundColor: '#FFF8DC',
        name: '玉米色'
      },
      {
        backgroundColor: '#DAA520',
        name: '秋麒麟'
      },
      {
        backgroundColor: '#FFFAF0',
        name: '花的白色'
      },
      {
        backgroundColor: '#FDF5E6',
        name: '老饰带'
      },
      {
        backgroundColor: '#F5DEB3',
        name: '小麦色'
      },
      {
        backgroundColor: '#FFE4B5',
        name: '鹿皮鞋'
      },
      {
        backgroundColor: '#FFA500',
        name: '橙色'
      },
      {
        backgroundColor: '#FFEFD5',
        name: '番木瓜'
      },
      {
        backgroundColor: '#FFEBCD',
        name: '漂白的杏仁'
      },
      {
        backgroundColor: '#FFDEAD',
        name: '白'
      },
      {
        backgroundColor: '#FAEBD7',
        name: '古代的白色'
      },
      {
        backgroundColor: '#D2B48C',
        name: '晒黑'
      },
      {
        backgroundColor: '#DEB887',
        name: '结实的树'
      },
      {
        backgroundColor: '#FFE4C4',
        name: '(浓汤)乳脂,番茄等'
      },
      {
        backgroundColor: '#FF8C00',
        name: '深橙色'
      },
      {
        backgroundColor: '#FAF0E6',
        name: '亚麻布'
      },
      {
        backgroundColor: '#CD853F',
        name: '秘鲁'
      },
      {
        backgroundColor: '#FFDAB9',
        name: '桃色'
      },
      {
        backgroundColor: '#F4A460',
        name: '沙棕色'
      },
      {
        backgroundColor: '#D2691E',
        name: '巧克力'
      },
      {
        backgroundColor: '#8B4513',
        name: '马鞍棕色'
      },
      {
        backgroundColor: '#FFF5EE',
        name: '海贝壳'
      },
      {
        backgroundColor: '#A0522D',
        name: '黄土赭色'
      },
      {
        backgroundColor: '#FFA07A',
        name: '浅鲜肉(鲑鱼)色'
      },
      {
        backgroundColor: '#FF7F50',
        name: '珊瑚'
      },
      {
        backgroundColor: '#FF4500',
        name: '橙红色'
      },
      {
        backgroundColor: '#E9967A',
        name: '深鲜肉(鲑鱼)色'
      },
      {
        backgroundColor: '#FF6347',
        name: '番茄'
      },
      {
        backgroundColor: '#FFE4E1',
        name: '薄雾玫瑰'
      },
      {
        backgroundColor: '#FA8072',
        name: '鲜肉(鲑鱼)色'
      },
      {
        backgroundColor: '#FFFAFA',
        name: '雪'
      },
      {
        backgroundColor: '#F08080',
        name: '淡珊瑚色'
      },
      {
        backgroundColor: '#BC8F8F',
        name: '玫瑰棕色'
      },
      {
        backgroundColor: '#CD5C5C',
        name: '印度红'
      },
      {
        backgroundColor: '#FF0000',
        name: '纯红'
      },
      {
        backgroundColor: '#A52A2A',
        name: '棕色'
      },
      {
        backgroundColor: '#B22222',
        name: '耐火砖'
      },
      {
        backgroundColor: '#8B0000',
        name: '深红色'
      },
      {
        backgroundColor: '#800000',
        name: '栗色'
      },
      {
        backgroundColor: '#FFFFFF',
        name: '纯白'
      },
      {
        backgroundColor: '#F5F5F5',
        name: '白烟'
      },
      {
        backgroundColor: '#DCDCDC',
        name: 'Gainsboro'
      },
      {
        backgroundColor: '#D3D3D3',
        name: '浅灰色'
      },
      {
        backgroundColor: '#C0C0C0',
        name: '银白色'
      },
      {
        backgroundColor: '#A9A9A9',
        name: '深灰色'
      },
      {
        backgroundColor: '#808080',
        name: '灰色'
      },
      {
        backgroundColor: '#696969',
        name: '暗淡的灰色'
      },
      {
        backgroundColor: '#000000',
        name: '纯黑'
      },
      {
        backgroundColor: '#FFB6C1',
        name: '浅粉红'
      },
      {
        backgroundColor: '#FFC0CB',
        name: '粉红'
      },
      {
        backgroundColor: '#DC143C',
        name: '猩红'
      },
      {
        backgroundColor: '#FFF0F5',
        name: '脸红的淡紫色'
      },
      {
        backgroundColor: '#DB7093',
        name: '苍白的紫罗兰红色'
      },
      {
        backgroundColor: '#FF69B4',
        name: '热情的粉红'
      },
      {
        backgroundColor: '#FF1493',
        name: '深粉色'
      },
      {
        backgroundColor: '#C71585',
        name: '适中的紫罗兰红色'
      },
      {
        backgroundColor: '#DA70D6',
        name: '兰花的紫色'
      },
      {
        backgroundColor: '#D8BFD8',
        name: '蓟'
      },
      {
        backgroundColor: '#DDA0DD',
        name: '李子'
      },
      {
        backgroundColor: '#EE82EE',
        name: '紫罗兰'
      },
      {
        backgroundColor: '#FF00FF',
        name: '洋红'
      },
      {
        backgroundColor: '#FF00FF',
        name: '灯笼海棠(紫红色)'
      },
      {
        backgroundColor: '#8B008B',
        name: '深洋红色'
      },
      {
        backgroundColor: '#800080',
        name: '紫色'
      },
      {
        backgroundColor: '#BA55D3',
        name: '适中的兰花紫'
      },
      {
        backgroundColor: '#9400D3',
        name: '深紫罗兰色'
      },
      {
        backgroundColor: '#9932CC',
        name: '深兰花紫'
      },
      {
        backgroundColor: '#4B0082',
        name: '靛青'
      },
      {
        backgroundColor: '#8A2BE2',
        name: '深紫罗兰的蓝色'
      },
      {
        backgroundColor: '#9370DB',
        name: '适中的紫色'
      },
      {
        backgroundColor: '#7B68EE',
        name: '适中的板岩暗蓝灰色'
      },
      {
        backgroundColor: '#6A5ACD',
        name: '板岩暗蓝灰色'
      },
      {
        backgroundColor: '#483D8B',
        name: '深岩暗蓝灰色'
      },
      {
        backgroundColor: '#E6E6FA',
        name: '熏衣草花的淡紫色'
      },
      {
        backgroundColor: '#F8F8FF',
        name: '幽灵的白色'
      },
      {
        backgroundColor: '#0000FF',
        name: '纯蓝'
      },
      {
        backgroundColor: '#0000CD',
        name: '适中的蓝色'
      },
      {
        backgroundColor: '#191970',
        name: '午夜的蓝色'
      },
      {
        backgroundColor: '#00008B',
        name: '深蓝色'
      },
      {
        backgroundColor: '#000080',
        name: '海军蓝'
      },
      {
        backgroundColor: '#4169E1',
        name: '皇军蓝'
      },
      {
        backgroundColor: '#6495ED',
        name: '矢车菊的蓝色'
      },
      {
        backgroundColor: '#B0C4DE',
        name: '淡钢蓝'
      },
      {
        backgroundColor: '#778899',
        name: '浅石板灰'
      },
      {
        backgroundColor: '#708090',
        name: '石板灰'
      },
      {
        backgroundColor: '#1E90FF',
        name: '道奇蓝'
      },
      {
        backgroundColor: '#F0F8FF',
        name: '爱丽丝蓝'
      },
      {
        backgroundColor: '#4682B4',
        name: '钢蓝'
      },
      {
        backgroundColor: '#87CEFA',
        name: '淡蓝色'
      },
      {
        backgroundColor: '#87CEEB',
        name: '天蓝色'
      },
      {
        backgroundColor: '#00BFFF',
        name: '深天蓝'
      },
      {
        backgroundColor: '#ADD8E6',
        name: '淡蓝'
      },
      {
        backgroundColor: '#B0E0E6',
        name: '火药蓝'
      },
      {
        backgroundColor: '#5F9EA0',
        name: '军校蓝'
      }
    ],
    backgroundColorArrayIndex: 0,
    _windowWidth: wx.getSystemInfoSync().windowWidth,
    createdImg: ''
  },
  onLoad: function (options) {
		COMMONFN.checkIsLogin();
    console.log('_options__', options);
    let that = this;
    wx.showLoading({
      title: '加载中'
    })
		this.setData({
			id: options.id,
			avatarUrl: wx.getStorageSync('storageLoginedavAtarUrl'),
			sessionkey: wx.getStorageSync('storageSessionkey'),
			rnd: wx.getStorageSync('storageRnd'),
			nickname: wx.getStorageSync('storageLoginedNickName'),
			userid: wx.getStorageSync('storageLoginedUserId'),
			globalTitle: getApp().globalData.globalTitle
		});
    this.getContent(options.id);
		// 获取用户积分
		if (this.data.userid !== ''){
			this.getUserFen();
		}
  },
	onShow:function(){
		console.log('this.getUserFen();--onshow');
		if (this.data.userid !== '') {
			this.getUserFen();
		}
	},
	showVideoAd:function(){
		let that = this ;
		let videoAd = wx.createRewardedVideoAd({
			adUnitId: 'adunit-3c1d326d0ef1cf22'
		});
		videoAd.load()
			.then(() => {
				videoAd.show();
				isAdFlag = false;
			})
			.catch(err => {
				console.log('err.errMsgerr.errMsg---', err.errCode);
				if (err.errCode == 1004){
					isAdFlag = true;
				}
			})
			videoAd.onClose(res => {
			// 用户点击了【关闭广告】按钮
			// 小于 2.1.0 的基础库版本，res 是一个 undefined
			if (res && res.isEnded || res === undefined) {
				console.log('正常播放结束，可以下发游戏奖励');
				that.upUsefen();
				// 正常播放结束，可以下发游戏奖励
			} else {
				console.log('播放中途退出，不下发游戏奖励');
				// 播放中途退出，不下发游戏奖励
			}
		})
	},
	upUsefen:function(){
		console.log('https://www.yishuzi.com.cn/e/api/creat/get.php?getJson=upUsefen&userid=' + this.data.userid + '&token=' + getApp().globalData.token);
		let that = this;
		wx.request({
			url: 'https://www.yishuzi.com.cn/e/api/creat/get.php?getJson=upUsefen&userid=' + this.data.userid + '&token=' + getApp().globalData.token,
			method: 'GET',
			dataType: 'json',
			success: (json) => {
				console.log('__json__', json.data.result)
				wx.showModal({
					content: '恭喜您获得了5积分',
					cancelText: '返回我的',
					cancelColor: '#00b894',
					confirmText: '确定',
					confirmColor: '#e17055',
					success: function (res) {
						if (res.cancel) {
							console.log('cancel');
							wx.switchTab({
								url: '../my/index/index'
							})
						} else {
							console.log('ok');
							wx.redirectTo({
								url: '../creat/creat?id=' + that.data.id
							})
						}
					}
				});
				wx.hideLoading()
			}
		})
	},
	titleBindblur: function (e) {
		getApp().globalData.globalTitle = e.detail.value;
	},
  getContent: function (id) {
    console.log('https://www.yishuzi.com.cn/e/api/creat/get.php?getJson=content&id=' + id + '&token=' + getApp().globalData.token)
    wx.request({
      url: 'https://www.yishuzi.com.cn/e/api/creat/get.php?getJson=content&id=' + id + '&token=' + getApp().globalData.token,
      method: 'GET',
      dataType: 'json',
      success: (json) => {
        console.log('__json__', json.data.result.title)
        this.setData({
          contentArray: json.data.result
        })
        let that = this
        that.setData({
          title: json.data.result.title
        })
        wx.setNavigationBarTitle({
          title: json.data.result.title
        })
        wx.hideLoading()
      }
    })
  },
	getUserFen:function(){
		console.log('https://www.yishuzi.com.cn/e/api/creat/get.php?getJson=info&userid=' + this.data.userid + '&token=' + getApp().globalData.token)
		wx.request({
			url: 'https://www.yishuzi.com.cn/e/api/creat/get.php?getJson=info&userid=' + this.data.userid + '&token=' + getApp().globalData.token,
			method: 'GET',
			dataType: 'json',
			success: (json) => {
				console.log('__jsinfoArrayinfoArrayon__', json.data.result)
				this.setData({
					infoArray: json.data.result[0]
				});
				console.log('infoArrayinfoArray--', this.data.infoArray.userfen);
				wx.hideLoading()
			}
		})
	},
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e);
		let that = this;
		console.log('...isAdFlag...', isAdFlag);
    if (e.detail.value.text == '') {
      wx.showModal({
        content: '请输入您的文字',
        showCancel: false,
        confirmColor: '#e17055'
      });
      return false
		} else if (isAdFlag){
			console.log('isAdFlag==true,不需要积分');
			that.toCreate(e,0);
		}else if (this.data.infoArray.userfen < 1) {
			wx.showModal({
				title: '您的积分不足',
				content: '点击【获取积分】观看视频完毕后即可获得5积分哦',
				showCancel: false,
				confirmText: '获取积分',
				confirmColor: '#e17055',
				success: function (res) {
					if (res.cancel) {
						console.log('cancel');
					} else {
						console.log('ok');
						that.showVideoAd();
					}
				}
			});
		}else{
			wx.showModal({
				title: '将扣除1积分,确定吗？',
				content: '点击【获取积分】观看视频完毕后即可获得5积分哦',
				cancelText: '获取积分',
				cancelColor: '#00b894',
				confirmText: '继续生成',
				confirmColor: '#e17055',
				success: function (res) {
					if (res.cancel) {
						console.log('cancel');
						that.showVideoAd();
					} else {
						console.log('ok');
						if (that.data.infoArray.userfen >= 1){
							that.toCreate(e,1);
						} else if (that.data.infoArray.userfen < 1){
							wx.showModal({
								title: '您的积分不足',
								content: '点击【获取积分】观看视频完毕后即可获得5积分哦',
								showCancel: false,
								confirmText: '获取积分',
								confirmColor: '#e17055',
								success: function (res) {
									if (res.cancel) {
										console.log('cancel');
									} else {
										console.log('ok');
										that.showVideoAd();
									}
								}
							});
						}
					}
				}
			})
		}
  },
  loginout: function () {
		wx.redirectTo({
			url: '/pages/loginout/loginout',
		})
	},
	toCreate:function(e,n){
		console.log('....toCreate.....');
		let that = this;
		console.log('nnnnnn', n);
		let _url;
		if (n == 0) {
			_url = 'https://www.yishuzi.com.cn/e/api/creat/yishuzi_shengcheng.php?n=0'
		} else {
			_url = 'https://www.yishuzi.com.cn/e/api/creat/yishuzi_shengcheng.php?n=1'
		};
		console.log('_url---', _url);
		wx.request({
			url: _url,
			data: {
				text: e.detail.value.text,
				userid: that.data.userid,
				fontSize: 50,
				width: 300,
				height: 150,
				fontColor: that.data.textColorArray[that.data.textColorArrayIndex].color,
				bgColor: that.data.backgroundColorArray[that.data.backgroundColorArrayIndex].backgroundColor,
				font: that.data.id,
				fontSize: e.detail.value['fontSize'],
				yishuziFrom: e.detail.value['yishuziFrom'],
				width: e.detail.value['width'],
				height: e.detail.value['height'],
				fontId: 50,
				token: getApp().globalData.token,
				// alpha: 100
			},
			header: { 'content-type': 'application/x-www-form-urlencoded' },
			method: 'POST',
			dataType: 'json',
			success: (json) => {
        console.log(json);
        if(json.data.result.status == 87014){
          wx.showModal({
            content: '因相关法律和要求，相关搜索结果不予展示',
            showCancel: false,
            confirmColor: '#e17055'
          });
          return false;
        }
				that.data.globalTitle = '';
				// console.log('../result/result?createdImg=' + json.data.result.path + '&width=' + e.detail.value['width'] + '&height=' + e.detail.value['height'])
				wx.navigateTo({
					url: '../result/result?createdImg=' + json.data.result.path + '&width=' + e.detail.value['width'] + '&height=' + e.detail.value['height']
				})
			}
		})
	},
  bindPickerTextColorChange: function (e) {
    console.log('textColorArray=发送选择改变，携带值为', e.detail.value)
    this.setData({
      textColorArrayIndex: e.detail.value
    })
  },
  bindPickerBackgroundColorChange: function (e) {
    console.log('backgroundColorArray=发送选择改变，携带值为', e.detail.value)
    this.setData({
      backgroundColorArrayIndex: e.detail.value
    })
  },
  bindReplaceInput: function (e) {
    console.log('eeeeee---', e)
    var value = e.detail.value
    var pos = e.detail.cursor
    if (pos != -1) {
      // 光标在中间
      var left = e.detail.value.slice(0, pos)
      // 计算光标的位置
      pos = left.replace(/11/g, '2').length
    }
  },
  onShareAppMessage: function (res) {
    return {
      title: this.data.title + '艺术字生成生成页面,@你来生成个自己的呗',
      success: (res) => {
        wx.showToast({
          content: '分享成功'
        })
      },
      fail: (res) => {
        wx.showToast({
          content: '分享失败,原因是' + res
        })
      }
    }
  }
})
