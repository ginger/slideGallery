/*
---

script: mootools.slideGallery.js

description: Multifunctional slide carousel for MooTools.

license: MIT-style license

authors:
- Sergii Kashcheiev

requires:
- core/1.2.4: Fx.Tween
- core/1.2.4: Fx.Transitions

provides: [slideGallery, fadeGallery]

...
*/
var slideGallery = new Class({
	Version: "1.2.3",
	Implements: [Options],
	options: {
		holder: ".holder",
		elementsParent: "ul",
		elements: "li",
		nextItem: ".next",
		prevItem: ".prev",
		stop: ".stop",
		start: ".start",
		speed: 600,
		duration: 4000,
		steps: 1,
		current: 0,
		transition: Fx.Transitions.linear,
		direction: "horizontal",
		mode: "callback",
		disableClass: "disable",
		currentClass: "current",
		random: false,
		paging: false,
		autoplay: false,
		autoplayOpposite: false,
		onStart: function(current, visible, length) {},
		onPlay: function(current, visible, length) {}
	},
	initialize: function(gallery, options) {
		this.gallery = gallery;
		this.setOptions(options);
		this.holder = this.gallery.getElement(this.options.holder);
		this.itemsParent = this.holder.getElement(this.options.elementsParent);
		this.items = this.itemsParent.getElements(this.options.elements);
		this.next = this.gallery.getElement(this.options.nextItem);
		this.prev = this.gallery.getElement(this.options.prevItem);
		this.stop = this.gallery.getElement(this.options.stop);
		this.start = this.gallery.getElement(this.options.start);
		this.current = this.options.current;
		this.bound = { rotate: this.rotate.bind(this) }
		
		if(this.options.direction == "horizontal") {
			this.direction = "margin-left";
			this.size = this.items[0].getWidth();
			this.visible = Math.round(this.holder.getWidth()/this.size);
		}
		else {
			this.direction = "margin-top";
			this.size = this.items[0].getHeight();
			this.visible = Math.round(this.holder.getHeight()/this.size);
		}
		
		if(this.next == null) this.next = new Element("a").injectInside(this.gallery);
		if(this.prev == null) this.prev = new Element("a").injectInside(this.gallery);
		this.next.cl = this.next.className;
		this.prev.cl = this.prev.className;

		if(this.visible < this.items.length) {
			if(this.options.random) {
				Array.prototype.shuffle = function(b) {
					var i = this.length, j, t;
					while(i) {
						j = Math.floor( ( i-- ) * Math.random() );
						t = b && typeof this[i].shuffle!=="undefined" ? this[i].shuffle() : this[i];
						this[i] = this[j];
						this[j] = t;
					}
					return this;
				};
				this.items.shuffle(this.items);
				this.hidden = new Element("div");
				this.items.each(function(el, i) {
					this.wrap = new Element("div").adopt(el);
					this.hidden.set("html", this.hidden.get("html"), this.wrap.get("html"));
				}.bind(this));
				this.itemsParent.set("html", this.hidden.get("html"));
				this.items = this.itemsParent.getElements(this.options.elements);
			}
		
			this.options.steps = this.options.steps > this.visible ? this.visible : this.options.steps;
			this.options.duration = this.options.duration < 1000 ? 1000 : this.options.duration;
			this.options.speed = this.options.speed > 6000 ? 6000 : this.options.speed;
			
			for(var i=0; i<this.items.length; i++) {
				if(this.items[i].hasClass(this.options.currentClass)) this.current = i;
			}
			if(this.options.mode != "circle") {
				if(this.visible+this.current >= this.items.length) {
					this.margin = (this.items.length-this.visible)*this.size;
					this.current = this.items.length-this.visible;
				}
				else this.margin = this.current*this.size;
				
				if(this.options.paging) {
					this.paging = new Element("ul").injectInside(this.gallery).addClass("paging");
					for(var i=0; i<Math.ceil((this.items.length-this.visible)/this.options.steps)+1; i++) {
						this.paging.innerHTML += '<li><a href="#">' + parseInt(i+1) + '</a></li>';
					}
					this.paging = this.paging.getElements("a");
					this.paging.each(function(el, i) {
						el.addEvent("click", function() {
							if(i*this.options.steps+this.visible >= this.items.length) {
								this.margin = (this.items.length-this.visible)*this.size;
								this.current = this.items.length-this.visible;
							}
							else this.current = i*this.options.steps;
							this.margin = this.current*this.size;
							
							this.play(this.options.speed);
							return false;
						}.bind(this));
					}.bind(this));
				}
				this.play(0);
			}
			else {
				for(; this.items.length < this.options.steps+this.visible;) {
					this.items.clone().inject(this.itemsParent, "bottom");
					this.items = this.itemsParent.getElements(this.options.elements);
				}
				if(this.current > this.items.length-1) this.current = this.items.length - 1;
				if(this.current < 0) this.current = 0;
				for(var i=0; i<this.current; i++) {
					this.items[i].inject(this.itemsParent, "bottom");
				}
				this.options.paging = false;
			}
			
			this.next.addEvent("click", function() {
				if(this.options.mode != "circle") {
					if(this.visible+this.current >= this.items.length) {
						if(this.options.mode == "callback") {
							this.margin = 0;
							this.current = 0;
						}
					}
					else if(this.visible+this.current+this.options.steps >= this.items.length) {
						this.margin = (this.items.length-this.visible)*this.size;
						this.current = this.items.length-this.visible;
					}
					else	{
						this.current = this.current+this.options.steps;
						this.margin = this.current*this.size;
					}
					this.play(this.options.speed);
				}
				else {
					var _this = this;
					this.margin = this.size*this.options.steps;
					this.itemsParent.set("tween", {
						duration: this.options.speed,
						transition: this.options.transition,
						property: this.direction,
						onComplete: function()	{
							for(var i=0; i<_this.options.steps; i++) {
								if(_this.current >= _this.items.length) _this.current = 0;
								_this.current++;
								_this.items[_this.current-1].inject(_this.itemsParent, "bottom");
							}
							this.set(0);
							_this.options.onPlay(_this.current, _this.visible, _this.items.length);
						},
						onCancel: function() {	this.onComplete(); }
					});
					this.itemsParent.tween(-this.margin);
				}
				return false;
			}.bind(this));
			
			this.prev.addEvent("click", function() {
				if(this.options.mode != "circle") {
					if(this.current <= 0) {
						if(this.options.mode == "callback") {
							this.margin = (this.items.length-this.visible)*this.size;
							this.current = this.items.length-this.visible;
						}
					}
					else if(this.current-this.options.steps <= 0) {
						this.margin = 0;
						this.current = 0;
					}
					else	{
						this.current = this.current-this.options.steps;
						this.margin = this.current*this.size;
					}
					this.play(this.options.speed);
				}
				else {
					for(var i=0; i<this.options.steps; i++) {							
						if(this.current-1 < 0) this.current = this.items.length;
						--this.current;
						this.items[this.current].inject(this.itemsParent, "top");
					}
					this.itemsParent.setStyle(this.direction, -this.size*this.options.steps + "px");
					this.margin = 0;
					this.play(this.options.speed);
				}
				return false;
			}.bind(this));

			if(this.options.autoplay || this.start || this.stop) {
				if(!this.options.autoplay) this.gallery.addClass("stopped");
				this.timer = this.bound.rotate.delay(this.options.duration);
				this.gallery.addEvent("mouseenter", function() {
					this.options.autoplay = false;
					$clear(this.timer);
				}.bind(this));
				this.gallery.addEvent("mouseleave", function() {
					if(!this.gallery.hasClass("stopped")) {
						$clear(this.timer);
						this.options.autoplay = true;
						this.timer = this.bound.rotate.delay(this.options.duration);
					}
				}.bind(this));
			}
			if(this.stop) {
				this.stop.addEvent("click", function() {
					this.gallery.addClass("stopped").fireEvent("mouseenter");
					return false;
				}.bind(this));
			}
			if(this.start) {
				this.start.addEvent("click", function() {
					this.gallery.removeClass("stopped").fireEvent("mouseenter");
					return false;
				}.bind(this));
			}
		}
		else {
			this.next.addClass(this.next.cl + "-" + this.options.disableClass);
			this.prev.addClass(this.prev.cl + "-" + this.options.disableClass);
			this.next.addEvent("click", function() {return false;}.bind(this));
			this.prev.addEvent("click", function() {return false;}.bind(this));
			if(this.stop) this.stop.addEvent("click", function() {return false;}.bind(this));
			if(this.start) this.start.addEvent("click", function() {return false;}.bind(this));
			this.gallery.addClass("stopped");
		}
		this.options.onStart(this.current, this.visible, this.items.length);
	},
	play: function(speed) {
		this.sidesChecking();
		this.itemsParent.set("tween", {
			duration: speed,
			transition: this.options.transition
		});
		this.itemsParent.tween(this.direction, -this.margin);
		if(this.options.paging) {
			this.paging.removeClass("active");
			this.paging[Math.ceil(this.current/this.options.steps)].addClass("active");
		}
		this.options.onPlay(this.current, this.visible, this.items.length);
	},
	rotate: function() {
		if(this.options.autoplay) {
			if(!this.options.autoplayOpposite) this.next.fireEvent("click");
			else this.prev.fireEvent("click");
			this.timer = this.bound.rotate.delay(this.options.duration);
		}
	},
	sidesChecking: function() {
		if(this.options.mode == "line") {
			this.next.removeClass(this.next.cl + "-" + this.options.disableClass);
			this.prev.removeClass(this.prev.cl + "-" + this.options.disableClass);
			if(this.visible+this.current >= this.items.length) this.next.addClass(this.next.cl + "-" + this.options.disableClass);
			else if(this.current==0) this.prev.addClass(this.prev.cl + "-" + this.options.disableClass);
		}
	}
});
var fadeGallery = new Class({
	Extends: slideGallery,
	initialize: function(gallery, options) {
		this.previous = null;
		if(options.mode == "circle") options.mode = "callback";
		options.steps = 1;
		this.parent(gallery, options);
		this.visible = 1;
	},
	play: function(speed) {
		if(this.previous == null) this.previous = this.items;
		this.sidesChecking();
		this.previous.set("tween", {
			duration: speed,
			transition: this.options.transition
		});
		this.previous.tween("opacity", 0);
		this.items[this.current].set("tween", {
			duration: speed,
			transition: this.options.transition
		});
		this.items[this.current].tween("opacity", 1);
		if(this.options.paging) {
			this.paging.removeClass("active");
			this.paging[Math.ceil(this.current/this.options.steps)].addClass("active");
		}
		this.previous = this.items[this.current];
		this.options.onPlay(this.current, this.visible, this.items.length);
	}
});