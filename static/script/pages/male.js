$.get('/ajax/male', function(d) {
    new Vue({
        el: '#app',
        data: {
            weclome: d.items[0].data.data,
            editer: d.items[1].data.data,
            newbooks: d.items[2].data.data,
            goodbooks: d.items[3].data.data
        }
    });
}, 'json');