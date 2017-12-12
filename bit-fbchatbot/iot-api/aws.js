// AWT IoT의 Gateway에 메시지를 보내는 예제
// => 메시지를 보내는 것을 "발행(publish)"이라고 표현한다.

var awsIot = require('aws-iot-device-sdk');

// AWS 서버에 등록된 Things 정보를 바탕으로 장비를 준비시킨다.
var device = awsIot.device({

  //AWS 서버에 Thing을 생성한 후 만든 인증서의 개인키 파일
    keyPath:"../dev01.private.key",

  //AWS 서버에 Thing을 생성한 후 만든 인증서의 사물 인증서 파일
    certPath:"../dev01.cert.pem",

  //AWS 서버에 Thing을 생성한 후 만든 인증서를 검증해 줄 "인증서를 발행한 회사"의 인증서 파일
    caPath:"../root-CA.crt",

  // 다른 클라ㅏ이언트와 구분하기 위한 임의의 ID
    clientId:"client1",

  // AWS에 등록한 Thing을 가리키는 URL.
  // AWS IoT 사물 관리 페이지에서 "상호작용" 메뉴에서
  //HTTPS의 RestAPI를 요청할 때 사용할 Thing의 URL이다.
    host:"a1jawjb5359l39.iot.ap-northeast-2.amazonaws.com" // AWS

});
