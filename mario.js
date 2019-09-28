/*
  main.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JunHo Hwang did ---
  DoYoon Kim did ---
  SeungGeon Kim Arranged the class properties, and wrote the main animation & movement logic.
  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/



class Mario {

  constructor() {

    this.x = 10;
    this.y = 100;

    this.speedX = 0;
    this.speedY = 0;

    //needed to do the 10-frame speed conservation thing
    this.framesToKeepRunning = 0;

    this.walkingAcceleration = 0.03;
    this.runningAcceleration = 0.05;

    this.maxSpeedWalkX = 1.56;
    this.maxSpeedRunX = 2.56;

    this.big_mario_climbing_1 = loadImage('Sprites/Mario/big_mario_climbing_1.png');
    this.big_mario_climbing_2 = loadImage('Sprites/Mario/big_mario_climbing_2.png');

    //And so on... 

    this.mario_stand_still = loadImage('Sprites/Mario/mario_stand_still.png');

    this.mario_running_1 = loadImage('Sprites/Mario/mario_running_1.png');
    this.mario_running_2 = loadImage('Sprites/Mario/mario_running_2.png');
    this.mario_running_3 = loadImage('Sprites/Mario/mario_running_3.png');

    this.spriteToDraw = this.mario_stand_still;

    this.animationFrameRate = 10;

    this.walkFrameRateSlow = 10;
    this.walkFrameRateFast = 5;
    this.runFrameRate = 3;

    this.frameCount = 0;
    this.drawIndex = 0;

    this.jumping = false;

    this.isLookingLeft = false;

  }



  Debug() {
    text("frameRate : " + this.animationFrameRate, 10, 80);
    text("frameCount : " + this.frameCount, 10, 20);
    text("framesToKeepRunning : " + this.framesToKeepRunning, 10, 40);
    text("speedX : " + this.speedX, 10, 60);
  }



  //Call the needed functions
  Update() {

    this.Debug();
    this.Move();
    this.Draw();

  }



  //Calculate velocity & Move Mario accordingly
  Move() {

    //Go for the left key first 
    if (isDPadLeft) {

      this.isLookingLeft = true;

      if (isDash) {

        if (this.speedX > -this.maxSpeedRunX) {
          this.speedX += -this.walkingAcceleration;
          this.framesToKeepRunning = 10;
        }

      } else {

        if (this.speedX > -this.maxSpeedWalkX) {
          this.speedX += -this.walkingAcceleration;
        } else {
          this.speedX += 0.05;
        }

      }

      //Next, the right key
    } else if (isDPadRight) {

      this.isLookingLeft = false;

      if (isDash) {

        if (this.speedX < this.maxSpeedRunX) {
          this.speedX += this.walkingAcceleration;
          this.framesToKeepRunning = 10;
        }

      } else {

        if (this.speedX < this.maxSpeedWalkX) {
          this.speedX += this.walkingAcceleration;
        } else {
          this.speedX += -0.05;
        }

      }

      //Nothing is pressed
    } else {

      if (this.framesToKeepRunning == 0) {

        //Prevent oscillation
        if (this.speedX < -0.05) {
          this.speedX += 0.05;
        } else if (this.speedX > 0.05) {
          this.speedX += -0.05;
        } else {
          this.speedX = 0;
        }

      } else {
        this.framesToKeepRunning--;
      }

    }

    this.x += this.speedX;
    this.y += this.speedY;

  }



  //Manage the animations
  Animate(sprite1, sprite2, sprite3) {

    if (this.frameCount > this.animationFrameRate) {

      this.frameCount = 0;

      if (this.drawIndex == 2) {
        this.drawIndex = 0;
      } else {
        this.drawIndex++;
      }

      if (sprite3) {

        switch (this.drawIndex) {

          case 0:
            this.spriteToDraw = sprite1;
            break;

          case 1:
            this.spriteToDraw = sprite2;
            break;

          case 2:
            this.spriteToDraw = sprite3;
            break;

        }

      } else {

        if (this.drawIndex == 2)
          this.drawIndex = 0;

        switch (this.drawIndex) {

          case 0:
            this.spriteToDraw = sprite1;
            break;

          case 1:
            this.spriteToDraw = sprite2;
            break;

        }

      }

    } else {

      this.frameCount++;

    }

  }



  //Call Animate() & Draw Mario
  Draw() {

    if (!this.jumping) {

      if (this.speedX == 0) {

        this.spriteToDraw = this.mario_stand_still;

      } else if (abs(this.speedX) < this.maxSpeedWalkX * (2 / 3)) {

        this.Animate(this.mario_running_1, this.mario_running_2, this.mario_running_3);
        this.animationFrameRate = this.walkFrameRateSlow;

      } else if (abs(this.speedX) < this.maxSpeedWalkX + 0.1) {

        this.Animate(this.mario_running_1, this.mario_running_2, this.mario_running_3);
        this.animationFrameRate = this.walkFrameRateFast;

      } else {

        this.Animate(this.mario_running_1, this.mario_running_2, this.mario_running_3);
        this.animationFrameRate = this.runFrameRate;

      }

    }

    if (this.isLookingLeft) {

      //Flip the sprite, then draw it
      push();
      translate(this.x * pixelMutliplier + this.spriteToDraw.width * pixelMutliplier, this.y * pixelMutliplier);
      scale(-1, 1);
      DrawSprite(this.spriteToDraw, 0, 0);
      pop();

    } else {

      DrawSprite(this.spriteToDraw, this.x, this.y);

    }

  }



  /*
    React to a collision with the 'collider' passed as parameter
    Collision will be handled like this :
  
    Mario collides with two Goombas.
    Mario will call ScoreManager.score() twice on him, 
    while Goombas will call this.kill() once on them each.
  */
  OnCollisionWith(collider) {

  }

}