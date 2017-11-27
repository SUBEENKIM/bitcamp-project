const sendAPI = require('./send');
const openAPI = require('../rest-api/openapi');

const handleReceiveMessage = (event) => {
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfMessage = event.timestamp;
    var message = event.message;

    console.log("Received message for user %d and page %d at %d with message:",
      senderID, recipientID, timeOfMessage);

    var messageId = message.mid;
    var messageText = message.text;
    var messageAttachments = message.attachments;

    //console.log('user ============>', global[senderID].user)

    var menu = global[senderID].menu;

    if(messageText == 'help'){

      sendAPI.sendMenuMessage(senderID);

      // 현재 help를 출력한 상태임을 저장한다.
      global[senderID].menu = 'help';

    }else if (menu == 'calc'){
      // 현재 계산기 메뉴일 때는 사용자가 입력한 값이
      // 계산식이라고 가정하고 메시지를 분석한다.

      menuCalc(senderID, messageText);

    }else if (menu.startsWith('addr_')){
      try{
        var type = menu.substring(5);
        var searchWord = messageText;

        openAPI.searchNewAddress(arr[0],arr[1], (msg) => {
          sendAPI.sendTextMessage(senderID, msg);
        });

      }catch (err) {
        sendAPI.sendTextMessage('주소 검색을 할 수 없습니다.');
        console.log(err);
      }
    }
    /*else if (messageText.startsWith('weather')){
      try{
        var arr = messageText.split(':')[1]
        openAPI.searchNewAddress(arr[0] (msg) => {
          sendAPI.sendTextMessage(senderID, msg);
        });

      }catch (err) {
        console.log(err)
      }


    }*/else{
      sendAPI.sendTextMessage(senderID,messageText);
    }

};

const handleReceivePostback = (event) => {

  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfPostback = event.timestamp;
  var payload = event.postback.payload;

  console.log("Received postback for user %d and page %d with payload '%s' " +
    "at %d", senderID, recipientID, payload, timeOfPostback);

    var menu = global[senderID].menu;
    if (menu == 'help'){
      menuHelp(senderID, payload);
    }else if(menu == 'led'){
      menuLed(senderID, payload);
    }else if(menu == 'calc'){
      menuCalc(senderID, payload);
    }else if(menu == 'addr'){
      menuAddr(senderID, payload);
    }

    /*
    if(payload =="led_on"){
      sendAPI.sendTextMessage(senderID, "전구를 켜겠습니다.");
    }else if(payload =="led_off"){
      sendAPI.sendTextMessage(senderID, "전구를 끄겠습니다.");
    }
    */

};

const menuHelp = (senderID, payload) => {
  if(payload == 'menu_led'){
    sendAPI.sendLedMessage(senderID);
    global[senderID].menu = 'led'; //이 사용자의 현재 메뉴는 'LED 스위치' 이다.
    //console.log('LED 메뉴를 눌렀네요!');
  }else if(payload == 'menu_calc'){
    sendAPI.sendTextMessage(senderID,'식을 입력하세요.\n 예)2 + 3');
    global[senderID].menu = 'calc'; // 이 사용자의 현재 메뉴는 '계산기' 이다.
    //console.log('계산기 메뉴를 눌렀네요!');
  }else if(payload == 'menu_addr'){
    sendAPI.sendAddressSearchMessage(senderID);
    global[senderID].menu = 'addr'; // 이 사용자의 현재 메뉴는 '주소검색' 이다.
    //console.log('주소검색 메뉴를 눌렀네요!');

  }
};

const menuLed = (senderID, payload) => {
  if(payload == 'led_on'){
    sendAPI.sendTextMessage(senderID, 'LED를 켭니다.')
    //나중에 스프링부트에 LED를 끄는 명령을 보낼 것이다.
  }else if (payload == 'led_off'){
    sendAPI.sendTextMessage(senderID, 'LED를 끕니다.')
    //나중에 스프링부트에 LED를 끄는 명령을 보낼 것이다.
  }
}

const menuCalc = (senderID, messageText) => {
  try{
    var tokens = messageText.split(' ');
    if(tokens.length != 3)
      throw '형식이 맞지 않습니다.'
    var a = parseInt(tokens[0]);
    var op = tokens[1];
    var b = parseInt(tokens[2]);
    var result = 0;

    switch (op) {
      case '+': result = a + b; break;
      case '-': result = a - b; break;
      case '*': result = a * b; break;
      case '/': result = a / b; break;
      case '%': result = a % b; break;
      default:
          sendAPI.sendTextMessage(senderID, '+, -, *, /, % 연산자만 사용할 수 있습니다. ')
          return;

    }
    sendAPI.sendTextMessage(senderID, '계산 결과는 '+ result + '입니다.')

  }catch(exception){
    sendAPI.sendTextMessage(senderID, '계산식 형식이 옳지 않습니다. \n예) a + b')
  }

}

const menuAddr = (senderID, payload) => {
  if(payload == 'addr_dong'){
    sendAPI.sendTextMessage(senderID, '동 이름?');
    global[senderID].menu = 'addr_dong'
  }else if(payload == 'addr_road'){
    sendAPI.sendTextMessage(senderID, '도로명?');
    global[senderID].menu = 'addr_road'
  }else if(payload == 'addr_post'){
    sendAPI.sendTextMessage(senderID, '우편번호?');
    global[senderID].menu = 'addr_post'
  }
}

module.exports = {
  handleReceiveMessage,
  handleReceivePostback

};
