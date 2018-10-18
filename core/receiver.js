var config = require('config');

module.exports = function(emitter){

  emitter.registerHook('pubsub::receive::message',function(options,finish){


    var getMessageBody = function(userEvent) {
      if (userEvent.text != undefined) {
          return userEvent.text;
      } else if (userEvent.suggestionResponse != undefined) {
          return userEvent.suggestionResponse.postbackData;
      }
  
      return false;
    };

    var handleMessage = function(userEvent){
      if (userEvent.senderPhoneNumber != undefined) {
        let msisdn = userEvent.senderPhoneNumber;
        let message = getMessageBody(userEvent);
        let messageId = userEvent.messageId;

        if (message) {
          console.log(message);
          emitter.invokeHook('rbm::message::send::read',
            {	
              messageId: messageId,
              msisdn: msisdn
            },
            function(_err,_subscription){
              console.log("send read...");
            }
          );

          var response = message;
          emitter.invokeHook('campaign::suggestion::response::search',
            {	
              suggestion_id: response
            },
            function(_err,suggestion){
              if(suggestion){
                emitter.invokeHook('campaign::set::search',
                  {	
                    set_name: suggestion.trigger
                  },
                  function(_err,suggestions){
                    
                    emitter.invokeHook('rbm::message::set::send',
                      {	
                        set_question: suggestions[0].set_question,
                        suggestions: suggestions,
                        msisdn: msisdn
                      },
                      function(_err,suggestions){
                        console.log("hope it works")
                      }
                    );
                  }
                );
              }
            }
          );

        }
      }
    };

    var messageHandler = function(message){

      let userEvent = JSON.parse(message.data);
      handleMessage(userEvent);
      message.ack();
      finish(null,null);
    };

    if(!emitter._authClient){
      emitter.invokeHook('init::pubsub',
        {	
          projectId: config.project_id,
          keyFilename: config.keyFilename,
          subscriptionName: config.subscriptionName
        },
        function(_err,_subscription){
          emitter._subscription.on('message',messageHandler);
        }
      );
    }
    else{
      emitter._subscription.on('message',messageHandler);
    }

  });


  emitter.invokeHook('pubsub::receive::message',
    {},
    function(_err,suggestions){
      console.log("hope it works receiving")
    }
  );

};