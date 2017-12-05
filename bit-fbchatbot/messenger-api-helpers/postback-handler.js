const api = require('./api');
const sendAPI = require('./send');

const postbackHandler = {};

const addPostback = (postback, handler) => {
  postbackHandler[postback] = handler;
}

const getHandler = (postback) => {
  return postbackHandler[postback];
};

addPostback('./led', (recipientId) => {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message:{
      "attachment":{
        "type":"template",
        "payload":{
          "template_type":"button",
          "text":"LED 스위치",
          "buttons":[
            {
              "type":"postback",
              "title":"ON",
              "payload":"/led/on"
            },
            {
              "type":"postback",
              "title":"OFF",
              "payload":"/led/off"
            }
          ]
        }
      }
    }
  };
  api.callMessagesAPI(messageData)
});

addPostback('/led/on', (recipientId) => {
  sendAPI.sendTextMessage(recipientId, 'LED를 켭니다.')
});

addPostback('/led/off', (recipientId) => {
  sendAPI.sendTextMessage(recipientId, 'LED를 끕니다.')
});

addPostback('/addr', (recipientId) => {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      "attachment":{
        "type":"template",
        "payload":{
          "template_type":"button",
          "text":"검색 항목",
          "buttons":[
            {
              "type":"postback",
              "title":"동이름",
              "payload":"/addr/dong"
            },
            {
              "type":"postback",
              "title":"도로명",
              "payload":"/addr/road"
            },
            {
              "type":"postback",
              "title":"우편번호",
              "payload":"/addr/post"
            }
          ]
        }

      }
    }
  };
  api.callMessagesAPI(messageData);
});

addPostback('/addr/dong', (recipientId) => {
  sendAPI.sendTextMessage(recipientId, '동이름?');
});

addPostback('/addr/road', (recipientId) => {
  sendAPI.sendTextMessage(recipientId, '동이름?');
});

addPostback('/addr/post', (recipientId) => {
  sendAPI.sendTextMessage(recipientId, '동이름?');
});

addPostback('/calc', (recipientId) => {
  sendAPI.sendTextMessage(recipientId, '식을 입력하세요.\n 예) a + b');
});

module.exports = {
  getHandler
};
