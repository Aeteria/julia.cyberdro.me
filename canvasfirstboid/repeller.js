'use strict'

class Repeller extends Boid{
  constructor(m,location){
    super(m,location)
  }

  run() { // update this
    //console.log("Inside boid run");
    this.update();
    this.render();
    this.checkEdges()
  }
  render() { // render or draw this to canvas
    //console.log("loc.x = " + this.loc.x);
    this.context.fillStyle = 'blue' ;
    //this.context.fill();

    this.context.beginPath();
    this.context.arc(this.loc.x, this.loc.y, 3, 0, 2 * Math.PI, false);
    this.context.fill();
    this.context.stroke();

  }
  update(){
    this.loc = vector2d(cursorX, cursorY)
  }

}
