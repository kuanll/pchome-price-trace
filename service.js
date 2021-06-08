const axios = require('axios');
const api_url = 'https://ecapi.pchome.com.tw/ecshop/prodapi/v2/prod/button&id=';
const api_para = '&fields=Seq,Id,Price,Qty,ButtonType,SaleStatus';
module.exports = {
    getPrice: function (sku, callback) {
        console.log("sku:" + sku);
        const options = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'cookie': 'ECC=GoogleBot',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36'
            },
        };

        axios.get(api_url + sku + api_para, options).then(function (response) {
            callback && callback(response.data);
        });
    }
};