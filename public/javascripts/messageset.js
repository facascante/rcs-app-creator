$(document).ready(function () {
   var tabCtr = 0;

    
    $( "#btnMessageSet" ).click(function() {
      tabCtr++;

      var elAnchor = $('<a class="nav-link" id="v-pills-'+ tabCtr +'-tab" data-toggle="tab" href="#v-pills-'+ tabCtr +'" role="tab" aria-controls="v-pills-'+ tabCtr +'"><h3>[Title Goes Here]</h3><p>[Question Goes Here]</p></a>'); 
      var elTab = $('<div class="tab-pane" id="#v-pills-' + tabCtr + '" role="tabpanel" aria-labelledby="#v-pills-'+ tabCtr +'-tab">' +
            '<div class="form-group">' +
                '<label for="messageTitle">Title'+tabCtr+'</label>' +
                '<input type="text" class="form-control title" id="messageTitle[]">' +
            '</div>' +
            '<div class="form-group">' +
                '<label for="messageQuestion">Question</label>' +
                '<input type="text" class="form-control question" id="messageQuestion[]">' +
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

        var elTextSuggestion = $('<div class="col-5">' +
                '<label>Name</label>' +
                '<input type="text" class="form-control" id="suggestion[]">' +
                '</div>');

        var elActionSuggestion = $('<div class="col-5">' +
                '<label>Name</label>' +
                '<input type="text" class="form-control" id="suggestion[]">' +
                '</div>' +
                '<div class="col-5">' +
                '<label>Action</label>' +
                '<select class="form-control type" name="actionType[]">' 
                + '<option value="Dial">Dial Number</option>' 
                + '<option value="View Location">View Location</option>' 
                + '<option value="Create Calendar">Create Calendar</option>' 
                + '<option value="Open URL">Open URL</option>' 
                + '<option value="Share Location URL">Share Location</option>' 
                + '<option value="Payment">Payment</option>' 
                + '</select></div>' +

                '</div>'
                
                );
        var elUserSuggestion = $('<div class="col-5">' +
                '<label>Name</label>' +
                '<input type="text" class="form-control" id="suggestion[]">' +
                '</div>' +
                '<div class="col-5">' +
                '<label>User Info</label>' +
                '<select class="form-control type" name="actionType[]">' 
                + '<option value="Name">Name</option>' 
                + '<option value="Address">Address</option>' 
                + '<option value="Mobile">MobilePhone</option>'
                + '</select></div>' +

                '</div>'
                
                );
        
        var elImageSuggestion = $('<div class="col-3">' +
                '<div class="col-12">' +
                '<img data-src="holder.js/200x200" class="img-thumbnail" alt="200x200" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1663d2e305c%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1663d2e305c%22%3E%3Crect%20width%3D%22200%22%20height%3D%22200%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2274.4296875%22%20y%3D%22104.65%22%3E200x200%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" data-holder-rendered="true" style="width: 200px; height: 200px;">' +
                '</div></div>' +
                '<div class="col-6"><div class="col-5">' +
                '<label>Name</label>' +
                '<input type="text" class="form-control" id="suggestion[]"></div>' +
                '<div class="col-12">' +
                '<label>Description</label>' +
                '<input type="text" class="form-control" id="description[]"></div>' +
                '</div></div>'
                
                );
        
        var elSelectTrigger = $('<div class="col-5">' +
        '<label>Trigger</label>' 
        +'<select class="form-control trigger" name="trigger[]">'
        + '</select></div>');
        

        var elSelectSuggestion = $('<div class="col-5"><label>Type</label>'
        +'<select class="form-control type" name="suggestionType[]">'
        + '<option value="Text">Text Suggestion</option>' 
        + '<option value="Action">Action Suggestion</option>' 
        + '<option value="Image">Image Suggestion</option>' 
        + '<option value="User">User Profile Suggestion</option>' 
        + '</select></div>');

        elSelectSuggestion.find("select").on('change', function(){
            console.log("chito");
            var elTTab = $(this).parent().parent().html("");
            switch($(this).val()){
                case 'Text' : 
                elTTab.append(elSelectSuggestion.clone(true,true));
                elTTab.append(elTextSuggestion.clone(true,true));
                elTTab.append(elSelectTrigger.clone(true,true));
                    break;
                case 'Action' : 
                elSelectSuggestion.find("select").val($(this).val());
                elTTab.append(elSelectSuggestion.clone(true,true));
                elTTab.append(elActionSuggestion.clone(true,true));
                elTTab.append(elSelectTrigger.clone(true,true));
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
                elTTab.append(elUserSuggestion.clone(true,true));
                elTTab.append(elSelectTrigger.clone(true,true));
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
          var elRows = $('<div class="form-row align-items-center mx-sm-3 mb-1"></div>');
          elRows.append(elSelectSuggestion.clone(true,true));
          elRows.append(elTextSuggestion.clone(true,true));
          elRows.append(elSelectTrigger.clone(true,true));
          
          elTab.find( "div.suggestions" ).append(elRows).append("<hr/>");
          ;
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