$.get('/ajax/rank', function(d) {
    //debugger;
    for (var i = 0; i < d.items.length; i++) {
        d.items[i].description = d.items[i].description.split('\n');
    }
    new Vue({
        el: '#app',
        data: {
            rank: d.items
        }
    });
}, 'json');