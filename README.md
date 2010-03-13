slideGallery
============

Slide carousel for mootools.

Cross Browser: IE6+, FF2+, Safari3+, Opera9+, Chrome

![Screenshot](http://juverman.narod.ru/slideGallery/screen.png)

How to use
----------
	HTML
	-----------
	`<div class="gallery">`
		`<div class="holder">`
			`<ul>`
				...
				`<li><img src="../Source/Assets/img1.jpg" alt="image description" width="240" height="180" /></li>`
				...
			`</ul>`
		`</div>`
		`<a href="#" class="prev">prev</a>`
		`<a href="#" class="next">next</a>`
	`</div>`
	
	CSS
	-----------
	.gallery { width: 960px; } /* you can change */
	.gallery .holder {
		width: 100%;
		position: relative;
		overflow: hidden;
	}
	.gallery .holder ul {
		margin: 0;
		padding: 0;
		list-style: none;
		width: 30000px;
	}
	.gallery .holder ul li { float: left; }
	
	JavaScript:
	-----------
	window.addEvent("domready", function() {
        var gallery = new slideGallery(element [, options]);
    });
	or 
	window.addEvent("domready", function() {
        var gallery = new fadeGallery(element [, options]);
    });
	
	Arguments:
	----------
		- element [string, element] - ID of element or reference to the element object.
		- options [object]
			- holder [string] - class or node for holder. Default ".holder"
			- elementsParent [string] - class or node for elements holder. Default "ul"
			- elements [string] - class or node of items. Default "li"
			- nextItem [string] - class or node of "nextSlide" button. Default ".next"
			- prevItem [string] - class or node of "prevSlide" button. Default ".prev"
			- stop [string] - class or node of "stop" button. Default ".stop"
			- start [string] - class or node of "play" button. Default ".start"
			- speed [integer] - speed of sliding in ms. Default 600
			- duration [integer] - autosliding interval in ms. Default 4000
			- steps [integer] - quantity of items for each slide. Default 1
			- current [integer] - number of first(active) slide. Default 0
			- transition [object] - transition. Default Fx.Transitions.linear
			- direction [string: "horizontal", "vertical"] - sliding direction. Default "horizontal"
			- mode [string: "callback", "circle", "line"] - sliding mode. Default "callback"
			- mode [string: "callback", "circle", "line"] - with\without call back to first item or circle mode. Default "callback"
			- disableClass [string] - class name for next and prev buttons in disable state. Default "disable"
			- currentClass [string] - 
			- paging [boolean] -  on\off handles. Default false
			- autoplay [boolean] - on\off autoplay. Default false
			- onStart [function] - callback 1 time during initialization
			- onPlay [function] - callback after each slide

			
Screenshots
-----------
![Screenshot](http://juverman.narod.ru/slideGallery/screen-1.jpg)
![Screenshot](http://juverman.narod.ru/slideGallery/screen-2.jpg)