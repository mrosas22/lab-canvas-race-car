window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };
    //create a Obstacles array to store all of our obstacles
    let myObstacles = [];
  function startGame() {
    myBoard.start();
    car = new component (30, 30, 'green', 185, 1150)
  }

  let myBoard = {
    canvas: document.createElement('canvas'),
    start: function (){
      this.canvas.width = 400;
      this.canvas.height = 1200;
      this.context = this.canvas.getContext('2d');
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
      //schedule updates
      this.interval = setInterval(updateMyBoard, 20);
    },
    frames: 0, //to count how many times we update our board
    clear: function(){
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    score: function(){
      points = (Math.floor(this.frames/240))
      this.context.fillStyle = 'Black'
      this.context.font = '30 Arial';
      this.context.fillText(`Score: ${points}`, 350, 50)
    },
    stop: function(){
      clearInterval(this.interval);
    }
  
  }

  function component (width, height, color, x, y){
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.update = function (){
      ctx = myBoard.context;
      // ctx.drawImage(this.image, this.x, this.y, 50, 50);
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    this.newPos = function(){
      this.x += this.speedX;
      this.y += this.speedY;
    }
    this.left = function (){return this.y}
    this.right = function (){return (this.y + this.height)}
    this.top = function (){ return this.x}
    this.bottom = function (){return this.x + (this.width)}
    //= = = = = = = = = CRASH = = = = = = = = = = = = 
    this.crash = function(obstacle){
      return !((this.bottom() < obstacle.top())     ||
              (this.top()     > obstacle.bottom())  ||
              (this.right()   < obstacle.left())    ||
              (this.left()    > obstacle.right()))
    }

  }
  function updateMyBoard(){
    // let crashed = myObstacles.some(function(obstacle){
    //   return player.crash(obstacle)
    // })
    // if (crashed){
    //   myBoard.stop();
    // }
    //check if car crashes with obstacles
    // for (i =0; i< myObstacles.length; i += 1){
    //   if (player.crash(myObstacles[i])){
    //     myBoard.stop();
    //     return;
    //   }
    // }
        myBoard.clear();
        myBoard.frames += 1; //Everytime we update our game we will add 1 Frame 
        if( myBoard.frames % 180 === 0){
          y = myBoard.canvas.height; //set the obtacles according to our y coordinates
          //get a random value for our obstacle width
          minWidth = 120;
          maxWidth = 220;
          width = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth);
          //get a random value for our obstacle height
          minHeight = 80;
          maxHeight = 180;
          height = Math.floor(Math.random() * (maxHeight - minHeight +1) + minHeight);
          //push the obstacles in the top of our canvas
          myObstacles.push(new component(width, 10, 'red', 0, width));
          //push the obstacles in the bottom of our canvas
          myObstacles.push(new component(height ,10, 'blue', height + width, height)) 
        }
        //add obstacles to the y axis
        for(i = 0; i< myObstacles.length; i +=1){
          myObstacles[i].y += 1;
          myObstacles[i].update();
        }
        car.newPos();
        car.update ();
        myBoard.score();
  }

  function moveUp(){
    car.speedY += 1;
  }
  function moveDown (){
    player.speedY -= 1;
  }
  function moveLeft (){
    car.speedX -= 1;
  }
  function moveRight (){
    car.speedX += 1;
  }
  document.onKeydown = function (e){
    switch (e.keyCode){
      case 38 :
      moveUp();
      break;
      case 40:
      moveDown();
      break;
      case 37:
      moveLeft();
      break;
      case 39:
      moveRight();
      break;
    }
  }

  document.onkeyup =  function (){
    stopMove();
  }
  function stopMove(){
    car.speedX = 0;
    car.speedY = 0;
  }

  startGame();

};
