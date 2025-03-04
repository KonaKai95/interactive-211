(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Tween12 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("APIgLQAACfj/BxQj/BxloAAQlnAAj/hxQj/hxjEBwQDSklD7iYQD7iYFkgeQFlgeD/BxQD/BxAACgg");
	this.shape.setTransform(0,0.0353);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AoEEFQj+hxjFBwQDTklD6iYQD7iYFkgeQFlgeD/BxQD/BxAACgQAACfj/BxQj/BxloAAQlnAAj/hxg");
	this.shape_1.setTransform(0,0.0353);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-97.7,-38.4,195.5,76.9);


(lib.Tween10 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("ANOAAQAACWjIBqQjIBqkbAAQkaAAjHhqQjJhqAAiWQAAgIlGBxQFSkEC9hkQDHhqEaAAQEbAADIBqQDIBqAACVg");
	this.shape.setTransform(0,0.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("Ak/EAQjHhqgBiWQAAgIlGBxQFSkEC8hkQDJhqEZAAQEaAADJBqQDHBqABCVQgBCWjHBqQjJBqkaAAQkZAAjJhqg");
	this.shape_1.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-85.5,-37.1,171.1,74.30000000000001);


(lib.Tween5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(7,1,1).p("AGpAAQAACwh9B9Qh8B8iwAAQivAAh9h8Qh8h9AAiwQAAivB8h9QB9h8CvAAQCwAAB8B8QB9B9AACvg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(204,204,204,0.749)").s().p("AksEtQh8h9AAiwQAAivB8h9QB9h8CvAAQCvAAB9B8QB9B9AACvQAACwh9B9Qh9B8ivAAQivAAh9h8g");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-46,-46,92,92);


(lib.Tween4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("EAkJAAAQAAGaoiEiQojEisGAAQsEAAojkiQojkiAAmaQAAgWt8E1QObrIIEkSQIjkiMEAAQMGAAIjEiQIiEiAAGZg");
	this.shape.setTransform(0,0.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AtpK8QojkiAAmaQAAgWt8E1QObrIIEkSQIjkiMEAAQMFAAIkEiQIiEiAAGZQAAGaoiEiQokEisFAAQsEAAojkig");
	this.shape_1.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-232.3,-99.9,464.6,199.9);


(lib.Tween3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("EAkJAAAQAAGaoiEiQojEisGAAQsEAAojkiQojkiAAmaQAAgWt8E1QObrIIEkSQIjkiMEAAQMGAAIjEiQIiEiAAGZg");
	this.shape.setTransform(0,0.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AtpK8QojkiAAmaQAAgWt8E1QObrIIEkSQIjkiMEAAQMGAAIiEiQIjEiAAGZQAAGaojEiQoiEisGAAQsEAAojkig");
	this.shape_1.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-232.3,-99.9,464.6,199.9);


(lib.Truck_bed = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#4D4D4D").s().p("ApVFXIg3h4IAsgTICBg5IF/iqILDk+IAqIdIk9CPg");
	this.shape.setTransform(98.825,464.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#4D4D4D").s().p("A+2FeIE8iPIgqodIAHgEIAAgJMAuugACIAKAAIAJACIBrAAIBQAAIDoAAIKyE8IF1CqIB+A5IBlAtIAuAVIASAIIBrAyIAAAegEgx7AFeIAAgSIBqguIA2gYIAMgGIA8gaIA3B4g");
	this.shape_1.setTransform(330,464.25);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CCCCCC").s().p("A6dMFIABAAI3f4oIAAhtMBj3AAAIAABrI23YlMg1fAAAIgCCRg");
	this.shape_2.setTransform(330,91.25);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#666666").s().p("A6xNkIAAgIIAAg3IABpqIAB0WIAAguIABiRMA1fAAAIABAAMAAAAoxIjwADIhQAAIhgAAIgKAAIgKAAMguuAABg");
	this.shape_3.setTransform(331.975,298.725);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#EDEDED").s().p("Egx7gl+IXfYoIgBAAIABCMIAAAuIgBUWIAAJqIAAA3IAAAIIAAG3IAAAJIgHAEIrEE+Il/CsIiAA4IgsAUIg8AZIgMAGIg2AYIhqAugEAwTAlEIgTgIIgugVIhkgtIh9g4Il0isIq3lAMAAAgoxIgBAAIW34mMAAABL0g");
	this.shape_4.setTransform(330,254.0125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(10.4,0,639.2,499.2);


(lib.Truck = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CBCBCB").s().p("ApFBrQgeABAAgeIAAibQAAgeAeAAISLAAQAeAAAAAeIAACbQAAAegegBg");
	this.shape.setTransform(315.275,15.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CBCBCB").s().p("AgsIQQgeAAAAgfIAAvhQAAgeAeAAIBZAAQAeAAAAAeIAAPhQAAAfgeAAg");
	this.shape_1.setTransform(11.55,436.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CBCBCB").s().p("AgRHvQgHgHAAgLIAAu6QAAgKAHgIQAIgGAJgBQAKABAIAGQAHAIAAAKIAAO6QAAALgHAHQgIAHgKAAQgJAAgIgHg");
	this.shape_2.setTransform(634,436.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#CBCBCB").s().p("AgYEWQgfAAAAgfIAAnuQAAgeAfAAIAxAAQAfAAAAAeIAAHuQAAAfgfAAg");
	this.shape_3.setTransform(627.75,469.2);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#CBCBCB").s().p("AAAIeQAAAAAAAAQgBAAgBAAQAAAAgBgBQAAAAgBgBQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAgBAAAAIAAwvQAAAAAAgBQAAgBABAAQAAgBAAAAQABgBAAAAQABgBAAAAQABAAAAgBQABAAABAAQAAAAAAAAIAAAAQABAAAAAAQABAAABAAQAAABABAAQAAAAABABQAAAAABABQAAAAAAABQAAAAABABQAAABAAAAIAAQvQAAAAAAABQgBABAAAAQAAABAAAAQgBABAAAAQgBABAAAAQgBABAAAAQgBAAgBAAQAAAAgBAAg");
	this.shape_4.setTransform(633.325,442.725);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#333333").ss(3,1,1).p("EgxggpHMBjBAAAQAeAAAAAeMAAABRxMhj9AAAMAAAhRxQAAgeAeAAg");
	this.shape_5.setTransform(319.925,263.15);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#666666").s().p("EgALAl8MAAAhL3IAJAAIgBAIIAJOQMAAGA9fg");
	this.shape_6.setTransform(21.225,274.8);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#333333").s().p("EgACAl8MAAAhLvIgBgIIAHAAMAAABL3g");
	this.shape_7.setTransform(618.025,274.8);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#CBCBCB").s().p("Egx+ApIMAAAhRxQAAgdAegBMBjBAAAQAeABAAAdMAAABRxgEgu2AnwIAYAAIAAASMBdAAAAIAAgSIAHAAMAAAhL2IgIAAQgEgXgZAAMhcUAAAQgXABgFARIgBAFIgJAAgEAvMAUEIACEmIABEfIAABIIgBDXQAAAdAiAAIBJAAQATAAAIgKIAAAAIABgBQAFgHAAgLIAAtkQAAgeghAAIgCAAIhHAAIgCAAQgiAAAAAegEgxSAUEIAANkIALAYIABAAQAIAFAOAAIAnAAIA4gGIAKgSIABgFIAAtkQAAgeghAAIhJAAQgiAAAAAegEgBEgnzQgcAdAAAoQAAAoAcAcIACACQAGAKASAIQARAJAfACQAZABAcgYIAJgIIAFgEQALgNAGgPIACgEIAAgCQAFgOAAgQIgBgRIgBgBQAHgLgMgIIgBgBQgLgJAFgEQgGgKgJgIQgcgcgogBQgnABgdAcgEADpgnzQgcAdAAAoQAAAoAcAcIACACQAcAbAnAAQAoAAAcgdQAdgcAAgoQAAgdgOgWQgGgKgJgIQgcgcgogBQgoABgdAcgEgFygnzQgcAdAAAoQAAAoAcAcIACACQAcAbAnAAQAoAAAcgdQAdgcAAgoQAAgdgOgWQgGgKgJgIQgcgcgogBQgoABgdAcg");
	this.shape_8.setTransform(319.925,263.15);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#CBCBCB").s().p("AgfIiQgWAAAAgdIAAwJQAAgdAWAAIA/AAQAWAAAAAdIAAQJQAAAdgWAAg");
	this.shape_9.setTransform(627.525,426.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_2
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgBAkIAxgMIAAAAIgbgqYgKgSgWgFgSAKYgRALgGAWALARYAIAOARAHAPgE");
	this.shape_10.setTransform(632.6119,28.9021,0.9861,1);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#333333").s().p("EgxsgAIMBjVAAAIAFACIAcALIAKAEMhknAAAgEAyUAAJIgKgEIAKAEgEAyUAAJg");
	this.shape_11.setTransform(319.8124,30.475,0.9861,1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Truck, new cjs.Rectangle(-1.5,-1.5,642.9,529.3), null);


(lib.TopRight_Arm = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#CCCCCC").ss(1,1,1).p("AhTFQQgbgaAAgkQAAiegvijQAdiIByhRQAegxgZgbQCBAygKDfQA3C1gIBjQgJBlgJAb");
	this.shape.setTransform(15.795,34.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AhTFPQgbgZAAglQAAicgvikQAdiHByhSQAegxgZgbQCBAygKDfQA3C1gIBkQgJBkgJAbg");
	this.shape_1.setTransform(15.795,34.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,33.6,70.1);


(lib.TopLeft_Arm = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#CCCCCC").ss(1,1,1).p("ABUFQQAbgaAAgkQAAieAvijQgdiIhyhRQgegxAZgbQiBAyAKDfQg3C1AIBjQAJBlAJAb");
	this.shape.setTransform(15.805,34.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AicDWQgIhkA3i1QgKjfCBgyQgZAbAeAxQByBSAdCHQgvCkAACcQAAAlgbAZIjeAGQgJgbgJhkg");
	this.shape_1.setTransform(15.805,34.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,33.6,70.1);


(lib.TailLights = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("EAGJgivQAAArgfAfQgfAegrAAQgrAAgfgeQgegfAAgrQAAgrAegfQAfgeArAAQArAAAfAeQAfAfAAArgEAvnAXaIBUAAQAeAAAAAfIAAMAQAAAfgeAAIhUAAQgeAAAAgfIAAsAQAAgfAeAAgEABlgivQAAArgeAfQgfAegrAAQgrAAgegeQgfgfAAgrQAAgrAfgfQAegeArAAQArAAAfAeQAeAfAAArgEgDGgivQAAArgfAfQgfAegrAAQgrAAgfgeQgegfAAgrQAAgrAegfQAfgeArAAQArAAAfAeQAfAfAAArgEgw6AXaIBUAAQAeAAAAAfIAAMAQAAAfgeAAIhUAAQgeAAAAgfIAAsAQAAgfAeAAg");
	this.shape.setTransform(316.05,232.825);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF0000").s().p("EAvnAkYQgfAAAAgfIAAsAQAAgfAfAAIBTAAQAeAAAAAfIAAMAQAAAfgeAAgEgw6AkYQgeAAAAgfIAAsAQAAgfAeAAIBVAAQAdAAAAAfIAAMAQAAAfgdAAgEADWghlQgegfAAgrQAAgrAegfQAfgeArAAQAsAAAeAeQAeAfABArQgBArgeAfQgeAegsAAQgrAAgfgegEgBMghlQgegfgBgrQABgrAegfQAegeAsAAQAqAAAfAeQAeAfAAArQAAArgeAfQgfAegqAAQgsAAgegegEgF5ghlQgegfAAgrQAAgrAegfQAfgeArAAQAsAAAeAeQAeAfABArQgBArgeAfQgeAegsAAQgrAAgfgeg");
	this.shape_1.setTransform(316.05,232.825);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.TailLights, new cjs.Rectangle(-1,-1,634.1,467.7), null);


(lib.Scene_4_Truck = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#333333").ss(3,1,1).p("Egx+gopMAAABRxMBj9AAAMAAAhRxQAAgegeAAMhjBAAAQgeAAAAAeg");
	this.shape.setTransform(319.925,263.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#4D4D4D").s().p("ApmFEIgmhRIAsgUICBg5IF/irILDk9IAqIdIjpBpg");
	this.shape_1.setTransform(88.425,487);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#4D4D4D").s().p("A9nFLIDohpIgqodIAIgEIAAgJMAuugACIAKAAIAIACIBrAAIBRAAIDoAAIKxE8IF2CqIB+A5IA4AZIAABJIAAASgEgufAFLIAAgSIAAg8IAHgDIAlBRg");
	this.shape_2.setTransform(320.075,486.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#666666").s().p("Egk8Al8MAAAhL3IAJAAIAAAIIACDyIAHKeMAAGA8jIAAA8gAwnVDIAAgIIABg4IAAppIAC0WIAAguIABiRMA1eAAAIACAAMgABAoxIjvACIhQAAIhgAAIgKAAIgKAAMguvAACg");
	this.shape_3.setTransform(256.5,274.8);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#EDEDED").s().p("EguPgZBIgHqfIUNVLIgCAAIACCMIAAAuIgCUWIAAJqIgBA3IAAAIIABG3IAAAJIgHAEIrEE+Il/CsIiBA4IgsAUIgHADgEAuAAi7Ih9g4Il0isIq4lAMAABgoxIgCAAITh0/MAAABGtgEgu2AQeQAFAHAAALIAANlIAAAFIgFAIg");
	this.shape_4.setTransform(317.8,284.275);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#CCCCCC").s().p("A6aMFIACAAI0N1KIgCjyIAAgIIABgEQAGgSAXAAMBcTAAAQAaAAAEAWIAAAIIAAD5IzgU+Mg1fAAAIgBCRgAAMuEQgegCgSgJIgCgBIBZAAQgTAMgRAAIgDAAgAEKuQIBVAAQgUAKgXAAQgXAAgTgKgAlRuQIBVAAQgUAKgXAAQgXAAgTgKg");
	this.shape_5.setTransform(319.275,115.2);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#333333").s().p("EgACAl8IAAhJIAAgBMAAAhGsIAAj5IgBgIIAHAAMAAABL3g");
	this.shape_6.setTransform(618.025,274.8);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#CBCBCB").s().p("Egx+ApIMAAAhRxQAAgdAegBMBjBAAAQAeABAAAdMAAABRxgEgu2AnwIAYAAIAAASIAtAAIQLAAMBMIAAAIAAgSIAHAAMAAAhL2IgIAAQgEgXgZAAMhcUAAAQgXABgFARIgBAFIgJAAgEgvLAh1IAEgIIABgFIAAtkQAAgMgFgHgEgBEgnzQgcAdAAAoQAAAoAcAcIACACQAGAJAQAIIACABQARAJAfACQASABAVgNIAOgLIAJgIIAFgEQALgNAGgPIACgEIAAgCQAFgOAAgQIgBgRIgBgBQAHgLgMgIIgBgBQgLgJAFgEQgGgKgJgIQgcgcgogBQgnABgdAcgEADpgnzQgcAdAAAoQAAAoAcAcIACACQALALAOAGQATAKAXAAQAXAAATgKQAOgHAMgMQAdgcAAgoQAAgdgOgWQgGgKgJgIQgcgcgogBQgoABgdAcgEgFygnzQgcAdAAAoQAAAoAcAcIACACQALALAOAGQATAKAXAAQAXAAATgKQAOgHAMgMQAdgcAAgoQAAgdgOgWQgGgKgJgIQgcgcgogBQgoABgdAcg");
	this.shape_7.setTransform(319.925,263.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Scene_4_Truck, new cjs.Rectangle(-1.5,-1.5,642.9,529.3), null);


(lib.scene_4_tailLights = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("EAGJgivQAAArgfAfQgfAegrAAQgrAAgfgeQgegfAAgrQAAgrAegfQAfgeArAAQArAAAfAeQAfAfAAArgEAvnAXaIBUAAQAeAAAAAfIAAMAQAAAfgeAAIhUAAQgeAAAAgfIAAsAQAAgfAeAAgEABlgivQAAArgeAfQgfAegrAAQgrAAgegeQgfgfAAgrQAAgrAfgfQAegeArAAQArAAAfAeQAeAfAAArgEgDGgivQAAArgfAfQgfAegrAAQgrAAgfgeQgegfAAgrQAAgrAegfQAfgeArAAQArAAAfAeQAfAfAAArgEgw6AXaIBUAAQAeAAAAAfIAAMAQAAAfgeAAIhUAAQgeAAAAgfIAAsAQAAgfAeAAg");
	this.shape.setTransform(316.05,232.825);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF0000").s().p("EAvnAkYQgfAAAAgfIAAsAQAAgfAfAAIBTAAQAeAAAAAfIAAMAQAAAfgeAAgEgw6AkYQgeAAAAgfIAAsAQAAgfAeAAIBVAAQAdAAAAAfIAAMAQAAAfgdAAgEADWghlQgegfAAgrQAAgrAegfQAfgeArAAQAsAAAeAeQAeAfABArQgBArgeAfQgeAegsAAQgrAAgfgegEgBMghlQgegfgBgrQABgrAegfQAegeAsAAQAqAAAfAeQAeAfAAArQAAArgeAfQgfAegqAAQgsAAgegegEgF5ghlQgegfAAgrQAAgrAegfQAfgeArAAQAsAAAeAeQAeAfABArQgBArgeAfQgeAegsAAQgrAAgfgeg");
	this.shape_1.setTransform(316.05,232.825);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.scene_4_tailLights, new cjs.Rectangle(-1,-1,634.1,467.7), null);


(lib.Scene_4_newOverpacks = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AzT27MAo2AAAMAAAAqoIAABGIhKAAIg1B1IhyAAIiEh1IqSAAIg0B9IigAAIh+h9ItTAAIg/CJIiNAAIhpiFIhVA/AzT27IiPBRMAAAAlkIABBJQgBgBAAgBIAIAYIAGAuIAMAcIAAguIAjBBIAJA7IANAhIAFgpIASAlIAHA7IAeAtAzTTtIAAAQAzTTtIgCANIACB8AzT27MAAAAqo");
	this.shape.setTransform(-6.8,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E2984A").s().p("AxcBnIhoiEIhWA+IgBh6IABACIAAgPMAo2AAAIAABGIhKAAIg1BzIhyAAIiEhzIqSAAIg0B7IifAAIh9h7ItUAAIg/CHg");
	this.shape_1.setTransform(0.275,136.425);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#C68642").s().p("AAqCRIgIg7IgSglIgEApIgMghIgKg6IgjhBIABAuIgMgcIgHguIgIgYIABACIgBhJICODyIgBANIABB8g");
	this.shape_2.setTransform(-137.55,120.775);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("ABjG9IAAhkICnAAIAABkgAB0EvIAAgpICFAAIAAApgABjDUIAAhTICnAAIAABTgAkIjzIAAhHIHrAAIAABHgAkIl0IAAhIIHrAAIAABIg");
	this.shape_3.setTransform(98.35,-83.125);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("ABTHaIAAl2IDZAAIAAF2gABsG5ICmAAIAAhkIimAAgAB9ErICFAAIAAgpIiFAAgABsDQICmAAIAAhTIimAAgAkri+IAAkbII1AAIAAEbgAkAj2IHsAAIAAhIInsAAgAkAl4IHsAAIAAhIInsAAg");
	this.shape_4.setTransform(97.475,-82.75);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#7D5429").s().p("AzVVZIACgNIAAAQgAzTVMMAAAgqnMAAAAqnIiPjzMAAAgljICPhRMAo2AAAMAAAAqngARmkBIDYAAIAAl2IjYAAgALnuaII2AAIAAkbIo2AAg");
	this.shape_5.setTransform(-6.8,-9.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Scene_4_newOverpacks, new cjs.Rectangle(-145.7,-147.7,277.79999999999995,295.5), null);


(lib.Scene_4_Character = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Main_Body
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,1,1,3,true).p("AlogWQAkgRAOgFQAOgGAfgHQABABAAAAQD6DlENjlQAIADAKADQApAMAvAb");
	this.shape.setTransform(97.2,104.1439);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,1,1).p("AFi3+IAAAMIgfAAIAAgMAFi3+IBKAAIAAEyIjDAAIAAkyIBaAAIAAgpIAfAAgADXSYQAHCbArAWQAvAYBTBpQBTBoCjgSQClgSg7inQgchPgSg9AjWSYQgGCfgsAXQgvAYhSBpQhUBoikgSQikgSA7inQAWhAAQg0");
	this.shape_1.setTransform(97.55,463.0572);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FF0000").ss(1,1,1).p("AgjgyIBHAAIAABlIgkAAIgTAAIgLAAIgFAAg");
	this.shape_2.setTransform(127.55,322.325);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#333333").ss(0.5,1,1).p("AAAADQgCAFgDAFAAGgMQgGANAAAC");
	this.shape_3.setTransform(159.5875,296.825);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#666666").s().p("AgPAbIAAgMIAAgpIAfAAIAAApIAAAMg");
	this.shape_4.setTransform(131.35,308.125);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#0066FF").s().p("AhDAWIAAgrICHAAIAAArg");
	this.shape_5.setTransform(130.775,313.575);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("EgKBAoxQijgSA6ioQAWg/ARg0IAFAHQEDhbDlgNQgGCggsAWQgvAZhSBoQhHBaiCAAQgWAAgZgDgEAGKAnVQhShogvgZQgrgWgHibQDiBcEDgYIABgBQASA9AcBPQA6CoijASQgZADgWAAQiCAAhHhagADojBIAAkxIBaAAIAAAMIAgAAIAAgMIBKAAIAAExgAEEjZICNAAIAAhIIiNAAgAEemIQgFAKAAAOQAAAOAEAJIgHAEQgGADgGAJQgEAIAHABIAGABIAFgBIAVAAIAjAAIAAhmIhIAAIBIAAIAABmIgjAAQAJAAAOgDQANgDgFgHQgGgGgJgEQAHgKgBgPQABgOgHgKQgGgKgJAAQgJAAgHAKgAEIlAIAFAAIgFAAIAAhmIAABmgAEIm0ICJAAIAAgtIiJAAgEgCigirQhMifh9jGQAkgRAOgFQANgGAfgHIACABQD6DmEMjmIASAGQAqAMAuAbQi+DMirFVQhLhGhTiBg");
	this.shape_6.setTransform(97.55,359.5072);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#003366").s().p("ArSWMQhkh3gliRQAOjQAskxQAbi1gUgcQgUgcgnkYQAZhsARjRQARjTAukZQAShTAQhDQARhEAOgzIAIgZQAJgeAIgXIALgcIABgCIADgGIAJgXQAMgfAJgiIAHgiQAFgbADgcIACgDIANghIATg0QARgxANgvINJAAIAAAqIhaAAIAAExIDEAAIAAkxIhKAAIAAgqIC9AAQATBZAQBEIAKAtIALAtIAJAgIAHAbIAKAlIAFAbIAEASIAHAmIAGAoIAEAXIAFAiQASCKARDLQA0E7ARBdQAQBcAEB8QAEB9gRDTQgRDSAkCrQAjCqA2EQQg0BYh6BTIgBABQkDAYjihcIgVgIQhLiCAPivQAOixgDmgIgykgQAEjzg4jmQg2jnAHg8Ig1D3Qg0DzANCuIhKFIIBKMeQgaB2hZAyIgDAAQjlANkDBbIgFgIg");
	this.shape_7.setTransform(99.05,448.225);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#333333").s().p("Ag2gCIABAAIgCAFgAA2gCIACAAIgCAEIAAgEg");
	this.shape_8.setTransform(75.6375,45.675);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#7A5228").s().p("Ag5BlQABgEAHgIQAGgIACgPIAAgDQABgIAGgFQAGgGgDgXQAPAdgHADQgHAEAJANQAJANgLgBQgLAAgDAFIgKANQgHAIgBAJQgEgLACgFgAhUBFQADgPgLgfQgJgZAIgOIABgBIABgBIAEgFIAEgDQAFgEAGABQAFAAAHAFIAEAEIACACQANAPgHAGQgIAJAWAFQgKAHgFAIQgFAIgFAOQgCgVABgTQABgSgCADQgDACgCAHQgOAfASASQARARgKgBQgKAAgEACQgDACAGAZQgVgUADgNgABhhzIABgBIAAABIgBAAIAAAAg");
	this.shape_9.setTransform(80.6186,47.3);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#C68950").s().p("AkOEAIAGgCQAXgHAcgIIACgpIAAgOIAAgoIABgLIAFjTQgVADgSgaQgRgZAAgRQAAgSgDgVQgEgVgIggQgFgTAEgOIACgFQAHgOAQgEQASgEANAQIAFAGQAJAKADACIAHAFQADAEAFAIQAFAIACALIABAHIACAdIACAVQABAYgDATIgGAkQgDALACAJIgCABIgFABIAHAEQAAABAAAAQAAAAAAAAQgBAAgBAAQAAAAgBAAQABACAEACIgEABIAAgBIgEgDQACAFADADIADAAQgHABgBABQAEAAAEAEIgBAAIABABIADACIgGAAIAHAEIgCAFIAEgCIABADIgCAAIABABQABAFgDACQACAAAFgDIgBACIgBABIACAAQgBAEABACIACgEIAAADQgCACAAAEIADgDIABAEIAAADIgCAGIADgDQAAABABAAQAAAAAAAAQABgBAAAAQAAAAABAAIAAgBIABABIgBACQAAACABAEIABgFIACAEIgBABIACAAIABADIAAACIABgBIACAEIAAABIAAAAIgFgEIAEAHIABAAQgBABgBAAQAAAAgBAAQAAAAgBABQAAAAAAAAIAEACQAAABAAAAQgBABAAAAQgBAAAAABQgBAAAAAAIAIAAQAAABAAAAQAAAAAAAAQAAAAAAABQAAAAAAAAIgBAAIgCABIABAAIgBAAQACADADAAIgCABIAAgBIgFgBQADADAFACIAAAAIABABQgFACAAABQAAAAABAAQABAAAAAAQABgBAAAAQABAAABAAIAAABIADAAIAAABIgDABIAGAAIABABIgEACQAEABADAAIAAAFQAAAAABgBQAAgBAAAAQABgBAAAAQAAAAABAAIACACIgBABIAAAAQADAEgBAEQABAAADgFIABABIgBABIABAAIAAAAQABAEADACIAAgCIAAABQAAACABADIACgDIADAEIABABIAAAGIADgDIAAAAIAFAEIACACIgBgBIAHAGIgDgBIAGADIACACQgBAAAAABQgBAAAAABQgBAAAAABQAAAAAAAAQACAAAFAAIADADIAAAAIABAAIABAAIgEACQADACADgCIADACIgDAAIAFACIAAADIACgCIABABIgCAEQACgCADAAIAGADIgCABIADAAIAFADIABACIAAgBIAHAEIAAADIABgCIADABIAAAAIgCAEIAGgBIACAAIgCACIAFAAIABAAIgCADIgBgBIgFABQAEACAFAAIACgBQgEAEAAACQADgCAFAAIAAAAIABAAIADABIgDADIAHgBIACAFIABgFIADACIAAABIAAAAQAEADAAAEQACgBAAgGIAAAAIAAACIABgBIAAABIAAABIABgBQACAEAEABIgDgFIADADQAAADACACIABgEIACACIACACQACADAAADIACgEIAAgCIAAgCIACADIAGAFQgDgDAAgEIABABIADACIAAABIAEAAIABADIAAgCQACABADgBIABAAIAAAFQAAgCAFgBQAGgBAFADQAFACAAAFQADgBACgCIAFACIgBADIAGgCIAFABIAAABIABAAIgDADQAEAAACgCIADABIgCABIAEABQAAABABAAQAAAAAAAAQAAABAAAAQAAAAAAAAIACgCIAAgBIACAAQgCAFAAABQACgDAGgBIgBAAIABAAIADABIgBADIAGgCQAAACADACIgBgEIACAAIACABIAAABIABAAQAEACABAEQAAgBAAgFIABAAIAAABIAAABIABgBQADADAEABIgDgEIADABIAAAAQAAADADABIgBgEIABAAIADACIADABIADAFIABgDIAAgCIgBgBIABAAIACABIAHAEIgEgEIAEABIAAAAIABAAIADAAIACACIgBgBIAGABIAAAAIgBAAIgFABIAHAAIACAAQgBAEABACQABgDAHgCIADABIgDADQAEAAACgCQAGgBACAEIAAgEIAZADIgBAGIgCAOQAAAQADAYIAuARIATAHIgSgGQiHBziBAAQiCAAh8hzgAjOjNQgGAGgBAIIAAADQgDAPgGAIQgGAIgBAEQgCAFAEAKQABgIAHgIIAJgOQAEgEALAAQALABgJgNQgKgNAIgEQAHgDgPgdQADAXgGAFgAj/kZIgEADIgEAFIgBABIgBABQgIAOAJAaQALAfgDAOQgDAOAVAUQgGgZADgCQAEgDAKABQAJABgRgRQgRgSAOgfQACgHADgDQACgDgBATQgBATACAVQAFgOAFgIQAFgIAKgHQgWgGAIgIQAHgHgNgPIgCgCIgEgEQgHgFgFgBIgCAAQgFAAgEAEgADvBAQgJgKgpgSQhlAoABAUIgjgYQgOgJgHgdQgHgegMgfQgMghhMgbQhNgagKg/QgGgigDg7IACgEIABgBIAAAAIAAAAIAAAAIAAABIAAAEIACgEIABgEIgBgBIAAAAQAEADACAAQgCgCABgGIAAAAIAAgBIABgDIADAEQAAgEgBgDIAGgCIgFgBIACgCIABAAIABgBQADgDAEAAQgBgBgFgBIAAgBIABAAIABAAIAAgBQADgCACgEIgFADIABgCIACgBQADAAADgCIgFgBIADgDQAFgEADABIgGgCIABgBIABgBIAEgEIAIAAIgDgBIACgBIAGgGQgEADgFgBQAEgBACgDIABABIgBgBIAHgBQAHABAMAFIADgHIACgBIgBAAIAAgBIACgDIAAAGIACgIIABgBIgBgBIAGAEQgCgDABgHIABgCIACADQABgEgCgCIABgCIABgCIAEgCIgCgBIAFgFIAAAAIAAAAIANAUQAQAeAOAvIAGAUQAhB4AaBCQAaBBCIALQAuAEAkAFIABAAIABAAQgMA9gDAGQgDAHgWAWQAHgogIgKgAiIlGIABAAIgBAAIAAAAgAh/lQIACAAIABAAIgCABIgBgBg");
	this.shape_10.setTransform(97.8467,72.8064);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#212121").s().p("AA6AsIgTgOIgEgDIgUgNIgYgSIgTgOIgHgFIgMgIIgNgKIgbgWICvB/IgegUg");
	this.shape_11.setTransform(81.55,29.2);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#140D05").s().p("AChFFQgBADgEAAIACgEIgDAAQgGABgCADQgBgBABgEIgBAAIgIAAIAGgCIABABIAAgBIgGgBIAAACIgBgCIgEgBIgBAAIAAAAIgDgBIADAEIgHgEIgBgBIgBAAIAAABIAAADIgBADIgDgFIgCgCIgDgBIgBgBIAAAFQgCgBAAgEIAAAAIgDAAIACADQgEgBgCgCIgBAAIAAgBIAAAAIgBgBQAAAFgBABQgBgDgEgCIAAgBIgBAAIgCgBIgBgBIAAAFQgCgCgBgCIgGACIACgEIgDAAIgBAAIAAgBQgGACgBACQgBgBADgFIgCABIgBAAIgCADQAAgBABAAQAAAAAAAAQAAgBgBAAQAAAAAAAAIgFgBIADgBIgDgCQgCADgFgBIADgDIgBABIAAgBIgEgBIgHABIACgDIgGgBQgBABgEABQABgEgGgDQgFgCgFABQgFAAgBADIABgFIgBgBQgEACgBgBIAAACIgCgEIgEABIABgBIgEgDIAAAAQAAADADADIgHgFIgBgCIgBACIAAACIgBADQAAgCgBgDIgCgDIgEgCIAAAFQgDgDAAgDIgCgCIACAFQgDgCgDgDIgBAAIABgBIgBAAIAAAAIAAgBIAAgBQgBAGgBACQgBgEgDgDIgBgBIAAgBIgDgBIAAAEIgDgFIgGABIADgDIgDgBIgBABIAAgBQgGAAgCADQAAgCADgFIgCABQgEAAgEgBIAFgBIAAAAIACgCIAAgBIgGABIADgCIgCgBIgHACIACgEIAAAAIgCgCIgBACIgBgDIgGgEIgBABIgBgBIgEgDIgDAAIABgBIgFgEQgDABgCABIACgEIgBAAIgCABIAAgCIgFgCIADAAIgEgDQgCACgDgCIADgBIAAgBIgBAAIAAAAIgDgCQgFgBgCABQAAgBAAAAQAAAAAAgBQABAAAAgBQABAAABgBIgCgCIgGgDIACABIgGgGIAAACIgCgDIgEgEIgBABIgCADIAAgGIgBgCIgEgEIgBAEQgCgDABgDIgBgBIAAADQgCgCgBgFIgBAAIAAABIAAgBIgBgBQgCAEgCABQACgEgDgEIgBgBIABgBIgCgCQAAAAAAAAQgBABAAAAQAAABgBAAQAAABAAABIgBgGQgDABgEgCIAFgCIgCgBIgFAAIADgBIAAAAIgDgBIgBAAQAAAAgBAAQgBAAAAAAQgBAAAAAAQgBAAAAABQAAgCAEgCIAAgBIgBAAQgEgBgEgDIAFABIABAAIACgBQgDABgDgDIABAAIAAgBIACAAIABgBQAAAAAAAAQAAAAAAAAQAAgBAAAAQAAAAAAAAIgIgBQAAAAABAAQAAAAAAgBQABAAAAAAQABgBAAgBIgEgBQAAgBAAAAQAAAAABAAQABgBAAAAQABAAABAAIgBgBIgFgGIAFADIABAAIAAAAIgCgFIgCABIABgCIgCgDIgBgBIABAAIgCgEIgBAGQgCgFABgDIAAgBIAAgBIgBAAQAAABAAAAQgBAAAAAAQAAAAgBAAQAAAAAAAAIgDACIACgFIAAgEIgBgEIgEAEQAAgFACgBIAAgDIgCAEQgBgDABgEIgBABIABgBIAAgCQgEADgCAAQADgDgCgEIAAgBIABgBIgBgDIgEADIACgFIgGgEIAFgBIgCgCIgBgBIAAAAQgEgEgDABQABgCAGAAIgCgBQgEgDgCgEIAEACIAAABIAFAAQgFgDgBgCQABAAABAAQABAAAAAAQABAAAAAAQAAAAAAAAIgHgEIAFgCIABAAQgBgKACgLIAGgjQADgUgBgXIgBgUIgDgeIgBgGQgCgMgEgIQgFgIgEgDIgHgGQgDgCgIgKIgFgGQgNgPgTAEQgPADgHAOIgBAAQAEgbgFgJIAAAAIACAAQAHACAEgCIADgCQAFgGAIgFQgMgBgFgJQAHgFAFgTQgHACgGgNQAOAAAFgKIABgCIgBAAQgOgBgGgIQANgDABgOQgDgGgBgIIAAgBIAAgEIABACQAEAGAEABIACgJQABgJgCgGQgBgHgFgFIADABIADABIAEACIAJAHQgBgGAAgGIADgJIAAABQAAAJAKAIQgDgJABgDIABgBIAAAAQAGAHADgDQgGgGgDgIIAAgKIANAJIALAJIAIAEIATAPIAZASIATANIAFAEIATANIAeAVIAAAAIAAAAIgBAAIgEAFIABABIgDACIgCADIAAABQACADgBAEIgDgEIgBADQgBAGACADIgGgDIABABIAAABIgDAIIAAgGIgBACIgBACIABAAIgBAAIgDAHQgNgFgHAAIgGAAIAAACIgBgBIAAgBIgCABIACAAQgBACgEACQAEAAAEgDIgFAGIgDABIAEABIgJAAIgEAFIgBAAIAAABIAGADQgEgBgFAEIgCADIAEABQgDACgDAAIgBAAIgBACIAFgCQgCAEgEACIABABIgBgBIgBAAIgBABQAFABACACQgEAAgEADIAAAAIgBAAIgCADIAEABIgFACQABACgBAEIgCgDIgCADIABABIgBAAQgBAFADADQgCAAgEgEIAAAAIAAACIgBADIgCAAIAAAAIABgBIAAAAIgBABIAAAAIgCAEQADA7AFAiQAKA+BNAbQBNAaALAhQAMAhAHAdQAHAdAPAKIAiAXQgBgTBmgoQApARAIALQAIAKgGAnQAVgWAEgHQACgFAMg9IALABIgBAAIgBAAIABABQgKA7gMApQADACgBAEIgDgDIAAACQAAAHACADIgFgCIgBABIAAAIIgBgGIgDAFIACAAIgCABIgBACIAAADIgBgBIAAAAIgBAAIABAAIgBABIACADQgDgBgCACIgDACQABADgCADIgBgEIgCACQgDAGAAAEIgDgFIgBABIgFAHIACgGIgEACIAAABIABABIgCgBIgCABIgBADIgBgBIAAgBIgBABIABAAIgFABQgJAEgLADIgZgDIgBADQgCgDgGAAgAjgiHIAAAAIAAAAgAiPiwIABgBIgBAAIAAABg");
	this.shape_12.setTransform(98.475,57.875);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AD+aZIAAhIICNAAIAABIgAEHYyIALAAIgFAAIgGAAgAESYyIgLAAQgHgCAEgHQAGgKAGgDIAHgDQgEgKAAgNQAAgPAFgKQAHgJAJAAQAJAAAGAJQAHAKgBAPQABAPgHAJQAJAEAGAHQAFAGgNADQgOADgJABgAEHYygAIZVWIi9AAIggAAItJAAQgygcgPgRQgOgSgLgJIAAgBIgMgYIADAEIgDgFIAFhHIA0mwQguknATkrQASkqhGhMQhHhMg/jTQANgtC9hBQB8g6A/gPQABg3AcgiQAGgHAIgHQAtgmBcgBIAAAnIAAAOIgCAqQgcAHgYAIIgFACIgCgBQgfAHgNAFQgOAFgkARQB9DHBMCeQBTCCBLBGQCrlWC+jMQgugagqgNIgTgHIgugRQgDgYAAgQIACgOIABgFIATAFQAQAGAJAIQATARgEAcIB8AnQBaAdBsAlQC9BCAQBlQhCCbhHAsQhIAsgkCOQBTG3gvDQQAyFbANBSIACALQgFDSgIARIgGAMIgGAMIgCAEIAAABIgFAKQgPAXgqAnIgMALgAF0uXQgWgKg/gLIgBAAIABAAIABAAIgLgCIgBAAIgBAAQgkgFgugEQiJgMgahBQgZhBghh4IgGgVQgOgvgQgeIgNgUIAAAAIiwiBIAbAXIAAAKQADAIAHAGQgDADgGgHIgBAAIAAAAQgCAEADAJQgKgIAAgJIAAgBIgCAJQgBAGACAGIgJgHIgFgCIgCgBIgEgBQAFAEABAIQACAGgBAJIgCAJQgEgBgEgHIgBgBIAAAEIAAABQABAIADAGQAAAOgOADQAGAIAOABIABAAIgBACQgFAKgOAAQAGANAHgCQgEATgIAFQAFAJAMABQgIAEgEAGIgEADQgEACgHgCIgCAAIAAAAQAFAJgEAbIgBAGQgRgigEAEIABgOQgGgKgGgDQAKgJgDgOQgGgHgEgLQAIAGADAAIAAgLQgEgUgMgHQAJAAAOAFQgDgDAAgDIgCgEQgBgGAAgGQABAFAEAEQADgHAAgIQgEgEgDgGIAEABIgFgNQAGAHAEAAIACgMQgDgTgMgIQAKgBANAHQgFgKABgMQACAKAMAGIABAAIgBAAQgFgKABgCQAGADADAAIABgBIgBAAIgHgHQgFgHgEgIQASAIANgCIAAAAQACgEgNgEQgMgEgpAIQgDglAVgkQAzgEAcAUQAMgyA9g1QBOguBfgLIgFABQApgNAxAMQAyAMAyAbQAggLAFAlQB0AtAZBEQAZBFAHAuQAIAtAEAmQACAagSAuQgHATgLAWIgIAsQAMBiAGBLQAFA8gaAAQgHAAgJgDg");
	this.shape_13.setTransform(98.15,168.887);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Scene_4_Character, new cjs.Rectangle(13.1,0,172,621.7), null);


(lib.Scene_4_Background = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("Eg2wg2wMBthAAAIAADyMAAABJnIAAF6IAAD0IAAMdIAAJ9MhthAAAIAAk0IAA0FIAAk5IAAk6g");
	this.shape.setTransform(350.525,350.525);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("Eg2wgH+IZSkHIBEB5IAEAJIAbAwIA6BnIC9FUIAAByI+sMsgAdii2IAAipIZPAAIAAMcg");
	this.shape_1.setTransform(350.525,592.85);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#666666").s().p("Eg2wARWIAAk0IesssIAAhyIAAmOIi9A6Ig6hnIBPAAQCUhVASgEQgWichyhiQxAgEriB2IAAk5MBgBAAAQplF7XFCjIAAD0I5PAAIAACpIZPJzIAAJ9g");
	this.shape_2.setTransform(350.525,590.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#336633").s().p("A7BDkIC9g6IAAGOgEg2wgBnQLih2RAAEQByBiAWCbQgSAEiUBVIhPAAIgbgwIgEgJIhEh4I5SEGgEApRgGgQEyiMDzgKIE7E5IAAF6Q3FiiJll7g");
	this.shape_3.setTransform(350.525,520.75);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AiVf6MgAPhCeIFJiPMAAABJng");
	this.shape_4.setTransform(684.55,259.825);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#0099CC").s().p("Eg2wAlbMAAAhK1MBthAAAIAADyIlKCPMAAPBCeQjzALkyCLg");
	this.shape_5.setTransform(350.525,239.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,703.1,703.1);


(lib.Scene_3_legs = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("ABvgfQgOg6AUhQQALgxAgABQArgIAPBpQADAXgHAwQAHAKANALQADADAEADQABAKALAMQAdAfgEAUQgDAUAPAlQAQAlgOBfACEg3QgJgkAEgYQAngJAWAPQAEAUgFAbQAMACAMAGQACACABADACEg3QAcgLAbAEABvgfQANgLAGgMQABgBABAAABngYQABgSgFgOQgbhVAqhIQAwg3AxA+QApAxgSCBABKDqQgDh2ABgTQACgxgDgVQAXglAFgLQACgCACgBQAEgDAEgEAiKhPQABgpgNgxQgKgxghABQgrgIgPBpQgCAYAHA2IATgXQAEgBADgBQAegLAfgBQACgUgCgQQgogJgVAPQgEASAEAYAkJgTIATgXAkYDoQgTh3ACgkIAVhTIALgNAiKhPQADABADAAQACAFACAFQAVhOgohDQgwg3gxA+QgqAzAVCIAifhPQAKAAALAAAiAhEQAOAwAnApQAVAogDCr");
	this.shape.setTransform(29.8433,23.9698);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#003399").s().p("ADoChQgygCgZAAQgZAAg6gHQgDh2ABgTQACgwgDgVQAXgmAFgLIAEgDIAIgHQANgLAGgMIACgBQAcgLAbAEQAMACAMAGIADAFQAHAKANALIAHAGQABAKALAMQAdAggEAUQgDAUAPAkQAQAlgOBfQgHAEgbAAIgagBgAkYCWQgTh3ACgjIAVhUIALgNIATgXIATgXIAHgCQAegLAfgBIAVAAIAGABIAEAKQAOAwAnAqQAVAogDCqg");
	this.shape_1.setTransform(29.8433,32.1754);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CCCCCC").s().p("ACPgbQAogKAVAQQAEAUgFAaQgagFgdAMQgJgjAEgYgAjMgVQAWgQAnAKQADAPgDAUQgfABgdAKQgEgWADgSg");
	this.shape_2.setTransform(28.1572,15.2195);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AjjhMQAxg+AwA3QAnBDgUBNIgFgKIgFgBIAAgDQAAgngMgvQgKgwggAAIgBAAIgBAAIAAgBIgFAAIAAAAIgBAAQgkABgOBZIgBADIAAAEIgBAOQAAAYAGAoIgTAXQgWiHArgzgABzBJQgbhUArhIQAwg3AxA+QApAxgSCAQgOgLgGgKQAEghAAgVIgBgRIAAgBIAAgCQgOhdglgBIAAAAIAAAAIgGAAIAAABIgBAAIAAAAQgfAAgLAtIAAAAIAAADQgMAtAAAoQAAAcAGAYIgIAHQAAgSgFgOgAB6AuQAAgoAMgtIAAgDIAAAAQALgtAfAAIAAAAIABAAIAAgBIAGAAIAAAAIAAAAQAlABAOBdIAAACIAAABIABARQAAAVgEAhIgDgFQgMgGgNgCQAFgbgEgUQgVgPgoAJQgEAYAJAkIgCABQgGAMgMALQgGgYAAgcgAjrAXIABgOIAAgEIABgDQAOhZAkgBIABAAIAAAAIAFAAIAAABIABAAIABAAQAgAAAKAwQAMAvAAAnIAAADIgWAAQADgUgDgQQgngJgWAPQgDASAEAYIgHACIgTAXQgGgoAAgYg");
	this.shape_3.setTransform(28.1634,10.9948);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Scene_3_legs, new cjs.Rectangle(-1,-1,61.7,50), null);


(lib.Scene_2_can_he_do_it = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("Can he do it?", "bold 40px 'Brothers OT'", "#FF0000");
	this.text.textAlign = "center";
	this.text.lineHeight = 42;
	this.text.lineWidth = 285;
	this.text.parent = this;
	this.text.setTransform(158.85,25);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AYPAAQAAEGnHC6QnFC5qDAAQqCAAnGi5QnGi6AAkGQAAkFHGi6QHGi5KCAAQKDAAHFC5QHHC6AAEFg");
	this.shape.setTransform(155.05,63.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AxIHAQnFi6gBkGQABkFHFi6QHGi5KCAAQKCAAHGC5QHHC6AAEFQAAEGnHC6QnGC5qCAAQqCAAnGi5g");
	this.shape_1.setTransform(155.05,63.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Scene_2_can_he_do_it, new cjs.Rectangle(-1,-1,312.1,128.6), null);


(lib.Scene_2_btn_yes = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Yes
	this.text = new cjs.Text("Yes", "bold 40px 'Brothers OT'", "#FF0000");
	this.text.textAlign = "center";
	this.text.lineHeight = 42;
	this.text.lineWidth = 94;
	this.text.parent = this;
	this.text.setTransform(83.15,2);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AnrkwIPXAAIAAJhIvXAAg");
	this.shape.setTransform(83.175,30.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF0000").s().p("AnrExIAAphIPXAAIAAJhg");
	this.shape_1.setTransform(83.175,30.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.text,p:{color:"#FF0000"}}]}).to({state:[{t:this.text,p:{color:"#990000"}}]},2).to({state:[{t:this.shape_1},{t:this.shape},{t:this.text,p:{color:"#333333"}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(33,-1,100.4,63.1);


(lib.Scene_2_btn_no = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.no_btn = new cjs.Text("No", "bold 40px 'Brothers OT'", "#FF0000");
	this.no_btn.name = "no_btn";
	this.no_btn.textAlign = "center";
	this.no_btn.lineHeight = 42;
	this.no_btn.lineWidth = 76;
	this.no_btn.parent = this;
	this.no_btn.setTransform(39.95,2);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AmPkyIMfAAIAAJlIsfAAg");
	this.shape.setTransform(39.95,30.725);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF0000").s().p("AmPEzIAAplIMfAAIAAJlg");
	this.shape_1.setTransform(39.95,30.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.no_btn,p:{color:"#FF0000"}}]}).to({state:[{t:this.no_btn,p:{color:"#990000"}}]},2).to({state:[{t:this.shape_1},{t:this.shape},{t:this.no_btn,p:{color:"#333333"}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,81.9,64.1);


(lib.Restart = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("AzxGTIAAslMAnjAAAIAAMlg");
	this.shape.setTransform(150.8,30.675);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(3).to({_off:false},0).wait(1));

	// Layer_1
	this.text = new cjs.Text("Restart", "bold 58px 'Brothers OT'");
	this.text.textAlign = "center";
	this.text.lineHeight = 60;
	this.text.lineWidth = 289;
	this.text.parent = this;
	this.text.setTransform(146.3,2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(2).to({color:"#999999"},0).wait(1).to({color:"#FF0000"},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-9.6,292.7,80.6);


(lib.play_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#AD0000").s().p("AgoBHQgRglAJgyQAIgzAhgfQAggfAbgDQhZCDA8CGQgugZgRglg");
	this.shape.setTransform(8.067,16.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("AC8gFYAAAAAAABAAACYAAACgBACAAAFYAAAEAAAFgBAGYAAACAAABAAACYgBACAAABAAACYgBADgBAEgBAEYgBAEAAAEgBAEYgCAEgCAEgBAFYgCAEgCAFgCAEYgDAEgCAFgDAFYgDAEgDAFgEAFYgDAFgEAEgEAEYgIAKgKAIgLAIYgVAQgcANgeADYgQADgPAAgQgCYgQgCgQgDgPgGYgggNgcgWgVgdYgVgcgMgjgBgkYAAgIABgJAAgJYAAgEABgFABgEYABgFABgEABgEYACgJADgIADgIYAEgIAEgJAFgHYAEgIAGgGAFgHYAGgHAFgGAHgGYAGgGAHgFAHgFYAHgFAHgFAIgDYAegQAhgEAeACYAIAAAHACAHABYAIABAHACAHACYANAFAOAFALAHYAWAPASASANARYANASAIARAFAPYAFAPACANABAIYABAIAAAFAAAAYAAAAAAABABAAYAAAAABgBAAAAIAAAAYAAAAAAgBAAgDYAAgCAAgDgBgEYAAgJgBgNgFgPYgEgPgIgTgNgSYgOgTgRgSgXgQYgDgCgDgCgDgCYgEgBgDgCgDgCYgHgDgHgCgHgDYgHgCgHgDgIgBYgIgBgIgCgIAAYgEgBgEAAgEAAYgEAAgDAAgEAAYgJAAgIABgIACYgJABgJACgIADYgEABgEABgEACIgDABIgCABIgBAAIgGADYgIAEgIAFgHAFYgIAFgIAGgGAGIgFAEIgBABIgBABIAAABIgDACIgJAKYgGAIgGAHgEAIYgGAIgEAIgEAJYgDAJgEAJgCAJYgBAEgBAFgBAFYAAAFgCAFAAAEIgBAOIAAACIAAACIAAACIAAAHYABAmANAmAXAeYADAEADAEADAEIAJAJYADAEAEADADADYAEADADADAEADYAOALAQAJARAHYAQAGARAEASACYAPABARAAAQgDYAIgBAIgCAHgCYAIgDAHgCAHgDYAOgGANgIALgJYAFgEAFgEAFgFYADgCACgCACgDYACgCADgDACgCYAEgFAEgEADgFYAEgFADgFADgFYADgFACgFACgFYADgFACgEABgFYACgEABgFACgEYABgEAAgEABgEYAEgQgBgNABgIYAAgEAAgDAAgCYAAgCAAgBAAAAYAAgBgBAAAAAAYgBAAAAAAAAAB");
	this.shape_1.setTransform(17.9853,18.3791);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF0000").s().p("AiBCCQg2g2AAhMIAAgDQABhKA1g0QAZgaAfgNQAigPAnAAQApAAAiAPQAZALAVATIAJAJQAwAvAGBAIAAALIAAACIAAACIAAADQAAAcgHAZQgNArgiAiIgJAJQgzAthGAAQhLAAg2g2g");
	this.shape_2.setTransform(18.425,18.375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.9,-0.8,37.9,38.4);


(lib.Pallet_Jack = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("ArsWYIiai+Qh/AkgdAQQgEADgcAIQgPA3giAvQg/BXhgAGQhXAFhEhCQgdAUgjADQhMAGg4hPQg5hPgEhzQgEheAghKQgWgkAKgwQAWhjAIgFIgHgOQgQg6AAg+QABmMgKmKQgLmGAIl8Qhvg2gki7Qgli8AAhLQABhKAhg0QAhg0DLBDQDLBCArAbQArAagNCFQgOCEg4CHQg3CHiCgIQALEuAEECQAEE8ATE9IA0EGQAoDZA0gsQAPhGB5mYQAsgxA7gMQCEAPAfALQAgALAZALQAaALgggNQBUBLALAZIByD0QBdACBMgmQAIgEAKgCQCegkCdgnID2hBIRlkQIASgFQBWgVBWAkQA6AZgVA0QgIAUgSALIADgBQg0AjhDAbQhDAahYAcQgTBqgKAGQgKAHgQAHIgwAUQgfANgeAAQgfgBgVgOQgVgPgIg7QhFAKkBBSIlyB1IrfDWIBXC8IU0mQQDhg8DZhMQA/gWBAgUQCWgvCUghQB3gbA8ArQA7ArgdBBQgdBAg0AVQg0AVg3AcIgCABQgxAXgyAWQADAggVAiQgWAhg8AUQg9ATgUABQgTACgOgRQgOgRgZgkQkzB1gZAII3DIRQg/AWg1AAQhgAAg9hMgA58NSIACABIgCgFIAAAEgAYPIZQhTAmA3AoQA2AoCahQQAVgig7gVQgVgHgYAAQgrAAg2AYgAQ+EDQhVARAjAsQAjArBugpQBugqg8gTQgggKgnAAQgiAAgoAIgA4+uUQAUASAggQQBQgkAUiWQATiWgGgjQgGgkgYgKQgYgJgbgHQgbgIg8gCIAACtQAWBLBDAbIAAA3IhKgkIgIAAQgEBjAAAwgA771LQgaBJAVCPQAUCPBQAzIAAiTQg4gCgfg7IAAgxQBOBBAJg0IAAjNQgWgLgSAAQglAAgSAyg");
	this.shape.setTransform(114.7521,79.8857,0.6093,0.5296);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pallet_Jack, new cjs.Rectangle(0,0,229.5,159.8), null);


(lib.P4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#7D5429").ss(4,1,1).p("AvnwZIfPAAMAAAAgzI/PAAg");
	this.shape.setTransform(100,105);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#54381B").s().p("AvnQaMAAAggzIfPAAMAAAAgzg");
	this.shape_1.setTransform(100,105);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.P4, new cjs.Rectangle(-2,-2,204,214), null);


(lib.P3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#7D5429").ss(4,1,1).p("AvnwZIfPAAMAAAAgzI/PAAg");
	this.shape.setTransform(100,105);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#54381B").s().p("AvnQaMAAAggzIfPAAMAAAAgzg");
	this.shape_1.setTransform(100,105);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.P3, new cjs.Rectangle(-2,-2,204,214), null);


(lib.P2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#7D5429").ss(4,1,1).p("AvnwZIfPAAMAAAAgzI/PAAg");
	this.shape.setTransform(100,105);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#54381B").s().p("AvnQaMAAAggzIfPAAMAAAAgzg");
	this.shape_1.setTransform(100,105);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.P2, new cjs.Rectangle(-2,-2,204,214), null);


(lib.P1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#7D5429").ss(4,1,1).p("AvnwZIfPAAMAAAAgzI/PAAg");
	this.shape.setTransform(100,105);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#54381B").s().p("AvnQaMAAAggzIfPAAMAAAAgzg");
	this.shape_1.setTransform(100,105);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.P1, new cjs.Rectangle(-2,-2,204,214), null);


(lib.Overpacks = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("Ap4qMIAbArIAFAIIAAYOIAAArIgSgVIgNAAIgbgkIACgXIhLhvIgWgHIgbgjIgKgtIgng2IgQACIgYgkIgEgYIgUghIAAg3IAA4tIXaAAIEhHJIAAYXIAAAoIgqAAIgeBDIhCAAIhMhDIl4AAIgeBIIhbAAIhIhIInmAAIgkBPIhRAAIg7hMIgxAAQgBgCgBgBIgCgFApdpiIgbgqApdphIAAgBIAAAAAt9wrIEFGfAN+piI3bAA");
	this.shape.setTransform(89.4,106.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AK9FfIAAg5IBfAAIAAA5gALHEOIAAgYIBMAAIAAAYgAK9DaIAAgwIBfAAIAAAwgAHtgqIAAgpIEZAAIAAApgAsbj+IAAgsIBfClIABAsgAHth0IAAgpIEZAAIAAApgAsbkyIAAgsIBfClIABAsg");
	this.shape_1.setTransform(95.625,72.425);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AKtGJIAAjWIB8AAIAADWgAK8F2IBfAAIAAg5IhfAAgALFElIBMAAIAAgYIhMAAgAK8DxIBfAAIAAgwIhfAAgAHTAMIAAigIFDAAIAACggAHrgTIEaAAIAAgpIkaAAgAHrhdIEaAAIAAgpIkaAAgAsmjQIgCi4IB3DRIACC3gAscjnIBfClIAAgsIhgilgAsckbIBfClIAAgsIhgilg");
	this.shape_2.setTransform(95.775,70.125);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E2984A").s().p("Ap8A7Ig7hLIgxAAIAAgqIXWAAIAAAoIgrAAIgeBBIhCAAIhLhBIl4AAIgeBGIhbAAIhHhGInnAAIgkBNgArqgTIgDgEIAFgjIAAAqIgCgDg");
	this.shape_3.setTransform(103.85,207.6);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#C68642").s().p("ACBDaIgOAAIgagkIACgXIhMhvIgUgHIgbgjIgLgsIgmg2IgRACIgXgkIgFgYIgUghIAAg3IElGzIgFAjIADAEIACADg");
	this.shape_4.setTransform(14.65,182.025);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#7D5429").s().p("ApYPwIklmzIAA4tIEFGfIAbAsIAFAIIAAYNIAA4NIgFgIIAAgBIABAAIXaAAIAAYWgALtBWIB8AAIAAjVIh8AAgAITkmIFDAAIAAiiIlDAAgArnoDIB3DRIgCi4Ih3jRgAN+omgApcomIgcgrIkFmfIXaAAIEhHKgAt9vwg");
	this.shape_5.setTransform(89.4,100.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Overpacks, new cjs.Rectangle(-1,-1,180.8,215.5), null);


(lib.Main_Character = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AAXiDIAAAMIgeAAIAAgMAAXiDIBLAAIAAExIjDAAIAAkxIBaAAIAAgpIAeAAg");
	this.shape.setTransform(130.575,322.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FF0000").ss(1,1,1).p("AgjgyIBHAAIAABlIgkAAIgTAAIgLAAIgFAAg");
	this.shape_1.setTransform(127.55,322.325);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#666666").s().p("AgPAbIAAgMIAAgpIAfAAIAAApIAAAMg");
	this.shape_2.setTransform(131.35,308.125);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AhFBdIAAhIICLAAIAABIgAg8gKIALAAIgGABIgFgBgAgxgKIgLAAQgHgBAEgIQAGgJAGgDIAHgDQgFgKAAgOQAAgOAGgKQAHgKAIAAQAJAAAGAKQAHAKAAAOQAAAQgHAJQAKAEAFAHQAFAGgMADQgPADgJAAgAg8gKg");
	this.shape_3.setTransform(130.6,328.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#0066FF").s().p("AhDAWIAAgrICHAAIAAArg");
	this.shape_4.setTransform(130.775,313.575);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AhhCZIAAkxIBaAAIAAAMIAeAAIAAgMIBLAAIAAExgAhFCBICLAAIAAhIIiLAAgAgrguQgGAKAAAPQAAANAFAJIgHADQgGADgGAKQgEAHAHACIAFAAIAGAAIAUAAIAjAAIAAhmIhHAAIBHAAIAABmIgjAAQAKgBAOgDQAMgDgFgGQgFgHgJgEQAGgIAAgPQAAgPgGgKQgHgJgJAAQgIAAgHAJgAhBAaIAFAAIgFAAIAAhmIAABmgAhBhaICHAAIAAgsIiHAAg");
	this.shape_5.setTransform(130.575,324.875);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#000000").ss(2,1,1,3,true).p("AlogXQAkgRAOgFQAOgFAfgHQD7DmEMjkQAyALA5Ag");
	this.shape_6.setTransform(97.45,103.6626);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AieBgQhNieh9jGQAkgRAPgFQANgFAfgIQD7DoEMjmQAyALA5AhQi/DMirFVQhKhGhTiCg");
	this.shape_7.setTransform(97.45,127.4);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#333333").ss(0.5,1,1).p("AsduuQCXB4BSFKQgyFMBCEbQgWCDgSCPQgTCOgtDSQgGAeARAiQAKAfAgAZQARANBCA/AMeuwQiyCXgwBgQgvBggWBXQCAHagxDPQBTIygFAeQgMAtAFgLQgKAXgIASQgEAGgCAGQgHAOgBACAJtNeQgMAbg+A4");
	this.shape_8.setTransform(97.35,210.95);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#140D05").s().p("AChFFQgBADgEAAIACgEIgDAAQgGABgCADQgBgBABgEIgBAAIgIAAIAGgCIABABIAAgBIgGgBIAAACIgBgCIgEgBIgBAAIAAAAIgDgBIADAEIgHgEIgBgBIgBAAIAAABIAAADIgBADIgDgFIgCgCIgDgBIgBgBIAAAFQgCgBAAgEIAAAAIgDAAIACADQgEgBgCgCIgBAAIAAgBIAAAAIgBgBQAAAFgBABQgBgDgEgCIAAgBIgBAAIgCgBIgBgBIAAAFQgCgCgBgCIgGACIACgEIgDAAIgBAAIAAgBQgGACgBACQgBgBADgFIgCABIgBAAIgCADQAAgBABAAQAAAAAAAAQAAgBgBAAQAAAAAAAAIgFgBIADgBIgDgCQgCADgFgBIADgDIgBABIAAgBIgEgBIgHABIACgDIgGgBQgBABgEABQABgEgGgDQgFgCgFABQgFAAgBADIABgFIgBgBQgEACgBgBIAAACIgCgEIgEABIABgBIgEgDIAAAAQAAADADADIgHgFIgBgCIgBACIAAACIgBADQAAgCgBgDIgCgDIgEgCIAAAFQgDgDAAgDIgCgCIACAFQgDgCgDgDIgBAAIABgBIgBAAIAAAAIAAgBIAAgBQgBAGgBACQgBgEgDgDIgBgBIAAgBIgDgBIAAAEIgDgFIgGABIADgDIgDgBIgBABIAAgBQgGAAgCADQAAgCADgFIgCABQgEAAgEgBIAFgBIAAAAIACgCIAAgBIgGABIADgCIgCgBIgHACIACgEIAAAAIgCgCIgBACIgBgDIgGgEIgBABIgBgBIgEgDIgDAAIABgBIgFgEQgDABgCABIACgEIgBAAIgCABIAAgCIgFgCIADAAIgEgDQgCACgDgCIADgBIAAgBIgBAAIAAAAIgDgCQgFgBgCABQAAgBAAAAQAAAAAAgBQABAAAAgBQABAAABgBIgCgCIgGgDIACABIgGgGIAAACIgCgDIgEgEIgBABIgCADIAAgGIgBgCIgEgEIgBAEQgCgDABgDIgBgBIAAADQgCgCgBgFIgBAAIAAABIAAgBIgBgBQgCAEgCABQACgEgDgEIgBgBIABgBIgCgCQAAAAAAAAQgBABAAAAQAAABgBAAQAAABAAABIgBgGQgDABgEgCIAFgCIgCgBIgFAAIADgBIAAAAIgDgBIgBAAQAAAAgBAAQgBAAAAAAQgBAAAAAAQgBAAAAABQAAgCAEgCIAAgBIgBAAQgEgBgEgDIAFABIABAAIACgBQgDABgDgDIABAAIAAgBIACAAIABgBQAAAAAAAAQAAAAAAAAQAAgBAAAAQAAAAAAAAIgIgBQAAAAABAAQAAAAAAgBQABAAAAAAQABgBAAgBIgEgBQAAgBAAAAQAAAAABAAQABgBAAAAQABAAABAAIgBgBIgFgGIAFADIABAAIAAAAIgCgFIgCABIABgCIgCgDIgBgBIABAAIgCgEIgBAGQgCgFABgDIAAgBIAAgBIgBAAQAAABAAAAQgBAAAAAAQAAAAgBAAQAAAAAAAAIgDACIACgFIAAgEIgBgEIgEAEQAAgFACgBIAAgDIgCAEQgBgDABgEIgBABIABgBIAAgCQgEADgCAAQADgDgCgEIAAgBIABgBIgBgDIgEADIACgFIgGgEIAFgBIgCgCIgBgBIAAAAQgEgEgDABQABgCAGAAIgCgBQgEgDgCgEIAEACIAAABIAFAAQgFgDgBgCQABAAABAAQABAAAAAAQABAAAAAAQAAAAAAAAIgHgEIAFgCIABAAQgBgKACgLIAGgjQADgUgBgXIgBgUIgDgeIgBgGQgCgMgEgIQgFgIgEgDIgHgGQgDgCgIgKIgFgGQgNgPgTAEQgPADgHAOIgBAAQAEgbgFgJIAAAAIACAAQAHACAEgCIADgCQAFgGAIgFQgMgBgFgJQAHgFAFgTQgHACgGgNQAOAAAFgKIABgCIgBAAQgOgBgGgIQANgDABgOQgDgGgBgIIAAgBIAAgEIABACQAEAGAEABIACgJQABgJgCgGQgBgHgFgFIADABIADABIAEACIAJAHQgBgGAAgGIADgJIAAABQAAAJAKAIQgDgJABgDIABgBIAAAAQAGAHADgDQgGgGgDgIIAAgKIANAJIALAJIAIAEIATAPIAZASIATANIAFAEIATANIAeAVIAAAAIAAAAIgBAAIgEAFIABABIgDACIgCADIAAABQACADgBAEIgDgEIgBADQgBAGACADIgGgDIABABIAAABIgDAIIAAgGIgBACIgBACIABAAIgBAAIgDAHQgNgFgHAAIgGAAIAAACIgBgBIAAgBIgCABIACAAQgBACgEACQAEAAAEgDIgFAGIgDABIAEABIgJAAIgEAFIgBAAIAAABIAGADQgEgBgFAEIgCADIAEABQgDACgDAAIgBAAIgBACIAFgCQgCAEgEACIABABIgBgBIgBAAIgBABQAFABACACQgEAAgEADIAAAAIgBAAIgCADIAEABIgFACQABACgBAEIgCgDIgCADIABABIgBAAQgBAFADADQgCAAgEgEIAAAAIAAACIgBADIgCAAIAAAAIABgBIAAAAIgBABIAAAAIgCAEQADA7AFAiQAKA+BNAbQBNAaALAhQAMAhAHAdQAHAdAPAKIAiAXQgBgTBmgoQApARAIALQAIAKgGAnQAVgWAEgHQACgFAMg9IALABIgBAAIgBAAIABABQgKA7gMApQADACgBAEIgDgDIAAACQAAAHACADIgFgCIgBABIAAAIIgBgGIgDAFIACAAIgCABIgBACIAAADIgBgBIAAAAIgBAAIABAAIgBABIACADQgDgBgCACIgDACQABADgCADIgBgEIgCACQgDAGAAAEIgDgFIgBABIgFAHIACgGIgEACIAAABIABABIgCgBIgCABIgBADIgBgBIAAgBIgBABIABAAIgFABQgJAEgLADIgZgDIgBADQgCgDgGAAgAjgiHIAAAAIAAAAgAiPiwIABgBIgBAAIAAABgADcFAIAAAAg");
	this.shape_9.setTransform(98.475,57.875);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#212121").s().p("AA6AsIgTgOIgEgDIgUgNIgYgSIgTgOIgHgFIgMgIIgNgKIgbgWICvB/IgegUg");
	this.shape_10.setTransform(81.55,29.2);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#333333").s().p("Ag2gCIABAAIgCAFgAA2gCIACAAIgCAEIAAgEg");
	this.shape_11.setTransform(75.6375,45.675);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#7A5228").s().p("Ag5BlQABgEAHgIQAGgIACgPIAAgDQABgIAGgFQAGgGgDgXQAPAdgHADQgHAEAJANQAJANgLgBQgLAAgDAFIgKANQgHAIgBAJQgEgLACgFgAhUBFQADgPgLgfQgJgZAIgOIABgBIABgBIAEgFIAEgDQAFgEAGABQAFAAAHAFIAEAEIACACQANAPgHAGQgIAJAWAFQgKAHgFAIQgFAIgFAOQgCgVABgTQABgSgCADQgDACgCAHQgOAfASASQARARgKgBQgKAAgEACQgDACAGAZQgVgUADgNgABhhzIABgBIAAABIgBAAIAAAAg");
	this.shape_12.setTransform(80.6186,47.3);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#C68950").s().p("AioGDIhbitQgphOg1hJQArggBkgaIACgpIAAgOIAAgnIABgLIAFjUQgVACgRgZQgSgZAAgSQABgRgEgVQgEgWgIggQgEgSADgOIACgGQAHgOAQgDQASgEANAPIAFAGQAJAKADACIAHAGQAEADAEAIQAFAIACAMIABAGIACAeIACAUQABAYgDAUIgGAjQgCAMABAJIgCAAIgFACIAHAEQAAAAAAAAQAAAAAAAAQgBABAAAAQgBAAgBgBQABACAEADIgEAAIAAgBIgEgCQACAEADADIADABQgHAAgBACQAEgBAEAEIgBAAIABABIADACIgGABIAHAEIgCAFIAEgDIABADIgCABIABABQABAEgDADQACAAAFgDIgBACIgBABIACgBQgBAEABADIACgEIAAADQgCABAAAFIADgEIABAEIAAAEIgCAFIADgCQABAAAAAAQAAAAABAAQAAAAAAAAQAAAAABgBIAAAAIABABIgBABQAAADABAFIABgGIACAEIgBAAIACABIABADIAAACIABgBIADAFIgBAAIAAAAIgFgDIAEAGIABABQgBAAAAAAQgBAAAAABQgBAAAAAAQgBABAAAAIAFACQgBAAAAABQgBAAAAAAQAAABgBAAQAAAAgBAAIAIABQAAAAABAAQAAAAAAABQAAAAAAAAQgBAAAAAAIgBABIgCAAIABABIgBAAQACADADgBIgCABIAAAAIgFgBQADADAFABIAAAAIABABQgEACgBACQABAAAAgBQABAAAAAAQABAAAAAAQABAAABAAIABAAIACABIAAAAIgDABIAGAAIABABIgEACQAEACADgBIAAAGQABgBAAgBQAAAAABgBQAAAAAAAAQABgBAAAAIACACIgBABIAAABQADAEgBAEQACgBACgEIABABIgBABIABgBIAAABQABAEADACIAAgDIAAABQAAADABADIACgEIADAEIABACIAAAGIADgDIAAgBIAFAEIACADIgBgCIAHAGIgDgBIAGAEIACABQAAABgBAAQgBABAAAAQAAABgBAAQAAABAAAAQADgBAFABIACACIAAAAIABABIABAAIgEABQAEACACgBIADACIgDAAIAFACIAAACIACgBIABAAIgCAEQACgBAEAAIAFADIgCABIADAAIAFADIABABIAAgBIAHAEIAAADIABgCIADACIAAAAIgCAEIAHgCIABABIgCACIAGAAIAAAAIgCACIgBAAIgFABQAEABAFAAIACgBQgEAFAAACQADgDAFAAIAAABIABgBIADABIgDADIAHgBIACAFIABgEIADABIAAABIAAABQAEADAAAEQACgCAAgGIABABIgBABIABAAIAAAAIAAABIABAAQACADAEACIgDgFIADACQAAADABADIABgFIADACIACADQACADAAACIACgDIAAgCIAAgCIACACIAGAFQgDgDAAgDIABAAIADADIAAABIAEgBIABAEIAAgCQACABADgBIABAAIAAAFQAAgCAFgBQAGgBAFACQAFADAAAEQAEgBABgBIAFABIgBADIAGgBIAFABIAAABIABgBIgDADQAEABACgDIADACIgCABIAEABQABAAAAAAQAAABAAAAQAAAAAAAAQAAABAAAAIACgDIAAAAIACAAQgCAEAAABQACgCAGgCIgBABIABAAIADAAIgBAEIAGgCQAAACADACIgBgFIACABIACABIAAAAIABABQAEACABADQABgBgBgFIABABIAAAAIAAABIABAAQADACAEABIgCgDIACAAIAAAAQAAAEADABIgBgEIABAAIADABIADACIADAFIABgDIAAgDIgBAAIABAAIACAAIAHAEIgEgDIAEAAIAAAAIABAAIADABIACACIgBgCIAGABIAAABIgBgBIgFACIAHAAIACAAQgBAEABABQABgDAHgBIADAAIgDAEQAEAAACgDQAGAAACADIABgDIAYADIgBAFIgCAOQAAARADAWQB7AtAbARQiOCgg8BfQg9BfhfC/Qhyh9gyhegAjLm3QgGAFgBAIIAAADQgCAPgHAIQgGAIgBAFQgCAEAEALQABgIAHgJIAKgNQADgFALABQALAAgJgMQgJgNAHgEQAHgEgPgcQADAWgGAGgAj8oEIgEADIgEAFIgBACIgBAAQgIAOAJAaQALAggDAOQgDANAVAVQgGgZADgDQAEgCAKABQAKABgRgSQgSgSAOgfQACgHADgDQACgDgBATQgBATACAVQAFgOAFgIQAFgHAKgIQgWgFAIgIQAHgIgNgPIgCgCIgEgEQgHgFgFAAIgBAAQgFAAgFADgADyipQgJgLgpgRQhlAoABATIgjgXQgOgKgHgdQgHgdgMghQgMghhMgaQhNgbgKg/QgGgigDg7IACgEIABAAIAAgBIAAAAIAAABIAAAAIAAAFIACgFIABgDIgBgCIABAAQADAEACAAQgCgDABgFIAAAAIAAgBIABgDIADADQAAgEgBgCIAGgCIgFgBIACgDIABAAIABAAQADgDAEAAQgBgCgFgBIAAAAIABgBIABABIAAgBQADgCACgEIgFACIABgBIACgBQADAAADgCIgFgBIADgDQAFgEADABIgGgDIABgBIABAAIAEgFIAIAAIgDgBIACgBIAGgGQgEADgFAAQAEgCACgCIABABIgBgCIAHAAQAHAAAMAFIADgHIACAAIgBAAIAAgCIACgCIAAAGIACgIIABgBIgBgBIAGADQgCgDABgGIABgDIACAEQABgEgCgDIABgBIACgDIADgCIgCAAIAFgFIAAgBIABAAIAMAUQAQAfAOAuIAGAVQAhB4AaBBQAaBBCIAMQAuAEAkAFIABAAIABABQgMA9gDAFQgDAHgWAWQAHgngIgKgAiFoxIABAAIgBABIAAgBgAh8o6IACgBIABABIgCAAIgBAAg");
	this.shape_13.setTransform(97.525,96.2625);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AoKX3QhCg/gRgNQgagVgQgjQgMgZAAgXQAAgIABgHQAtjTATiOQASiPAWiDQgliiAAiyQAAiFAViPQhSlIiXh5QCXB5BSFIQgVCPAACFQAACyAlCiQgWCDgSCPQgTCOgtDTQgBAHAAAIQAAAXAMAZQgKBHgdAtQhbgghlAHIhKivQgVi/AKg5QAKg6AEhiQAEhigCgsQgDgsgYheQgYhfBhoqQAYkIBKhKQBxhPEqhJQABg3AcghQAGgIAIgGQAtgmBcgCIAAAoIAAAOIgDApQhjAagsAhQA1BIApBPIBcCsQAyBeByB8QBei+A9hfQA9hfCOigQgcgRh6gsQgDgYAAgQIACgOIABgGIATAGQAQAFAJAJQATAQgEAcQCEApCQAwQCPAvByA6QizCXgvBgQgwBggVBWQBdFYAADMQAABNgOA5QBOISAAA5IgBAFIAAACQgJAiACAAIAAAAIAAAAIABgBIAAAAIAAAAIAAgBIAAAAIgTApIgFAMIgGAMIgCAEIAAAAQgMAcg+A3gAKHVfIAAAAIAAABIAAAAIAAAAIgBABIAAAAIAAAAQgCAAAJgiIAAgCIABgFQAAg5hOoSQAOg5AAhNQAAjMhdlYQAVhWAwhgQAvhgCziXQBkD6gRBoQBmGXgtCLQA6JmgNCxQgIBihhBEQiggcgoAhQgegxAFhMgAqHVzIAAAAgAMYlqIAAAAgAF2r2QgWgKhAgKIgBAAIABAAIABAAIgLgCIgBAAIgBAAQgjgFgugEQiJgMgahBQgahCggh4IgGgUQgOgvgRgeIgMgVIAAAAIixiBIAcAXIAAALQADAHAGAHQgCADgHgHIAAgBIgBABQgBAEADAIQgKgHAAgJIAAgBIgDAJQAAAGABAFIgJgGIgEgDIgDgBIgDgBQAFAFABAHQACAHgBAIIgCAKQgEgBgEgHIgBgBIAAAEIAAAAQABAIADAHQgBANgNAEQAGAHAOACIABAAIgBACQgFAKgOAAQAGAMAHgBQgEASgIAFQAFAJAMABQgIAFgEAGIgEADQgEABgHgBIgCgBIAAABQAFAJgEAbIgBAFQgRghgEAEIAAgPQgFgKgGgDQAKgJgDgNQgGgIgEgLQAHAHAEgBIAAgLQgEgUgMgGQAIgBAOAGQgCgEgBgDIgBgEQgCgFABgGQABAFAEADQADgGAAgIQgEgFgDgGIAEABIgFgNQAGAHAEAAIABgLQgCgUgMgIQAJAAAOAHQgFgKABgNQABALAMAGIABAAIgBgBQgEgJABgDQAGAEADAAIABgCIgBAAIgHgHQgFgHgEgIQASAIANgBIAAgBQACgDgNgEQgMgEgpAHQgEglAWgjQAzgEAcAUQAMgyA8g1QBPguBegMIgEACQAogNAyAMQAyAMAyAaQAggKAFAlQBzAtAaBEQAYBFAIAtQAIAuAEAmQACAagSAuQgHASgLAXIgIArQAMBiAGBMQAFA8gaAAQgHAAgJgEg");
	this.shape_14.setTransform(97.9564,152.737);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#003366").s().p("AtbTrQAOjPAskyQAbi1gUgcQgUgcgnkYQAZhsARjRQARjTAukZQBAkmAmhTQAmhTAKhkQBajVAHixIPbAAQBIFxAqCPQAqCPAiGfQA0E7ARBdQAQBcAEB8QAEB9gRDTQgRDSAkCrQAjCqA2EQQg1BYh6BUQkPAZjrhlQhLiBAPiwQAOixgDmgIgykgQAEjzg4jmQg2jnAHg7Ig1D2Qg0DzANCuIhKFIIBKMeQgaB2hZAyQjnANkEBbQhnh6gniWg");
	this.shape_15.setTransform(99.05,437.9);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#000000").ss(1,1,1).p("AkIBfQgvAYhSBpQhUBoikgSQikgSA7inQA6inARhVQAShUA6g0QA6g0CkAJQCjAKgDC4QgEC2gvAZgAEJBaQAvAYBTBpQBTBoCjgSQClgSg7inQg6ingShVQgQhUg7g0Qg6g0ijAJQikAKADC4QAEC2AvAZg");
	this.shape_16.setTransform(97.55,589.3589);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AqBE2QijgSA6inQA7inARhVQAQhUA7g0QA6g0CkAJQCjAKgDC4QgEC2gvAZQgvAYhSBpQhHBZiCAAQgWAAgZgDgAGKDbQhShpgvgYQgwgZgDi2QgDi4CkgKQCjgJA6A0QA6A0ARBUQASBVA6CnQA6CnijASQgZADgWAAQiCAAhHhZg");
	this.shape_17.setTransform(97.55,589.3589);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#C68642").s().p("AA0E3QghgfgnhKQgQgagMgjQgMgigJgmQgKgqgDg5QAAgNACgIQABgJAFgGIACgGQAAgDgBgCIgEgGQgEgDgGABQgfhWgRg6QgSg6AAgQQAEgJAjgKQAngLApAAQAaABAQAEQAQAFAAAKIAAACQgJAoAABiIABAyIgJAAQgFgBgCAEQgDAEAAAEIAAABIABAEQABADACACQADACAEAAIAGAAQAUAAAQAHQAkAPAjBVQAPAjAJAkQAJAjAAAWIgBAJQgGgHgNgWIgWgmQgcgwgNgSQgSgYgOAAQgVAAgIAbQgEAQAAAcQAAAUADAYQACAWADAMQACALAHATIAHATQAHAOACACIAPAZIAYApQATAlAAAMIgDAGQgEAEgFAAQgNAAgUgTgABsEWQgLgYgZgoQAfAUAVAYQAVAWAAAKIgDADQgKAAgYgPgAAnCPQgEgRgCgWQgDgXAAgTQAAgbAEgOIAFgCQAKATAABLIgCA3QgGgLgCgOg");
	this.shape_18.setTransform(25.925,319.1);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#7A5228").s().p("AgqDaQgPgcgNgkQgNgkgJgnQgKgsgEg8IAAgHQAAgNADgLIgBgBQgchOgTg6QgahSAAgYIABgHQAEgWA0gOQArgLArAAQAvAAAVAQQAPALAAARIgCAIQgIAlAABfIAAA0QAMADAIADQAsATAnBcQAQAlAKAnQAKAnAAAYQAAAQgFAKQgCAFgFACQgEADgFAAQgNAAgOgTQgLgPgcgwIgUgiQACAYAAAeQAAAhgCAnQAlAWAcAcQAhAiAAAWQAAAOgLAIQgHAEgJAAQgIAAgNgFIAAAIQAAAGgBAEQgFAKgIAGQgKAIgMAAQg1AAhKiIgAhNhPIAEAGQABACAAAEIgCAFQgFAHgBAIQgCAIAAANQADA5AKArQAJAlAMAjQAMAiAQAbQAnBJAhAfQAUATANAAQAFAAAEgEIADgGQAAgMgTglIgYgpIgPgZQgCgCgHgOIgHgTQgHgTgCgLQgDgLgCgXQgDgYAAgUQAAgbAEgQQAIgcAVAAQAOABASAXQANASAcAwIAWAmQANAWAGAHIABgJQAAgWgJgjQgJgkgPgjQgjhUgkgPQgQgIgUAAIgGABQgEAAgDgCQgCgCgBgEIgBgEIAAgBQAAgEADgEQACgDAFAAIAJAAIgBgyQAAhiAJgoIAAgCQAAgJgQgFQgQgFgaAAQgpAAgnAKQgjAKgEAJQAAAQASA6QARA6AfBXIAEgBQADAAADACgABsEXQAYAOAKAAIADgCQAAgLgVgWQgVgXgfgVQAZApALAYgAAiAWQgEANAAAbQAAATADAXQACAWAEASQACANAGALIACg3QAAhLgKgTIgFADg");
	this.shape_19.setTransform(25.925,319.075);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#C68642").s().p("AhdFGIgDgGQAAgMATglIAYgpIAPgZQACgCAHgOIAHgTQAHgTACgLQADgMACgWQADgYAAgUQAAgcgEgQQgIgbgVAAQgOAAgSAYQgNASgcAwIgWAmQgNAWgGAHIgBgJQAAgWAJgjQAJgkAPgjQAjhVAkgPQAQgHAUAAIAGAAQAEAAADgCQACgCABgDIABgEIAAgBQAAgEgDgEQgCgEgFABIgJAAIABgyQAAhigJgoIAAgCQAAgKAQgFQAQgEAagBQApAAAnALQAjAKAEAJQAAAQgSA6QgRA6gfBWQgGgBgEADIgEAGQgBACAAADIACAGQAFAGABAJQACAIAAANQgDA5gKAqQgJAmgMAiQgMAjgQAaQgnBKghAfQgUATgNAAQgFAAgEgEgAiQEiQAAgKAVgWQAVgYAfgUQgZAogLAYQgYAPgKAAgAgwBxQAAhLAKgTIAFACQAEAOAAAbQAAATgDAXQgCAWgEARQgCAOgGALIgCg3g");
	this.shape_20.setTransform(170.375,319.1);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#7A5228").s().p("AhqFaQgIgGgFgKQgBgEAAgGIAAgIQgNAFgIAAQgJAAgHgEQgLgIAAgOQAAgWAhgiQAcgcAlgWQgCgnAAghQAAgeACgYIgUAiQgcAwgLAPQgOATgNAAQgFAAgEgDQgFgCgCgFQgFgKAAgQQAAgYAKgnQAKgnAQglQAnhcAsgTQAIgDAMgDIAAg0QAAhfgIglIgCgIQAAgRAPgLQAVgQAvAAQArAAArALQA0AOAEAWIABAHQAAAYgaBSQgTA6gcBOIgBABQADALAAANIAAAHQgEA8gKAsQgJAngNAkQgNAkgPAcQhKCIg1AAQgMAAgKgIgAgJATQAEAQAAAbQAAAUgDAYQgCAXgDALQgCALgHATIgHATQgHAOgCACIgPAZIgYApQgTAlAAAMIADAGQAEAEAFAAQANAAAUgTQAhgfAnhJQAQgbAMgiQAMgjAJglQAKgrADg5QAAgNgCgIQgBgIgFgHIgCgFQAAgEABgCIAEgGQAEgDAGACQAfhXARg6QASg6AAgQQgEgJgjgKQgngKgpAAQgaAAgQAFQgQAFAAAJIAAACQAJAoAABiIgBAyIAJAAQAFAAACADQADAEAAAEIAAABIgBAEQgBAEgCACQgDACgEAAIgGgBQgUAAgQAIQgkAPgjBUQgPAjgJAkQgJAjAAAWIABAJQAGgHANgWIAWgmQAcgwANgSQASgXAOgBQAVAAAIAcgAh7ECQgVAWAAALIADACQAKAAAYgOQALgYAZgpQgfAVgVAXgAgwBxIACA3QAGgLACgNQAEgSACgWQADgXAAgTQAAgbgEgNIgFgDQgKATAABLg");
	this.shape_21.setTransform(170.375,319.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,195.9,621.7);


(lib.Loading_Dock = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Aj7orYAAAAAdBHArBqYAWA1AZA9AcBDYAcBCAdBGAeBFYAPAjANAkAOAjYAOAiAPAjAOAgYAdBCAeA7AbAzYANAaAMAXAMAUYALAVAKARAIAPYARAdALAQAAAAYABABABABABgBYABgBABgBgBgBYAAAAgFgTgKgfYgFgQgHgUgIgWYgIgWgJgYgKgbYgUg2gZg+gdhBYgPghgQghgRgiYgRghgQgjgRghYgghFghhFgehAYgghBgdg8gZg0YgyhmgihFAAAAYAAgBgCgBgBABYgBABgBABABAB");
	this.shape.setTransform(821.3454,695.3878);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AidIoIFrxhIAAAAImaRRYgFANAHAOANAFYANAFAOgHAFgNYAAAAAAAAAAgB");
	this.shape_1.setTransform(454.4653,696.6764);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1,1,1).p("EBkHAaUIsmzbMAAAhBkEBjwAZzIAAcTMhFrAAAEhUeg6bMCr1AAAMAAABBdMir1AAAIAAAEMCr3gADEhUeg6fIAAAEMAAABBdEgeUA2GMhFyAAAMAAAglwMAAAhK5ILoAAIAAAEMAAABK1EgZ3ApSMAyLAAAEAgJA6sMhAEAAA");
	this.shape_2.setTransform(640.7,375.55);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFF00").s().p("EggBAItIBmkmIEeszMAyLAAAIFwMzICEEmg");
	this.shape_3.setTransform(641.35,695.4);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#C4C4C4").s().p("AeQXiIlws1MgyLAAAIkeM1MhFyAAAMAAAglvILpAAICAknIB/kpMCr3gAEIMXSxIAAcSg");
	this.shape_4.setTransform(639.55,571.175);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#666666").s().p("EBRtAXFMAAAhBkIMmAAMAAABU/gEheSgqTIEAAAIAAAEMAAABBdIAAAEIh/EpIiBEng");
	this.shape_5.setTransform(677.9,271.975);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("EhduAldMAAAhK5ILoAAIAAAEMAAABK1gEhOGAcJMAAAhBdMCr1AAAMAAABBdg");
	this.shape_6.setTransform(599.9,240.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,1283.4,754.7);


(lib.Hand_R = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C68642").s().p("AgoDmIgCgBQgDgGAAgHIAEgKIAEgMIAHgXIAAgBIABgDQAGgYAAgaQgBgfgNgdQgFgKgGgJIgFgIQgDgDgEABQgDgBgDADQgXAigGANIgBAGQgBAGADAWQADAXgKgCQgJgBgDgRQgEgRAEgYIACgNQAGgXAUgnIAUgiQAPgbAVgOQAFgDgBgGIgCgDQgCgEgDAAQgEgBgCACIgGAEIgPh5IAAgFQABgKAUgEQARgCAVACQAVACASAGQARAGADAEQADACABALQACAWgFArIgFAjIgCgBIgDAAQgDgBgCABIgEADIAAACIAAAGIADAFQANAGAHAKQAcAmAMAuQANAwgBAYQAAAYgDAKQgDAJgIAJQgIAJgNADQABgCABgKQABgKAFgEQAFgFAAgNIABgTQgBgRgIgOQgIgPgNgGQgDgCgCABIgFACIgCAEQgBAEACACQAIAPAEARQAEASgCASIgBAOIgDAMIgDAIQgBAFgHARQgIAQgXACIgEgBQAAgBgBAAQAAAAgBgBQAAAAAAAAQAAgBAAAAIgBgDIADgEIAFgDIACgBQAKgHAFgMQAEgIACgLIACgHQADgdgNgZIgKgOQgCgEgDgCIgFgCIgFABQAAAAgBABQAAAAgBAAQAAABgBAAQAAABAAABIgBAFIABALQAAAOgCASQgDAYgFAbQgKAlgOATQgJAOgGAAIgBAAg");
	this.shape.setTransform(17.8385,24.5372);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#7A5228").s().p("AgpD3QgJgBgFgIQgGgKABgOIADgMIAFgOIAGgTQAIgigBgPQAAgVgHgTQgFgPgHgOQgQAXgGAKIAAAQIAAAbQABARgPADQgPAEgMgXQgKgXABgVQABgUACgIQAHgZAVgnIAUgkQAJgQALgNQgKhTgFgzIAAgIQACgSAUgIQAVgIAiAEQAVADAVAGQAUAGAIAIQAGAHABAQQADAXgGAuQgCAUgEAaIAIAIQAeApANA1QANAugGAoQgBANgDAJQgIATgLANQgMAOgLgBQgFAAgEgEQgIAUgNAKQgMALgRAAQgNABgGgKQgKAYgMAMQgKAMgLAAIgDAAgAg0AeIAFAIQAGAJAFAKQANAdABAfQAAAagGAYIgBADIAAABIgHAXIgEAMIgEAKQAAAHADAGIACABQAHACAJgQQAOgTAJglQAGgbADgYQACgSAAgOIgBgLIABgFQAAgBABgBQAAAAAAgBQABAAAAAAQABgBAAAAIAFgBIAFACQADACACAEIAKAOQANAZgDAdIgCAHQgCALgEAIQgFAMgKAHIgCABIgFADIgDAEIABADQAAAAAAABQAAAAABABQAAAAAAAAQABABAAAAIAEABQAXgCAIgQQAHgRABgFIADgIIADgMIABgOQACgSgEgSQgEgRgIgPQgCgCABgEIACgEIAFgCQACgBADACQANAGAIAPQAIAOABARIgBATQAAANgFAFQgFAEgBAKQgBAKgBACQANgDAIgJQAIgJADgJQADgKAAgYQABgYgNgwQgMgugcgmQgHgKgNgGIgDgFIAAgGIAAgCIAEgDQACgBADABIADAAIACABIAFgjQAFgrgCgWQgBgLgDgCQgDgEgRgGQgSgGgVgCQgVgCgRACQgUAEgBAKIAAAFIAPB5IAGgEQACgCAEABQADAAACAEIACADQABAGgFADQgVAOgPAbIgUAiQgUAngGAXIgCANQgEAYAEARQADARAJABQAKACgDgXQgDgWABgGIABgGQAGgNAXgiQADgDADABIACAAQADAAACACgAAaBvQgDAZgHAaQAFgDAEgHQADgGACgJIACgHQACgSgGgQIgCAPg");
	this.shape_1.setTransform(17.7247,24.5183);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(4.7,-0.2,26.1,49.5);


(lib.Hand_L = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C68642").s().p("AAQDmQgOgXgFgmQgFgfgBgaIAAghIADgLIgBgHQgBgDgDgBIgFgCQgDAAgCADIgGAFIgLAPQgQAZACAfIAAAIQABAMAEAJQAFANAJAJIACAAIAFAFIACADIAAACIgDAEIgFABQgYgDgGgTIgIgWIgCgLIgCgNIAAgPQAAgTAGgTQAFgSAKgOQACgDgBgDQAAgEgCgBQgBgEgDABQgEgCgCABQgOAHgJAOQgKAPgDASIgBAVQgBAOAFAFQAEAFABALIAAAOQgMgGgIgJQgIgMgDgKQgCgLACgZQACgZARgyQARgwAhgoQAJgJANgGIAFgEIAAgGIAAgCIgEgEQgCgCgDAAIgDACIgCAAIgCgmQgBguADgXQACgMACgDQAFgDASgEQATgFAXgBQAYgCARAFQAWAGAAAMIgBAEIgaCBIgGgFIgFgDQgFAAgCADIgCAFQgBAFAEADQAVARAMAgQAKAQAJAVQATArAGAaIABAOQABAagGATQgFARgKABQgLAAAGgYQAEgXgBgHQABgDgBgCQgEgQgWglQgCgFgEAAQgGAAgDADIgGAHQgHAJgGAMQgQAegDAhQgEAbAFAaQAAAAAAABQAAAAAAABQAAAAAAABQAAAAABAAIAAABIAFAaQAEAKAAAEQADAGAAAFQgBAHgDAGIgCABQgHAAgJgRg");
	this.shape.setTransform(26.9632,32.1714);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#7A5228").s().p("AAFD5QgKgNgJgbQgIAKgNgCQgRgBgOgNQgMgMgIgWQgEAEgGAAQgLAAgLgQQgMgPgHgWIgCgWQgCgsARgwQATg5AkgoIAJgJIgDgyQgCgwAEgYQADgRAIgIQAHgGAYgGQAVgFAXAAQAmgBAVAJQAWAKABATIgBAJIgeCOQAMAOAIASIATApQATArAFAcQABAIAAAWQgBAXgMAWQgPAYgPgFQgRgFABgSIAEgcIAAgRQgEgLgPgaQgKAMgGASQgJAUgBAVQgDAQAFAlIAFAVIAFAQIABAOQABAOgHAKQgHAJgKAAQgMAAgNgQgAgNA4QADACABADIABAGIgDALIAAAiQABAaAFAfQAFAmAOAXQAJARAHAAIACgCQADgFABgHQAAgFgDgHQAAgEgEgKIgFgZIAAgBQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAAAAAgBQgFgZAEgcQADghAQgdQAGgMAHgJIAGgIQADgDAGAAQAEABACAEQAWAmAEAPQABACgBAEQABAHgEAXQgGAYALgBQAKAAAFgSQAGgTgBgZIgBgOQgGgbgTgqQgJgVgKgRQgMgfgVgSQgEgCABgGIACgEQACgDAFAAIAFACIAGAFIAaiBIABgDQAAgNgWgFQgRgFgYACQgXAAgTAFQgSAEgFADQgCADgCAMQgDAXABAuIACAnIACgBIADgBQADAAACABIAEAEIAAACIAAAGIgFAEQgNAHgJAJQghAogRAvQgRAygCAZQgCAaACALQADAKAIALQAIAJAMAGIAAgOQgBgKgEgFQgFgGABgOIABgUQADgTAKgOQAJgOAOgHQACgBAEABQADAAABADQACACAAAEQABADgCACQgKAOgFATQgGATAAASIAAAQIACANIACALIAIAWQAGATAYADIAFgBIADgEIAAgCIgCgDIgFgGIgCAAQgJgIgFgOQgEgJgBgMIAAgIQgCgeAQgZIALgPIAGgGQACgDADAAIAFACgAgkCFIAAAGQACALACAIQADAHAFAEQgEgdgBgbIgBgRQgHARABAUg");
	this.shape_1.setTransform(27.1689,32.2393);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(13.2,5.8,28.000000000000004,53);


(lib.FadeOutIn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("EhkTA40MAAAhxnMDInAAAMAAABxng");
	this.shape.setTransform(642.025,363.6);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(10));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1284.1,727.2);


(lib.Fade_in_out = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("EhqQA74MAAAh3vMDUhAAAMAAAB3vg");
	this.shape.setTransform(680.1,383.175);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1360.2,766.4);


(lib.Door = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Mask (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("Egv4AnJQgeAAAAgeMAAAhNVQAAgeAeAAMBfxAAAQAeAAAAAeMAAABNVQAAAegeAAg");
	mask.setTransform(300.5,244.525);

	// Door
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("EAuggAJYAAAA3QgB3QgBY3PAB3QABAAAAYgBAAgBABAAABYAAABABABABAAYAAAABdABCjADYCiABDpACEXACYIuAFLoADLnAAYLoAALogDIugFYEXgCDpgCCigBYCjgDBdgBAAAAYABAAABgBAAgBYAAgBgBgBgBAA");
	this.shape.setTransform(298.275,490.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("EguGgACYAAAAAXABArABYArACBAACBQACYBRACBiACBwACYBxACB/ACCKABYCKABCWACCfgCYCeAACngECtgEYCtgDCzgCC2AAYC1ABC5ACC3AEYC4AEC5AEC1ABYC2ACCzABCtACYFZACFDgCEVgDYCKgCB/gCBxgBYBwgCBigCBRgCYBQgDBAgBArgBYArgCAXgBAAAAYACAAABgBAAgBYAAgBgBgBgCAAYAAAAgXAAgrgCYgrgBhAgChQgCYhRgDhigChwgCYhxgCh/gCiKgCYkVgElCgDlaACYitABizABi2ABYi1ABi5AEi4ADYi3ADi5ACi1AAYi2ABizgDitgEYitgEingEiegBYifgCiWABiKABYiKABh/ABhxACYhwAChiAChRACYhQAChAACgrABYgrACgXAAAAAAYgCAAgBACAAABYAAABABABACAA");
	this.shape_1.setTransform(297.5755,400.1591);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("EguGgACYAAAAAXABArABYArACBAACBQACYBRACBiACBwACYBxACB/ACCKABYCKABCWACCfgCYCeAACngECtgEYCtgDCzgCC2AAYC1ABC5ACC3AEYC4AEC5AEC1ABYC2ACCzABCtACYFZACFDgCEVgDYCKgCB/gCBxgBYBwgCBigCBRgCYBQgDBAgBArgBYArgCAXgBAAAAYACAAABgBAAgBYAAgBgBgBgCAAYAAAAgXAAgrgCYgrgBhAgChQgCYhRgDhigChwgCYhxgCh/gCiKgCYkVgElCgDlaACYitABizABi2ABYi1ABi5AEi4ADYi3ADi5ACi1AAYi2ABizgDitgEYitgEingEiegBYifgCiWABiKABYiKABh/ABhxACYhwAChiAChRACYhQAChAACgrABYgrACgXAAAAAAYgCAAgBACAAABYAAABABABACAA");
	this.shape_2.setTransform(297.5755,300.2591);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("EguGgACYAAAAAXABArABYArACBAACBQACYBRACBiACBwACYBxACB/ACCKABYCKABCWACCfgCYCeAACngECtgEYCtgDCzgCC2AAYC1ABC5ACC3AEYC4AEC5AEC1ABYC2ACCzABCtACYFZACFDgCEVgDYCKgCB/gCBxgBYBwgCBigCBRgCYBQgDBAgBArgBYArgCAXgBAAAAYACAAABgBAAgBYAAgBgBgBgCAAYAAAAgXAAgrgCYgrgBhAgChQgCYhRgDhigChwgCYhxgCh/gCiKgCYkVgElCgDlaACYitABizABi2ABYi1ABi5AEi4ADYi3ADi5ACi1AAYi2ABizgDitgEYitgEingEiegBYifgCiWABiKABYiKABh/ABhxACYhwAChiAChRACYhQAChAACgrABYgrACgXAAAAAAYgCAAgBACAAABYAAABABABACAA");
	this.shape_3.setTransform(298.6255,200.3591);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("EguGgACYAAAAAXABArABYArACBAACBQACYBRACBiACBwACYBxACB/ACCKABYCKABCWACCfgCYCeAACngECtgEYCtgDCzgCC2AAYC1ABC5ACC3AEYC4AEC5AEC1ABYC2ACCzABCtACYFZACFDgCEVgDYCKgCB/gCBxgBYBwgCBigCBRgCYBQgDBAgBArgBYArgCAXgBAAAAYACAAABgBAAgBYAAgBgBgBgCAAYAAAAgXAAgrgCYgrgBhAgChQgCYhRgDhigChwgCYhxgCh/gCiKgCYkVgElCgDlaACYitABizABi2ABYi1ABi5AEi4ADYi3ADi5ACi1AAYi2ABizgDitgEYitgEingEiegBYifgCiWABiKABYiKABh/ABhxACYhwAChiAChRACYhQAChAACgrABYgrACgXAAAAAAYgCAAgBACAAABYAAABABABACAA");
	this.shape_4.setTransform(298.3255,99.7091);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#333333").s().p("EgucAmcYAAAAABg+ABhzYABhzACipACjXYABjXACkFACkrYABksABlRABlxYAAlvAAmPgCmnYAAhpgBhrAAhsYAAhtAAhtAAhvYAAhvAAhwAAhxYAAg5AAg4AAg5IAAgrIAAgVIAAgFYAAgCAAAAAAgBYABgBABgCAAgBYACgCADgBAFgBYACAAAAAAACAAIAFAAIALAAIArgBYHNgDHcgDHjABYHkAAHrACHrAEYHrADHrAEHkABYHjACHcABHNABIArAAIALAAIAFAAYgCAAAFAAABABYACAAAAAAAAAAYAAAAAAAAAAAAYAAAAgBgBgBAAYgBgBACAAgBAFIABAVIgBAqYAAA6AAA4AAA5YAABxAABwAABvYAADeAADYABDTYABGnABGPACFvYACFxACFRABEsYADErACEFACDXYAFGuACD2AAAAYAAABABABACAAYABAAABgBAAgBYAAAAADj2AFmuYACjXACkFACkrYACksAClRAClxYABlvACmPABmnYAAjTABjYAAjeYAAhvAAhwgBhxYAAg5AAg4AAg6IAAgqIAAgWYAAgKgCgOgKgNYgFgGgHgFgHgCYgDgCgEgBgDAAYgEgBgEgBgBAAYgCAAABAAgGAAIgFAAIgLAAIgrAAYnNABncACnjABYnkABnrAEnrADYnrAEnrACnkABYnjAAncgDnNgDIgrgBIgLAAIgFAAYgBAAgEAAgCABYgJAAgLAEgIAJYgEAFgCAFgCAFYAAACgBAEAAACIgBAFIAAAXIgBAqYgBA5gBA5AAA5YgCBxgCBwgBBvYgCBvgBBtgCBsYAABtAABrgBBpYAAGnACGPABFvYACFxACFRACEsYADErADEFACDXYACDXADCpABBzYACBzABA+AAAAYAAABABABABAAYACAAABgBAAgB");
	this.shape_5.setTransform(298.2168,243.5894);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AkwAxQAFgXAOgiQAJgaAegPQAKgGAOgEIAQgDQDMgIDMAIQA+AHAbA6IAOAnQAAAegzgJQgMgYglgRQjZgZjGAZQgmAOgEAcQgOADgKAAQgdAAABgSg");
	this.shape_6.setTransform(298.1464,475.1532);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#D1D3D0").s().p("EgucAmQMgAHg9wIAHuRQAAgdAdgBMBcFAAAQAdAAAAAeMAAABMBgEgDNAjBIgQADQgNAEgKAGQgeAPgKAaQgOAjgEAXQgCAXA1gIQAFgcAmgOQDGgaDZAaQAlARALAYQA0AJAAgeIgOgnQgcg7g9gHQhngEhlAAQhmAAhnAEgEAuEAYUMhcOgAHgEAuEAItMhcOgAHgEAuOgG5MhcNgAHgEAuLgWoMhcNgAHg");
	this.shape_7.setTransform(297.95,244.775);

	var maskedShapeInstanceList = [this.shape,this.shape_1,this.shape_2,this.shape_3,this.shape_4,this.shape_5,this.shape_6,this.shape_7];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2.1,-2.6,600.6,494.1);


(lib.Dock_wall = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(1,1,1).p("Agkh0IBJAAIAACPIAqAAIhOBaIhPhaIAqAAg");
	this.shape.setTransform(1112.1,391.65);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("AhOAbIAqAAIAAiPIBJAAIAACPIAqAAIhOBag");
	this.shape_1.setTransform(1112.1,391.65);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF0000").s().p("AAYA2IAAguIgvAAIAAAuIgcAAIAAhrIAcAAIAAAuIAvAAIAAguIAcAAIAABrg");
	this.shape_2.setTransform(1129.725,371.475);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FF0000").s().p("AgqA2IgMgQIBJAAIAFgGIAAgYIhLAAIAAgsIAMgRIBfAAIgMAQIg9AAIgHAIIAAAWIBMAAIAAAtIgMAQg");
	this.shape_3.setTransform(1118.1,371.475);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FF0000").s().p("AgzA2IAAhrIAbAAIAABbIAxAAIAAhbIAbAAIAABrg");
	this.shape_4.setTransform(1106.5,371.475);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FF0000").s().p("AgyA2IAAhrIBlAAIAABFIhKAAIAAAmgAgXAAIAuAAIAAglIguAAg");
	this.shape_5.setTransform(1095.075,371.475);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#333333").s().p("AtFANYAAAABoAACeABYCdAADRABDRAAYDSAADRgBCdAAYCegBBpgBAAAAYABAAABgBAAgBYAAgCgBgBgBAAIAAAAYAAAAgHAAgMgBYgNgBgSgBgXgBYgtgDhCgChPgDYidgFjRgEjSAAYjRAAjRAEidAGYhPADhCACgtACYgXABgSACgNABYgMAAgGABAAAAIgBAAYgBAAgBABAAABYAAACABABACAA");
	this.shape_6.setTransform(1198.5,658.1247);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#000000").ss(3,1,1).p("EgzmAq6MAAAhVzMBnNAAAMAAABVz");
	this.shape_7.setTransform(640.325,384.55);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#333333").ss(1,1,1).p("AgjE+MAAAg4dIBHAAMAAAA4dEAAcAzgIg/AAMAAAgg9AAkSjMAAAAg9");
	this.shape_8.setTransform(1111.9,329.575);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#333333").ss(5,1,1).p("EA4RgrfMgABBW8EA0wArfMAABhW+Eg4QArgIAAgMQAAgCAAgCQAAgDAAgCQAAgLAAgLMAAAhWUEg0vgrfMgABBVlQAAAWAAAWIAAAr");
	this.shape_9.setTransform(640.475,378.45);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("EhDUA4QIanpgIgBAAMBnMAAHIgDAAIaqJkIAEgXMiyOgADIAPAPMgADhwhIgMAMMBWkgAEMBWjgAIIAAAAMhWjgAIMhWkgAFYgHAAgFAGAAAHIAAAAMgADBwhYAAAIAHAHAIAAIAAAAMCyOgADYAHAAAFgGAAgGYAAgFgDgFgFgBI6rpiYgBgBgBAAgCAAMhnMAAIIAAAAYAAAAgBAAAAAAI6lJmIAAAA");
	this.shape_10.setTransform(570.5016,360.2216);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("EgM/g4PYImAEIkACImACIgJgIYgESwgCSwAASwYAASwACSwAFSxIAIgII1uAIIAAAAIVuAHYAEAAAEgDAAgEIAAAAIAAAAYAFyxACywAAywYAAywgCywgEywIAAgBYAAgEgEgEgFAAIAAAAYomACokAComAFIAAAA");
	this.shape_11.setTransform(1198.6995,360.0476);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#333333").s().p("AYMgGYAAAAsGgBsGgBYsFABsGAAAAAAYgBAAgBABAAABYAAABABAAABAAYAAAAAwABBVACYBUABB5ABCSACYEiAEGDACGCAAYGDAAGDgCEigEYCSgCB5gBBUgBYBVgBAwgBAAAAYABAAABgBAAgBYAAgBgBAAgBAA");
	this.shape_12.setTransform(154.825,659.7252);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#333333").s().p("AquAIYAAAABWAACBABYCAAACsAACrAAYCsAACsgBCAAAYCBAABWgBAAAAYABAAABAAAAgBYAAgBgBgBgBAAIAAAAYAAAAgVgBgmgBYglgCg2gBhBgBYiAgEisgCisAAYirAAisACiAAEYhBACg2AAglACYgmACgVABAAAAIAAAAYgBAAgBAAAAABYAAABABABABAA");
	this.shape_13.setTransform(1039.575,658.5748);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#000000").ss(2,1,1).p("ADwGyIjUAAIhHAAIjEAAIAAtjIDEAAIBHAAIDUAAg");
	this.shape_14.setTransform(1112.725,404.825);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#E0E0E0").s().p("AAcGyIhHAAIjEAAIAAtjIDEAAIBHAAIDUAAIAANjgAh5BGQg2A2AABNQAABGAuAzIAIAJQAiAiAsANQAZAHAbAAIAEAAIACAAIACAAIADAAIAIAAQBFgEAygyIAJgJQANgPAJgPQAXgpAAgyQAAgzgXgoQgMgVgTgTQg2g2hMAAIgEAAIgEAAQhMAAg2A2g");
	this.shape_15.setTransform(1112.725,404.825);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#999999").s().p("EAzmAzfMAAAhVyMhnMAAAMAAABVyIgDAAIgBABMgwWgABMAAAhm+MCtHAAAMAAAA4dIjDAAIAANlIDDAAMAAAAg9I1eAAgEg4OAydIAAAWIAAAGIAAADIgBAMIABAMIAAALIDgAAIgBhFIAAgsMAABhVkMBpgAAAMAAABW+IAAAXIDhAAIgBgaMAABhW7QC5A4BBhYQDAkMguonQAAgxgzAAUg9NgCCg+IACCQgyAAAAAxQhcJJEGDxQAaA8DJgjgEBKPASjIDVAAIAAtlIjVAAMAAAg4dIZyAAMAAABm+I5yABgEBKHARxIAIgBIAAABIgIAAg");
	this.shape_16.setTransform(640.35,329.6);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#666666").s().p("EBORAExI6ophIVeAAIBAAAIAIAAIZygBIAAJigEhkAAExIAApiMAwWAABI6kJhg");
	this.shape_17.setTransform(640.35,689.65);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#333333").s().p("EBEZAzgIg/AAMAAAgg9IBIAAMAAAAg9gEg98AzfIAAgLIgBgLIABgMIAAgEIAAgGIAAgWMAAAhWTQjJAkgag9QkGjxBcpIQAAgyAyAAUA+JgCBA9NACBQAyAAAAAyQAvImjBEMQhABZi6g5MgABBW7IABAaIjhAAIAAgXMAAAhW+MhpgAAAMAAABVlIAAArIgBAsIABAZgEBDaAE+MAAAg4dIBIAAMAAAA4dg");
	this.shape_18.setTransform(676.9295,329.575);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFF00").s().p("EhOOAExIakphIACgBIACAAMBnKAAAIarJig");
	this.shape_19.setTransform(640.325,689.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.1,-1.5,1283.6999999999998,723.2);


(lib.bubble_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("EAkdAAAQAAFHpGDoQpFDns2AAQs2AApFjnQpGjoAAlHQAAhDq3CmQMwnZHNi4QJFjnM2AAQM2AAJFDnQJGDoAAFGg");
	this.shape.setTransform(163.75,79);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AwfIuQpGjnAAlHQAAhDq2CmQMvnZHNi4QJGjnM1AAQM1AAJGDnQJFDoAAFGQAAFHpFDnQpGDos1AAQs1AApGjog");
	this.shape_1.setTransform(163.75,79);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bubble_2, new cjs.Rectangle(-70.5,-1,468.5,160), null);


(lib.BtmRight_Arm = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#CCCCCC").ss(1,1,1).p("ABRHrIjWgoQgbhbAQhQQg+kKgBk3QABhKBNheQDWgzBJA2QAWElAcDSQAFC+g1Cug");
	this.shape.setTransform(14.0103,32.9998,0.6723,0.6723);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AiFHDQgbhbAQhQQg+kKgBk3QABhKBNheQDWgzBJA2QAWElAcDSQAFC+g1CuIhPBWg");
	this.shape_1.setTransform(14.0103,32.9998,0.6723,0.6723);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,30.1,68);


(lib.BtmLeft_Arm = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#CCCCCC").ss(1,1,1).p("ABRHrIjWgoQgbhbAQhQQg+kKgBk3QABhKBNheQDWgzBJA2QAWElAcDSQAFC+g1Cug");
	this.shape.setTransform(14.0397,32.9998,0.6723,0.6723,0,0,180);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AiFHDQgbhbAQhQQg+kKgBk3QABhKBNheQDWgzBJA2QAWElAcDSQAFC+g1CuIhPBWg");
	this.shape_1.setTransform(14.0397,32.9998,0.6723,0.6723,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,30.1,68);


(lib.Backside_Character = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ak1AOIAfgbIABAAIANAAIAEAAIHsAAIAEAAIAMAAIAiAAIAcAbg");
	this.shape.setTransform(55.575,97.65);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C68642").s().p("AkXDjIAAgDIgBgEIAAgBIAAgCIAAgCIgBgIIAAgDQgViFgMgZQgnAKgTg7Igph5QgVg9AkgUIABgDIgBgSQBVCgAPBOQByC6DRAAQCygIBniuQAMhPBRiiIAAARIAAADQAkAUgVA9IgpB5QgTA7gngKQgMAZgTCFIAAABIgBAKIAAADIgBAJg");
	this.shape_1.setTransform(55.675,72.575);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AopJsQBAhWC2ijIJrAAIDxD5gADuFXIgDAAInsAAIgFAAIgNAAIAAgFIgBgMIAAAEIAAADIIxAAIAAAFIgBAFIgiAAgAmVkBQBMkIBGgeQA/gdC7geQAEgJAIAAQAKAAADAJQC7AeBAAdQBFAeBMEIQjMAVjNgBQjMABjMgVg");
	this.shape_2.setTransform(55.35,61.95);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.rf(["#000000","#030200","#171007","#5B3E1E","#C68642"],[0,0.18,0.361,0.604,0.792],0.6,-26.6,0,0.6,-26.6,107.2).s().p("AkrBZQgPhOhVifQgDg1gChJIAAgBIAMACQBjAJBiAFQBmADBigBQDDgBDCgPIALgCIAAABQgDBIgDA3QhRChgNBQQhmCuizAIQjQAAhzi7g");
	this.shape_3.setTransform(55.7,64.8);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#333333").s().p("AjDALQhigEhjgIIgMgCIAAABIgCgEIgCgHQDMATDMAAQDNAADMgTIgCAHIgCADIAAAAIgLACQjBANjEACIgrAAQhOAAhPgDg");
	this.shape_4.setTransform(55.675,37.6111);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Backside_Character, new cjs.Rectangle(0,0,110.7,123.9), null);


(lib.Background_outside = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("Eg2wg2wMBthAAAIAADyMAAABJnIAAF6IAAD0IAAMdIAAJ9MhthAAAIAAk0IAA0FIAAk5IAAk6g");
	this.shape.setTransform(350.525,350.525);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("Eg2wgH+IZSkHIBEB5IAEAJIAbAwIA6BnIC9FUIAAByI+sMsgAdii2IAAipIZPAAIAAMcg");
	this.shape_1.setTransform(350.525,592.85);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#336633").s().p("A7BDkIC9g6IAAGOgEg2wgBnQLih2RAAEQByBiAWCbQgSAEiUBVIhPAAIgbgwIgEgJIhEh4I5SEGgEApRgGgQEyiMDzgKIE7E5IAAF6Q3FiiJll7g");
	this.shape_2.setTransform(350.525,520.75);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AiVf6MgAPhCeIFJiPMAAABJng");
	this.shape_3.setTransform(684.55,259.825);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#666666").s().p("Eg2wARWIAAk0IesssIAAhyIAAmOIi9A6Ig6hnIBPAAQCUhVASgEQgWichyhiQxAgEriB2IAAk5MBgBAAAQplF7XFCjIAAD0I5PAAIAACpIZPJzIAAJ9g");
	this.shape_4.setTransform(350.525,590.05);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#0099CC").s().p("Eg2wAlbMAAAhK1MBthAAAIAADyIlKCPMAAPBCeQjzALkyCLg");
	this.shape_5.setTransform(350.525,239.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,703.1,703.1);


(lib.Arrow = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E0E0E0").s().p("AAYA2IAAguIgvAAIAAAuIgcAAIAAhrIAcAAIAAAuIAvAAIAAguIAcAAIAABrg");
	this.shape.setTransform(26.625,-7.525);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E0E0E0").s().p("AgrA2IgMgQIBKAAIAFgGIAAgYIhLAAIAAgsIANgRIBdAAIgLAQIg+AAIgGAIIAAAWIBMAAIAAAtIgMAQg");
	this.shape_1.setTransform(15,-7.525);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E0E0E0").s().p("AgzA2IAAhrIAcAAIAABbIAwAAIAAhbIAbAAIAABrg");
	this.shape_2.setTransform(3.4,-7.525);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E0E0E0").s().p("AgyA2IAAhrIBlAAIAABFIhKAAIAAAmgAgXAAIAuAAIAAglIguAAg");
	this.shape_3.setTransform(-8.025,-7.525);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#CBCBCB").ss(1,1,1).p("Aglh3IBLAAIAACTIArAAIhQBcIhRhcIArAAg");
	this.shape_4.setTransform(8.775,12.475);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FF0000").s().p("AhQAcIArAAIAAiTIBLAAIAACTIArAAIhQBcg");
	this.shape_5.setTransform(8.775,12.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-20.8,51.5,46.3);


(lib.uli_copy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(1,1,1).p("ACFjLQBkB1gYBiQgMAugVAmQgYApgkAdQhEA3hbgZQhcgZgkgmQgVgWgKgZQgHgSgCgTQgDguADgv");
	this.shape.setTransform(67.0832,343.6882);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("Ai2AAYACgEAAgEACgFYACgEACgEACgEYAEgIAEgIAGgHYAEgIAGgHAGgHYACgEADgDAEgDIAJgJIAMgIYADgDAEgCAEgCIAMgFYAEgCAFgBAEgCYAEgBAEAAAFgBYAEAAAFgBAEAAIANABIAOACYAIABAJACAIADYAJACAIADAIADIAaAKYAJADAIAEAIADYAIAEAJADAIAEIAYAMYARAIAPAJARAIIADgJIg0gJYgJgCgJAAgJgBIgagDYgKgCgIABgJAAYgJAAgJACgJABYgJACgJACgHADYgJADgIADgIAFYgIAEgIAEgHAFYgHAFgIAFgHAGYgHAGgGAFgHAGIgRAVIgeAsIgaAuIAEABYgDgVgFgUgDgUIgCgPYgBgGgBgFAAgFIgCgPIgBgPAi2AAIAAAPIABAPYABAGAAAFABAFIABAPYADAVAEAUADAUYAAACABABABAAYABgBABAAAAgBIAAAAIAbgtIAfgrIARgTYAGgGAHgGAGgFYAHgFAHgFAHgFYAHgEAJgEAHgEYAIgEAIgDAIgDYAHgDAIgCAJgCYAIgBAIgBAJAAYAJAAAJgBAIACIAaACYAJABAJABAIABIA0AKIAAAAYADAAACgBABgDYAAgCgBgCgCgBYgQgJgQgJgQgHIgZgMYgJgEgIgDgIgEYgJgEgIgDgJgDIgagKYgIgDgJgDgJgCYgIgCgJgCgJgCIgOgBIgOgBYgFABgEAAgFABYgFAAgEABgFABYgEACgFABgEACIgMAHYgFABgDADgEADIgLAIIgKAKYgEADgDAEgCADYgGAIgFAHgFAIYgEAIgEAIgEAIYgCAFgCAEgBAEYgCAFAAAEgCAE");
	this.shape_1.setTransform(62.6022,326.9989);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#333333").ss(1,1,1).p("AFPAFQAJgCAJAAQAYAAAaAKQABhXgMglQgLgggch3QgJgngLgwQgIgmgJgqQgHgfgIghQABgBAAgBQAEgKAFgIIAAAAQAEgHAEgFQARgYAVgFQAMgDANACQABAAABABQAGABAGADQABAAAAAAQAVAlA9BUQADAEAEAFQBDBbAaB1IAYBYQARBVAKBAQAOBWACAyQAEBXgVAsQgWArjFA/QgBAAAAABQgUAKgQAJQg8AkgPAbQgIAPgWAMQgdAPg0AKQgOADgPACQgsAHg3AFQgzAEg6ACQiSAGgNgkQgOgkABghQABgKg0gQQArgJAzALAkRGvQhOgXh3gnQh3hDgghGQgghGAJgyQAGgjAKg0QAEgXAEgaQAKg1ATg7QANgmARgoQAHhQBXiHQAfgxAqg4QAIgCAJAAQACAAACAAQAEAAAEAAQAdAAAfAKQALAEAKAEQAFACAFADQgIAsgIAoQhBFIgQASQgMANAhBXQAHgRAUgGQAUgGAlgCQACAAADAAQADAAACAAQAcgBAQgJQABAAACgBQAEgYBcgWQAqADAeACQAwADAUgCQAfgDAkgLQANACAMADQAuALAZAcQA4ARAHAAQAGAAAZACQAZACASAUADHG7QAbgKATgGQAJgDAOgDQAmgJBDgJQARgCATgC");
	this.shape_2.setTransform(64.7076,308.9866);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#CCCCCC").s().p("ACBAwIAAhfIAyAAIAABfgAiyAwIAAhfIAyAAIAABfg");
	this.shape_3.setTransform(65.25,234.75);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#C68642").s().p("AExB1IABAAIAAABIgBgBgAESBWIgNgKIgMgJQgcgWgLgQIgHgIQgJgQgBgSIgBgFIAAgDIALgBIABAEIAEAJQAEANACAEIADAEQAIAIAbARQADACADgBQAEgCABgDIABgHIABgSQABgNgCgNQgDgLgEgKIgDgIIgIgPIgIgLIgCgCIAAgBIgOgOIgHgIIgFgHQgCgFABgEIABgCQADgDANAIQAQAKASAXIAMAQIAKAPIABAEIAMAXIAAACIADAGIACAEIADABQABAAABAAQAAAAABAAQAAAAABAAQAAAAABgBQAAAAAAAAQABgBAAAAQAAgBABAAQAAgBAAAAIACgFIABgCIABgMQACgJgCgIQgBgIgDgHIgFgKIgDgFQgFgIgGgEQgHgHgJgBIgCgBIgFgBIgDgCIAAgCIAAgDIADgCQARgGAKAJIAPANIAEAFQACACAEAHIAFAJIADAHIAFAPIABAFQACAMAAAMIAAAEQgBAAAAABQAAAAABABQAAAAAAABQAAAAABABIACACQABABABAAQAAAAABAAQAAAAABAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABgBQAAAAAAgBIAGgIQADgGAAgIQABgHgCgIIgCgLIgBgEIgEgFIgKgOIgIgMIgDgHIALAEQAIAFAHAIIAJAMIAFAJIAGAPQAFANADAQIABAIQAGAogIAlIgEAJQgMgDgMADQgVAGgRAXQgUgDgUgQgAlzBeIABgBQABAAAAgBQAAAAABAAQAAgBAAgBQAAAAAAgBIgBgEIgGgJIgEgJQgIglAGgoIABgIQADgQAFgNIAHgPIAEgJIAJgMQAHgIAIgFIALgEIgDAHIgIAMIgKAOIgDAFIgCAEIgDALQgBAIABAHQAAAIADAGIAGAIQAAABAAAAQABABAAAAQABAAAAAAQABAAAAAAQABABAAAAQABAAAAAAQABAAAAAAQABAAABgBIACgCQABgBAAAAQAAgBAAAAQABgBAAAAQAAgBgBAAIAAgEQAAgMACgMIABgFIAFgPIADgHIAFgJQAEgHACgCIAEgFIAPgNQAKgJARAGIADACIAAADIAAACIgDACIgFABIgCABQgJABgHAHQgGAEgFAIIgDAFIgFAKQgDAHgBAIQgCAIACAJIABAMIABACIACAFQAAAAAAABQABAAAAABQAAAAABABQAAAAAAAAQABABAAAAQABAAAAAAQABAAAAAAQABAAABAAIADgBIACgEIADgGIAAgCIALgXIADgEIAJgPIAMgQQASgXAQgKQANgIADADIABACQABAEgCAFIgFAHIgHAIIgOAOIAAABIgCACIgIALIgIAPIgDAIQgEAKgCALQgDANABANIABASIABAHQABADAEACQADABADgCQAbgRAIgIIADgEQACgEAEgNIAEgJIABgEIALABIAAADIgBAFQgBASgJAQIgHAIQgLAQgcAWIgMAJIgOAKQgSAOgSAFQgfgLgeAAgAl9BcIAAABIACABIgDABIABgDg");
	this.shape_4.setTransform(65.25,245.8202);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#7A5228").s().p("AEjBtQgMgFgMgJIgagUIgBgBQgbgVgNgRIgHgKQgMgWgBgXIAAgBIAAgDIANAAIAAADIABAFQABASAKAQIAGAIQALAQAcAWIAMAJIAOAKQAUAQATADIgIAMIAAAAIAAABQgFAIgEAJIgHgYgAk1BnQASgFATgOIANgKIAMgJQAcgWAMgQIAGgIQAJgQACgSIAAgFIAAgDIAOAAIAAADIAAABQgBAXgNAWIgGAKQgOARgbAVIAAABIgbAUQgLAJgNAFIAAACIgVgIgAmDBMIgBgCIgCgGQgKgoAHgqIABgGQADgQAEgNIAGgPIAIgQQAFgJAFgFQALgMANgGQANgGAIAEQADACACAEQANgMANgEQAMgDAMAFQAKAEACAJQAOgPANgFQANgGAJAFQAGAEABAIQACAJgFAJIgGAIIgIAJQgIAHgDAFIgFAHIgKAPIgGAMQgDAIgCAJIgCAOQgBALABANQATgMAGgGIAGgPIACgFIABgEIAPAAIgCAEIgDAJQgFANgCAEIgDAEQgIAIgbARQgDACgDgBQgDgCgBgDIgCgHIgBgSQgBgNADgNQACgLAEgKIAEgIIAIgPIAIgLIABgCIABgBIANgOIAHgIIAFgHQADgFgBgEIgBgCQgEgDgNAIQgQAKgSAXIgLAQIgKAPIgCAEIgMAXIAAACIgCAGIgCAEIgEABQgBAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAAAQgBgBAAAAQAAgBgBAAQAAgBAAAAIgCgFIgBgCIgBgMQgBgJABgIQABgIADgHIAFgKIAEgFQAFgIAFgEQAHgHAJgBIACgBIAFgBIADgCIABgCIgBgDIgDgCQgQgGgLAJIgOANIgFAFQgCACgEAHIgFAJIgDAHIgFAPIgBAFQgCAMABAMIAAAEQAAAAAAABQAAAAAAABQgBAAAAABQAAAAAAABIgDACQgBAAgBABQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAgBAAQAAAAgBAAQAAgBgBAAQAAAAAAgBIgFgIQgDgGgBgIQgBgHACgIIADgLIABgEIADgFIAKgOIAIgMIAEgHIgMAEQgIAFgHAIIgJAMIgEAJIgGAPQgFANgDAQIgCAIQgGAoAJAlIADAJIAGAJIABAEQAAABAAAAQAAABAAAAQgBABAAAAQAAABgBAAIAAABIgIAAIgCgBIgBgBIgBADIgRABIALgSgAkXhSIgJAKIgDAFIgBADQgEAHgBAIIgCAIIAFgIIABgDIAHgMIAQgWQgFABgEADgAF8BKIgCAAIADgJQAJglgHgoIgBgIQgDgQgFgNIgGgPIgFgJIgJgMQgHgIgIgFIgLgEIADAHIAJAMIAKAOIADAFIABAEIADALQABAIgBAHQAAAIgDAGIgFAIQgBABAAAAQgBAAAAABQgBAAAAAAQgBAAAAAAQgBAAAAABQgBAAAAAAQgBAAAAAAQgBgBAAAAIgDgCQgBgBAAAAQAAgBAAAAQgBgBAAAAQAAgBABAAIAAgEQABgMgDgMIgBgFIgEgPIgEgHIgFgJQgDgHgDgCIgEgFIgOgNQgLgJgRAGIgCACIgBADIAAACIADACIAFABIACABQAJABAHAHQAGAEAFAIIADAFIAFAKQADAHABAIQACAIgBAJIgCAMIAAACIgDAFQAAAAAAABQgBAAAAABQAAAAgBABQAAAAAAAAQgBAAAAABQgBAAAAAAQgBAAAAAAQgBAAAAAAIgEgBIgCgEIgCgGIgBgCIgLgXIgCgEIgKgPIgMgQQgSgXgQgKQgMgIgEADIgBACQgBAEACAFIAGAHIAHAIIANAOIAAABIACACIAIALIAIAPIAEAIQAEAKACALQACANAAANIgCASIgBAHQgBADgEACQgDABgDgCQgbgRgIgIIgCgEQgDgEgEgNIgEgJIgBgEIAPAAIABAEIACAFIAGAPQAGAGASAMQACgNgBgLIgCgOIgGgRIgFgMIgKgPIgFgHQgEgFgHgHIgIgJIgGgIQgFgJABgJQABgIAHgEQAIgFANAGQANAFAPAPQACgJAJgEQANgFAMADQANAEAMAMQACgEAEgCQAHgEAOAGQAMAGALAMQAGAFAFAJIAIAQIAGAPIAHAdIABAGQAHAqgKAoIgDAGIAAACIABACIgMgEgAEihAIAHAMIABADIAEAIIgBgIQgBgIgEgHIgCgDIgCgFIgJgKQgFgDgFgBIARAWg");
	this.shape_5.setTransform(65.1441,246.031);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#666666").s().p("AGIEOIgHgdIgGgPIATAAQASAIAHAHQARAQgqANgADYEOIgBgEIgPAAIgLABIgNAAIAAADIlkAAIAAgDIgOAAIgKgBIgPAAIgBAEIgfAAQACgJADgIIAGgMIAKgPIAxAAIAyAAIAdAAIAfAAIgehgIDIAAIAbAAIgjBgIAjAAIAyAAIAyAAIAKAPIAFAMIAGARgAmREOQgjgPAMgOQAGgHARgIIASAAIgGAPQgEANgDAQgAEmDxIgBgDIgHgMIAGAAQAEAHABAIIABAIIgEgIgAktDxQABgIAEgHIAGAAIgHAMIgBADIgFAIIACgIgAiDCCIAdAAIAABJgACwCCIgyAAIAAAAIg3kFICdAAIBUAsIBWAAIhmAsIgwAAIAACtgAiDCCIgyAAIhUAAIAAitIgiAAIh4gsIBcAAIBcgsICrAAIhDEFgAhcikIAAhnIDCgCIAABpg");
	this.shape_6.setTransform(65.5081,216.925);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#333333").s().p("AGEQRIhWAAIhVgsIicAAIgQAAIhpAAIgOAAIirAAIhdAsIhbAAIgKAAIAAjmIAAgUIAA5eQAEi1BjgQQCxgegKDjIAAY9IFEAAIAA5LQAOiyCPAMQB7AJAFCdIAAZsItvAAIFQBFIABAAIAABnIDCAAIAAhoIAAgBIFchDIAAATIAADngADjrUIAyAAIAVAAIA2AAIAAinIgvAAIgWAAIg4AAgAlyrUIA1AAIAVAAIA0AAIAAinIgvAAIgVAAIg6AAg");
	this.shape_7.setTransform(66.55,104.0749);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AjRa2QgOgkABghQABgKg0gQQATgEAUAAIAAAAIABAAQAZAAAcAGIAAAAIABAAIgBAAIAAAAQgcgGgZAAIgBAAIAAAAQgUAAgTAEQhOgXh3gnQh3hDgghGQgghGAJgyIAQhXIAIgyQAKg1ATg7QANgmARgoQAHhQBXiHQAfgxAqg4IARgCIAEAAIAIAAQAdAAAfAKIAVAIIAKAFIgQBUQhBFIgQASQgMANAhBYQAHgRAUgHQAUgGAlgCIAFAAIAFAAQAcgBAQgJIADgBQAEgYBcgWIBIAFQAwADAUgCQAfgDAkgLIAZAFQAuALAZAcQA4ARAHAAIAfACQAZACASAVIAIgBQAJgCAJAAQAYAAAaAKQABhYgMglQgLgggch3IgUhXIgRhQIgPhAIABgCQAEgKAFgIIAAAAIAIgMQARgYAVgFQAMgDANACIACABIAMAEIABAAQAVAlA9BUIAHAJQBDBbAaB1IAYBYQARBVAKBBQAOBWACAyQAEBXgVAsQgWArjFA/IgBABIgkAEQhDAJgmAJIgXAGIguAQIAugQIAXgGQAmgJBDgJIAkgEIgkATQg8AkgPAbQgIAPgWAMQgdAPg0AKIgdAFQgsAHg3AFQgzAEg6ACIgnABQhtAAgLgfgAAjbPQA3AAAugjIABgBIAAAAIACgCQAkgdAYgpQAVgmAMguQAFgTAAgUQAAhThQheQBQBeAABTQAAAUgFATQgMAugVAmQgYApgkAdIgCACIAAAAIgBABQguAjg3AAIgBAAIAAAAQgYAAgagHIgBAAIgBAAIgBgBQhcgZglgmQgVgWgKgZQgHgSgBgTQgCgXAAgXIACgwIgCAwQAAAXACAXQABATAHASQAKAZAVAWQAlAmBcAZIABABIABAAIABAAQAaAHAYAAIAAAAIABAAgAi7XWQAZgvAggqQAjgtAygXQAmgSAmAAIABAAIAAAAIAMAAIABAAIACAAQA3AEA3AMQhOgrhJgZIgCgBQgpgPggAAIgBAAIAAAAQgUAAgPAGIAAAAIgBAAIgBABIgBAAQgrARgYAmQgZAngDAUIAAAHQAAAcAQBXgAGZY3IAAAAgAjLVjIAAgHQADgUAZgnQAYgmArgRIABAAIABgBIABAAIAAAAQAPgGAUAAIAAAAIABAAQAgAAApAPIACABQBJAZBOArQg3gMg3gEIgCAAIgBAAIgMAAIAAAAIgBAAQgmAAgmASQgyAXgjAtQggAqgZAvQgQhXAAgcgAjLVcIAAAAgAEn4tQgCgJAAgLQgIgDgJgHQgDgOgCgOIgBgMIgBgNIAAgGQAAgLACgLQACgNADgMIACgBIAAgBIACgCQAKgIAKgCQAAgKACgHIAVAAIACAUQAIADAIAGQAEAPACANIABANIABANIAAABIAAABQAAANgCAMQgCANgEAMIgBACIAAAAIgDACQgJAIgKADIgCARgAkr4tIgCgUIgEgCQgHgDgGgFIgBgGQgPgvAQg1IACgBQAKgKALgDQAAgJABgIIAVAAIACATQAIADAHAHIACACIAAABQAHASABAUIABANQAAAMgCAOQgCAOgFAOIgJAGQgGAEgHADIgCARg");
	this.shape_8.setTransform(64.7076,189.7679);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#999999").s().p("ABPRkIAjhhIAAAAIAABhgAhyRkIAAgYIAAhJIA1kFIBpAAIArEFIjIAAIAeBhgAhpJ1IlQhFINvAAIB8AAIh8ATIAAgTIlcBDIAAABIjCABgAoxIwIB4AAIAAATgAEou7IACgRQAKgDAJgIIADgCIAAgBIABgBQAEgMACgNQACgMAAgNIAAgBIAAgCIgBgMIgBgNQgCgNgEgPQgIgHgIgDIgCgUIAwAAIAACogADiu7IAAioIA4AAQgCAIAAAKQgKACgKAIIgCACIAAAAIgCACQgDAMgCANQgCALAAALIAAAGIABANIABAMQACAOADAOQAJAGAIADQAAALACAKgAkqu7IACgRQAHgDAGgEIAJgGQAFgOACgPQACgNAAgNIgBgMQgBgUgHgSIAAgCIgCgBQgHgHgIgDIgCgUIAvAAIAACogAl0u7IAAioIA6AAQgBAJAAAJQgLADgKAKIgCAAQgQA2APAvIABAGQAGAFAHADIAEACIACAUg");
	this.shape_9.setTransform(66.725,127.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(20));

	// Layer_2
	this.instance = new lib.Scene_3_legs();
	this.instance.setTransform(68.1,292.9,1,1,0,0,0,29.9,16.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:30,regY:16.6,scaleX:1.0454,scaleY:0.9982,skewX:-3.6233,skewY:12.9888,x:67.75,y:287.8},4).to({regX:29.9,regY:16.8,scaleX:1.1097,scaleY:0.9598,skewX:-0.7906,skewY:-20.9314,x:65.75,y:288.1},5).to({regY:16.6,scaleX:1.033,scaleY:1,skewX:-1.4838,skewY:13.045,x:68,y:286.4},5).to({scaleX:1.0473,scaleY:0.9911,skewX:0.4499,skewY:-15.094,x:67.9,y:283.35},5).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,0,131.4,365.7);


(lib.txt_bubble_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_9 = function() {
		var fullText = "What's good fam! It's the last truck run, but spoiler alert... I can do this all day!!!";
		var firstPart = "What's good fam! It's the last truck run, but spoiler alert...";
		var secondPart = " I can do this all day!!!";
		
		// Variables to manage the typing effect
		var currentText = "";
		var charIndex = 0;
		var typingSpeed = 45; // Typing speed (in milliseconds)
		var pauseDuration = 750; // Pause between the two parts (in milliseconds)
		
		var textField = this.intro_txt;
		
		// Function to type out the first part of the text
		function typeFirstPart() {
		    if (charIndex < firstPart.length) {
		        currentText += firstPart.charAt(charIndex);
		        textField.text = currentText;
		        charIndex++;
		        setTimeout(typeFirstPart, typingSpeed);
		    } else {
		        // Pause before second part
		        setTimeout(typeSecondPart, pauseDuration);
		    }
		}
		
		function typeSecondPart() {
		    var secondCharIndex = 0;
		    function typeNextChar() {
		        if (secondCharIndex < secondPart.length) {
		            currentText += secondPart.charAt(secondCharIndex);
		            textField.text = currentText;
		            secondCharIndex++;
		            setTimeout(typeNextChar, typingSpeed);
		        }
		    }
		    typeNextChar();
		}
		
		// Start typing the first part
		typeFirstPart();
		
		this.goToAndStop(209);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(9).call(this.frame_9).wait(201));

	// Layer_4
	this.intro_txt = new cjs.Text("What's good fam! It's the last truck run, \nbut spoiler alert... \nI can do this all day!!!", "bold 27px 'Brothers OT'");
	this.intro_txt.name = "intro_txt";
	this.intro_txt.textAlign = "center";
	this.intro_txt.lineHeight = 36;
	this.intro_txt.lineWidth = 303;
	this.intro_txt.parent = this;
	this.intro_txt.setTransform(229.5,37.75);
	this.intro_txt._off = true;

	this.timeline.addTween(cjs.Tween.get(this.intro_txt).wait(9).to({_off:false},0).wait(201));

	// Bubble
	this.instance = new lib.Tween3("synched",0);
	this.instance.setTransform(-28.9,185.25,0.1137,0.1667);
	this.instance.alpha = 0;

	this.instance_1 = new lib.Tween4("synched",0);
	this.instance_1.setTransform(181.1,105.75,1.0346,1.0707);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},9).wait(201));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,scaleX:1.0346,scaleY:1.0707,x:181.1,y:105.75,alpha:1},9).wait(201));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-59.2,-1.2,480.59999999999997,214);


(lib.truckDoor = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Door("synched",0);
	this.instance.setTransform(297.9,244.8,1,1,0,0,0,297.9,244.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.truckDoor, new cjs.Rectangle(-2.1,-2.6,600.6,494.1), null);


(lib.TruckBed = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Truck_bed("synched",0);
	this.instance.setTransform(329.65,248,1,1.0119,0,0,0,329.7,251);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#757575").s().p("AAAgCYAAAAgBABgBAAYgBABgBAAAAAAYAAABABAAABABYABAAABABAAAAIAAAAYAAAAACgBABAAYABgBABAAAAgBYAAAAgBAAgBgBYgBAAgCgBAAAAIAAAA");
	this.shape.setTransform(657.15,500.075);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#757575").s().p("Egy+AnsIgVAAIAAAAIgBk9YABhqAAhpAChqIACk9IABk+IABz1MAACgnpIgFAFMAzSAAAMAzUgAFIAAAAMgzUgAEMgzSAAAYgDAAgCACAAACIAAAAMAABAnpIACT1IAAE+IgCE9YgBBqAABpAABqIACE9IAAAAIAVAAIAAAA");
	this.shape_1.setTransform(328.5283,247.5554);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#4D4D4D").s().p("AnWABIODgKIAqATg");
	this.shape_2.setTransform(612.125,501.375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.TruckBed, new cjs.Rectangle(-0.1,-6.4,659.4,508.79999999999995), null);


(lib.tap_here = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		var _this = this;
		
		_this.gotoAndPlay(0);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(20));

	// Blinking
	this.instance = new lib.Tween5();
	this.instance.setTransform(42.5,42.5,1.2129,1.2129);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:1,scaleY:1,alpha:0},9).to({scaleX:1.2129,scaleY:1.2129,alpha:1},1).to({scaleX:1,scaleY:1,alpha:0},9).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.3,-13.3,111.6,111.6);


(lib.Scene_4_outro_txt = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_9 = function() {
		this.stop();
		
		var _this = this;
		var textToType = "All day... All day... ";
		var currentIndex = 0;
		
		console.log("Typewriter script initialized"); // Debugging log
		
		// Function to type text one character at a time
		function typeText() {
		    console.log("Current index: " + currentIndex); // Debugging log
		    
		    if (currentIndex < textToType.length) {
		        // Add the next character to the text field
		        _this.outro_txt.text += textToType[currentIndex];
		        currentIndex++;
		        
		        // Set delay for the next character
		        var delay = 50; // Delay in milliseconds
		        
		        // Add a longer delay after the first "All day..."
		        if (currentIndex === 10) {
		            delay = 700; // Pause
		        }
		        
		        setTimeout(typeText, delay);
		    }
		}
		
		// Initialize the text field
		_this.outro_txt.text = "";
		
		typeText();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(9).call(this.frame_9).wait(21));

	// txt
	this.outro_txt = new cjs.Text("All day... All day... ", "bold 25px 'Brothers OT'");
	this.outro_txt.name = "outro_txt";
	this.outro_txt.textAlign = "center";
	this.outro_txt.lineHeight = 34;
	this.outro_txt.lineWidth = 138;
	this.outro_txt.parent = this;
	this.outro_txt.setTransform(117,7);
	this.outro_txt._off = true;

	this.timeline.addTween(cjs.Tween.get(this.outro_txt).wait(9).to({_off:false},0).wait(21));

	// bubble
	this.instance = new lib.Tween12();
	this.instance.setTransform(19.3,65.9,0.2,0.2398);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:1,scaleY:1,x:96.75,y:37.4,alpha:1},9).wait(21));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-0.5,195,148.5);


(lib.Scene_4_Dock = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_24 = function() {
		var fullText = "All day... All day...";
		var currentText = "";
		var charIndex = 0;
		
		function typeWriter() {
		    if (charIndex < fullText.length) {
		        currentText += fullText.charAt(charIndex);
		        this.boss_txt.text = currentText;
		        charIndex++;
		        setTimeout(typeWriter.bind(this), 45);
		    }
		}
		
		typeWriter.call(this);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(24).call(this.frame_24).wait(121));

	// Mask (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("EgujAmQMAAAhMfMBdGAAAMAAABMfg");
	var mask_graphics_45 = new cjs.Graphics().p("EgujAmQMAAAhMfMBdGAAAMAAABMfg");
	var mask_graphics_144 = new cjs.Graphics().p("EgujAmQMAAAhMfMBdGAAAMAAABMfg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:2.95,y:51.025}).wait(45).to({graphics:mask_graphics_45,x:2.95,y:51.025}).wait(99).to({graphics:mask_graphics_144,x:2.95,y:45.775}).wait(1));

	// Door
	this.instance = new lib.Door("synched",0);
	this.instance.setTransform(5.5,-400.5,1,1,0,0,0,300.5,244.5);

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(45).to({startPosition:0},0).to({y:45.5},99).wait(1));

	// TopLeft_Arm
	this.instance_1 = new lib.TopLeft_Arm("synched",0);
	this.instance_1.setTransform(-36.15,-16,0.8561,0.9724,0,-0.018,-1.0346,15.4,0.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({regX:15.3,regY:0.1,scaleX:0.856,scaleY:0.9723,skewX:-13.8049,skewY:-14.8215,x:-36.7,y:-16.1},9).to({regX:15.4,regY:0.2,skewX:-23.6903,skewY:-24.7071,x:-36.45,y:-16.2},10).to({startPosition:0},5).to({startPosition:0},5).wait(116));

	// BtmLeft_Arm
	this.instance_2 = new lib.BtmLeft_Arm("synched",0);
	this.instance_2.setTransform(-47.55,50.45,0.8498,0.9715,0,-6.1503,-7.7898,4.3,11);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({regX:3.9,scaleX:0.8496,scaleY:0.9714,skewX:-68.3529,skewY:-69.9925,x:-24.2,y:57.4},9).to({regX:3.6,regY:10.7,scaleY:0.9713,skewX:-119.5436,skewY:-121.1831,x:-7.3,y:50.3},10).to({skewX:-129.2538,skewY:-130.8925,x:-6.85,y:49.05},5).to({skewX:-121.5343,skewY:-123.1732,x:-7.75,y:50.35},5).to({skewX:-129.2538,skewY:-130.8925,x:-6.85,y:49.05},5).to({skewX:-121.5343,skewY:-123.1732,x:-7.75,y:50.35},5).wait(106));

	// Hand_L
	this.instance_3 = new lib.Hand_L("synched",0);
	this.instance_3.setTransform(-33.55,95.75,0.8832,0.8832,-27.6253,0,0,29.1,15.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({regX:28.7,scaleX:0.8831,scaleY:0.8831,rotation:-89.8307,x:22.25,y:66.2},9).to({regX:28.4,scaleX:0.883,scaleY:0.883,rotation:-141.0206,x:28.8,y:19.25},10).to({rotation:-159.4715,x:24.4,y:12.45},5).to({regX:28.8,regY:12.7,rotation:-129.3498,x:26.5,y:20.6},5).to({regX:28.4,regY:15.8,rotation:-159.4715,x:24.4,y:12.45},5).to({regX:28.8,regY:12.7,rotation:-129.3498,x:26.5,y:20.6},5).wait(106));

	// Layer_mask (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	var mask_1_graphics_10 = new cjs.Graphics().p("AkAM+QgthfAWinQg5hugCiAQBMgugOirQgCgKgHABQgKhegShHQgUhQAdg8QgJgJAHhDQAIhDgvk0IAujRIA7AVQHQDvBUGcQAZB/AJCdQAWCthQAwQiQIikGAAQg/AAhHggg");

	this.timeline.addTween(cjs.Tween.get(mask_1).to({graphics:null,x:0,y:0}).wait(10).to({graphics:mask_1_graphics_10,x:77.0958,y:65.3194}).wait(135));

	// TopRight_Arm
	this.instance_4 = new lib.TopRight_Arm("synched",0);
	this.instance_4.setTransform(57.3,-14.85,0.8931,0.9728,0,0.2606,0.555,16.6,1.2);

	var maskedShapeInstanceList = [this.instance_4];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({regX:17,regY:1.1,scaleX:0.9325,scaleY:0.9727,skewX:-21.775,skewY:-21.4809,x:48.9,y:-17.7},9).to({regX:16.6,scaleX:0.8931,scaleY:0.9728,skewX:-6.2243,skewY:-5.9301,x:56.85,y:-15.1},10).wait(126));

	// BtmRight_Arm
	this.instance_5 = new lib.BtmRight_Arm("synched",0);
	this.instance_5.setTransform(65.8,50,0.8855,0.9722,0,3.522,4.4998,22.2,11.5);

	var maskedShapeInstanceList = [this.instance_5];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({regX:22.6,regY:11.6,scaleX:0.8854,scaleY:0.9721,skewX:4.177,skewY:5.1534,x:81.55,y:43},9).to({regY:11.7,skewX:29.5513,skewY:30.5297,x:75.35,y:48.45},5).to({regX:22.5,regY:11.5,scaleX:0.8855,skewX:49.7055,skewY:50.6833,x:69,y:52},5).wait(126));

	// Hand_R
	this.instance_6 = new lib.Hand_R("synched",0);
	this.instance_6.setTransform(54.95,95.95,0.9729,0.9729,22.7865,0,0,17.7,10.2);

	var maskedShapeInstanceList = [this.instance_6];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({regX:17.9,regY:10.4,scaleX:0.9727,scaleY:0.9727,rotation:23.4416,x:69,y:89.3},9).to({regY:10.3,rotation:48.8174,x:44.55,y:87.35},5).to({scaleX:0.9728,scaleY:0.9728,rotation:68.9697,x:28.25,y:76},5).wait(126));

	// Character
	this.ikNode_12 = new lib.Scene_4_Character();
	this.ikNode_12.name = "ikNode_12";
	this.ikNode_12.setTransform(5.55,-22.4,0.609,0.609,0,0,0,90.2,106.8);

	this.timeline.addTween(cjs.Tween.get(this.ikNode_12).wait(145));

	// Lights
	this.instance_7 = new lib.scene_4_tailLights();
	this.instance_7.setTransform(5.1,9.8,1,1,0,0,0,316.1,232.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(145));

	// Pallets
	this.instance_8 = new lib.Scene_4_newOverpacks();
	this.instance_8.setTransform(146.75,141.1,0.8763,0.8763);

	this.instance_9 = new lib.Scene_4_newOverpacks();
	this.instance_9.setTransform(127.35,141.2,0.7996,0.7996,0,0,0,0,0.1);

	this.instance_10 = new lib.Scene_4_newOverpacks();
	this.instance_10.setTransform(-128.1,141.1,0.8763,0.8763,0,0,180);

	this.instance_11 = new lib.Scene_4_newOverpacks();
	this.instance_11.setTransform(-112.85,141.2,0.7996,0.7996,0,0,180,0,0.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8}]}).wait(145));

	// Button
	this.instance_12 = new lib.Arrow("synched",0);
	this.instance_12.setTransform(471.1,21,1,1,0,0,0,9.3,2);
	var instance_12Filter_1 = new cjs.ColorFilter(0,0,0,1,113,0,0,0);
	this.instance_12.filters = [instance_12Filter_1];
	this.instance_12.cache(-18,-23,56,50);

	this.instance_13 = new lib.play_btn();
	this.instance_13.setTransform(454.45,46.25);
	var instance_13Filter_2 = new cjs.ColorFilter(0.5,0.5,0.5,1,0,0,0,0);
	this.instance_13.filters = [instance_13Filter_2];
	this.instance_13.cache(-3,-3,42,42);
	new cjs.ButtonHelper(this.instance_13, 0, 1, 2, false, new lib.play_btn(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_13},{t:this.instance_12}]}).wait(145));
	this.timeline.addTween(cjs.Tween.get(instance_12Filter_1).wait(145));
	this.timeline.addTween(cjs.Tween.get(instance_13Filter_2).wait(145));

	// Truck
	this.instance_14 = new lib.Scene_4_Truck();
	this.instance_14.setTransform(4.9,36.1,1,1,0,0,0,319.9,263.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(145));

	// Dock
	this.instance_15 = new lib.Dock_wall("synched",0);
	this.instance_15.setTransform(0.45,0,1,1,0,0,0,641.6,360.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(145));

	// Background
	this.instance_16 = new lib.Scene_4_Background("synched",0);
	this.instance_16.setTransform(0,0,1,1,0,0,0,350.5,350.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(145));

	this.filterCacheList = [];
	this.filterCacheList.push({instance: this.instance_13, startFrame:0, endFrame:145, x:-3, y:-3, w:42, h:42});
	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-642.3,-361.6,1283.6999999999998,723.2);


(lib.Scene_2_txt_bubble_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_8 = function() {
		var fullText = "Bet...";
		var currentText = "";
		var charIndex = 0;
		
		function typeWriter() {
		    if (charIndex < fullText.length) {
		        currentText += fullText.charAt(charIndex);
		        this.bet_.text = currentText;
		        charIndex++;
		        setTimeout(typeWriter.bind(this), 40);
		    }
		}
		
		
		typeWriter.call(this);
		
		var _this = this;
		
		_this.gotoAndStop(29);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(8).call(this.frame_8).wait(22));

	// txt
	this.bet_ = new cjs.Text("Bet...", "bold 29px 'Brothers OT'");
	this.bet_.name = "bet_";
	this.bet_.textAlign = "center";
	this.bet_.lineHeight = 38;
	this.bet_.lineWidth = 101;
	this.bet_.parent = this;
	this.bet_.setTransform(97.25,18.8);
	this.bet_._off = true;

	this.timeline.addTween(cjs.Tween.get(this.bet_).wait(8).to({_off:false},0).wait(22));

	// Bubble
	this.instance = new lib.Tween10("synched",0);
	this.instance.setTransform(14.25,65.7,0.1691,0.1845);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:1,scaleY:1,x:84.55,y:36.15,alpha:1},8).wait(22));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,171.1,74.4);


(lib.Scene_2_text_bubble_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_14 = function() {
		var fullText = "Boss said if you can't take it all, you have to make a second trip...";
		var currentText = "";
		var charIndex = 0;
		
		function typeWriter() {
		    if (charIndex < fullText.length) {
		        currentText += fullText.charAt(charIndex);
		        this.boss_txt.text = currentText;
		        charIndex++;
		        // Typing delay
		        setTimeout(typeWriter.bind(this), 40); // Type speed
		    }
		}
		
		// Start the typewriter effect
		typeWriter.call(this);
		
		var _this = this;
		
		_this.gotoAndStop(209);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(14).call(this.frame_14).wait(196));

	// boss_txt
	this.boss_txt = new cjs.Text("Boss said if you can't take it all, you have to make second trip...", "bold 28px 'Brothers OT'");
	this.boss_txt.name = "boss_txt";
	this.boss_txt.textAlign = "center";
	this.boss_txt.lineHeight = 37;
	this.boss_txt.lineWidth = 316;
	this.boss_txt.parent = this;
	this.boss_txt.setTransform(315,49.75);
	this.boss_txt._off = true;

	this.timeline.addTween(cjs.Tween.get(this.boss_txt).wait(14).to({_off:false},0).wait(196));

	// Layer_1
	this.instance = new lib.bubble_2();
	this.instance.setTransform(15.55,100,0.2278,0.2278,0,0,0,198.6,79);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:198.5,scaleX:1,scaleY:1,x:313.5,y:99.95,alpha:1},14).wait(196));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-45.6,20.5,558.1,159);


// stage content:
(lib.GRA_211_Final_Project = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {Scene_1:0,Scene_2:450,Scene_3_game:679,Scene_4:689,start_animation:0,Fade_in:0,Fade_out:434,"Fade_in":450,"Fade_out":809,yes_no:629,Restart:833,closed:0,open:99,Intro_txt:269,blink:0,stopBlink:89,Empty:0,"Empty":449,"second trip_txt":489,"second trip_txt":669,Walks_forward:450};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,99,130,212,325,438,541,629,679,689,719,833];
	this.streamSoundSymbolsList[0] = [{id:"Engine_Idle",startFrame:0,endFrame:99,loop:1,offset:0}];
	this.streamSoundSymbolsList[99] = [{id:"soundtrack_main",startFrame:99,endFrame:212,loop:0,offset:0},{id:"Engine_Stop",startFrame:99,endFrame:130,loop:1,offset:0}];
	this.streamSoundSymbolsList[130] = [{id:"electricgarageonlineaudioconvertercom",startFrame:130,endFrame:211,loop:1,offset:0}];
	this.streamSoundSymbolsList[212] = [{id:"soundtrack_main",startFrame:212,endFrame:325,loop:1,offset:0}];
	this.streamSoundSymbolsList[325] = [{id:"soundtrack_main",startFrame:325,endFrame:438,loop:1,offset:0}];
	this.streamSoundSymbolsList[438] = [{id:"soundtrack_main",startFrame:438,endFrame:541,loop:1,offset:0}];
	this.streamSoundSymbolsList[541] = [{id:"soundtrack_1_fade_out",startFrame:541,endFrame:629,loop:1,offset:0}];
	this.streamSoundSymbolsList[689] = [{id:"soundtrack_outro",startFrame:689,endFrame:834,loop:1,offset:0}];
	this.streamSoundSymbolsList[719] = [{id:"Engine_Start_Idle_Stop",startFrame:719,endFrame:834,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("Engine_Idle",0);
		this.InsertIntoSoundStreamData(soundInstance,0,99,1);
		this.stop();
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.start_btn.on('click', function(){
		/*
		Play a Movie Clip/Video or the current timeline.
		Plays the specified movie clip or video.
		*/
		_this.play();
		});
	}
	this.frame_99 = function() {
		var soundInstance = playSound("Engine_Stop",0);
		this.InsertIntoSoundStreamData(soundInstance,99,130,1);
		var soundInstance = playSound("soundtrack_main",-1);
		this.InsertIntoSoundStreamData(soundInstance,99,212,0);
		var _this = this;
		
		_this.gotoAndPlay(59);
		
		// Event listener for button
		this.play_btn.addEventListener("click", openTruckDoor.bind(this));
		
		function openTruckDoor(event) {
		    // Remove the open door event listener to prevent multiple clicks
		    this.play_btn.removeEventListener("click", openTruckDoor);
		    console.log("Event listener removed");
		
		    // Move the timeline to frame 100 and play
		    this.gotoAndPlay(100); // EaselJS frame numbering
		    console.log("Timeline moved to frame 100 and playing from there");
		}
	}
	this.frame_130 = function() {
		var soundInstance = playSound("electricgarageonlineaudioconvertercom",0);
		this.InsertIntoSoundStreamData(soundInstance,130,211,1);
	}
	this.frame_212 = function() {
		var soundInstance = playSound("soundtrack_main",0);
		this.InsertIntoSoundStreamData(soundInstance,212,325,1);
	}
	this.frame_325 = function() {
		var soundInstance = playSound("soundtrack_main",0);
		this.InsertIntoSoundStreamData(soundInstance,325,438,1);
	}
	this.frame_438 = function() {
		var soundInstance = playSound("soundtrack_main",0);
		this.InsertIntoSoundStreamData(soundInstance,438,541,1);
	}
	this.frame_541 = function() {
		var soundInstance = playSound("soundtrack_1_fade_out",0);
		this.InsertIntoSoundStreamData(soundInstance,541,629,1);
	}
	this.frame_629 = function() {
		// loop until button
		this.gotoAndStop(659);
		
		// Event listener for yes button
		this.yes_btn.addEventListener("click", readyNextScene.bind(this));
		
		function readyNextScene(event){
			//Move timeline to frame 660 and play from there
			this.gotoAndPlay(660); //EaselJS frame numbering
			console.log("Timeline moved to frame 659 and playing from there");
		}
		
		
		// Event listener for no button
		this.no_btn.addEventListener("click", restartScene.bind(this));
		
		function restartScene(event){
			//Move the timeline to frame 451
			this.gotoAndPlay(450); //EaselJS frame numbering
			console.log("Timeline moved to frame 450 and playing from there");
		}
	}
	this.frame_679 = function() {
		this.stop();
		
		createjs.Sound.registerSound("C:\Users\kylet\OneDrive\Documents\GRA211_Final\sounds\soundtrack_Game.mp3", "mySoundID");
		createjs.Sound.play("mySoundID");
		
		var _this = this;
		var palletIndex = 0; // tracking pallet movememnts
		var pallets = [
		    {x: 410, y: 40, tapX: 460, tapY: 75, returnX: 445, returnY: 830, uli: 'uli_1'},
		    {x: 665, y: 40, tapX: 730, tapY: 75, returnX: 700, returnY: 830, uli: 'uli_2'},
		    {x: 410, y: 280, tapX: 460, tapY: 315, returnX: 445, returnY: 830, uli: 'uli_1'},
		    {x: 665, y: 280, tapX: 730, tapY: 315, returnX: 700, returnY: 830, uli: 'uli_2'}
		];
		
		function updatePalletCount() {
		    var palletsLeft = pallets.length - palletIndex;
		    _this.palletCount.text = "Pallets Left: " + palletsLeft;
		}
		
		function movePallet() {
		    if (palletIndex < pallets.length) {
		        var target = pallets[palletIndex];
		        var uli = _this[target.uli];
		
		        // Move Uli and the current pallet to the target position
		        createjs.Tween.get(uli)
		            .to({x: target.x + 35, y: target.y + 45}, 2000, createjs.Ease.getPowInOut(2)) // Adjust for Uli's dims
		            .call(function() {
		                // After reaching target, move Uli back to the specific return position
		                createjs.Tween.get(uli)
		                    .to({x: target.returnX, y: target.returnY}, 2000, createjs.Ease.getPowInOut(2))
		                    .call(function() {
		                        // Checking it's the last pallet and Uli_2
		                        if (palletIndex === pallets.length) {
		                            // fade out and go to "Scene_4"
		                            createjs.Tween.get(_this.fadeOut)
		                                .to({alpha: 1}, 1000) // Adjust duration
		                                .call(function() {
		                                    _this.gotoAndPlay("Scene_4"); // Go to the next scene and stop
		                                });
		                        } else {
		                            // Make the tap button visible again and set its position for the next pallet
		                            _this.tap_.x = pallets[palletIndex].tapX;
		                            _this.tap_.y = pallets[palletIndex].tapY;
		                            _this.tap_.visible = true;
		                        }
		                    });
		            });
		
		        createjs.Tween.get(_this['pallet_' + (palletIndex + 1)])
		            .to({x: target.x, y: target.y}, 2000, createjs.Ease.getPowInOut(2));
		
		        palletIndex++;
		        updatePalletCount();
		    }
		}
		
		// Pallet count display
		updatePalletCount();
		
		// Event listener for tap button
		_this.tap_.on('click', function(){
		    _this.tap_.visible = false;
		    movePallet();
		});
		playSound("soundtrack_Game",-1);
	}
	this.frame_689 = function() {
		var soundInstance = playSound("soundtrack_outro",0);
		this.InsertIntoSoundStreamData(soundInstance,689,834,1);
		createjs.Sound.stop("mySoundID");
	}
	this.frame_719 = function() {
		var soundInstance = playSound("Engine_Start_Idle_Stop",0);
		this.InsertIntoSoundStreamData(soundInstance,719,834,1);
	}
	this.frame_833 = function() {
		var _this = this;
		/*
		Stop a Movie Clip/Video
		Stops the specified movie clip or video.
		*/
		_this.stop();
		
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.restart_btn.on('click', function(){
		/*
		Moves the playhead to the specified frame number in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndPlay(1);
		});
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(99).call(this.frame_99).wait(31).call(this.frame_130).wait(82).call(this.frame_212).wait(113).call(this.frame_325).wait(113).call(this.frame_438).wait(103).call(this.frame_541).wait(88).call(this.frame_629).wait(50).call(this.frame_679).wait(10).call(this.frame_689).wait(30).call(this.frame_719).wait(114).call(this.frame_833).wait(1));

	// Start_Animation
	this.start_btn = new cjs.Text("Start", "bold 58px 'Brothers OT'", "#FFFFFF");
	this.start_btn.name = "start_btn";
	this.start_btn.textAlign = "center";
	this.start_btn.lineHeight = 60;
	this.start_btn.lineWidth = 249;
	this.start_btn.parent = this;
	this.start_btn.setTransform(640,314.3);

	this.timeline.addTween(cjs.Tween.get(this.start_btn).to({_off:true},1).wait(833));

	// Layer_4 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_833 = new cjs.Graphics().p("EhkTA40MAAAhxnMDInAAAMAAABxngAyoFPMAnEAAAIAArVMgnEAAAg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(833).to({graphics:mask_graphics_833,x:640.025,y:360}).wait(1));

	// Fade_in_out
	this.instance = new lib.Fade_in_out("synched",0);
	this.instance.setTransform(649.9,354.5,1,1,0,0,0,680.1,383.2);

	this.fadeOut = new lib.FadeOutIn();
	this.fadeOut.name = "fadeOut";
	this.fadeOut.setTransform(641.2,361.2,1,1,0,0,0,642,363.6);
	this.fadeOut.alpha = 0;
	this.fadeOut._off = true;

	var maskedShapeInstanceList = [this.instance,this.fadeOut];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).to({alpha:0},43).to({_off:true},1).wait(390).to({_off:false,x:640,y:360.05},0).to({x:649.9,y:354.5,alpha:1},16).to({alpha:0},14).to({_off:true},1).wait(194).to({_off:false},0).to({alpha:1},10).to({alpha:0},9).to({_off:true},1).wait(155));
	this.timeline.addTween(cjs.Tween.get(this.fadeOut).wait(679).to({_off:false},0).to({alpha:1},10).to({alpha:0},4).to({_off:true},1).wait(115).to({_off:false,x:640,y:360},0).to({alpha:0.8906},24).wait(1));

	// Buttons
	this.play_btn = new lib.play_btn();
	this.play_btn.name = "play_btn";
	this.play_btn.setTransform(1094.95,406.7,1.0213,1.0213,0,0,0,0.2,0);
	new cjs.ButtonHelper(this.play_btn, 0, 1, 2, false, new lib.play_btn(), 3);

	this.no_btn = new lib.Scene_2_btn_no();
	this.no_btn.name = "no_btn";
	this.no_btn.setTransform(720.1,344,1,1,0,0,0,40,30.7);
	new cjs.ButtonHelper(this.no_btn, 0, 1, 2, false, new lib.Scene_2_btn_no(), 3);

	this.yes_btn = new lib.Scene_2_btn_yes();
	this.yes_btn.name = "yes_btn";
	this.yes_btn.setTransform(578.8,341.1,1,1,0,0,0,66.2,27.8);
	new cjs.ButtonHelper(this.yes_btn, 0, 1, 2, false, new lib.Scene_2_btn_yes(), 3);

	this.restart_btn = new lib.Restart();
	this.restart_btn.name = "restart_btn";
	this.restart_btn.setTransform(640,360,1,1,0,0,0,146.3,31);
	new cjs.ButtonHelper(this.restart_btn, 0, 1, 2, false, new lib.Restart(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.play_btn}]}).to({state:[{t:this.play_btn}]},39).to({state:[{t:this.play_btn}]},60).to({state:[{t:this.play_btn}]},125).to({state:[{t:this.play_btn}]},45).to({state:[]},1).to({state:[{t:this.yes_btn},{t:this.no_btn}]},359).to({state:[]},40).to({state:[{t:this.restart_btn}]},164).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.play_btn).wait(224).to({scaleX:6.9511,scaleY:6.9511,x:3731.3,y:1060.35},45).to({_off:true},1).wait(564));

	// Mask (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	var mask_1_graphics_0 = new cjs.Graphics().p("EgV+AzkQgeAAAAgeMAAAhM5QAAgdAeAAMBfqAAAQAeAAAAAdMAAABM5QAAAegeAAg");
	var mask_1_graphics_210 = new cjs.Graphics().p("EgV+AzkQgeAAAAgeMAAAhM5QAAgdAeAAMBfqAAAQAeAAAAAdMAAABM5QAAAegeAAg");
	var mask_1_graphics_224 = new cjs.Graphics().p("EgV+AzkQgeAAAAgeMAAAhM5QAAgdAeAAMBfqAAAQAeAAAAAdMAAABM5QAAAegeAAg");
	var mask_1_graphics_225 = new cjs.Graphics().p("EgfBA3IQgiAAAAghMAAAhWkQAAgiAiAAMBrsAAAQAhAAAAAiMAAABWkQAAAhghAAg");
	var mask_1_graphics_226 = new cjs.Graphics().p("EgoEA6sQgmAAAAglMAAAhgPQAAglAmAAMB3uAAAQAlAAAAAlMAAABgPQAAAlglAAg");
	var mask_1_graphics_227 = new cjs.Graphics().p("EgxHA+RQgqAAAAgpMAAAhp6QAAgpAqAAMCDwAAAQApAAAAApMAAABp6QAAApgpAAg");
	var mask_1_graphics_228 = new cjs.Graphics().p("Eg6LBB1QgtAAAAgtMAAAhzkQAAgtAtAAMCPyAAAQAuAAAAAtMAAABzkQAAAtguAAg");
	var mask_1_graphics_229 = new cjs.Graphics().p("EhDOBFZQgxAAAAgwMAAAh9QQAAgwAxAAMCb0AAAQAxAAAAAwMAAAB9QQAAAwgxAAg");
	var mask_1_graphics_230 = new cjs.Graphics().p("EhMRBI+Qg1AAAAg0MAAAiG7QAAg1A1AAMCn2AAAQA1AAAAA1MAAACG7QAAA0g1AAg");
	var mask_1_graphics_231 = new cjs.Graphics().p("EhVUBMiQg5AAAAg4MAAAiQmQAAg4A5AAMCz4AAAQA5AAAAA4MAAACQmQAAA4g5AAg");
	var mask_1_graphics_232 = new cjs.Graphics().p("EheXBQHQg9AAAAg8MAAAiaRQAAg8A9AAMC/6AAAQA8AAAAA8MAAACaRQAAA8g8AAg");
	var mask_1_graphics_233 = new cjs.Graphics().p("Ehl+BTrQhAAAAAg/MAAAij9QAAg/BAAAMDL9AAAQBAAAAAA/MAAACj9QAAA/hAAAg");
	var mask_1_graphics_234 = new cjs.Graphics().p("Ehr/BX3QhEAAAAhDMAAAitnQAAhDBEAAMDX/AAAQBEAAAABDMAAACtnQAABDhEAAg");
	var mask_1_graphics_235 = new cjs.Graphics().p("EhyABcxQhHAAAAhHMAAAi3TQAAhHBHAAMDkBAAAQBHAAAABHMAAAC3TQAABHhHAAg");
	var mask_1_graphics_236 = new cjs.Graphics().p("Eh4BBhqQhLAAAAhLMAAAjA9QAAhLBLAAMDwDAAAQBLAAAABLMAAADA9QAABLhLAAg");
	var mask_1_graphics_237 = new cjs.Graphics().p("Eh+CBmjQhPAAAAhOMAAAjKpQAAhOBPAAMD8FAAAQBPAAAABOMAAADKpQAABOhPAAg");
	var mask_1_graphics_238 = new cjs.Graphics().p("EiEDBrcQhTAAAAhSMAAAjUTQAAhSBTAAMEIHAAAQBTAAAABSMAAADUTQAABShTAAg");
	var mask_1_graphics_239 = new cjs.Graphics().p("EiKEBwWQhXAAAAhWMAAAjd/QAAhWBXAAMEUJAAAQBXAAAABWMAAADd/QAABWhXAAg");
	var mask_1_graphics_240 = new cjs.Graphics().p("EiQFB1PQhbAAAAhaMAAAjnpQAAhaBbAAMEgLAAAQBbAAAABaMAAADnpQAABahbAAg");
	var mask_1_graphics_241 = new cjs.Graphics().p("EiWGB6IQheAAAAhdMAAAjxVQAAhdBeAAMEsNAAAQBeAAAABdMAAADxVQAABdheAAg");
	var mask_1_graphics_242 = new cjs.Graphics().p("EicHB/BQhiAAAAhgMAAAj7BQAAhgBiAAME4PAAAQBiAAAABgMAAAD7BQAABghiAAg");
	var mask_1_graphics_243 = new cjs.Graphics().p("EiiICD7QhmAAAAhlMAAAkErQAAhlBmAAMFERAAAQBmAAAABlMAAAEErQAABlhmAAg");
	var mask_1_graphics_244 = new cjs.Graphics().p("EioJCI0QhqAAAAhoMAAAkOXQAAhoBqAAMFQTAAAQBqAAAABoMAAAEOXQAABohqAAg");
	var mask_1_graphics_245 = new cjs.Graphics().p("EiuLCNtQhtAAAAhsMAAAkYBQAAhsBtAAMFcXAAAQBtAAAABsMAAAEYBQAABshtAAg");
	var mask_1_graphics_246 = new cjs.Graphics().p("Ei0MCSnQhxAAAAhwMAAAkhtQAAhwBxAAMFoZAAAQBxAAAABwMAAAEhtQAABwhxAAg");
	var mask_1_graphics_247 = new cjs.Graphics().p("Ei6NCXgQh0AAAAh0MAAAkrXQAAh0B0AAMF0bAAAQB0AAAAB0MAAAErXQAAB0h0AAg");
	var mask_1_graphics_248 = new cjs.Graphics().p("EjAOCcZQh4AAAAh3MAAAk1DQAAh3B4AAMGAdAAAQB4AAAAB3MAAAE1DQAAB3h4AAg");
	var mask_1_graphics_249 = new cjs.Graphics().p("EjGPChSQh8AAAAh7MAAAk+tQAAh7B8AAMGMfAAAQB8AAAAB7MAAAE+tQAAB7h8AAg");
	var mask_1_graphics_250 = new cjs.Graphics().p("EjMQCmMQiAAAAAh/MAAAlIZQAAh/CAAAMGYhAAAQCAAAAAB/MAAAFIZQAAB/iAAAg");
	var mask_1_graphics_251 = new cjs.Graphics().p("EjSRCrFQiEAAAAiDMAAAlSDQAAiDCEAAMGkjAAAQCEAAAACDMAAAFSDQAACDiEAAg");
	var mask_1_graphics_252 = new cjs.Graphics().p("EjYSCv+QiIAAAAiGMAAAlbvQAAiGCIAAMGwlAAAQCIAAAACGMAAAFbvQAACGiIAAg");
	var mask_1_graphics_253 = new cjs.Graphics().p("EjeTC03QiLAAAAiKMAAAllZQAAiKCLAAMG8nAAAQCLAAAACKMAAAFlZQAACKiLAAg");
	var mask_1_graphics_254 = new cjs.Graphics().p("EjkUC5xQiPAAAAiOMAAAlvFQAAiOCPAAMHIpAAAQCPAAAACOMAAAFvFQAACOiPAAg");
	var mask_1_graphics_255 = new cjs.Graphics().p("EjqVC+qQiTAAAAiSMAAAl4vQAAiSCTAAMHUrAAAQCTAAAACSMAAAF4vQAACSiTAAg");
	var mask_1_graphics_256 = new cjs.Graphics().p("EjwWDDjQiXAAAAiVMAAAmCbQAAiVCXAAMHgtAAAQCXAAAACVMAAAGCbQAACViXAAg");
	var mask_1_graphics_257 = new cjs.Graphics().p("Ej2XDIdQibAAAAiZMAAAmMHQAAiZCbAAMHsvAAAQCbAAAACZMAAAGMHQAACZibAAg");
	var mask_1_graphics_258 = new cjs.Graphics().p("Ej8YDNWQifAAAAidMAAAmVxQAAidCfAAMH4xAAAQCfAAAACdMAAAGVxQAACdifAAg");
	var mask_1_graphics_259 = new cjs.Graphics().p("EkCZDSPQiiAAAAigMAAAmfdQAAigCiAAMIEzAAAQCiAAAACgMAAAGfdQAACgiiAAg");
	var mask_1_graphics_260 = new cjs.Graphics().p("EkIaDXIQimAAAAikMAAAmpHQAAikCmAAMIQ1AAAQCmAAAACkMAAAGpHQAACkimAAg");
	var mask_1_graphics_261 = new cjs.Graphics().p("EkOcDcCQipAAAAioMAAAmyzQAAioCpAAMIc5AAAQCpAAAACoMAAAGyzQAACoipAAg");
	var mask_1_graphics_262 = new cjs.Graphics().p("EkUdDg7QitAAAAisMAAAm8dQAAisCtAAMIo7AAAQCtAAAACsMAAAG8dQAACsitAAg");
	var mask_1_graphics_263 = new cjs.Graphics().p("EkaeDl0QixAAAAivMAAAnGJQAAivCxAAMI09AAAQCxAAAACvMAAAHGJQAACvixAAg");
	var mask_1_graphics_264 = new cjs.Graphics().p("EkgfDqtQi1AAAAizMAAAnPzQAAizC1AAMJA/AAAQC1AAAACzMAAAHPzQAACzi1AAg");
	var mask_1_graphics_265 = new cjs.Graphics().p("EkmgDvnQi4AAAAi3MAAAnZfQAAi3C4AAMJNBAAAQC4AAAAC3MAAAHZfQAAC3i4AAg");
	var mask_1_graphics_266 = new cjs.Graphics().p("EkshD0gQi8AAAAi7MAAAnjJQAAi7C8AAMJZDAAAQC8AAAAC7MAAAHjJQAAC7i8AAg");
	var mask_1_graphics_267 = new cjs.Graphics().p("EkyiD5ZQjAAAAAi+MAAAns1QAAi+DAAAMJlFAAAQDAAAAAC+MAAAHs1QAAC+jAAAg");
	var mask_1_graphics_268 = new cjs.Graphics().p("Ek4jD+TQjEAAAAjDMAAAn2fQAAjDDEAAMJxHAAAQDEAAAADDMAAAH2fQAADDjEAAg");
	var mask_1_graphics_269 = new cjs.Graphics().p("Ek+kEDMQjIAAAAjGMAAAoALQAAjGDIAAMJ9JAAAQDIAAAADGMAAAIALQAADGjIAAg");

	this.timeline.addTween(cjs.Tween.get(mask_1).to({graphics:mask_1_graphics_0,x:474.575,y:329.9733}).wait(210).to({graphics:mask_1_graphics_210,x:474.575,y:329.9733}).wait(14).to({graphics:mask_1_graphics_224,x:474.575,y:329.9733}).wait(1).to({graphics:mask_1_graphics_225,x:494.0442,y:352.808}).wait(1).to({graphics:mask_1_graphics_226,x:513.5134,y:375.6427}).wait(1).to({graphics:mask_1_graphics_227,x:532.9827,y:398.4774}).wait(1).to({graphics:mask_1_graphics_228,x:552.4519,y:421.3121}).wait(1).to({graphics:mask_1_graphics_229,x:571.9211,y:444.1467}).wait(1).to({graphics:mask_1_graphics_230,x:591.3903,y:466.9814}).wait(1).to({graphics:mask_1_graphics_231,x:610.8595,y:489.8161}).wait(1).to({graphics:mask_1_graphics_232,x:630.3288,y:512.6508}).wait(1).to({graphics:mask_1_graphics_233,x:640.5195,y:535.4855}).wait(1).to({graphics:mask_1_graphics_234,x:640.5745,y:554.3156}).wait(1).to({graphics:mask_1_graphics_235,x:640.6294,y:568.6577}).wait(1).to({graphics:mask_1_graphics_236,x:640.6844,y:582.9999}).wait(1).to({graphics:mask_1_graphics_237,x:640.7393,y:597.342}).wait(1).to({graphics:mask_1_graphics_238,x:640.7943,y:611.6842}).wait(1).to({graphics:mask_1_graphics_239,x:640.8492,y:626.0263}).wait(1).to({graphics:mask_1_graphics_240,x:640.9042,y:640.3685}).wait(1).to({graphics:mask_1_graphics_241,x:640.9591,y:654.7107}).wait(1).to({graphics:mask_1_graphics_242,x:641.0141,y:669.0528}).wait(1).to({graphics:mask_1_graphics_243,x:641.069,y:683.395}).wait(1).to({graphics:mask_1_graphics_244,x:641.1239,y:697.7371}).wait(1).to({graphics:mask_1_graphics_245,x:641.1789,y:712.0793}).wait(1).to({graphics:mask_1_graphics_246,x:641.2338,y:726.4214}).wait(1).to({graphics:mask_1_graphics_247,x:641.2888,y:740.7636}).wait(1).to({graphics:mask_1_graphics_248,x:641.3437,y:755.1058}).wait(1).to({graphics:mask_1_graphics_249,x:641.3987,y:769.4479}).wait(1).to({graphics:mask_1_graphics_250,x:641.4536,y:783.7901}).wait(1).to({graphics:mask_1_graphics_251,x:641.5086,y:798.1322}).wait(1).to({graphics:mask_1_graphics_252,x:641.5635,y:812.4744}).wait(1).to({graphics:mask_1_graphics_253,x:641.6185,y:826.8165}).wait(1).to({graphics:mask_1_graphics_254,x:641.6734,y:841.1587}).wait(1).to({graphics:mask_1_graphics_255,x:641.7284,y:855.5009}).wait(1).to({graphics:mask_1_graphics_256,x:641.7833,y:869.843}).wait(1).to({graphics:mask_1_graphics_257,x:641.8383,y:884.1852}).wait(1).to({graphics:mask_1_graphics_258,x:641.8932,y:898.5273}).wait(1).to({graphics:mask_1_graphics_259,x:641.9482,y:912.8695}).wait(1).to({graphics:mask_1_graphics_260,x:642.0031,y:927.2116}).wait(1).to({graphics:mask_1_graphics_261,x:642.0581,y:941.5538}).wait(1).to({graphics:mask_1_graphics_262,x:642.113,y:955.896}).wait(1).to({graphics:mask_1_graphics_263,x:642.1679,y:970.2381}).wait(1).to({graphics:mask_1_graphics_264,x:642.2229,y:984.5803}).wait(1).to({graphics:mask_1_graphics_265,x:642.2778,y:998.9224}).wait(1).to({graphics:mask_1_graphics_266,x:642.3328,y:1013.2646}).wait(1).to({graphics:mask_1_graphics_267,x:642.3877,y:1027.6067}).wait(1).to({graphics:mask_1_graphics_268,x:642.4427,y:1041.9489}).wait(1).to({graphics:mask_1_graphics_269,x:640.1665,y:1053.9599}).wait(565));

	// Door
	this.truckDoor = new lib.truckDoor();
	this.truckDoor.name = "truckDoor";
	this.truckDoor.setTransform(642.55,406.5,1,1,0,0,0,300.5,244.5);

	var maskedShapeInstanceList = [this.truckDoor];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.truckDoor).wait(99).to({y:-49.2},111).wait(14).to({scaleX:6.8062,scaleY:6.8062,x:635.45,y:-2055.9},45).to({_off:true},1).wait(564));

	// Push_txt
	this.instance_1 = new lib.Arrow("synched",0);
	this.instance_1.setTransform(1111.1,391,1,1,0,0,0,8.1,12);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(39).to({_off:false},0).to({_off:true},5).wait(5).to({_off:false,alpha:1},0).to({_off:true},5).wait(5).to({_off:false},0).to({_off:true},5).wait(5).to({_off:false},0).to({_off:true},5).wait(5).to({_off:false},0).to({_off:true},5).wait(5).to({_off:false},0).to({_off:true},5).wait(740));

	// Text_Bubble
	this.instance_2 = new lib.txt_bubble_1();
	this.instance_2.setTransform(1086.3,352.9,1,1,0,0,0,220.7,117);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(269).to({_off:false},0).to({_off:true},181).wait(384));

	// Main_Character
	this.instance_3 = new lib.Main_Character("synched",0);
	this.instance_3.setTransform(640,451.8,0.5827,0.5827,0,0,0,97.9,310.3);

	this.character = new lib.Main_Character("synched",0);
	this.character.name = "character";
	this.character.setTransform(640,451.8,0.5827,0.5827,0,0,0,97.9,310.3);
	this.character._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_3}]},99).to({state:[{t:this.character}]},125).to({state:[{t:this.character}]},45).to({state:[]},181).wait(384));
	this.timeline.addTween(cjs.Tween.get(this.character).wait(224).to({_off:false},0).to({regX:98,regY:310.4,scaleX:3.9658,scaleY:3.9658,x:635.2,y:1367.75},45).to({_off:true},181).wait(384));

	// Tail_Lights
	this.tailLights = new lib.TailLights();
	this.tailLights.name = "tailLights";
	this.tailLights.setTransform(640.1,366.8,1,1,0,0,0,316.1,232.8);
	var tailLightsFilter_1 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.tailLights.filters = [tailLightsFilter_1];
	this.tailLights.cache(-3,-3,638,472);

	this.timeline.addTween(cjs.Tween.get(this.tailLights).wait(224).to({scaleX:6.8062,scaleY:6.8062,x:635.8,y:789.1},45).to({_off:true},1).wait(564));
	this.timeline.addTween(cjs.Tween.get(tailLightsFilter_1).wait(8).to(new cjs.ColorFilter(0.75,0.75,0.75,1,0,0,0,0), 0).wait(11).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(10).to(new cjs.ColorFilter(0.75,0.75,0.75,1,0,0,0,0), 0).wait(10).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(10).to(new cjs.ColorFilter(0.75,0.75,0.75,1,0,0,0,0), 0).wait(10).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(10).to(new cjs.ColorFilter(0.75,0.75,0.75,1,0,0,0,0), 0).wait(10).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(10).to(new cjs.ColorFilter(0.75,0.75,0.75,1,0,0,0,0), 0).wait(744));

	// Truck
	this.trk = new lib.Truck();
	this.trk.name = "trk";
	this.trk.setTransform(640,393.6,1,1,0,0,0,319.9,263.1);

	this.timeline.addTween(cjs.Tween.get(this.trk).wait(224).to({scaleX:6.8062,scaleY:6.8062,x:635.2,y:971.45},45).to({_off:true},1).wait(564));

	// Truck_Bed
	this.truck_bed = new lib.TruckBed();
	this.truck_bed.name = "truck_bed";
	this.truck_bed.setTransform(639.75,407.9,1,1,0,0,0,329.4,250.9);

	this.timeline.addTween(cjs.Tween.get(this.truck_bed).wait(224).to({regX:329.1,regY:250.6,scaleX:6.5871,scaleY:6.5871,x:638.05,y:1070.75},45).to({_off:true},180).wait(385));

	// Dock_Wall_Ramp
	this.instance_4 = new lib.Dock_wall("synched",0);
	this.instance_4.setTransform(641.3,360.1,1,1,0,0,0,641.6,360.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(224).to({startPosition:0},0).to({scaleX:6.8062,scaleY:6.8062,x:644.1,y:743.45},45).to({_off:true},1).wait(564));

	// Background
	this.instance_5 = new lib.Background_outside("synched",0);
	this.instance_5.setTransform(640.4,346.25,1,1,0,0,0,350.5,350.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({_off:true},450).wait(384));

	// Dialogue_3
	this.instance_6 = new lib.Scene_2_can_he_do_it();
	this.instance_6.setTransform(658.05,308.3,0.2338,0.2338,0,0,0,155.1,63.3);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(613).to({_off:false},0).to({scaleX:1,scaleY:1,x:658.1,alpha:1},14).wait(42).to({_off:true},1).wait(164));

	// Dialogue_2
	this.instance_7 = new lib.Scene_2_text_bubble_1();
	this.instance_7.setTransform(263.55,192.3,1,1,0,0,0,237.5,127);

	this.instance_8 = new lib.Scene_2_txt_bubble_2();
	this.instance_8.setTransform(783.4,616.5,1,1,0,0,0,84.5,36.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_7}]},489).to({state:[{t:this.instance_7},{t:this.instance_8}]},110).to({state:[{t:this.instance_7}]},70).to({state:[]},1).wait(164));

	// Character_head
	this.backside = new lib.Backside_Character();
	this.backside.name = "backside";
	this.backside.setTransform(639.75,781,1,1,0,0,0,55.4,62);
	this.backside._off = true;

	this.timeline.addTween(cjs.Tween.get(this.backside).wait(450).to({_off:false},0).to({y:677},39).to({_off:true},181).wait(164));

	// MaterialsToLoad
	this.overpack = new lib.Overpacks();
	this.overpack.name = "overpack";
	this.overpack.setTransform(345.8,380.65,1.0542,1.0542,0,0,180,89.4,106.8);

	this.overpack_1 = new lib.Overpacks();
	this.overpack_1.name = "overpack_1";
	this.overpack_1.setTransform(170.75,380.65,1.0542,1.0542,0,0,180,89.4,106.8);

	this.overpack_2 = new lib.Overpacks();
	this.overpack_2.name = "overpack_2";
	this.overpack_2.setTransform(954.55,380.65,1.0542,1.0542,0,0,0,89.5,106.8);

	this.overpack_3 = new lib.Overpacks();
	this.overpack_3.name = "overpack_3";
	this.overpack_3.setTransform(1142.95,380.65,1.0542,1.0542,0,0,0,89.4,106.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.overpack_3},{t:this.overpack_2},{t:this.overpack_1},{t:this.overpack}]},450).to({state:[{t:this.overpack_3},{t:this.overpack_2},{t:this.overpack_1},{t:this.overpack}]},219).to({state:[]},1).wait(164));

	// Pallet_Jack
	this.instance_9 = new lib.Pallet_Jack();
	this.instance_9.setTransform(1142.75,583.65,1,1,0,0,0,114.8,79.9);
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(450).to({_off:false},0).wait(219).to({_off:true},1).wait(164));

	// Dock
	this.instance_10 = new lib.Loading_Dock("synched",0);
	this.instance_10.setTransform(640.7,359.75,1,1,0,0,0,640.7,360.9);
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(450).to({_off:false},0).wait(219).to({startPosition:0},0).to({_off:true},1).wait(164));

	// Layer_1
	this.palletCount = new cjs.Text("", "70px 'Franklin Gothic Heavy'");
	this.palletCount.name = "palletCount";
	this.palletCount.textAlign = "center";
	this.palletCount.lineHeight = 81;
	this.palletCount.lineWidth = 226;
	this.palletCount.parent = this;
	this.palletCount.setTransform(1042.6,25.55);
	this.palletCount._off = true;

	this.timeline.addTween(cjs.Tween.get(this.palletCount).wait(678).to({_off:false},0).to({_off:true},11).wait(145));

	// touchButton
	this.tap_ = new lib.tap_here();
	this.tap_.name = "tap_";
	this.tap_.setTransform(452.45,67.45,0.8409,0.8409,0,0,0,-9,-9);
	this.tap_._off = true;

	this.timeline.addTween(cjs.Tween.get(this.tap_).wait(678).to({_off:false},0).to({_off:true},11).wait(145));

	// Pallets
	this.pallet_4 = new lib.P4();
	this.pallet_4.name = "pallet_4";
	this.pallet_4.setTransform(665,785);

	this.pallet_3 = new lib.P3();
	this.pallet_3.name = "pallet_3";
	this.pallet_3.setTransform(410,785);

	this.pallet_2 = new lib.P2();
	this.pallet_2.name = "pallet_2";
	this.pallet_2.setTransform(665,785);

	this.pallet_1 = new lib.P1();
	this.pallet_1.name = "pallet_1";
	this.pallet_1.setTransform(410,785);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.pallet_1},{t:this.pallet_2},{t:this.pallet_3},{t:this.pallet_4}]},678).to({state:[]},11).wait(145));

	// Character
	this.uli_1 = new lib.uli_copy();
	this.uli_1.name = "uli_1";
	this.uli_1.setTransform(445,830,0.9659,0.9651);

	this.uli_2 = new lib.uli_copy();
	this.uli_2.name = "uli_2";
	this.uli_2.setTransform(700,830,0.9659,0.9651);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.uli_2},{t:this.uli_1}]},678).to({state:[]},11).wait(145));

	// Truck_Topview
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("Egq8g4wMAAABdvEAq9Aj1QAAAMAAAMEAq9AklIAAAaEhDiAMaMAAAherEBDjAMaMAAAherEhDhBSSMAAAhCLEBDiBSSMAAAhCL");
	this.shape.setTransform(640.0251,380.975,0.9527,1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("Egq8AxLIAAklMAAAhdvMBV4gABIABAxIAAAMIAAALMAAABbeIAAAYIAAAYIAAAaIAADbIAAAZIAAAGIAAATIgBAYg");
	this.shape_1.setTransform(640.0131,332.275,0.9527,1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#666666").s().p("EAq9AmbIAAgbIAAgTIAAgGIAAgZIAAjbIAAgaIAAgYIAAgYMAAAhbeIAAgLIAAgMIAAgxIgBgCIAAACMhV4AABMAAABdvIAAElIAAADMgYlAvEIAAmZMAAAhCLIgBgCIAAjrMAAAherIAAgBMCHFAAAIAAABMAAABerIAADrIgBACMAAABCLIAAGZg");
	this.shape_2.setTransform(640.0251,401.375,0.9527,1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},670).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},8).to({state:[]},11).wait(145));

	// Background
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(1,1,1).p("Egq7gKOMBVpAAAICVUdMhaFAAAg");
	this.shape_3.setTransform(640.0038,688.325,0.9527,1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFF33").s().p("EgtCAKPICH0dMBVpAAAICVUdg");
	this.shape_4.setTransform(640.0038,688.325,0.9527,1);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#333333").s().p("Ehj/A4QMAAAhwfMDH/AAAMAAABwfg");
	this.shape_5.setTransform(640.0258,273.9939,0.8262,1.2361);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#333333").s().p("EhSmBFiMAAAiLDMClNAAAMAAACLDg");
	this.shape_6.setTransform(640.025,274);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3}]},670).to({state:[{t:this.shape_6},{t:this.shape_4},{t:this.shape_3}]},8).to({state:[]},11).wait(145));

	// Mask_outro_txt (mask)
	var mask_2 = new cjs.Shape();
	mask_2._off = true;
	var mask_2_graphics_734 = new cjs.Graphics().p("Af3f8IAA/zMApyAAAIAAfzg");
	var mask_2_graphics_735 = new cjs.Graphics().p("EAf3AgSIAA/zMApzAAAIAAfzg");
	var mask_2_graphics_736 = new cjs.Graphics().p("EAf4AgpIAA/zMApyAAAIAAfzg");
	var mask_2_graphics_737 = new cjs.Graphics().p("EAf4AhAIAA/zMApzAAAIAAfzg");
	var mask_2_graphics_738 = new cjs.Graphics().p("EAf5AhWIAA/zMApyAAAIAAfzg");
	var mask_2_graphics_739 = new cjs.Graphics().p("EAf5AhtIAA/zMApzAAAIAAfzg");
	var mask_2_graphics_740 = new cjs.Graphics().p("EAf6AiEIAA/zMApyAAAIAAfzg");
	var mask_2_graphics_741 = new cjs.Graphics().p("EAf6AiaIAA/zMApzAAAIAAfzg");
	var mask_2_graphics_742 = new cjs.Graphics().p("EAf7AixIAA/zMApyAAAIAAfzg");
	var mask_2_graphics_743 = new cjs.Graphics().p("EAf7AjIIAA/zMApzAAAIAAfzg");
	var mask_2_graphics_744 = new cjs.Graphics().p("EAf8AjeIAA/zMApyAAAIAAfzg");
	var mask_2_graphics_745 = new cjs.Graphics().p("EAf8Aj1IAA/zMApzAAAIAAfzg");
	var mask_2_graphics_746 = new cjs.Graphics().p("EAf9AkMIAA/zMApyAAAIAAfzg");
	var mask_2_graphics_747 = new cjs.Graphics().p("EAf9AkjIAA/zMApzAAAIAAfzg");
	var mask_2_graphics_748 = new cjs.Graphics().p("EAf+Ak5IAA/zMApyAAAIAAfzg");
	var mask_2_graphics_749 = new cjs.Graphics().p("EAf+AlQIAA/zMApzAAAIAAfzg");
	var mask_2_graphics_750 = new cjs.Graphics().p("EAf+AlnIAA/zMApzAAAIAAfzg");
	var mask_2_graphics_751 = new cjs.Graphics().p("EAf/Al9IAA/zMApyAAAIAAfzg");
	var mask_2_graphics_752 = new cjs.Graphics().p("EAf/AmUIAA/zMApzAAAIAAfzg");
	var mask_2_graphics_753 = new cjs.Graphics().p("EAgAAmrIAA/zMApyAAAIAAfzg");
	var mask_2_graphics_754 = new cjs.Graphics().p("EAgAAnBIAA/zMApzAAAIAAfzg");
	var mask_2_graphics_755 = new cjs.Graphics().p("EAgBAnYIAA/zMApyAAAIAAfzg");
	var mask_2_graphics_756 = new cjs.Graphics().p("EAgBAnvIAA/zMApzAAAIAAfzg");
	var mask_2_graphics_757 = new cjs.Graphics().p("EAgCAoFIAA/zMApyAAAIAAfzg");
	var mask_2_graphics_758 = new cjs.Graphics().p("EAgCAocIAA/zMApzAAAIAAfzg");
	var mask_2_graphics_759 = new cjs.Graphics().p("EAgDAozIAA/zMApyAAAIAAfzg");
	var mask_2_graphics_760 = new cjs.Graphics().p("EAgDApJIAA/zMApzAAAIAAfzg");
	var mask_2_graphics_761 = new cjs.Graphics().p("EAgEApgIAA/zMApyAAAIAAfzg");
	var mask_2_graphics_762 = new cjs.Graphics().p("EAgEAp3IAA/zMApzAAAIAAfzg");
	var mask_2_graphics_763 = new cjs.Graphics().p("EAgFAqNIAA/zMApyAAAIAAfzg");
	var mask_2_graphics_764 = new cjs.Graphics().p("EAgFAqkIAA/zMApzAAAIAAfzg");
	var mask_2_graphics_765 = new cjs.Graphics().p("EAgGAq7IAA/zMApyAAAIAAfzg");
	var mask_2_graphics_766 = new cjs.Graphics().p("EAgGArRIAA/zMApyAAAIAAfzg");
	var mask_2_graphics_767 = new cjs.Graphics().p("EAgGAroIAA/zMApzAAAIAAfzg");
	var mask_2_graphics_768 = new cjs.Graphics().p("EAgHAr/IAA/zMApyAAAIAAfzg");
	var mask_2_graphics_769 = new cjs.Graphics().p("EAgHAsVIAA/zMApzAAAIAAfzg");
	var mask_2_graphics_770 = new cjs.Graphics().p("EAgIAssIAA/zMApyAAAIAAfzg");
	var mask_2_graphics_771 = new cjs.Graphics().p("EAgIAtDIAA/zMApzAAAIAAfzg");
	var mask_2_graphics_772 = new cjs.Graphics().p("EAgJAtZIAA/zMApyAAAIAAfzg");
	var mask_2_graphics_773 = new cjs.Graphics().p("EAgJAtwIAA/zMApzAAAIAAfzg");

	this.timeline.addTween(cjs.Tween.get(mask_2).to({graphics:null,x:0,y:0}).wait(734).to({graphics:mask_2_graphics_734,x:471.35,y:204.375}).wait(1).to({graphics:mask_2_graphics_735,x:471.3968,y:206.6423}).wait(1).to({graphics:mask_2_graphics_736,x:471.4436,y:208.9096}).wait(1).to({graphics:mask_2_graphics_737,x:471.4904,y:211.1769}).wait(1).to({graphics:mask_2_graphics_738,x:471.5372,y:213.4442}).wait(1).to({graphics:mask_2_graphics_739,x:471.584,y:215.7115}).wait(1).to({graphics:mask_2_graphics_740,x:471.6308,y:217.9788}).wait(1).to({graphics:mask_2_graphics_741,x:471.6776,y:220.2462}).wait(1).to({graphics:mask_2_graphics_742,x:471.7244,y:222.5135}).wait(1).to({graphics:mask_2_graphics_743,x:471.7712,y:224.7808}).wait(1).to({graphics:mask_2_graphics_744,x:471.8179,y:227.0481}).wait(1).to({graphics:mask_2_graphics_745,x:471.8647,y:229.3154}).wait(1).to({graphics:mask_2_graphics_746,x:471.9115,y:231.5827}).wait(1).to({graphics:mask_2_graphics_747,x:471.9583,y:233.85}).wait(1).to({graphics:mask_2_graphics_748,x:472.0051,y:236.1173}).wait(1).to({graphics:mask_2_graphics_749,x:472.0519,y:238.3846}).wait(1).to({graphics:mask_2_graphics_750,x:472.0987,y:240.6519}).wait(1).to({graphics:mask_2_graphics_751,x:472.1455,y:242.9192}).wait(1).to({graphics:mask_2_graphics_752,x:472.1923,y:245.1865}).wait(1).to({graphics:mask_2_graphics_753,x:472.2391,y:247.4538}).wait(1).to({graphics:mask_2_graphics_754,x:472.2859,y:249.7212}).wait(1).to({graphics:mask_2_graphics_755,x:472.3327,y:251.9885}).wait(1).to({graphics:mask_2_graphics_756,x:472.3795,y:254.2558}).wait(1).to({graphics:mask_2_graphics_757,x:472.4263,y:256.5231}).wait(1).to({graphics:mask_2_graphics_758,x:472.4731,y:258.7904}).wait(1).to({graphics:mask_2_graphics_759,x:472.5199,y:261.0577}).wait(1).to({graphics:mask_2_graphics_760,x:472.5667,y:263.325}).wait(1).to({graphics:mask_2_graphics_761,x:472.6135,y:265.5923}).wait(1).to({graphics:mask_2_graphics_762,x:472.6603,y:267.8596}).wait(1).to({graphics:mask_2_graphics_763,x:472.7071,y:270.1269}).wait(1).to({graphics:mask_2_graphics_764,x:472.7538,y:272.3942}).wait(1).to({graphics:mask_2_graphics_765,x:472.8006,y:274.6615}).wait(1).to({graphics:mask_2_graphics_766,x:472.8474,y:276.9288}).wait(1).to({graphics:mask_2_graphics_767,x:472.8942,y:279.1962}).wait(1).to({graphics:mask_2_graphics_768,x:472.941,y:281.4635}).wait(1).to({graphics:mask_2_graphics_769,x:472.9878,y:283.7308}).wait(1).to({graphics:mask_2_graphics_770,x:473.0346,y:285.9981}).wait(1).to({graphics:mask_2_graphics_771,x:473.0814,y:288.2654}).wait(1).to({graphics:mask_2_graphics_772,x:473.1282,y:290.5327}).wait(1).to({graphics:mask_2_graphics_773,x:473.175,y:292.8}).wait(61));

	// text_bubble
	this.instance_11 = new lib.Scene_4_outro_txt();
	this.instance_11.setTransform(789.45,300.9,1,1,0,0,0,96.8,37.4);
	this.instance_11._off = true;

	var maskedShapeInstanceList = [this.instance_11];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_2;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(689).to({_off:false},0).wait(145));

	// Outro
	this.instance_12 = new lib.Scene_4_Dock("synched",0);
	this.instance_12.setTransform(1276.05,720.1,1,1,0,0,0,636.1,360.1);
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(689).to({_off:false},0).wait(145));
	this.instance_12.addEventListener("tick", AdobeAn.handleFilterCache);

	this.filterCacheList = [];
	this.filterCacheList.push({instance: this.tailLights, startFrame:8, endFrame:8, x:-3, y:-3, w:638, h:472});
	this.filterCacheList.push({instance: this.tailLights, startFrame:0, endFrame:0, x:-3, y:-3, w:638, h:472});
	this.filterCacheList.push({instance: this.tailLights, startFrame:19, endFrame:19, x:-3, y:-3, w:638, h:472});
	this.filterCacheList.push({instance: this.tailLights, startFrame:29, endFrame:29, x:-3, y:-3, w:638, h:472});
	this.filterCacheList.push({instance: this.tailLights, startFrame:39, endFrame:39, x:-3, y:-3, w:638, h:472});
	this.filterCacheList.push({instance: this.tailLights, startFrame:49, endFrame:49, x:-3, y:-3, w:638, h:472});
	this.filterCacheList.push({instance: this.tailLights, startFrame:59, endFrame:59, x:-3, y:-3, w:638, h:472});
	this.filterCacheList.push({instance: this.tailLights, startFrame:69, endFrame:69, x:-3, y:-3, w:638, h:472});
	this.filterCacheList.push({instance: this.tailLights, startFrame:79, endFrame:79, x:-3, y:-3, w:638, h:472});
	this.filterCacheList.push({instance: this.tailLights, startFrame:89, endFrame:89, x:-3, y:-3, w:638, h:472});
	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-3090.6,-1357.5,8097.1,4561.7);
// library properties:
lib.properties = {
	id: '08003997AF4C1944BFEE7179A11A3366',
	width: 1280,
	height: 720,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"sounds/electricgarageonlineaudioconvertercom.mp3", id:"electricgarageonlineaudioconvertercom"},
		{src:"sounds/Engine_Idle.mp3", id:"Engine_Idle"},
		{src:"sounds/Engine_Start_Idle_Stop.mp3", id:"Engine_Start_Idle_Stop"},
		{src:"sounds/Engine_Stop.mp3", id:"Engine_Stop"},
		{src:"sounds/soundtrack_1_fade_out.mp3", id:"soundtrack_1_fade_out"},
		{src:"sounds/soundtrack_Game.mp3", id:"soundtrack_Game"},
		{src:"sounds/soundtrack_main.mp3", id:"soundtrack_main"},
		{src:"sounds/soundtrack_outro.mp3", id:"soundtrack_outro"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['08003997AF4C1944BFEE7179A11A3366'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;