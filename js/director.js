import {Animate} from './animate.js';

class Director {

    //Constructor
    constructor(stage){
        this.stage = stage;
        this.scene = {};            //List of scenes
        this.currentScene = null;   //Whats currently on

    }

    //Add scene to the list
    addScene(name, scene) {
        //Does it exist?
        if(this.scene[name])
            throw "That scene already exists!";

        //Otherwise add it
        this.scene[name] = scene;

        //If it's the first scene, make it the active one
        if(this.currentScene == null) {
            this.currentScene = name;
            this.stage.addChild(scene);
        }
    }

    //Swap scenes on stage
    showScene (nextSceneName, params) {

        if (params == undefined)
            params = {
            transition:this.cut
            };

        params.transition = params.transition.bind(this);
        params.transition(this.currentScene, nextSceneName, params);

    }

    //Simple cut
    cut(currentScene, nextSceneName,params) {

        this.stage.removeChild(this.scene[this.currentScene]);
        this.stage.addChild(this.scene[nextSceneName]);
        this.currentScene = nextSceneName;

    }

    //Fade
    async fade(currentScene, nextSceneName,params) {

        //Step 1: Fade current scene out
        await Animate.to(this.scene[currentScene], {
            alpha:0,
            duration:1000
        });

        //Step 2: Remove from stage
        this.stage.removeChild(this.scene[this.currentScene]);

        //Step 3: Offstage, restore its opacity
        this.scene[currentScene].alpha = 0;
        
        //Step 4: Offstage set next scene to transparent
        this.scene[currentScene].alpha = 1;

        //Step 5: Add it to stage
        this.stage.addChild(this.scene[nextSceneName]);

        //Step 6: Animate
        await Animate.to(this.scene[currentScene], {
            alpha:1,
            duration:1000
        });

        //Finally
        this.currentScene = nextSceneName;
        

    }

};




export { Director };