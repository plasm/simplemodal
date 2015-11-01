![Screenshot](https://raw.github.com/plasm/simplemodal/master/logotipo.png)

http://simplemodal.plasm.it
---------------------------
Modal - A simple modal window
===========================================
SIMPLE MODAL is a small [MooTools](http://mootools.net/) plugin to create modal windows.
It can be used to generate alert or confirm messages with few lines of code. Confirm configuration involves the use of callbacks to be applied to affirmative action; it can work in asynchronous mode and retrieve content from external pages or getting the inline content.
SIMPLE MODAL is not a lightbox although the possibility to hide parts of its layout may partially make it similar.

How to Use
----------

Minimal configuration


ALERT INTEGRATION 
-----------------
Snippet code Javascript:

	#JS
	
	$("myElement").addEvent("click", function(){
	  var SM = new SimpleModal({"btn_ok":"Alert button"});
	      SM.show({
	        "title":"Title",
	        "contents":"Your message..."
	      });
	});

Snippet code HTML:

	#HTML
	
	<a id="myElement" href="javascript;">Alert</a>


MODAL-AJAX INTEGRATION
----------------------
Snippet code Javascript:

	#JS

	$("myElement").addEvent("click", function(){
	  var SM = new SimpleModal({"width":600});
	      SM.addButton("Action button", "btn primary", function(){
	          this.hide();
	      });
	      SM.addButton("Cancel", "btn");
	      SM.show({
	        "model":"modal-ajax",
	        "title":"Title",
	        "param":{
	          "url":"file-content.php",
	          "onRequestComplete": function(){ /* Action on request complete */ }
	        }
	      });
	});

Snippet code HTML:

	#HTML

	<a id="myElement" href="javascript;">Open Modal</a>


LIGHTBOX SUPPORT
----------------
Automatic lightbox support:

	 	#HTML
	 	
	 	<a href="bigpicture.jpg" rel="simplemodal[mygroup]" title="Picture 1">
	 		<img alt="Example" src="thumbpicture.jpg" />
	 	</a>
	 	
Tradução em Português

http://simplemodal.plasm.it
---------------------------
Modal - A simple modal window
===========================================
SIMPLES MODAL é um pequeno [ MooTools ] ( http://mootools.net/ ) plug-in para criar janelas modais .
Ele pode ser usado para gerar mensagens de alerta ou confirmar com algumas linhas de código . Confirmar configuração envolve a utilização de retornos de chamada para ser aplicado a ação afirmativa ; ele pode trabalhar no modo assíncrono e recuperar o conteúdo de páginas externas ou obtenção do conteúdo em linha .
SIMPLES MODAL não é uma mesa de luz , embora a possibilidade de esconder partes do seu layout pode torná-lo parcialmente similar.

Como usar
----------

Configuração Minima


INTEGRAÇÃO DE ALERT
-----------------
Snippet code Javascript:

	#JS
	
	$("myElement").addEvent("click", function(){
	  var SM = new SimpleModal({"btn_ok":"Alert button"});
	      SM.show({
	        "title":"Title",
	        "contents":"Your message..."
	      });
	});

Snippet code HTML:

	#HTML
	
	<a id="myElement" href="javascript;">Alert</a>


INTEGRAÇÃO MODAL-AJAX
----------------------
Snippet code Javascript:

	#JS

	$("myElement").addEvent("click", function(){
	  var SM = new SimpleModal({"width":600});
	      SM.addButton("Action button", "btn primary", function(){
	          this.hide();
	      });
	      SM.addButton("Cancel", "btn");
	      SM.show({
	        "model":"modal-ajax",
	        "title":"Title",
	        "param":{
	          "url":"file-content.php",
	          "onRequestComplete": function(){ /* Action on request complete */ }
	        }
	      });
	});

Snippet code HTML:

	#HTML

	<a id="myElement" href="javascript;">Open Modal</a>


SUPORT LIGHTBOX SUPPORT
----------------
Automatic lightbox support:

	 	#HTML
	 	
	 	<a href="bigpicture.jpg" rel="simplemodal[mygroup]" title="Picture 1">
	 		<img alt="Example" src="thumbpicture.jpg" />
	 	</a>