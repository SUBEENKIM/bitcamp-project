const sendAPI = require('./send');
const openAPI = require('../rest-api/openapi');
const messageHandler = require('./message-handler');
const postbackHandler = require('./postback-handler');

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

    var menu = global[senderID].menu;


    var handler = messageHandler.getHandler(messageText);

    if(handler){
      handler(senderID);
    }else if (menu){
      handler = messageHandler.getHandler(menu);
      handler(senderID, messageText);
    }else{
      sendAPI.sendTextMessage(senderID, '유효한 명령이 아닙니다.')
    }
  };

const handleReceivePostback = (event) => {

  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfPostback = event.timestamp;
  var payload = event.postback.payload;

  console.log("Received postback for user %d and page %d with payload '%s' " +
    "at %d", senderID, recipientID, payload, timeOfPostback);

  var handler = postbackHandler.getHandler(payload);

  if(handler){
    global[senderID].menu = payload;
    handler(senderID);
  }else{
    sendAPI.sendTextMessage(senderID,'유효한 명령이 아닙니다.');
  }

};



module.exports = {
  handleReceiveMessage,
  handleReceivePostback

};
