const request = require('request');

const searchNewAddress = (type, searchWord) => {
    var uri = 'http://openapi.epost.go.kr/postal/retrieveNewAdressAreaCdService/retrieveNewAdressAreaCdService/getNewAddressListAreaCd';
    /* Service Key*/
    var queryString = '?ServiceKey=' + '%2BQaXEtzlm%2F6LA3ciEpdAT4r7ZNfrjupiJcgLvbiTE1%2BKSqwRd4lUUgVKb0H4VUBUXocKu%2F9S%2BPY%2FTD1A5AfxFg%3D%3D';

    /* dong : 동(읍/면)명 road :도로명[default] post : 우편번호 */
    queryString += '&searchSe=' + type;

    /* 검색어 */
    queryString += '&srchwrd=' + encodeURIComponent(searchWord);

    /* 페이지당 출력될 개수를 지정 */
    queryString += '&countPerPage=10';

    /* 출력될 페이지 번호 */
    queryString += '&currentPage=1';

    request({
        uri: uri + queryString,
    }, function (error, response, body) {
        console.log('=> Status', response.statusCode);
        console.log('=> Headers', JSON.stringify(response.headers));
        console.log('=> Reponse received', body);
    });
};

searchNewAddress('road','금화로82번길 17');

/*
module.exports = {
    searchNewAddress
};
*/

//
