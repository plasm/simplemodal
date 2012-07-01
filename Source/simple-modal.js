/*
---
description: SIMPLE MODAL is a small plugin to create modal windows. It can be used to generate alert or confirm messages with few lines of code. Confirm configuration involves the use of callbacks to be applied to affirmative action;i t can work in asynchronous mode and retrieve content from external pages or getting the inline content. SIMPLE MODAL is not a lightbox although the possibility to hide parts of its layout may partially make it similar.

license: MIT-style

authors:
- Marco Dell'Anna

requires:
- core/1.3: '*'

provides:
- SimpleModal
...

* Mootools Simple Modal
* Version 1.0
* Copyright (c) 2011 Marco Dell'Anna - http://www.plasm.it
*
* Requires:
* MooTools http://mootools.net
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*
* Log:
* 1.0 - Inizio implementazione release stabile [Tested on: ie7/ie8/ie9/Chrome/Firefox7/Safari]
*/
var SimpleModal = new Class({
    // Implements
    Implements: [Options],
    request:null,
    buttons:[],
    // Options
    options: {
        onAppend:      Function, // callback inject in DOM
        offsetTop:     40,
        overlayOpacity:.3,
        overlayColor:  "#000000",
        width:         400,
        draggable:     true,
        keyEsc:        true,
        overlayClick:  true,
        closeButton:   true, // X close button
        hideHeader:    false, 
        hideFooter:    false,
        lightboxExcessWidth:40,  // Only for Modal Image (excess pixels created from skin)
        lightboxExcessHeight:120, // Only for Modal Image (excess pixels created from skin)
        btn_ok:        "OK", // Label
        btn_cancel:    "Cancel", // Label
        template:"<div class=\"simple-modal-header\"> \
            <h1>{_TITLE_}</h1> \
          </div> \
          <div class=\"simple-modal-body\"> \
            <div class=\"contents\">{_CONTENTS_}</div> \
          </div> \
          <div class=\"simple-modal-footer\"></div>"
    },

    /**
     * Initialization
     */
    initialize: function(options) {
        //set options
        this.setOptions(options);
    },
    
    /**
    * public method show
    * Open Modal
    * @options: param to rewrite
    * @return node HTML
    */
    show: function(options){
      if(!options) options = {};
      // Inserisce Overlay
      this._overlay("show");
      // Switch different modal
      switch( options.model ){
        // Require title && contents && callback
        case "confirm":
          // Add button confirm
          this.addButton(this.options.btn_ok, "btn primary btn-margin", function(){
              try{ options.callback() } catch(err){};
              this.hide();
          })
          // Add button cancel
          this.addButton(this.options.btn_cancel, "btn secondary");
					// Rendering
					var node = this._drawWindow(options);
					// Add Esc Behaviour
					this._addEscBehaviour();
        break;
        // Require title && contents (define the action buttons externally)
        case "modal":
					// Rendering
					var node = this._drawWindow(options);
					// Add Esc Behaviour
					this._addEscBehaviour();
        break;
        // Require title && url contents (define the action buttons externally)
        case "modal-ajax":
					// Rendering
					var node = this._drawWindow(options);
          this._loadContents({
            "url":options.param.url || "",
            "onRequestComplete":options.param.onRequestComplete||Function
          })
        break;
        // Require title && contents
        default:
					// Alert
          // Add button
          this.addButton(this.options.btn_ok, "btn primary");
					// Rendering
					var node = this._drawWindow(options);
					// Add Esc Behaviour
					this._addEscBehaviour();
        break;
      }
			   
      // Custom size Modal
      node.setStyles({width:this.options.width});
      
      // Hide Header &&/|| Footer
      if( this.options.hideHeader ) node.addClass("hide-header");
      if( this.options.hideFooter ) node.addClass("hide-footer");

      // Add Button X
      if( this.options.closeButton ) this._addCloseButton();
      
      // Enabled Drag Window
      if( this.options.draggable ){
        var headDrag = node.getElement(".simple-modal-header");
          new Drag(node, { handle:headDrag });
          // Set handle cursor
          headDrag.setStyle("cursor", "move")
          node.addClass("draggable");
      }
      // Resize Stage
      this._display();
    },
    
    /**
    * public method hide
    * Close model window
    * return
    */
    hide: function(){
			try{
				if( typeof(this.request) == "object" )  this.request.cancel();
			}catch(err){}
		 this._overlay('hide');
     return;
    },
    
    /**
    * private method _drawWindow
    * Rendering window
    * return node SM
    */
		_drawWindow:function(options){
			// Add Node in DOM
      var node = new Element("div#simple-modal", {"class":"simple-modal"});
          node.inject( $$("body")[0] );
			// Set Contents
			var html = this._template(this.options.template, {"_TITLE_":options.title || "Untitled", "_CONTENTS_":options.contents || ""});
		      node.set("html", html);
					// Add all buttons
		      this._injectAllButtons();
		      // Callback append
		      this.options.onAppend();
			return node;
		},

    /**
    * public method addButton
    * Add button to Modal button array
    * require @label:string, @classe:string, @clickEvent:event
    * @return node HTML
    */
     addButton: function(label, classe, clickEvent){
         var bt = new Element('a',{
                                     "title" : label,
                                     "text"  : label,
                                     "class" : classe,
                                     "events": {
                                         click: (clickEvent || this.hide).bind(this)
                                     }
                               });
         this.buttons.push(bt);
 		     return bt;
     },
     
    /**
    * private method _injectAllButtons
    * Inject all buttons in simple-modal-footer
    * @return
    */
    _injectAllButtons: function(){
      this.buttons.each( function(e, i){
        e.inject( $("simple-modal").getElement(".simple-modal-footer") );
      });
		return;
    },

    /**
    * private method _addCloseButton
    * Inject Close botton (X button)
    * @return node HTML
    */
    _addCloseButton: function(){
      var b = new Element("a", {"class":"close", "href":"#", "html":"x"});
          b.inject($("simple-modal"), "top");
          // Aggiunge bottome X Close
          b.addEvent("click", function(e){
            if(e) e.stop();
            this.hide();
          }.bind( this ))
      return b;
    },

    /**
    * private method _overlay
    * Create/Destroy overlay and Modal
    * @return
    */
    _overlay: function(status) {
       switch( status ) {
           case 'show':
               this._overlay('hide');
               var overlay = new Element("div", {"id":"simple-modal-overlay"});
                   overlay.inject( $$("body")[0] );
                   overlay.setStyle("background-color", this.options.overlayColor);
                   overlay.fade("hide").fade(this.options.overlayOpacity);
                // Behaviour
                if( this.options.overlayClick){
                  overlay.addEvent("click", function(e){
                    if(e) e.stop();
                    this.hide();
                  }.bind(this))
                }
               // Add Control Resize
               this.__resize = this._display.bind(this);
               window.addEvent("resize", this.__resize );
           break;
           case 'hide':
               // Remove Event Resize
               window.removeEvent("resize", this._display);
               // Remove Event Resize
               if(this.options.keyEsc){
                 var fixEV = Browser.name != 'ie' ? "keydown" : "onkeydown";
                 window.removeEvent(fixEV, this._removeSM);
               }
               
               // Remove Overlay
               try{
                 $('simple-modal-overlay').destroy();
               }
               catch(err){}
               // Remove Modal
               try{
                 $('simple-modal').destroy();
               }
               catch(err){}
           break;
       }
       return;
    },

    /**
    * private method _loadContents
    * Async request for modal ajax
    * @return
    */
    _loadContents: function(param){
			// Set Loading
			$('simple-modal').addClass("loading");
			// Match image file
			var re = new RegExp( /([^\/\\]+)\.(jpg|png|gif)$/i );
			if( param.url.match(re) ){
				// Hide Header/Footer
	      $('simple-modal').addClass("hide-footer");
				// Remove All Event on Overlay
				$("simple-modal-overlay").removeEvents(); // Prevent Abort
				// Immagine
				var images = [param.url];
				new Asset.images(images, {
							onProgress: function(i) {
								immagine = this;
							},
							onComplete: function() {
								try{
									// Remove loading
									$('simple-modal').removeClass("loading");
									// Imposta dimensioni
									var content = $('simple-modal').getElement(".contents");
									var padding = content.getStyle("padding").split(" ");
									var width   = (immagine.get("width").toInt()) + (padding[1].toInt()+padding[3].toInt())
									var height  = immagine.get("height").toInt();
									// Porportional scale
                  var ns = this._scaleImage(width, height);
                  width   = ns.width					
									height  = ns.height
									
									// Width
									var myFx1 = new Fx.Tween($("simple-modal"), {
									    duration: 'normal',
									    transition: 'sine:out',
									    link: 'cancel',
									    property: 'width'
									}).start($("simple-modal").getCoordinates().width, width);
									// Height
									var myFx2 = new Fx.Tween(content, {
									    duration: 'normal',
									    transition: 'sine:out',
									    link: 'cancel',
									    property: 'height'
									}).start(content.getCoordinates().height, height).chain(function(){
										// Inject
										immagine.inject( $('simple-modal').getElement(".contents").empty() ).fade("hide").setStyles({"width":width, "height":height}).fade("in");
		                this._display();
		                // Add Esc Behaviour
  									this._addEscBehaviour();
									}.bind(this));
									// Left
									var myFx3 = new Fx.Tween($("simple-modal"), {
									    duration: 'normal',
									    transition: 'sine:out',
									    link: 'cancel',
									    property: 'left'
									}).start($("simple-modal").getCoordinates().left, (window.getCoordinates().width - width)/2);
								}catch(err){}
							}.bind(this)
						});
						
			}else{
				// Request HTML
	      this.request = new Request.HTML({
	          evalScripts:false,
	          url: param.url,
	          method: 'get',
	          onRequest: function(){
	          },
	          onSuccess: function(responseTree, responseElements, responseHTML, responseJavaScript){
	            $('simple-modal').removeClass("loading");
	            $('simple-modal').getElement(".contents").set("html", responseHTML);
	            param.onRequestComplete();
	            // Execute script page loaded
	            eval(responseJavaScript)
	            // Resize
	            this._display();
	            // Add Esc Behaviour
							this._addEscBehaviour();
	          }.bind(this),
	          onFailure: function(){
	            $('simple-modal').removeClass("loading");
	            $('simple-modal').getElement(".contents").set("html", "loading failed")
	          }
	      }).send();
			}
    },
    
    /**
    * private method _scaleImage
    * Calculate scale image proportional
    * @return {width, height}
    */
    _scaleImage: function(w, h){
      var removeH = this.options.lightboxExcessHeight + this.options.offsetTop;
      var removeW = this.options.lightboxExcessWidth;
      var width  = w ;
      var height = h ;
      var newWidth  = window.getSize().x - removeW;
      var newHeight = window.getSize().y - removeH;
      ratio = (width <= height) ? height / newHeight : width / newWidth;
			// Ratio
			ratio      = Math.max(ratio, 1.0);
			// New sizes
			w = parseInt(width / ratio);
			h = parseInt(height / ratio);
			return {"width":w, "height":h}
    },
    
    /**
    * private method _display
    * Move interface
    * @return
    */
     _display: function(){
      // Update overlay
      try{
        $("simple-modal-overlay").setStyles({
          height: window.getCoordinates().height //$$("body")[0].getScrollSize().y
        });
      } catch(err){}
         
      // Update position popup
      try{
        var offsetTop = this.options.offsetTop || 0; //this.options.offsetTop != null ? this.options.offsetTop : window.getScroll().y;
        $("simple-modal").setStyles({
          top: offsetTop,
          left: ((window.getCoordinates().width - $("simple-modal").getCoordinates().width)/2 )
        });
      } catch(err){}
 		  return;
     },
     
     /**
     * private method _addEscBehaviour
     * add Event ESC
     * @return
     */
     _addEscBehaviour: function(){
       if(this.options.keyEsc){
         this._removeSM = function(e){
           if( e.key == "esc" ) this.hide();
         }.bind(this)
          // Remove Event Resize
         if(this.options.keyEsc){
           var fixEV = Browser.name != 'ie' ? "keydown" : "onkeydown";
           window.addEvent(fixEV, this._removeSM );
         }
  		  }
     },
      
    /**
    * private method _template
    * simple template by Thomas Fuchs
    * @return
    */
    _template:function(s,d){
     for(var p in d)
       s=s.replace(new RegExp('{'+p+'}','g'), d[p]);
     return s;
    }
});