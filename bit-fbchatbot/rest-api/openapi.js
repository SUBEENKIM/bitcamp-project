const request = require('request')


const searchNewAddress = (searchWord) => {
    request({
      uri: 'http://openapi.epost.go.kr/postal/retrieveNewAdressAreaCdService/retrieveNewAdressAreaCdService/getNewAddressListAreaCd',
      qs: {
        'ServiceKey' :'%2BQaXEtzlm%2F6LA3ciEpdAT4r7ZNfrjupiJcgLvbiTE1%2BKSqwRd4lUUgVKb0H4VUBUXocKu%2F9S%2BPY%2FTD1A5AfxFg%3D%3D',
        'searchSe' : 'dong',
        'srchwrd' : encodeURIComponent(searchWord),
        'countPerPage' : 10,
        'currentPage' : 1

      },
      method: 'GET',


    }, function (error, response, body) {
        console.log(' => Status', response.statusCode);
        console.log(' => Headers', JSON.stringify(response.headers));
        console.log(' => Reponse received', body);
    });
};
searchNewAddress('논곡동');
/*
module.exports = {
  searchNewAddress
};
*/
