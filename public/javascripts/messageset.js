$(document).ready(function () {
   var tabCtr = 0;
   var mset = [];

    
    $( "#btnMessageSet" ).click(function() {
      tabCtr = mset.length;
      mset.push({suggestions:[]});

      var elAnchor = $('<a class="nav-link" id="v-pills-'+ tabCtr +'-tab" data-toggle="tab" href="#v-pills-'+ tabCtr +'" role="tab" aria-controls="v-pills-'+ tabCtr +'"><h3>[Title Goes Here]</h3><p>[Question Goes Here]</p></a>'); 
      var elTab = $('<div class="tab-pane" id="#v-pills-' + tabCtr + '" role="tabpanel" aria-labelledby="#v-pills-'+ tabCtr +'-tab">' +
            '<div class="form-group">' +
                '<label for="messageTitle">Title</label>' +
                '<input type="text" class="form-control title" id="mset['+tabCtr+'].title">' +
            '</div>' +
            '<div class="form-group">' +
                '<label for="messageQuestion">Question</label>' +
                '<input type="text" class="form-control question" id="mset['+tabCtr+'].question">' +
            '</div>' +
            '<div class="form-group">' +
                '<label for="messageQuestion">Options</label>' +
                '<hr/>' +
            '</div>' +
            '<div class="form-group col-auto suggestions">' +

            '</div>'+
            '<div class="form-group">' +
                '<button type="button" class="btn btn-primary btn-light mb-2 suggestion">Add suggestion</button>' +
            '</div>'+
        '</div>');

        var elTextSuggestion = $('<div class="col-3">' +
                '<input type="text" class="form-control" name="mset['+tabCtr+'].suggestions[].label">' +
                '<small class="form-text text-muted text-sm-center">Label</small>' +
                '</div>');

        var elActionSuggestion = $('<div class="col-3">' +
                '<input type="text" class="form-control" name="mset['+tabCtr+'].suggestions[].label">' +
                '<small class="form-text text-muted text-sm-center">Label</small>' +
                '</div>' +
                '<div class="col-3">' +
                '<select class="form-control action" name="mset['+tabCtr+'].suggestions[].action">' 
                + '<option value="Dial">Dial Number</option>' 
                + '<option value="View Location">View Location</option>' 
                + '<option value="Create Calendar">Create Calendar</option>' 
                + '<option value="Open URL">Open URL</option>' 
                + '</select><small class="form-text text-muted text-sm-center">Action</small></div>' +

                '</div>'
                
                );
        var elUserSuggestion = $('<div class="col-3">' +
                '<input type="text" class="form-control" name="mset['+tabCtr+'].suggestions[].label">' +
                '<small class="form-text text-muted text-sm-center">Label</small>' +
                '</div>' +
                '<div class="col-3">' +
                '<select class="form-control type" name="mset['+tabCtr+'].suggestions[].userinfo">' 
                + '<option value="Name">Name</option>' 
                + '<option value="Address">Address</option>' 
                + '<option value="Mobile">MobilePhone</option>'
                + '</select><small class="form-text text-muted text-sm-center">User Info</small></div>' +

                '</div>'
                
                );
        
        var elImageSuggestion = $('<div class="col-3">' +
                '<input type="text" class="form-control" name="mset['+tabCtr+'].suggestions[].name">' +
                '<small class="form-text text-muted text-sm-center">Name</small></div>' +
                '<div class="col-3">' +
                '<input type="text" class="form-control" name="mset['+tabCtr+'].suggestions[].description">' +
                '<small class="form-text text-muted text-sm-center">Description</small>' +
                '</div>' +
                '<div class="col-3">' +
                '<input type="text" class="form-control" name="mset['+tabCtr+'].suggestions[].fileUrl">' +
                '<small class="form-text text-muted text-sm-center">fileUrl</small></div>' +
                '<div class="col-3">' +
                '<input type="text" class="form-control" name="mset['+tabCtr+'].suggestions[].thumbnailUrl">' +
                '<small class="form-text text-muted text-sm-center">thumbnailUrl</small>' +
                '</div>'
                
                );
        
        var elSelectTrigger = $('<div class="col-3">'
        +'<select class="form-control trigger" name="mset['+tabCtr+'].suggestions[].trigger">'
        + '</select><small class="form-text text-muted text-sm-center">Trigger</small></div>');
        

        var elSelectSuggestion = $('<div class="col-1.5"><button type="button"class="btn delete"><i class="fas fa-trash"></i></button> <button type="button" class="btn move"><i class="fas fa-grip-vertical"></i></button></div><div class="col-3">'
        +'<select class="form-control type" name="mset['+tabCtr+'].suggestions[].type">'
        + '<option value="Text">Text Suggestion</option>' 
        + '<option value="Action">Action Suggestion</option>' 
        + '<option value="Image">Image Suggestion</option>' 
        + '<option value="User">User Profile Suggestion</option>' 
        + '</select><small class="form-text text-muted text-sm-center">Type</small></div>');

        var elDialAction = $('<div class="col-3">'
        +'<input type="text" class="form-control" name="mset['+tabCtr+'].suggestions[].phone">'
        +'<small class="form-text text-muted text-sm-center">Phone Number</small></div>');

        var elViewLocation = $('<div class="col-3">'
        +'<input type="text" class="form-control" name="mset['+tabCtr+'].suggestions[].LatLong">'
        +'<small class="form-text text-muted text-sm-center">LatLong</small></div>' + 
        '<div class="col-3">'
        +'<input type="text" class="form-control" name="mset['+tabCtr+'].suggestions[].Query">'
        +'<small class="form-text text-muted text-sm-center">Query</small></div>');

        var elCalendarEvent = $('<div class="col-3">'
        +'<input type="text" class="form-control" name="mset['+tabCtr+'].suggestions[].startTime">'
        +'<small class="form-text text-muted text-sm-center">Start Time</small></div>' + 
        '<div class="col-3">'
        +'<input type="text" class="form-control" name="mset['+tabCtr+'].suggestions[].endTime">'
        +'<small class="form-text text-muted text-sm-center">End Time</small></div>' +
        '<div class="col-3">'
        +'<input type="text" class="form-control" name="mset['+tabCtr+'].suggestions[].description">'
        +'<small class="form-text text-muted text-sm-center">Description</small></div>');

        var elOpenURLAction = $('<div class="col-3">'
        +'<input type="text" class="form-control" name="mset['+tabCtr+'].suggestions[].url">'
        +'<small class="form-text text-muted text-sm-center">URL</small></div>');


        elSelectSuggestion.find("button.delete").on('click',function(){
            $(this).parent().parent().remove();
        });

        elActionSuggestion.find("select").on('change', function(){
            var elTTab = $(this).parent().parent().html("");
            elTTab.append(elSelectSuggestion.clone(true,true));
            elTTab.append(elSelectTrigger.clone(true,true));
            elTTab.append(elActionSuggestion.clone(true,true)); 
            elTTab.find("select").val("Action");
            elTTab.find("select.action").val($(this).val());
            switch($(this).val()){
                case 'Dial' :
                    elTTab.append(elDialAction.clone(true,true));
                    break;
                case 'View Location' :
                    elTTab.append(elViewLocation.clone(true,true));
                    break;
                case 'Create Calendar' :
                    elTTab.append(elCalendarEvent.clone(true,true));
                    break;
                case 'Open URL' :
                    elTTab.append(elOpenURLAction.clone(true,true));
                    break;
            }
            updateTrigger();
        });

        elSelectSuggestion.find("select").on('change', function(){
            var elTTab = $(this).parent().parent().html("");
            switch($(this).val()){
                case 'Text' : 
                elTTab.append(elSelectSuggestion.clone(true,true));
                elTTab.append(elSelectTrigger.clone(true,true));
                elTTab.append(elTextSuggestion.clone(true,true));         
                    break;
                case 'Action' : 
                elSelectSuggestion.find("select").val($(this).val());
                elTTab.append(elSelectSuggestion.clone(true,true));
                elTTab.append(elSelectTrigger.clone(true,true));
                elTTab.append(elActionSuggestion.clone(true,true));        
                    break;
                case 'Image' : 
                elSelectSuggestion.find("select").val($(this).val());
                elTTab.append(elSelectSuggestion.clone(true,true));
                elTTab.append(elSelectTrigger.clone(true,true));
                elTTab.append(elImageSuggestion.clone(true,true));
                
                    break;
                case 'User' : 
                elSelectSuggestion.find("select").val($(this).val());
                elTTab.append(elSelectSuggestion.clone(true,true));
                elTTab.append(elSelectTrigger.clone(true,true));
                elTTab.append(elUserSuggestion.clone(true,true));
                    break;
            }
            elTTab.find("select").val($(this).val());
            updateTrigger();
            
        });

      $("#v-pills-tab").append( elAnchor );
      $("#v-pills-tabContent").append( elTab );
      elAnchor.on('click', function(){
        elTab.parent().find( "div.tab-pane" ).hide();
        elTab.show();
      });

      elTab.find( "input.title" ).on('change', function(){
        elAnchor.find("h3").html($(this).val());
        updateTrigger();
      });
      elTab.find( "input.question" ).on('change', function(){
        elAnchor.find("p").html($(this).val());
      });
      elTab.find( "button.suggestion" ).on('click', function(){
         mset[tabCtr].suggestions.push({});
          
          var elRows = $('<div class="form-row align-items-center mx-sm-3 mb-1" style="padding:15px; border-bottom: 1px solid gray;"></div>');
          elRows.append(elSelectSuggestion.clone(true,true));
          elRows.append(elSelectTrigger.clone(true,true));
          elRows.append(elTextSuggestion.clone(true,true));
         
          elTab.find( "div.suggestions" ).append(elRows);
          updateTrigger();
      });

      var updateTrigger = function(){
        $("#v-pills-tabContent").find("select.trigger").html("");
        $( "a.nav-link > h3" ).each(function( index ) {
            $("#v-pills-tabContent").find("select.trigger").append("<option>" + $(this).html()+ "</option");
        });
      };
      updateTrigger();
      
      


    });
});