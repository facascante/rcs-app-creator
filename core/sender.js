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

    var replaceUserInfo = function(user,str){
      var fields = str.match(/\[.*?\]/g);
      if(fields && fields.length){
        fields.forEach(function(field){
          var fieldname = field.replace("[","").replace("]","");
          console.log("chitosss",user,user[fieldname]);
          if(user[fieldname]){
            str = str.replace(field,user[fieldname]);
          }
        });
        console.log("str",str);
      }
      return str;
      
    };

    var sendMessage = function(){

      let contentMessage = {
        suggestions : []
      };    

      options.suggestions.forEach(function(element){

        if(element.type == "Image"){
          delete contentMessage.text;
          delete contentMessage.fileName;
          if(!contentMessage.richCard){
            contentMessage.richCard = {
              carouselCard :{
                cardWidth: 'MEDIUM',
                cardContents:[]
              }
            }
          }
          let imgObj = {
            media: {
              height: "TALL",
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
            ],
            title: element.title,
            description: element.description
          };
          contentMessage.richCard.carouselCard.cardContents.push(imgObj);
        }
        if(element.type == "Product"){
          delete contentMessage.text;
          delete contentMessage.fileName;
          if(!contentMessage.richCard){
            contentMessage.richCard = {
              carouselCard :{
                cardWidth: 'MEDIUM',
                cardContents:[]
              }
            }
          }
          let imgObj = {
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
                  text: "1 pc",
                  postbackData: element.id + "|1"
                }
              },
              {
                reply: {
                  text: "2 pcs",
                  postbackData: element.id + "|2"
                }
              },
              {
                reply: {
                  text: "3 pcs",
                  postbackData: element.id + "|3"
                }
              }
            ],
            title: element.price,
            description: element.description
          };
          contentMessage.richCard.carouselCard.cardContents.push(imgObj);
        }
        if(element.type == "Text"){
          var suggestion = {
            reply: {
                text: element.label,
                postbackData: element.id 
            }
          };
          contentMessage.suggestions.push(suggestion);
        }
        if(element.type == "User"){
          
        }
        if(element.type == "Action"){
          let suggestion = {
            action: {
                text: element.label,
                postbackData: element.id
            }
          };
          if(element.action == "Dial"){
            suggestion.action["dialAction"] = {
              phoneNumber: "+"+element.phone
            }
          }
          if(element.action == "View Location"){
            suggestion.action["viewLocationAction"] = {
              latLong: {
                latitude: element.latitude,
                longitude: element.longitude
              },
              label: element.label
            }
          }
          if(element.action == "Create Calendar"){
            suggestion.action["createCalendarEventAction"] = {
              startTime: element.start,
              endTime: element.end,
              title: element.label,
              description: element.description
            }
          }
          if(element.action == "Open URL"){
            suggestion.action["openUrlAction"] = {
              url: element.url
            }
          }
          contentMessage.suggestions.push(suggestion);
        }

      });

      
      emitter.invokeHook('userdata::set::search',
        {	
          msisdn: options.msisdn
        },
        function(_err,userdata){
          options.set_question = replaceUserInfo({address: "L6, #1 King St, Sydney 2000"},options.set_question);
          for(var i in userdata){
            console.log(userdata[i]);
            if(userdata[i]){
              if(isNaN(userdata[i]) && (userdata[i].indexOf("|") != -1)){
                  var splitcontent = userdata[i].split("|");
                if(splitcontent.length === 4){
                  userdata[i] = splitcontent[3] + " X "+ splitcontent[1] + " $" + splitcontent[2];
                }
              }
              else{
                userdata[i] = splitcontent;
              }

            }
            
          }

          if(userdata){
            options.set_question = replaceUserInfo(userdata,options.set_question);
          }
          console.log(options.set_question);
          if(!contentMessage.richCard){

            let messageId = randomstring.generate();
            contentMessage.text = options.set_question;
              let option = {
                contentMessage: contentMessage
              };
              console.log(JSON.stringify(option),"messageId",messageId);
        
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
          }
          else{
            let messageId = randomstring.generate();
          
            let option = {
              contentMessage: {
                text: options.set_question
              }
            };
      
            let params = {
              parent: 'phones/' + options.msisdn,
              messageId: messageId,
              auth: emitter._authClient,
              resource: option, 
            };
    
            emitter._rbmApi.phones.agentMessages.create(params, option, function(response) {
              console.log(response); 
              
              
              let messageId = randomstring.generate();
              let option = {
                contentMessage: contentMessage
              };
              console.log(JSON.stringify(option));
        
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
            });
          }
        }
      );


    }

    

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