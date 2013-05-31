/*
* Mootools Simple Modal
* Version 1.0
* Copyright (c) 2011 Marco Dell'Anna - http://www.plasm.it
*/
window.addEvent("domready", function(e){
  /* Alert */
  $("alert").addEvent("click", function(e){
    e.stop();
    var SM = new SimpleModal({"btn_ok":"Alert button"});
        SM.show({
          "title":"Alert Modal Title",
          "contents":"Lorem ipsum dolor sit amet..."
        });
  })
  
  /* Confirm */
  $("confirm").addEvent("click", function(e){
    e.stop();
    var SM = new SimpleModal({"btn_ok":"Confirm button"});
        SM.show({
          "model":"confirm",
          "callback": function(){
            alert("Action confirm!");
          },
          "title":"Confirm Modal Title",
          "contents":"Lorem ipsum dolor sit amet..."
        });
  })
  
  /* Modal */
  $("modal").addEvent("click", function(e){
    e.stop();
    var SM = new SimpleModal({"btn_ok":"Confirm button"});
        // Aggiunge Bottone Conferma
        SM.addButton("Confirm", "btn primary", function(){
            alert("Action confirm modal");
            this.hide();
        });
        // Aggiunge Bottone annulla
        SM.addButton("Cancel", "btn");
        SM.show({
          "model":"modal",
          "title":"Modal Window Title",
          "contents":"<p ><img style='text-align:center' src='assets/images/simpleModalSmallWhite.png' />Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>"
        });
  })
  
  /* Modal Ajax */
  $("modal-ajax").addEvent("click", function(e){
    e.stop();
    var SM = new SimpleModal({"btn_ok":"Confirm button", "width":600});
        // Aggiunge Bottone Conferma
        SM.addButton("Confirm", "btn primary", function(){
						// Check
						if( $("confirm-text").get("value") != "DELETE" ){
							$("confirm-delete-error").setStyle("display", "block");
						}else{
							// Your code ...
							this.hide();
						}
        });
        // Aggiunge Bottone annulla
        SM.addButton("Cancel", "btn");
        SM.show({
          "model":"modal-ajax",
          "title":"Are you sure you want to delete this?",
          "param":{
            "url":"ajax-content.html",
            "onRequestComplete": function(){ }
          }
        });
  })

  /* Modal Image */
  $("modal-image").addEvent("click", function(e){
    e.stop();
    var SM = new SimpleModal({
          "onAppend":function(){
            $("simple-modal").fade("hide").fade("in")
          }
        });
        SM.show({
          "model":"modal-ajax",
					"title":"Modal Lightbox",
          "param":{
            "url":"assets/images/lightbox.jpg",
            "onRequestComplete": function(){ }
          }
        });
  })

  /* NO Header */
  $("alert-noheader").addEvent("click", function(e){
    e.stop();
    var SM = new SimpleModal({"hideHeader":true, "closeButton":false, "btn_ok":"Close window", "width":600});
        SM.show({
          "model":"alert",
          "contents":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        });
  })
  
  /* NO Footer */
  $("modal-nofooter").addEvent("click", function(e){
    e.stop();
    var SM = new SimpleModal({"hideFooter":true, "width":710});
        SM.show({
          "title":"Vimeo video",
          "model":"modal",
          "contents":'<iframe src="http://player.vimeo.com/video/26198635?title=0&amp;byline=0&amp;portrait=0&amp;color=824571" width="680" height="382" frameborder="0" webkitAllowFullScreen allowFullScreen></iframe>'
        });
  })
  
  $("example-eheh").addEvent("click", function(e){
    e.stop();
    var SM = new SimpleModal(
            {
              "btn_ok":"Confirm button",
              "overlayClick":false,
              "width":300,
              "onAppend":function(){
                $("simple-modal").fade("hide");
                setTimeout((function(){ $("simple-modal").fade("show")}), 200 );
                var tw = new Fx.Tween($("simple-modal"),{
                  duration: 1600,
                  transition: 'bounce:out',
                  link: 'cancel',
                  property: 'top'
                }).start(-400, 150)

                var item = $("simple-modal").getElement(".simple-modal-footer a");
                    item.removeClass("primary").setStyles({"background":"#824571","color": "#FFF" });
                    item.getParent().addClass("align-left");
	                  item.addEvent("mouseenter", function(){
	                    var parent = this.getParent();
	                    if( parent.hasClass("align-left") ){
	                      parent.removeClass("align-left").addClass("align-right");
	                    }else{
	                      parent.removeClass("align-right").addClass("align-left");
	                    }
	                  })
              }
            });
        // Aggiunge Bottone Conferma
        SM.addButton("Click ME please!", "btn primary", function(){});
        SM.show({
          "model":"modal",
          "title":"Eh eh eh",
          "contents":"<p>Try clicking on the button \"Click ME please!\"</p>"
        });
  });
});