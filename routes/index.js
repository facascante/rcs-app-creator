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
        console.log(JSON.stringify(doc));

      };
      convertToJson(req.body);
      res.render('index', { title: 'Express' });
    }
  });
  return router;
}

