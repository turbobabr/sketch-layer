// sketch-layer.js
// http://github.com/turbobabr/sketch-layer
// (c) 2014 Andrey Shakhmin
// May be freely distributed under the MIT license.

(function(){
    var root = this;

    // Type checking & utility functions.
    function isUndefined(obj) {
        return obj === void 0;
    }

    function isDefined(obj) {
        return !isUndefined(obj);
    }

    function isNSObject(obj) {
        return toString.call(obj)==="[object MOBoxedObject]";
    }

    function isBoolean(obj) {
        return toString.call(obj)==="[object Boolean]";
    }

    function isArray(obj) {
        return Array.isArray(obj);
    }


    function Layer(layer) {

        var frame=layer.frame();
        var sub=null;

        if(layer.layers) {
            sub = layer.layers().firstObject();
        }

        return {

            // General
            isKindOfClass: function(obj) {
                if(isArray(obj)) {
                    for(var i=0;i<obj.length;i++) {
                        if(layer.isKindOfClass(obj[i].class())) return true;
                    }

                    return false;
                }

                return layer.isKindOfClass(obj.class());
            },

            layer: function() {
                return layer;
            },

            // MSModelObject
            objectID: function() {
                return layer.objectID();
            },

            parent : function() {
                return layer.parentGroup();
            },

            // MSRect
            x: function(val) {
                if(isDefined(val)) {
                    frame.x=val;
                    return this;
                }
                return frame.x();
            },
            y: function(val) {
                if(isDefined(val)) {
                    frame.y=val;
                    return this;
                }
                return frame.y();
            },
            width: function(val) {
                if(val) {
                    // frame.setWidth(val);
                    frame.width=val;
                    return this;
                }
                return frame.width();
            },
            height: function(val) {
                if(val) {
                    // frame.setHeight(val);
                    frame.height=val;
                    return this;
                }
                return frame.height();
            },
            size: function(width,height,center) {
                if(width || height) {
                    var height=height || width;

                    var mx=frame.midX(), my=frame.midY();

                    if(toString.call(height)=="[object Boolean]") {
                        this.width(width).height(width);
                        frame.midX=mx;
                        frame.midY=my;

                    } else {
                        this.width(width).height(height);
                    }

                    return this;
                }

                return frame.size();
            },

            scale: function(val) {
                if(isUndefined(val)) return this;
                frame.scaleBy(val);

                return this;
            },

            // top
            top: function(val) {
                if(isDefined(val)) {
                    // TODO: Have to check this.
                    var y=frame.y(),height=frame.height();
                    frame.y=val;
                    frame.height=y+height-val;
                    return this;
                }
                return frame.top();
            },

            // left
            left: function(val) {
                if(isDefined(val)) {
                    // TODO: Have to check this.
                    var x=frame.x(),width=frame.width();
                    frame.x=val;
                    frame.width=x+width-val;
                    return this;
                }
                return frame.left();
            },
            // right
            right: function(val) {
                if(isDefined(val)) {
                    // TODO: Have to check this.
                    frame.width = val-frame.x();
                    return this;
                }
                return frame.x()+frame.width();
            },
            // bottom
            bottom: function(val) {
                if(isDefined(val)) {
                    // TODO: Have to check this.
                    frame.height = val-frame.y();
                    return this;
                }
                return frame.y()+frame.height();
            },

            midX: function(val) {
                if(isDefined(val)) {
                    frame.midX=val;
                    return this;
                }
                return frame.midX();
            },
            midY: function(val) {
                if(isDefined(val)) {
                    frame.midY=val;
                    return this;
                }
                return frame.midY();
            },


            minX: function(val) {
                if(isDefined(val)) {
                    frame.minX=val;
                    return this;
                }
                return frame.minX();
            },
            maxX: function(val) {
                if(isDefined(val)) {
                    frame.maxX=val;
                    return this;
                }
                return frame.maxX();
            },
            minY: function(val) {
                if(isDefined(val)) {
                    frame.minY=val;
                    return this;
                }
                return frame.minY();
            },
            maxY: function(val) {
                if(isDefined(val)) {
                    frame.maxY=val;
                    return this;
                }
                return frame.maxY();
            },

            subtractHeight: function(val) {
                if(isDefined(val)) {
                    frame.subtractHeight(val);
                }
                return this;
            },
            addHeight: function(val) {
                if(isDefined(val)) {
                    frame.addHeight(val);
                }
                return this;
            },
            subtractWidth: function(val) {
                if(isDefined(val)) {
                    frame.subtractWidth(val);
                }
                return this;
            },
            addWidth: function(val) {
                if(isDefined(val)) {
                    frame.addWidth(val);
                }
                return this;
            },
            subtractY: function(val) {
                if(isDefined(val)) {
                    frame.subtractY(val);
                }
                return this;
            },
            addY: function(val) {
                if(isDefined(val)) {
                    frame.addY(val);
                }
                return this;
            },
            subtractX: function(val) {
                if(isDefined(val)) {
                    frame.subtractX(val);
                }
                return this;
            },
            addX: function(val) {
                if(isDefined(val)) {
                    frame.addX(val);
                }
                return this;
            },

            // origin
            // mid


            proportions: function(val) {
                return frame.width()/frame.height();
            },

            centerByLayer: function(layer,round) {
                var round = round || false;
                // TODO:
                return this;
            },


            // MSRectShape.
            radius: function(val) {
                if(sub && sub.setFixedRadius) {
                    if(isDefined(val)) {
                        sub.setFixedRadius(val);
                        sub.resetPointsBasedOnUserInteraction();
                        return this;
                    }

                    return sub.fixedRadius();
                }

                return;
            },

            // MSLayer
            name: function(val) {
                if(val) {
                    layer.setName(val);
                    return this;
                }
                return layer.name();
            },
            nameIsFixed: function(val) {
                if(isDefined(val)) {
                    layer.setNameIsFixed(val);
                    return this;
                }
                return layer.nameIsFixed();
            },
            visible: function(val) {

                if(isDefined(val)) {
                    layer.setIsVisible(val);
                    return this;
                }
                return layer.isVisible();
            },
            locked: function(val) {
                if(isDefined(val)) {
                    layer.setIsLocked(val);
                    return this;
                }
                return layer.isLocked();
            },
            flippedHorizontal: function(val) {
                if(isDefined(val)) {
                    layer.setIsFlippedHorizontal(val);
                    return this;
                }
                return layer.isFlippedHorizontal();
            },
            flippedVertical: function(val) {
                if(isDefined(val)) {
                    layer.setIsFlippedVertical(val);
                    return this;
                }
                return layer.isFlippedVertical();
            },
            rotation: function(val) {
                if(isDefined(val)) {
                    layer.setRotation(val);
                    return this;
                }
                return layer.rotation();
            },

            selected: function(val) {
                if(isDefined(val)) {
                    layer.setIsSelected(val);
                    return this;
                }

                return layer.isSelected();
            },

            // MSLayer - operations.
            select: function(val,byExpandingSelection) {
                var byExpandingSelection = byExpandingSelection || false;
                layer.select_byExpandingSelection(val,byExpandingSelection);
                return this;
            },



            // TEXTURES TO EVERYONE! :)
            pattern: function (img) {
                if(isUndefined(img)) {
                    return layer.style().fill().image();
                }

                var images=doc.documentData().images();
                var rawImage,image;

                // Is raw image?
                if(toString.call(img)=="[object MOBoxedObject]" && img.className()=="NSImage") {
                    rawImage = img;
                } else if(toString.call(img)=="[object String]") {
                    rawImage = NSImage.alloc().initWithContentsOfFile(img);
                } else if(toString.call(img)=="[object MOBoxedObject]" && img.className()=="__NSCFString") {
                    rawImage = NSImage.alloc().initWithContentsOfFile(img);
                } else if(img.className()=="NSURL") {
                    if(img.isFileURL()){
                        rawImage = NSImage.alloc().initWithContentsOfURL(img);
                    } else {

                        function request(url) {
                            var request = NSURLRequest.requestWithURL(url);
                            var response = NSURLConnection.sendSynchronousRequest_returningResponse_error(request, null, null);
                            return response;
                        }

                        rawImage=NSImage.alloc().initWithData(request(img));
                    }
                }

                image=[images addImage:rawImage name:"Raster Image" convertColourspace:true];

                var fill=layer.style().fill();
                fill.setFillType(4);
                fill.setImage(image);

                return this;
            }

        }
    };

    root.Layer = Layer;

}).call(this);

