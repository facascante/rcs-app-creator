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
         "1541126638025xvvx":{  
            "suggestions":{  
               "1541126664751":{  
                  "type":"Text",
                  "trigger":"1541126639455xvvx",
                  "label":"YES"
               },
               "1541126665152":{  
                  "type":"Text",
                  "trigger":"1541126639964xvvx",
                  "label":"NO"
               }
            },
            "set_title":"offer",
            "set_question":"Hi there. Offer for the day - Buy 2 large pizzas and get 50% off on the second one. Click to read Terms & Conditions Would you like to place an order?"
         },
         "1541126639455xvvx":{  
            "suggestions":{  
               "1541126742224":{  
                  "type":"Text",
                  "trigger":"1541126640489xvvx",
                  "label":"PICK UP"
               },
               "1541126742584":{  
                  "type":"Text",
                  "trigger":"1541126640489xvvx",
                  "label":"DELIVERY"
               }
            },
            "set_title":"yesOffer",
            "set_question":"Great! So would you like to pick up at our store or get it delivered to you?"
         },
         "1541126639964xvvx":{  
            "suggestions":{  
               "1541126721611":{  
                  "type":"Text",
                  "trigger":"1541126638025xvvx",
                  "label":"back"
               }
            },
            "set_title":"noOffer",
            "set_question":"Ok no worries. We will keep you posted on latest offers. Have a wonderful day!"
         },
         "1541126640489xvvx":{  
            "suggestions":{  
               "1541126814869":{  
                  "type":"Text",
                  "trigger":"1541126638025xvvx",
                  "label":"YES"
               },
               "1541126815349":{  
                  "type":"Text",
                  "trigger":"1541126638025xvvx",
                  "label":"UPDATE"
               },
               "1541126829575":{  
                  "type":"Text",
                  "trigger":"1541126638025xvvx",
                  "label":"BACK"
               }
            },
            "set_title":"confirmAddress",
            "set_question":"Your address as available with us is [address]. Is this where you want the pizza delivered?"
         },
         "1541126806015xvvx":{  
            "suggestions":{  
               "1541126854280":{  
                  "type":"Text",
                  "trigger":"1541126638025xvvx",
                  "label":"Back to Offer"
               }
            },
            "set_title":"updateAddress",
            "set_question":"Please visit http://www.pizzacentre.com to login and update the address. Once done, please reply again to our first message!"
         },
         "1541126863376xvvx":{  
            "suggestions":{  
               "1541126888640":{  
                  "type":"Product",
                  "trigger":"1541126967475xvvx",
                  "label":"Pepperoni",
                  "description":"Big Pepperoni",
                  "price":"10",
                  "fileUrl":"https://www.cicis.com/media/1138/pizza_trad_pepperoni.png",
                  "thumbnailUrl":"https://www.cicis.com/media/1138/pizza_trad_pepperoni.png"
               },
               "1541126889131":{  
                  "type":"Product",
                  "trigger":"1541126967475xvvx",
                  "label":"Cheese",
                  "description":"Big Cheese",
                  "price":"10",
                  "fileUrl":"https://www.cicis.com/media/1137/pizza_trad_alfredo.png",
                  "thumbnailUrl":"https://www.cicis.com/media/1137/pizza_trad_alfredo.png"
               }
            },
            "set_title":"pizzaFirstChoice",
            "set_question":"Please make your first choice!"
         },
         "1541126967475xvvx":{  
            "suggestions":{  
               "1541127006843":{  
                  "type":"Product",
                  "trigger":"1541127080734xvvx",
                  "label":"Meat Eater",
                  "description":"Big Meat Eater",
                  "price":"5",
                  "fileUrl":"https://www.cicis.com/media/1155/pizza_trad_meateater.png",
                  "thumbnailUrl":"https://www.cicis.com/media/1155/pizza_trad_meateater.png"
               },
               "1541127007458":{  
                  "type":"Product",
                  "trigger":"1541127080734xvvx",
                  "label":"Hawaiian",
                  "description":"Big Hawaiian",
                  "price":"5",
                  "fileUrl":"https://www.cicis.com/media/1140/pizza_adven_hampineapple.png",
                  "thumbnailUrl":"https://www.cicis.com/media/1140/pizza_adven_hampineapple.png"
               }
            },
            "set_title":"pizzaSecondChoice",
            "set_question":"Now please select your second pizza!"
         },
         "1541127080734xvvx":{  
            "suggestions":{  
               "1541127118912":{  
                  "type":"Text",
                  "trigger":"1541127083383xvvx",
                  "label":"SIDES"
               },
               "1541127119437":{  
                  "type":"Text",
                  "trigger":"1541127179866xvvx",
                  "label":"DRINKS"
               },
               "1541127120423":{  
                  "type":"Text",
                  "trigger":"1541127226175xvvx",
                  "label":"NO"
               },
               "1541127121201":{  
                  "type":"Text",
                  "trigger":"1541126863376xvvx",
                  "label":"BACK"
               }
            },
            "set_title":"additional",
            "set_question":"Would you like to add drinks or sides to your order?"
         },
         "1541127083383xvvx":{  
            "suggestions":{  
               "1541127158744":{  
                  "type":"Text",
                  "trigger":"1541127080734xvvx",
                  "label":"side 1"
               },
               "1541127159128":{  
                  "type":"Text",
                  "trigger":"1541127080734xvvx",
                  "label":"side 2"
               }
            },
            "set_title":"sides",
            "set_question":"Please choose your preferred Side!"
         },
         "1541127179866xvvx":{  
            "suggestions":{  
               "1541127197398":{  
                  "type":"Text",
                  "trigger":"1541127080734xvvx",
                  "label":"drink 1"
               },
               "1541127197778":{  
                  "type":"Text",
                  "trigger":"1541127080734xvvx",
                  "label":"drink 2"
               }
            },
            "set_title":"drinks",
            "set_question":"Please choose your preferred drink!"
         },
         "1541127226175xvvx":{  
            "suggestions":{  
               "1541127298197":{  
                  "type":"Text",
                  "trigger":"1541126638025xvvx",
                  "label":"CONFIRM"
               },
               "1541127300487":{  
                  "type":"Text",
                  "trigger":"1541126863376xvvx",
                  "label":"UPDATE"
               }
            },
            "set_title":"confirmOrder",
            "set_question":"Please review your order [pizzaFirstChoice] [pizzaSecondChoice] [sides] [drinks]"
         },
         "1541127377611xvvx":{  
            "suggestions":{  
               "1541127389016":{  
                  "type":"Text",
                  "trigger":"1541126638025xvvx",
                  "label":"thank you, back to offer"
               }
            },
            "set_title":"final",
            "set_question":"Thank you! You have successfully placed your order. It will be ready in approximately 30 minutes."
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

