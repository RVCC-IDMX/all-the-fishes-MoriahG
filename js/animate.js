//Animate object
let Animate = {};

//Interpolation functions
Animate.linear = (x) => x;
Animate.easeIn = (x) => x * x;
Animate.easeOut = (x) => x * (2 - x);
Animate.easeInOut = (x) => {
    if (x < 0.5) {
        return 2 * x * x;
    }
    else return 1 - Math.pow(-2 * x + 2, 2) / 2;
}


//Basic animator
Animate.to = function(obj, end) {

    //Make it a Promise
    return new Promise( (resolve, reject) => {

        //Duration
        let duration = end.duration;
        
        //Where is it now? (Beginning state)
        let start = {
            x : obj.x,
            y : obj.y,
            tint : obj.tint
        };

        //Set defaults
        if (end.easing === undefined) end.easing = Animate.linear;
        if (end.tint === undefined) end.tint = obj.tint;

        //Start time
        let startTime = Date.now();

        //Loop (does the animation)
        function loop(){

            //Calculate times
            let ticker = Date.now() - startTime;
            let delta = ticker / duration; //0.0 (just started) - 1.0 (done)
            let ease = end.easing(delta);

            //Check if we're done
            if(delta >= 1){
                obj.x = end.x;
                obj.y = end.y;
                obj.tint = end.tint;
                resolve();
                return;
            }

            //Interpolate (LERP)
            function lerp(a, b, n) {
                return a + ( (b - a) * n);
            }

            //Lerp our coordinates
            obj.x = lerp(start.x, end.x, ease);
            obj.y = lerp(start.y, end.y, ease);
            obj.tint = lerp(start.tint, end.tint, ease);

            
            //Loop again
            requestAnimationFrame(loop);
        }
        loop();

        
    } ); //End Promise
};
const Sleep = function (ms) {
    return new Promise( (resolve, reject) => {
        setTimeout(resolve, ms);
    });
}

export { Animate , Sleep};