import {
    Application,
    Assets,
    Sprite,
    Container,
    Graphics,
    Text,
    TextStyle
} from './pixi.js';

// Making a button!!!
// let whatever = new Button("Name", 200, 60);
class Button extends Container {

    constructor(l, w, h) {
        super(); //Sets up old object

        //Build the button
        this.l = l;
        this.w = w;
        this.h = h;
        this.c = 0xFFFFFF;

        //Make it listen for events
        this.eventMode = 'static';

        //Draw the button
        this.draw();

        //Set hover states
        this.on('mouseover', () => {
            this.alpha = .85;
            this.cursor = "pointer";
        })
        this.on('mouseout', () => {
            this.alpha = 1;
            this.cursor = "auto";
        })

    }
    //Actually set everything up
    draw() {
        //Empty it out
        while (this.children.length > 0)
            this.removeChildAt(0);

        //The body
        this.body = new Graphics()
            .rect(0, 0, this.w, this.h)
            .fill(this.c);
        this.addChild(this.body);

        //The label
        this.label = new Text({
            text: this.l,
            anchor: .5
        });
        this.label.x = this.w / 2;
        this.label.y = this.h / 2;
        this.addChild(this.label);
    }
    //Set the label
    setLabel(name) {
        this.l = name;
        this.label.text = name;
        this.draw();
    }
    //Set color
    setColor(color) {
        this.c = color;
        this.draw();
    }
    //Set size
    setSize(w, h) {
        this.w = w;
        this.h = h;
        this.draw();

    }

}

export { Button };