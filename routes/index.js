var express = require('express');
var router = express.Router();

module.exports = function(emitter){
  router.all('/', function(req, res, next) {
    if(req.body.msisdn){
      emitter.invokeHook('rbm::tester::invite::phone',
          {	
            msisdn: req.body.msisdn
          },
          function(_err,_response){    
            console.log(_err,_response);  
            res.render('index', { title: 'Express' });
          }
      );
    }
    else{
      var convertToJson = function(items){

        var doc = {set : {}};
        Object.keys(items).forEach(function(key) {
            
            var id = key.split(".");
            if(id[2]){
              if(!doc.set[id[0]]){
                doc.set[id[0]] = {suggestions:{}};
              }
              if(!doc.set[id[0]].suggestions[id[1]]){
                doc.set[id[0]].suggestions[id[1]] = {};
              }
              doc.set[id[0]].suggestions[id[1]][id[2]] = items[key];
            }
            else if(id[1]){
              if(!doc.set[id[0]]){
                doc.set[id[0]] = {suggestions:{}};
              }
              doc.set[id[0]][id[1]] = items[key];

            }
            else if(id[0]){
              doc[id[0]] = items[key];
            }


        });
        return doc;

      };
      if(JSON.stringify(req.body) != "{}"){
        var docs = convertToJson(req.body);
        emitter.invokeHook('campaign::create',
            {	
              campaign: docs
            },
            function(_err,content){

              var set = 0;
              Object.keys(docs.set).forEach(function(key) {
                if(set == 0){
                  set = key;
                }
              });
              
              emitter.invokeHook('campaign::set::search',
                {	
                  set_name: set
                },
                function(_err,suggestions){
                  console.log('campaign::set::search',set,suggestions);
                  if(suggestions.length){
                  emitter.invokeHook('rbm::message::set::send',
                    {	
                      set_question: suggestions[0].set_question,
                      suggestions: suggestions,
                      msisdn: "+61411449797"
                    },
                    function(_err,suggestions){
                      console.log("hope it works");
                      res.render('index');
                    }
                  );
                  }
                  else{
                    res.render('index');
                  }
                }
              );
              
        });
      }
      else{
        res.render('index');
      }
      
    }
  });
  return router;
}

