'use strict'


// Start Boid class  +++++++++++++++++++++++++++++++++++++++++++++++++++++
class Boid {
  //  Boid constructor
  constructor(m, location) {
    // declare instance variables for Boid
    this.main = m;
    this.loc = location;
    this.vel = vector2d(Math.random(-1.0, 10)*5, Math.random(-1.0, 10)*5);
    this.acc = vector2d(0, GRAV)
    this.rep = vector2d(5,5 )
    this.repMult = .1;
    this.hasReflected = false;
    this.context = this.main.context;
    //create all initial items
    this.init();
  }

  init(){

  }

  run() { // update this
    //console.log("Inside boid run");
    this.update();
    this.render();
  }

//   var posRelativeToMouse = {
//   x: this.x - mousPosX,
//   y: this.y - mousPosY
// };
//
// var distance = Math.sqrt(
//   posRelativeToMouse.x * posRelativeToMouse.x +
//   posRelativeToMouse.y * posRelativeToMouse.y
// );
// var forceDirection = {
//   x: posRelativeToMouse.x / distance,
//   y: posRelativeToMouse.y / distance,
// };
// var maxDistance = 1000;
// var force = (maxDistance - distance) / maxDistance;
//
// // if we went below zero, set it to zero.
// if (force < 0) force = 0;


  update() { // render or draw this to canvas

    this.checkEdges();
    if(this.main.gravity === false){
    this.loc.x+= this.vel.x;
    this.loc.y+= this.vel.y;
    //particle.xVel += forceDirection.x * force * 0.03;
  //  particle.yVel += forceDirection.y * force * 0.03;

    }
    else if(this.main.gravity === true){
      this.vel.x+= this.acc.x;
      this.vel.y+= this.acc.y;
      this.loc.x+= this.vel.x;
      this.loc.y+= this.vel.y;
    }
    if(Math.abs(this.loc.dist(r.loc)) < 100 && this.hasReflected == false){

    var mainV = vector2d(this.loc.x-r.loc.x, this.loc.y-r.loc.y);
    var velDot = mainV.normalize();
    var velScale = this.vel.dotProd(velDot)*2;
    var velSub = mainV.scale(velScale);
    this.vel = this.vel.sub(velSub);
    this.hasReflected = true;

    }else if(Math.abs(this.loc.dist(r.loc)) > 100){
      this.hasReflected = false;
    }
    if(this.vel.length() > 4){
      this.vel.normalize();
      this.vel.scale(4)
    }
  }


  render() { // render or draw this to canvas
    //console.log("loc.x = " + this.loc.x);
    this.context.fillStyle = 'red' ;
    //this.context.fill();

    this.context.beginPath();
    this.context.arc(this.loc.x, this.loc.y, 1.5, 0, 2 * Math.PI, false);
    this.context.fill();
    this.context.stroke();

  }

  checkEdges(){

  //  if(this.loc.x > 1000 ||this.loc.x < 10) this.vel.x *= -1;
    if(this.loc.x > 1000 && this.vel.x > 0){this.vel.x *= -1}
    if(this.loc.x < 10 && this.vel.x < 0){this.vel.x *= -1}
    if(this.loc.y > 750 && this.vel.y > 0) this.vel.y *= -1;
    if(this.loc.y < 10 && this.vel.y < 0) this.vel.y *= -1;

  }

}
