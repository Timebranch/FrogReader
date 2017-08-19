var id = location.href.split('id=').pop();
var screenWidth = $(window).width();
$.get('/ajax/book?id=' + id, function(d) {
    d.screenWidth = screenWidth;
    new Vue({
        el: '#app',
        data: d,
        methods: {
            getData: function() {
                location.href = '/reader';
            }
        }
    })
}, 'json');