const https = require('https');
const api_url = 'https://ecapi.pchome.com.tw/ecshop/prodapi/v2/prod/button&id=';
const api_para = '&fields=Seq,Id,Price,Qty,ButtonType,SaleStatus';
module.exports = {
    getPrice: function (sku, callback) {
        console.log("sku:" + sku);
        https.get(api_url + sku + api_para, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                var json = JSON.parse(data);
                callback && callback(json);
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });

    }
};