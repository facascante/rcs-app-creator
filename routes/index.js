var express = require('express');
var router = express.Router();

module.exports = function(emitter){
  router.all('/force', function(req, res, next) {
    emitter.invokeHook('force::pubsub::receive::message',
          {	
            msisdn: req.query.msisdn,
            messageId: req.query.messageId,
            text: req.query.text
          },
          function(_err,_response){    
            console.log(_err,_response);  
            res.json('done');
          }
      );
  });

  router.all('/force/create', function(req, res, next) {
    var docs = {  
                "set":{  
                  "154111308390933":{  
                      "suggestions":{  
                        "1541113133092":{  
                            "type":"Text",
                            "trigger":"154111308596733",
                            "label":"YES"
                        },
                        "1541113133401":{  
                            "type":"Text",
                            "trigger":"154111308390933",
                            "label":"NO"
                        }
                      },
                      "set_title":"offer",
                      "set_question":"Hi there. Offer for the day - Buy 2 large pizzas and get 50% off on the second one. Click to read Terms & Conditions Would you like to place an order?"
                  },
                  "154111308596733":{  
                      "suggestions":{  
                        "1541113180533":{  
                            "type":"Text",
                            "trigger":"154111319130833",
                            "label":"PICK UP"
                        },
                        "1541113180883":{  
                            "type":"Text",
                            "trigger":"154111319130833",
                            "label":"DELIVER"
                        }
                      },
                      "set_title":"confirmdelivery",
                      "set_question":"Great! So would you like to pick up at our store or get it delivered to you?"
                  },
                  "154111319130833":{  
                      "suggestions":{  
                        "1541113256140":{  
                            "type":"Text",
                            "trigger":"154111327603333",
                            "label":"YES"
                        },
                        "1541113256745":{  
                            "type":"Text",
                            "trigger":"154111339865233",
                            "label":"UPDATE"
                        },
                        "1541113260549":{  
                            "type":"Text",
                            "trigger":"154111308390933",
                            "label":"BACK"
                        }
                      },
                      "set_title":"confirmaddress",
                      "set_question":"Your address as available with us is [address]. Is this where you want the pizza delivered?"
                  },
                  "154111327603333":{  
                      "suggestions":{  
                        "1541113299817":{  
                            "type":"Product",
                            "trigger":"154111330246333",
                            "label":"Hawaiian",
                            "description":"Big Hawaiian",
                            "price":"20",
                            "fileUrl":"https://www.cicis.com/media/1140/pizza_adven_hampineapple.png",
                            "thumbnailUrl":"https://www.cicis.com/media/1140/pizza_adven_hampineapple.png"
                        },
                        "1541113300264":{  
                            "type":"Product",
                            "trigger":"154111330246333",
                            "label":"Meat Eater",
                            "description":"Big Meat Eater",
                            "price":"20",
                            "fileUrl":"https://www.cicis.com/media/1155/pizza_trad_meateater.png",
                            "thumbnailUrl":"https://www.cicis.com/media/1155/pizza_trad_meateater.png"
                        }
                      },
                      "set_title":"pizza1",
                      "set_question":"Please make your first choice!"
                  },
                  "154111330246333":{  
                      "suggestions":{  
                        "1541113321097":{  
                            "type":"Product",
                            "trigger":"154111333411733",
                            "label":"Pepperoni",
                            "description":"Big Pepperoni",
                            "price":"10",
                            "fileUrl":"https://www.cicis.com/media/1138/pizza_trad_pepperoni.png",
                            "thumbnailUrl":"https://www.cicis.com/media/1138/pizza_trad_pepperoni.png"
                        },
                        "1541113321415":{  
                            "type":"Product",
                            "trigger":"154111333411733",
                            "label":"Cheese",
                            "description":"Big Cheese",
                            "price":"10",
                            "fileUrl":"https://www.cicis.com/media/1137/pizza_trad_alfredo.png",
                            "thumbnailUrl":"https://www.cicis.com/media/1137/pizza_trad_alfredo.png"
                        }
                      },
                      "set_title":"pizza2",
                      "set_question":"Now please select your second pizza!"
                  },
                  "154111333411733":{  
                      "suggestions":{  
                        "1541113376278":{  
                            "type":"Text",
                            "trigger":"154111339865233",
                            "label":"CONFIRM"
                        },
                        "1541113376611":{  
                            "type":"Text",
                            "trigger":"154111308390933",
                            "label":"UPDATE"
                        }
                      },
                      "set_title":"summary",
                      "set_question":"Please review your order [pizza1] [pizza2]"
                  },
                  "154111339865233":{  
                      "suggestions":{  
                        "1541113411605":{  
                            "type":"Text",
                            "trigger":"154111308390933",
                            "label":"bye"
                        },
                        "1541113411972":{  
                            "type":"Text",
                            "trigger":"154111308390933",
                            "label":"back"
                        }
                      },
                      "set_title":"final",
                      "set_question":"Great thank you"
                  }
                }
            };
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
                  if(suggestions && suggestions.length){
                    emitter.invokeHook('rbm::message::set::send',
                      {	
                        set_question: suggestions[0].set_question,
                        suggestions: suggestions,
                        msisdn: "+61444507129"
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
  });

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
        console.log("docs to keep",JSON.stringify(docs));
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
                  if(suggestions && suggestions.length){
                    emitter.invokeHook('rbm::message::set::send',
                      {	
                        set_question: suggestions[0].set_question,
                        suggestions: suggestions,
                        msisdn: "+61444507129"
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

