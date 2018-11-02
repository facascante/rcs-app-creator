var config = require('config');
const uuidv4 = require('uuid/v4');
var async = require("async");

module.exports = function(emitter){

  emitter.registerHook('campaign::create',function(options,finish){

    var executeFunction = function(){
    
      var campaign_id =  uuidv4();
      var sets = options.campaign.set;
      var docs = [];
      var set_ctr = 0;
      console.log(JSON.stringify(sets));
      for (var key in sets) {
        set_ctr++;
        var set_id = uuidv4();
        var suggestions = sets[key].suggestions;
        var set_title = sets[key].set_title;
        var set_question = sets[key].set_question;
        var set_name = key;
        console.log("set_name",set_name);
        for (var skey in suggestions) {
          var id = uuidv4();
          const suggestionKey = emitter._datastore.key(['Suggestions', id]);
          const suggestion = {
            key: suggestionKey,
              data: {
                id: id,
                campaign_id: campaign_id,
                set_title: set_title,
                set_question: set_question,
                set_order: set_ctr,
                set_id:set_id,
                type: suggestions[skey].type,
                trigger: suggestions[skey].trigger,
                set_name: set_name,
                label: suggestions[skey].label,
                action: suggestions[skey].action,
                userinfo: suggestions[skey].userinfo,
                latitude: suggestions[skey].latitude,
                longitude: suggestions[skey].longitude,
                phone: suggestions[skey].phone,
                query: suggestions[skey].query,
                start: suggestions[skey].start,
                end: suggestions[skey].end,
                description: suggestions[skey].description,
                title: suggestions[skey].title,
                price: suggestions[skey].price,
                url: suggestions[skey].url,
                fileUrl: suggestions[skey].fileUrl,
                thumbnailUrl: suggestions[skey].thumbnailUrl
              }
            };
            docs.push(suggestion);
        }
      }
      console.log("docs",docs);
      async.each(docs, function(item,cb){
        emitter._datastore
        .save(item)
        .then( results => {
          cb(null,results);
        })
        .catch(err => {
          cb(err);
        }); 

      }, function(err,results){
        finish(err,results);
      });   
    };

    if(!emitter._authClient){
      emitter.invokeHook('init::datastore',
        {	
          projectId: config.project_id,
          keyFilename: config.keyFilename
        },
        function(_err,datastore){
          emitter._datastore = datastore;
          executeFunction();
        }
      );
    }
    else{
      executeFunction();
    }

  });

  emitter.registerHook('userdata::create',function(options,finish){

    var executeFunction = function(){

      emitter.invokeHook('userdata::set::search',
        {	
          msisdn: options.msisdn
        },
        function(_err,dbuserdata){
          var id = options.msisdn;
          const userdataKey = emitter._datastore.key(['UserData', id]);
          let userdata = {
            key: userdataKey,
            data: {
              id: id,
              total:0
            }
          };
          if(dbuserdata){
            userdata.data = dbuserdata
          }

          var suggestion = options.suggestion;
          userdata.data[suggestion.set_title] = suggestion.label + '|' + suggestion.description + '|' + suggestion.price + '|' + options.quantity;
          if(options.quantity && suggestion.price){
            userdata.data.total+= (suggestion.price * Number(options.quantity));
          }
          else if(suggestion.price){
            userdata.data.total+=suggestion.price;
          }
          console.log(userdata);
          emitter._datastore
          .save(userdata)
          .then( results => {
            finish(null,results);
          })
          .catch(err => {
            finish(err);
          });
          
      });
    };

    if(!emitter._authClient){
      emitter.invokeHook('init::datastore',
        {	
          projectId: config.project_id,
          keyFilename: config.keyFilename
        },
        function(_err,datastore){
          emitter._datastore = datastore;
          executeFunction();
        }
      );
    }
    else{
      executeFunction();
    }


  });


  emitter.registerHook('campaign::suggestion::response::search',function(options,finish){

    var executeFunction = function(){
      var suggestion_id  = options.suggestion_id;

      const query = emitter._datastore
        .createQuery('Suggestions')
        .filter('id', '=', suggestion_id);

        emitter._datastore.runQuery(query).then((results) => {
          let matchingSuggestion = results[0];

          if (matchingSuggestion.length > 0) {
              console.log("matchingSuggestion".matchingSuggestion);
              finish(null,matchingSuggestion[0]);
          } else {
            finish("suggestion not found: " + suggestion_id);
          }
      });
    };

      if(!emitter._authClient){
        emitter.invokeHook('init::datastore',
          {	
            projectId: config.project_id,
            keyFilename: config.keyFilename
          },
          function(_err,datastore){
            executeFunction();
          }
        );
      }
      else{
        executeFunction();
      }


  });

  emitter.registerHook('campaign::set::search',function(options,finish){

    var executeFunction = function(){
      var set_name  = options.set_name;

      const query = emitter._datastore
        .createQuery('Suggestions')
        .filter('set_name', '=', set_name);

        emitter._datastore.runQuery(query).then((results) => {
          console.log("results".results);
          let matchingSuggestions = results[0];

          if (matchingSuggestions.length > 0) {
              console.log("matchingSuggestions".matchingSuggestions);
              finish(null,matchingSuggestions);
          } else {
            finish("set not found: " + set_name);
          }
      });
    };

      if(!emitter._authClient){
        emitter.invokeHook('init::datastore',
          {	
            projectId: config.project_id,
            keyFilename: config.keyFilename
          },
          function(_err,_datastore){
            executeFunction();
          }
        );
      }
      else{
        executeFunction();
      }


  });
  emitter.registerHook('userdata::set::search',function(options,finish){

    var executeFunction = function(){
      var msisdn  = options.msisdn;

      const query = emitter._datastore
        .createQuery('UserData')
        .filter('id', '=', msisdn);

        emitter._datastore.runQuery(query).then((results) => {
          console.log("results".results);
          let matchingUserData = results[0];

          if (matchingUserData.length > 0) {
              console.log("matchingUserData".matchingUserData);
              finish(null,matchingUserData[0]);
          } else {
            finish("msisdn not found: " + msisdn);
          }
      });
    };

      if(!emitter._authClient){
        emitter.invokeHook('init::datastore',
          {	
            projectId: config.project_id,
            keyFilename: config.keyFilename
          },
          function(_err,_datastore){
            executeFunction();
          }
        );
      }
      else{
        executeFunction();
      }


  });
};