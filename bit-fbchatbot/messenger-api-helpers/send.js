

const api = require('./api')

const sendMenuMessage = (recipientId) => {
    var messageData = {
      recipient: {
        id: recipientId
      },
      message: {
        "attachment":{
          "type":"template",
          "payload":{
            "template_type":"button",
            "text":"메뉴",
            "buttons":[
              {
                "type":"postback",
                "title":"LED",
                "payload":"menu_led"
              },
              {
                "type":"postback",
                "title":"계산기",
                "payload":"menu_calc"
              },
              {
                "type":"postback",
                "title":"주소검색",
                "payload":"menu_addr"
              }
            ]
          }
        }
      }
    };

    api.callMessagesAPI(messageData);
};


const sendAddressSearchMessage = (recipientId) => {
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
                "payload":"addr_dong"
              },
              {
                "type":"postback",
                "title":"도로명",
                "payload":"addr_road"
              },
              {
                "type":"postback",
                "title":"우편 번호",
                "payload":"addr_post"
              }
            ]
          }
        }
      }
    };

    api.callMessagesAPI(messageData);
};

const sendTextMessage = (recipientId, messageText) => {
    var messageData = {
      recipient: {
        id: recipientId
      },
      message: {
        text: messageText
      }
    };

    api.callMessagesAPI(messageData);
};

const sendImageMessage = (recipientId) => {
    var messageData = {
      recipient: {
        id: recipientId
      },
      message: {
        "attachment":{
          "type":"image",
          "payload":{
          "url":"http://ppss.kr/wp-content/uploads/2016/04/%ED%8A%B8%EB%9F%BC%ED%94%8401-549x411.jpg",
          "is_reusable":true
          }
        }
      }
    };

    api.callMessagesAPI(messageData);
};

const sendButton1Message = (recipientId) => {
    var messageData = {
      recipient: {
        id: recipientId
      },
      message: {
        "attachment":{
          "type":"template",
          "payload":{
            "template_type":"button",
            "text":"What do you want to do next?",
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.google.com",
                "title":"구글"
              },
              {
                "type":"web_url",
                "url":"https://www.bing.com",
                "title":"빙"
              },
              {
                "type":"web_url",
                "url":"https://www.naver.com",
                "title":"네이버"
              }
            ]
          }
        }
      }
    };

    api.callMessagesAPI(messageData);
};

const sendLedMessage = (recipientId) => {
    var messageData = {
      recipient: {
        id: recipientId
      },
      message: {
        "attachment":{
          "type":"template",
          "payload":{
            "template_type":"button",
            "text":"LED 동작 제어",
            "buttons":[
              {
                "type":"postback",
                "title":"ON",
                "payload":"led_on"
              },
              {
                "type":"postback",
                "title":"OFF",
                "payload":"led_off"
              }
            ]
          }
        }
      }
    };

    api.callMessagesAPI(messageData);
};

const sendButton2Message = (recipientId) => {
    var messageData = {
      recipient: {
        id: recipientId
      },
      message: {
        "attachment":{
          "type":"template",
          "payload":{
            "template_type":"button",
            "text":"What do you want to do next?",
            "buttons":[
              {
                "type":"phone_number",
                "title":"Call Representative",
                "payload":"+821036749313"
              }
            ]
          }
        }
      }
    };

    api.callMessagesAPI(messageData);
};


const sendGenericMessage = (recipientId) => {
    var messageData = {
      recipient: {
        id: recipientId
      },
      message: {
        attachment: {
          type: "template",
          payload: {
            template_type: "generic",
            elements: [{
              title: "rift",
              subtitle: "Next-generation virtual reality",
              item_url: "https://www.oculus.com/en-us/rift/",
              image_url: "http://messengerdemo.parseapp.com/img/rift.png",
              buttons: [{
                type: "web_url",
                url: "https://www.oculus.com/en-us/rift/",
                title: "Open Web URL"
              }, {
                type: "postback",
                title: "Call Postback",
                payload: "Payload for first bubble",
              }],
            }, {
              title: "touch",
              subtitle: "Your Hands, Now in VR",
              item_url: "https://www.oculus.com/en-us/touch/",
              image_url: "http://messengerdemo.parseapp.com/img/touch.png",
              buttons: [{
                type: "web_url",
                url: "https://www.oculus.com/en-us/touch/",
                title: "Open Web URL"
              }, {
                type: "postback",
                title: "Call Postback",
                payload: "Payload for second bubble",
              }]
            }]
          }
        }
      }
    };

    api.callMessagesAPI(messageData);
};




module.exports = {
  sendMenuMessage,
  sendTextMessage,
  sendImageMessage,
  sendButton1Message,
  sendButton2Message,
  sendLedMessage,
  sendAddressSearchMessage,
  sendGenericMessage

};
