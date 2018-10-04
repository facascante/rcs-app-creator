const PubSub = require('@google-cloud/pubsub');
const Datastore = require('@google-cloud/datastore');
let {google} = require('googleapis');
let rbm = require(__dirname + '/../rcsbusinessmessaging/v1');


module.exports = function(emitter){

  emitter._subscription = false;
  emitter._datastore = false;
  emitter._rbmApi = false;
  emitter._authClient = false;

  emitter.registerHook('init::pubsub',function(options,finish){
    
    if(!emitter._subscription){
      let pubsub = new PubSub({
        projectId: options.project_id,
        keyFilename: options.privateKeyFile,
      });
      const subscription = pubsub.subscription(options.subscriptionName);
      emitter._subscription = subscription;
    }

    finish(null,emitter._subscription);

  });

  emitter.registerHook('init::datastore',function(options,finish){
    
    if(!emitter._datastore){
      let datastore = new Datastore({
        projectId: options.project_id,
        keyFilename: options.privateKeyFile,
      });
      emitter._datastore = datastore;
    }
    
    finish(null,emitter._datastore);

  });

  emitter.registerHook('init::rbmapi',function(options,finish){
    
    if(!emitter._rbmApi){
      let authClient = new google.auth.JWT(
        options.client_email,
        null,
        options.private_key,
        options.scopes
      );

      let rbmApi = new rbm.rcsbusinessmessaging_v1.Rcsbusinessmessaging({}, google);

      authClient.authorize(function(err, tokens) {
        if (err) {
          finish(err);
        } else {
            console.log('Successfully connected!');
            emitter._rbmApi = rbmApi;
            emitter._authClient = authClient;
            finish(null,rbmApi);
        }
      });
    }
    else{
      finish(null,emitter._rbmApi);
    }

    

  });

};