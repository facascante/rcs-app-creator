var express = require('express');
var router = express.Router();

module.exports = function(emitter){
  router.all('/', function(req, res, next) {
    if(req.body.msisdn){
      console.log("3");
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
      res.render('index', { title: 'Express' });
    }
  });
  return router;
}

