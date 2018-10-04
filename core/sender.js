var config = require('config');

console.log(config.keyFilename,"chito");
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

  emitter.registerHook('rbm::message::send::phone',function(options,finish){

    var sendMessage = function(){
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
          sendMessage();
        }
      );
    }
    else{
      sendMessage();
    }

  });

};