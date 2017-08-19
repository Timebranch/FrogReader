var fs = require('fs');
exports.get_search_data = function(start, end, keyword) {


    return function(cb) {
        var http = require('http');
        var qs = require('querystring');
        var data = {
            s: keyword,
            start: start,
            end: end
        };
        var content = qs.stringify(data);
        var http_request = {
            hostname: 'dushu.xiaomi.com',
            port: 80,
            path: '/store/v0/lib/query/onebox?' + content
        };
        var req_obj = http.request(http_request, function(_res) {
            var content = '';
            _res.setEncoding('utf8');
            _res.on('data', function(chunk) {
                content += chunk;
            });
            _res.on('end', function() {
                cb(null, content);
            });
        });
        req_obj.on('error', function() {});
        req_obj.end();
    }
};

exports.get_index_data = function() {
    return new Promise(function(resolve, reject) {
        fs.readFile('./mock/home.json', 'utf-8', function(err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
};
exports.get_rank_data = function() {
    return new Promise(function(resolve, reject) {
        fs.readFile('./mock/rank.json', 'utf-8', function(err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
};

exports.get_category_data = function() {
    return new Promise(function(resolve, reject) {
        fs.readFile('./mock/category.json', 'utf-8', function(err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
};

exports.get_bookbacket_data = function() {
    return new Promise(function(resolve, reject) {
        fs.readFile('./mock/bookbacket.json', 'utf-8', function(err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
};

exports.get_female_data = function() {
    return new Promise(function(resolve, reject) {
        fs.readFile('./mock/channel/female.json', 'utf-8', function(err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
};

exports.get_male_data = function() {
    return new Promise(function(resolve, reject) {
        fs.readFile('./mock/channel/male.json', 'utf-8', function(err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
};

exports.get_book_data = function(id) {
    if (!id) {
        id = "18218";
    }
    return new Promise(function(resolve, reject) {
        fs.readFile('./mock/book/' + id + '.json', 'utf-8', function(err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
};

exports.get_chapter_data = function() {
    return new Promise(function(resolve, reject) {
        fs.readFile('./mock/reader/chapter.json', 'utf-8', function(err, d) {
            if (err) {
                reject(err);
            }
            resolve(d);
        });
    })
};

exports.get_data_data = function(page) {
    return new Promise(function(resolve, reject) {
        fs.readFile('./mock/reader/data/data' + page + '.json', 'utf-8', function(err, d) {
            if (err) {
                reject(err);
            }
            resolve(d);
        });
    });
};