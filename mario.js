/*
  mario.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang's QA'd the Mario's movement constantly, found lots of bugs.
  DoYoon Kim did ---
  SeungGeon Kim Arranged the class properties, and Wrote the main animation & movement logic. About 99% of this entire script.
  
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

    this.walkingAcceleration = HexFloatToDec("0.098");
    this.runningAcceleration = HexFloatToDec("0.0E4");
    this.releaseDeacceleration = HexFloatToDec("0.0D0");

    this.skidDeacceleration = HexFloatToDec("0.1A0");
    this.skidTurnaroundSpeed = HexFloatToDec("0.900");

    this.maxSpeedWalkX = HexFloatToDec("1.900");
    this.maxSpeedRunX = HexFloatToDec("2.900");



    this.speedXStandard_1 = HexFloatToDec("1.000");
    this.speedXStandard_2 = HexFloatToDec("2.4FF");

    this.initialJumpSpeed_1 = HexFloatToDec("4.000");
    this.initialJumpSpeed_2 = HexFloatToDec("5.000");

    this.currentGravity = 0;

    this.potentialHoldGravity = 0;
    this.potentialOriginalGravity = 0;

    this.holdGravity_1 = HexFloatToDec("0.200");
    this.holdGravity_2 = HexFloatToDec("0.1E0");
    this.holdGravity_3 = HexFloatToDec("0.280");

    this.originalGravity_1 = HexFloatToDec("0.700");
    this.originalGravity_2 = HexFloatToDec("0.600");
    this.originalGravity_3 = HexFloatToDec("0.900");

    this.maxFallSpeed = HexFloatToDec("4.800");



    this.big_mario_climbing_1 = loadImage('Sprites/Mario/big_mario_climbing_1.png');
    this.big_mario_climbing_2 = loadImage('Sprites/Mario/big_mario_climbing_2.png');

    //And so on... 

    this.mario_stand_still = loadImage('Sprites/Mario/mario_stand_still.png');

    this.mario_running_1 = loadImage('Sprites/Mario/mario_running_1.png');
    this.mario_running_2 = loadImage('Sprites/Mario/mario_running_2.png');
    this.mario_running_3 = loadImage('Sprites/Mario/mario_running_3.png');

    this.mario_turnaround = loadImage('Sprites/Mario/mario_turnaround.png');

    this.mario_jump = loadImage('Sprites/Mario/mario_jump.png');

    this.spriteToDraw = this.mario_stand_still;

    this.animationFrameRate = 10;

    this.walkFrameRateSlow = 10;
    this.walkFrameRateFast = 4;
    this.runFrameRate = 1;

    this.frameCount = 0;
    this.drawIndex = 0;

    this.isJumping = false;
    this.isSkidding = false;

    this.isLookingLeft = false;
    this.isJumpingLeft = false;

    this.jumpKeyReleased = false;

  }



  Debug() {
    text("frameRate : " + this.animationFrameRate, 10, 80);
    text("frameCount : " + this.frameCount, 10, 20);
    text("framesToKeepRunning : " + this.framesToKeepRunning, 10, 40);
    text("speedX : " + this.speedX, 10, 60);
    text("speedY : " + this.speedY, 10, 140);
    text("currentGravity : " + this.currentGravity, 10, 100);
    text("isJumping : " + this.isJumping, 10, 120);
    text("isPastJump : " + this.isJumping, 10, 160);
    text("potentialHold : " + this.potentialHoldGravity, 10, 180);
  }



  //Call the needed functions
  Update() {

    this.Debug();
    this.Move();

    //Temporary anti-fall-through-screen-border logic
    if (this.y > 100) {
      this.isJumping = false;
      this.speedY = 0;
      this.y = 100;
    }

  }



  //Calculate velocity & Move Mario accordingly
  Move() {

    //Assign gravity
    if (abs(this.speedX) < this.speedXStandard_1) {

      this.potentialHoldGravity = this.holdGravity_1;
      this.potentialOriginalGravity = this.originalGravity_1;

    } else if (abs(this.speedX) < this.speedXStandard_2) {

      this.potentialHoldGravity = this.holdGravity_2;
      this.potentialOriginalGravity = this.originalGravity_2;

    } else {

      this.potentialHoldGravity = this.holdGravity_3;
      this.potentialOriginalGravity = this.originalGravity_3;

    }

    //Go for the Jump key
    if (isJump) {

      if (!this.isJumping) {

        this.currentGravity = 0;

        //Start Jump, gets called only once
        if (!isPastJump) {

          if (this.isLookingLeft) {
            this.isJumpingLeft = true;
          } else {
            this.isJumpingLeft = false;
          }

          isPastJump = true;

          this.isJumping = true;

          if (abs(this.speedX) < this.speedXStandard_2) {
            this.speedY = -this.initialJumpSpeed_1;
          } else {
            this.speedY = -this.initialJumpSpeed_2;
          }

        }

        //When Jump key is held during jumpkdj
      } else {

        //Keep gravity to reduced gravity
        if (!this.jumpKeyReleased) {

          this.currentGravity = this.potentialHoldGravity;

          //Keep gravity to original gravity
        } else {

          this.currentGravity = this.potentialOriginalGravity;

        }

      }

      //Keep gravity to original gravity
    } else {

      if (this.isJumping) {
        this.currentGravity = this.potentialOriginalGravity;
      } else {
        this.currentGravity = 0;
      }

    }

    //Go for the left key first 
    if (isDPadLeft) {

      this.isLookingLeft = true;

      if (this.speedX >= this.skidTurnaroundSpeed) {

        this.isSkidding = true;

      } else {

        if (isDash) {

          if (this.speedX > -this.maxSpeedRunX) {

            this.speedX += -this.runningAcceleration;

            //Assign max run speed
            if (this.speedX < -this.maxSpeedRunX)
              this.speedX = -this.maxSpeedRunX;

          }

          this.framesToKeepRunning = 10;

        } else {

          if (this.framesToKeepRunning > 0)
            this.framesToKeepRunning--;

          if (this.speedX > -this.maxSpeedWalkX) {

            this.speedX += -this.walkingAcceleration;

            //Assign max walk speed
            if (this.speedX < -this.maxSpeedWalkX)
              this.speedX = -this.maxSpeedWalkX;

          } else {

            if (this.framesToKeepRunning == 0 &&
              this.speedX < -this.maxSpeedWalkX + -this.releaseDeacceleration)
              this.speedX += this.releaseDeacceleration;

          }

        }

      }

      //Next, the right key
    } else if (isDPadRight) {

      this.isLookingLeft = false;

      if (this.speedX <= -this.skidTurnaroundSpeed) {

        this.isSkidding = true;

      } else {

        if (isDash) {

          if (this.speedX < this.maxSpeedRunX) {

            this.speedX += this.runningAcceleration;

            //Assign max run speed
            if (this.speedX > this.maxSpeedRunX)
              this.speedX = this.maxSpeedRunX;

          }

          this.framesToKeepRunning = 10;

        } else {

          if (this.framesToKeepRunning > 0)
            this.framesToKeepRunning--;

          if (this.speedX < this.maxSpeedWalkX) {

            this.speedX += this.walkingAcceleration;

            //Assign max walk speed
            if (this.speedX > this.maxSpeedWalkX)
              this.speedX = this.maxSpeedWalkX;

          } else {

            if (this.framesToKeepRunning == 0 &&
              this.speedX > this.maxSpeedWalkX + this.releaseDeacceleration)
              this.speedX += -this.releaseDeacceleration;

          }

        }

      }

      //Nothing is pressed
    } else {

      if (this.framesToKeepRunning == 0) {

        //Prevent oscillation
        if (this.speedX < -this.releaseDeacceleration) {
          this.speedX += this.releaseDeacceleration;
        } else if (this.speedX > this.releaseDeacceleration) {
          this.speedX += -this.releaseDeacceleration;
        } else {
          this.speedX = 0;
        }

      } else {
        this.framesToKeepRunning--;
      }

    }

    //Manage skid
    if (this.isSkidding) {
      if (abs(this.speedX) >= this.skidTurnaroundSpeed) {

        this.speedX = ReturnAbsoluteAcceleration(this.speedX, -this.skidDeacceleration);

      } else {

        this.speedX = 0;
        this.isSkidding = false;

      }
    }

    //Apply gravity
    this.speedY += this.currentGravity;

    //Limit gravity
    if (this.speedY > this.maxFallSpeed)
      this.speedY = this.maxFallSpeed;

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

    if (!this.isJumping) {

      if (!this.isSkidding) {

        if (this.speedX == 0) {

          this.spriteToDraw = this.mario_stand_still;

        } else if (abs(this.speedX) < this.maxSpeedWalkX) {

          this.Animate(this.mario_running_1, this.mario_running_2, this.mario_running_3);
          this.animationFrameRate = this.walkFrameRateSlow;

        } else if (abs(this.speedX) <= this.maxSpeedWalkX + this.walkingAcceleration) {

          this.Animate(this.mario_running_1, this.mario_running_2, this.mario_running_3);
          this.animationFrameRate = this.walkFrameRateFast;

        } else {

          this.Animate(this.mario_running_1, this.mario_running_2, this.mario_running_3);
          this.animationFrameRate = this.runFrameRate;

        }

      } else {

        this.spriteToDraw = this.mario_turnaround;

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



    } else {

      this.spriteToDraw = this.mario_jump;

      if (this.isJumpingLeft) {

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