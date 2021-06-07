var config = require('./config');
var list = require('./trace.json');
var pc = require('./service.js');
const https = require('https');
const thingspeak_url = 'https://api.thingspeak.com/update?api_key=';
const lineNotify = require('./notify')('YOUR_LINE_NOTIFY_TOKEN');
var interval = 2000;
var promise = Promise.resolve();
list.forEach(function (item) {
    promise = promise.then(function () {
        console.log(item.title);
        pc.getPrice(item.sku, function (d) {
            var data = d[0];
            var url = 'https://24h.pchome.com.tw/prod/' + data.Id;
            if (data.SaleStatus == 0) {
                console.log(item.title + " 缺貨");
            } else {
                if (item.price == 0) {
                    //到貨通知
                } else if (data.Price.P <= item.price) {
                    //價格通知
                    var msg = '商品:' + item.title + '\n價格:' + data.Price.P + '\n剩餘數量:' + data.Qty + '\n網址:' + url;
                    lineNotify.notify({
                        message: msg,
                    }).then(() => {
                        console.log('notify completed!');
                    });
                }
                //紀錄價格
                if (item.thingspeak) {
                    https.get(thingspeak_url + config.thingspeak_KEY + '&' + item.thingspeak + '=' + data.Price.P);
                }
            }
        });
        return new Promise(function (resolve) {
            setTimeout(resolve, interval);
        });
    });
});

promise.then(function () {
    console.log('List finished.');
});
