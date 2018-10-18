var config = require('config');
const randomstring = require('randomstring');

module.exports = function(emitter){

  emitter.registerHook('rbm::tester::invite::phone',function(options,finish){

    var inviteTester = function(){
      let params = {parent: 'phones/' + options.msisdn, auth: emitter._authClient};
      try{
        emitter._rbmApi.phones.testers.create(params, {}, function(response) {
          console.log(response);
          finish(null,response);
        });
      }
      catch(e){
        console.log(e);
      }
    };

    if(!emitter._authClient){
      emitter.invokeHook('init::rbmapi',
        {	
          projectId: config.project_id,
          keyFilename: config.keyFilename,
          client_email: config.client_email,
          private_key: config.private_key,
          scopes: config.scopes
        },
        function(_err,_rbmApi){
          inviteTester();
        }
      );
    }
    else{
      inviteTester();
    }

  });

  emitter.registerHook('rbm::message::set::send',function(options,finish){

    var sendMessage = function() {

      let messageText = options.set_question;

      let suggestions = [];
      let contentMessage = {
        richCard: {
            carouselCard: {
                cardWidth: 'MEDIUM',
                cardContents:[]
            }
        }
     };
      options.suggestions.forEach(function(element){
        var suggestion;
        if(element.type == "Text"){
          var suggestion = {
            reply: {
                text: element.label,
                postbackData: element.id 
            }
          };
        }
        if(element.type == "Action"){
          var suggestion = {
            action: {
                text: element.label,
                postbackData: element.id
            }
          };
          if(suggestion.action == "Dial"){
            suggestion.action["dialAction"] = {
              phoneNumber: element.phone
            }
          }
          if(suggestion.action == "Dial"){
            suggestion.action["dialAction"] = {
              phoneNumber: element.phone
            }
          }
          if(suggestion.action == "View Location"){
            suggestion.action["viewLocationAction"] = {
              latLong: element.phone,
              label: element.label,
              query: element.query,
            }
          }
          if(suggestion.action == "Create Calendar"){
            suggestion.action["createCalendarEventAction"] = {
              startTime: element.start,
              endTime: element.end,
              title: element.label,
              description: element.description
            }
          }
          if(suggestion.action == "Open URL"){
            suggestion.action["openUrlAction"] = {
              url: element.url
            }
          }
        }
        if(element.type = "Image"){
          var imgObj = {
            media: {
              height: "MEDIUM",
              contentInfo: {
                  fileUrl: element.fileUrl ,
                  forceRefresh: false,
              },
            },
            suggestions: [
              {
                reply: {
                  text: element.label,
                  postbackData: element.id
                }
              }
            ]
          };
          contentMessage.richCard.carouselCard.cardContents.push(imgObj);
        }
        if(element.type = "User"){
          
        }
        suggestions.push(suggestion);
      });

      let messageId = randomstring.generate();

      let option = {
        contentMessage: {
            text: messageText,
            suggestions: suggestions
        },
      };

      let params = {
        parent: 'phones/' + options.msisdn,
        messageId: messageId,
        auth: emitter._authClient,
        resource: option, 
      };
      
      emitter._rbmApi.phones.agentMessages.create(params, option, function(response) {
        console.log(response);
        finish(null,response);
      });

    };

    if(!emitter._authClient){
      emitter.invokeHook('init::rbmapi',
        {	
          projectId: config.project_id,
          keyFilename: config.keyFilename,
          client_email: config.client_email,
          private_key: config.private_key,
          scopes: config.scopes
        },
        function(_err,_rbmApi){
          sendMessage();
        }
      );
    }
    else{
      sendMessage();
    }

  });

  emitter.registerHook('rbm::message::send::read',function(options,finish){

    var sendReadMessage_ = function() {

      let eventId = randomstring.generate();
  
      let option = {
          eventType: 'READ',
          messageId: options.messageId,
      };
  
      let params = {
          parent: 'phones/' + options.msisdn,
          eventId: eventId,
          auth: emitter._authClient,
          resource: option,
      };
  
      emitter._rbmApi.phones.agentEvents.create(params, option, function(response) {
        finish(null,response);
      });
    };

    if(!emitter._authClient){
      emitter.invokeHook('init::rbmapi',
        {	
          projectId: config.project_id,
          keyFilename: config.keyFilename,
          client_email: config.client_email,
          private_key: config.private_key,
          scopes: config.scopes
        },
        function(_err,_rbmApi){
          sendReadMessage_();
        }
      );
    }
    else{
      sendReadMessage_();
    }

  });

  emitter.registerHook('rbm::message::send::typing',function(options,finish){

    var sendIsTypingMessage_ = function() {

      let eventId = randomstring.generate();
  
      let option = {
          eventType: 'IS_TYPING',
      };
  
      let params = {
          parent: 'phones/' + options.msisdn,
          eventId: eventId,
          auth: emitter._authClient,
          resource: option,
      };
  
      emitter._rbmApi.phones.agentEvents.create(params, option, function(response) {
        finish(null,response);
      });
    };

    if(!emitter._authClient){
      emitter.invokeHook('init::rbmapi',
        {	
          projectId: config.project_id,
          keyFilename: config.keyFilename,
          client_email: config.client_email,
          private_key: config.private_key,
          scopes: config.scopes
        },
        function(_err,_rbmApi){
          sendIsTypingMessage_();
        }
      );
    }
    else{
      sendIsTypingMessage_();
    }

  });

};