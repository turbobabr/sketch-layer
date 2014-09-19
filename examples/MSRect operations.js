// (control v)
#import 'modules/sketch-layer/layer.js'

(function(){

    var layer=selection.firstObject();
    if(layer) {
        layer = Layer(layer);

        // Quick access to MSLayer's frame properties.
        print("X: "+layer.x());
        print("Y: "+layer.y());
        print("Width: "+layer.width());
        print("Width: "+layer.height());
        print(" ");
        print("Size: "+layer.size());
        print(" ");
        print("midX: "+layer.midX());
        print("midY: "+layer.midY());

        print("minX: "+layer.minX());
        print("maxX: "+layer.maxX());


        print("minY: "+layer.minY());
        print("maxY: "+layer.maxY());

        print("Left: "+layer.left());
        print("Top: "+layer.top());
        print("Right: "+layer.right());
        print("Bottom: "+layer.bottom());

    }

})();