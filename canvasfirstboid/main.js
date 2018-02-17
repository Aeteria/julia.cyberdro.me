'use strict'

// wait for the window to load and than call back setup()
window.addEventListener('load', setup, false);

var main;   // the global Main object
const FRAME_RATE=30;
const NUM_BOIDS = 3000;
const GRAV = 0.2;
const MAX_VEL = 4;
function setup() {
  main = new Main();
  window.setTimeout(draw, 100);    // wait 100ms for resources to load then start draw loop
}

function draw() {   // the animation loop
  main.run();
  window.setTimeout(draw, 1000/FRAME_RATE);
     // come back here every interval
}

var cursorX;
var cursorY;
var r
document.onmousemove = function(e){
    cursorX = e.offsetX;
    cursorY = e.offsetY;
}
// Start main class  +++++++++++++++++++++++++++++++++++++++++++++++++++++
class Main {
  //  Main constructor




  constructor() {

    //Start create a canvas element ++++++++++++++++++++++++++++++++
    this.canvas = document.createElement("canvas");
    this.canvas.style.backgroundColor = 'white';
    //check if canvas was made
    if(!this.canvas || !this.canvas.getContext)
    throw "No valid canvas found!";
    //match the dimensions of the canvas div
    this.canvas.width = 1000;
    this.canvas.height = 750;
    //make the canvas a child of the canvas div
    document.getElementById('canDiv').appendChild(this.canvas);

    //  create the context for the canvas
    this.context = this.canvas.getContext("2d");
    //check if context was made
    if(!this.context)
    throw "No valid context found!";
    //End create a canvas element ++++++++++++++++++++++++++++++++
    // declare instance variables for main
    this.menuButtons = [];
    this.makeRect = false;
    this.grav = false;
    //this.b = new Boid(this, vector2d(300, 300));
    //create all initial items
    this.init();
    this.boids = [];
    this.fillarr();

    r = new Repeller(this, vector2d(Math.random()*1000, Math.random()*750))

    this.gravity = false;
  }

  fillarr(){
    for(var i = 0; i < NUM_BOIDS; i++ ){
      this.boids.push(new Boid(this, vector2d(Math.random()*1000, Math.random()*750)));
    }
  }
  init(){
    // get the current time
    this.lastTime = Date.now();
    // select canvas for callbacks
    this.canvas.addEventListener('mousemove',this.handleCNVMouseMoved,false);
    this.canvas.addEventListener('mouseover',this.handleCNVMouseOver, false);
    this.canvas.addEventListener('click', this.handleCNVMouseClicked, false);

    // create menu buttons
    this.createMenuButtons();

  }

  run() { // update canvas components --> called from draw()

    this.render();
        this.context.rect(0,0, 1000, 750);
    this.context.fillStyle = 'black';
    this.context.fill();
    this.context.beginPath();

    this.context.stroke();
    for(var i = 0; i < NUM_BOIDS; i++ ){
      this.boids[i].run();

    }
    r.run()


  }

  render() { // render or draw stuff to canvas
    //this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
    if(this.makeRect){
      this.context.fillStyle = '#554499';
      this.context.fillRect(10, 10, 100, 100);
    }

  }
  //  +++++++++++++++++++++++++++++++++  create buttons for menu area
  createMenuButtons(){

     var numButtons = 5;
     //create and style all button divs
     for(let i = 0; i < numButtons; i++){
       // create a button and place it on the DOM tree
       var button = document.createElement('div');
       document.getElementById("menuDiv").appendChild(button);
       // place a button image on the button
       var buttImg = new Image();
       buttImg.src = "buttons/mb01.png";
       buttImg.id = "bi";
       button.appendChild(buttImg);
       //  Add event listeners to images (not buttons)
       buttImg.addEventListener('mouseover',buttonMouseOverHandler,false);
       buttImg.addEventListener('mouseout',buttonMouseOutHandler,false);
       buttImg.addEventListener('click',buttonMouseClickHandler,false);
       // style buttons
       button.style.float = "left";
       button.style.marginTop = "5px";
       button.style.marginLeft = "85px";

       //push button into buttons array
       this.menuButtons.push(button);
     }

  }   // end createMenuButtons
   gravity(){
     if(main.grav){
     boid.speedY = -9.8;
     boid.speedX = 0;
   }
   }

   handleCNVMouseClicked(){
     this.mouseX = event.clientX;
     this.mouseY = event.clientY;

   }


}//  end main class ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// add functionality to your buttons here

function mouse_position()
{
    var e = window.event;

    var mousPosX = e.clientX;
    var mousPosY = e.clientY;

    document.Form1.posx.value = posX;
    document.Form1.posy.value = posY;

    var t = setTimeout(mouse_position,100);

}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function buttonMouseOverHandler(){
   this.src = "buttons/mb02.png"
}




function buttonMouseOutHandler(){
  this.src = "buttons/mb01.png"
}

function buttonMouseClickHandler(){
  main.makeRect = !main.makeRect;
  main.gravity = !main.gravity;
}
