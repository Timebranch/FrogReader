$.get('/ajax/index', function(result) {
    //debugger;
    var screenWidth = $(window).width();
    if (screenWidth < 320) {
        screenWidth = 320;
    }
    var offset = $($('.Swipe-tab').find('a')[0]).offset();
    var iWidth = offset.width;
    var app = new Vue({
        el: '#app',
        data: {
            top: result.items[0].data.data,
            hot: result.items[1],
            recommend: result.items[2],
            female: result.items[3],
            male: result.items[4],
            free: result.items[5],
            bottom: result.items[6],
            tabPosition: 0,
            headerPosition: 0,
            tabDuration: 0.5,
            headerDuration: 0.5,
            tab1Class: 'Swipe-tab-active',
            tab2Class: '',
            screenWidth: screenWidth,
            iWidth: iWidth
        },
        methods: {
            tabChange: function(pos) {
                if (pos == 0) {
                    this.tabPosition = 0;
                    this.headerPosition = 0;
                    this.tab1Class = 'Swipe-tab-active';
                    this.tab2Class = '';
                } else {
                    this.tabPosition = this.iWidth;
                    this.headerPosition = -this.screenWidth;
                    this.tab1Class = '';
                    this.tab2Class = 'Swipe-tab-active';
                }
            }
        }
    });
}, 'json');