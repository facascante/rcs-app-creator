var config = require('config');

module.exports = function(emitter){

  emitter.registerHook('force::pubsub::receive::message',function(options,finish){

    var getMessageBody = function(userEvent) {
      if (userEvent.text != undefined) {
          return userEvent.text;
      } else if (userEvent.suggestionResponse != undefined) {
          return userEvent.suggestionResponse.postbackData;
      }
  
      return false;
    };

    var handleMessage = function(userEvent){
      console.log(userEvent);
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

          var response = message.split("|");
          var quantity = response[1];
          console.log(response);
          emitter.invokeHook('campaign::suggestion::response::search',
            {	
              suggestion_id: response[0]
            },
            function(_err,suggestion){
              console.log(_err,suggestion);
              if(suggestion){

                emitter.invokeHook('userdata::create',
                      {	
                        suggestion: suggestion,
                        msisdn: msisdn,
                        quantity: quantity
                      },
                      function(_err,suggestions){
                        console.log("hope it save")
                      }
                );

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
                        console.log("hope it send")
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

    handleMessage({
      senderPhoneNumber: options.msisdn,
      messageId: options.messageId,
      text: options.text
    });

  });

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

          var response = message.split("|");
          var quantity = response[1];
          emitter.invokeHook('campaign::suggestion::response::search',
            {	
              suggestion_id: response[0]
            },
            function(_err,suggestion){
              if(suggestion){

                emitter.invokeHook('userdata::create',
                      {	
                        suggestion: suggestion,
                        msisdn: msisdn,
                        quantity: quantity
                      },
                      function(_err,suggestions){
                        console.log("hope it save")
                      }
                );

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
                        console.log("hope it send")
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