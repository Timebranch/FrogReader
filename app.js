var koa = require('koa');
var app = koa();
var controller = require('koa-route');
var qs = require('querystring');
//设置模板引擎
var views = require('co-views');
var render = views('./view', { //设置路径和要使用的模板引擎
    map: { html: 'ejs' }
});

var service = require('./service/service.js');

var koa_static = require('koa-static-server');
app.use(koa_static({
    rootDir: './static',
    rootPath: '/static',
    maxage: 0
}));

//首页
app.use(controller.get('/', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('index', {
        title: '书城首页'
    });
}));
//搜索页
app.use(controller.get('/search', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('search', {
        title: '搜索'
    });
}));
//女生页
app.use(controller.get('/female', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('female', {
        title: '女生频道',
        concern: '最受关注',
        recommend: '主编推荐',
        news: '新书入库',
        over: '完结好书'
    });
}));
//男生页
app.use(controller.get('/male', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('male', {
        title: '男生频道',
        concern: '最受关注',
        recommend: '主编推荐',
        news: '新书入库',
        over: '完结好书'
    });
}));
//排行页
app.use(controller.get('/rank', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('rank', {
        title: '书籍排行'
    });
}));
//种类页
app.use(controller.get('/category', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('category', {
        title: '分类',
        concern: '最受关注',
        recommend: '主编推荐',
        news: '新书入库',
        over: '完结好书'
    });
}));
//书籍详情页
app.use(controller.get('/book', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('book', {
        title: '书籍详情'
    });
}));
//阅读器页
app.use(controller.get('/reader', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('reader', {
        title: '内容阅读'
    });
}));

//为ajax请求做的路由如下
//获得搜索信息
app.use(controller.get('/ajax/search', function*() {
    var queryObj = qs.parse(this.req._parsedUrl.query);
    var keyword = queryObj.keyword;
    var start = queryObj.start;
    var end = queryObj.end;
    this.body = yield service.get_search_data(start, end, keyword);
}));
//获得首页信息
app.use(controller.get('/ajax/index', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield service.get_index_data();
}));
//获得排序信息
app.use(controller.get('/ajax/rank', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield service.get_rank_data();
}));
//种类信息
app.use(controller.get('/ajax/category', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield service.get_category_data();
}));
//获得女生信息
app.use(controller.get('/ajax/female', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield service.get_female_data();
}));
//获得男生信息
app.use(controller.get('/ajax/male', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield service.get_male_data();
}));
//获得book信息
app.use(controller.get('/ajax/book', function*() {
    var id = this.query.id;
    this.set('Cache-Control', 'no-cache');
    if (!id) {
        id = '';
    }
    //模拟数据
    id = '18218';
    this.body = yield service.get_book_data(id);
}));

//获得章节id
app.use(controller.get('/ajax/chapter', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield service.get_chapter_data();
}));
//获得章节信息
app.use(controller.get('/ajax/chapter/data', function*() {
    var pageId = this.query.page;
    this.body = yield service.get_data_data(pageId);
}));

//监听端口
app.listen(3008);
