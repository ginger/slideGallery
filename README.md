slideGallery
============

Multifunctional gallery for MooTools 1.2+.

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
	.gallery { width: 960px; }
	.gallery .holder {
		width: 100%;
		position: relative;
		overflow: hidden;
	}
	.gallery .holder ul {
		margin: 0;
		padding: 0;
		list-style: none;
		width: 99999px;
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
		- element [string, element] - reference to the element object.
		- options [object]
			- holder [string] - class or node for holder. Default ".holder"
			- elementsParent [string] - class or node for slides(elements) holder. Default "ul"
			- elements [string] - class or node of elements. Default "li"
			- nextItem [string] - class or node of the button Next. Default ".next"
			- prevItem [string] - class or node of the button Prev. Default ".prev"
			- stop [string] - class or node of Stop button. Default ".stop"
			- start [string] - class or node of Play button. Default ".start"
			- speed [integer] - speed of sliding in ms. Default 600
			- steps [integer] - quantity of elements which are scrolled for one step. Default 1
			- current [integer] - number of an element with which begins scrolling. Default 0
			- currentClass [string] - className of an element with which begins scrolling. Default "current"
			- transition [object] - transition effect. Default "sine:in:out"
			- direction [string: "horizontal", "vertical"] - sliding direction. Default "horizontal"
			- mode [string: "callback", "circle", "line"] - sliding mode. Default "callback"
			- nextDisableClass [string] - className for the button Next in a disabled state. Default "next-disable"
			- prevDisableClass [string] - className for the button Prev in a disabled state. Default "prev-disable"
			- random [boolean] - random set of slides. Default false
			- paging [boolean] - on\off handles. Default false
			- pagingEvent [string] - event which fire the paging. Default "click"
			- pagingHolder - class or node for paging holder. Default ".paging"
			- autoplay [boolean] - on\off autoplay. Default false
			- autoplayOpposite [boolean] - on\off opposite autoplay. Default false
			- duration [integer] - autoplay interval in ms. Default 4000
			- stopOnHover  [boolean] - on\off scrolling when the cursor over gallery. Default true
			- onStart [function] - callback ones after initialization
			- onPlay [function] - callback after each scrolling

			
Screenshots
-----------
![Screenshot](http://juverman.narod.ru/slideGallery/screen-1.jpg)
![Screenshot](http://juverman.narod.ru/slideGallery/screen-2.jpg)