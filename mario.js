/*
  mario.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang's HexFloatToDec() was used to initialize variables inside the class constructor
  DoYoon Kim did ---
  SeungGeon Kim Arranged the class properties, and Wrote the main animation & movement logic. About 99% of this entire script.
  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/



class Mario {

  constructor() {

    this.x = 16;
    this.y = 200;

    this.speedX = 0;
    this.speedY = 0;

    //needed to do the 10-frame speed conservation thing
    this.framesToKeepRunning = 0;
    this.framesToKeepRunningDefault = 10;
    this.framesToKeepTransforming = 0;
    this.framesToKeepTransformingDefault = 60;

    this.walkingAcceleration = HexFloatToDec("0.098");
    this.runningAcceleration = HexFloatToDec("0.0E4");
    this.releaseDeacceleration = HexFloatToDec("0.0D0");

    this.skidDeacceleration = HexFloatToDec("0.1A0");
    this.skidTurnaroundSpeed = HexFloatToDec("0.900");

    this.maxSpeedWalkX = HexFloatToDec("1.900");
    this.maxSpeedRunX = HexFloatToDec("2.900");



    this.speedXStandard_1 = HexFloatToDec("1.000");
    this.speedXStandard_2 = HexFloatToDec("2.4FF");

    this.initialXStandard = HexFloatToDec("1.D00");

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

    this.previousY = 0;

    this.initialX = 0;



    this.big_mario_climbing_1 = loadImage('Sprites/Mario/big_mario_climbing_1.png');
    this.big_mario_climbing_2 = loadImage('Sprites/Mario/big_mario_climbing_2.png');

    //And so on... 



    this.marioState = {
      mario: 0,
      bigMario: 1,
      fireMario: 2
    };

    this.powerupState = 0;
    this.nextPowerupState = 0;


    this.stand_still = 0;

    this.mario_stand_still = loadImage('Sprites/Mario/mario_stand_still.png');
    this.big_mario_stand_still = loadImage('Sprites/Mario/big_mario_stand_still.png');

    this.running_1 = 0;
    this.running_2 = 0;
    this.running_3 = 0;

    this.mario_running_1 = loadImage('Sprites/Mario/mario_running_1.png');
    this.mario_running_2 = loadImage('Sprites/Mario/mario_running_2.png');
    this.mario_running_3 = loadImage('Sprites/Mario/mario_running_3.png');

    this.big_mario_running_1 = loadImage('Sprites/Mario/big_mario_running_1.png');
    this.big_mario_running_2 = loadImage('Sprites/Mario/big_mario_running_2.png');
    this.big_mario_running_3 = loadImage('Sprites/Mario/big_mario_running_3.png');

    this.turnAround = 0;

    this.mario_turnaround = loadImage('Sprites/Mario/mario_turnaround.png');
    this.big_mario_turnaround = loadImage('Sprites/Mario/big_mario_turnaround.png');

    this.jump = 0;

    this.mario_jump = loadImage('Sprites/Mario/mario_jump.png');
    this.big_mario_jump = loadImage('Sprites/Mario/big_mario_jump.png');

    this.spriteToDraw = this.mario_stand_still;

    this.transformSprite_1 = 0;
    this.transformSprite_2 = 0;



    this.animationFrameRate = 10;

    this.walkFrameRateSlow = 10;
    this.walkFrameRateFast = 4;
    this.runFrameRate = 1;
    this.transformFrameRate = 3;

    this.frameCount = 0;
    this.drawIndex = 0;

    this.isJumping = false;
    this.isSkidding = false;
    this.isTransforming = false;

    this.isLookingLeft = false;
    this.isJumpingLeft = false;

    this.jumpKeyReleased = false;
    this.topReached = false;

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
    text("isTransforming : " + this.isTransforming, 10, 200);
    text("powerupState : " + this.powerupState, 10, 220);
  }



  //Call the needed functions
  Update() {

    this.Debug();
    this.Move();

    //Temporary makeshift anti-fall-through-screen-border logic. 
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

    // --- --- ---

    //Go for the Jump key
    if (isJump) {

      if (!this.isJumping) {

        this.currentGravity = 0;

        //Start Jump, gets called only once
        if (!isPastJump) {

          isPastJump = true;
          this.isJumping = true;
          this.topReached = false;
          this.initialX = this.speedX;

          this.initialX = this.speedX;

          if (this.isLookingLeft) {
            this.isJumpingLeft = true;
          } else {
            this.isJumpingLeft = false;
          }

          if (abs(this.speedX) < this.speedXStandard_2) {
            this.speedY = -this.initialJumpSpeed_1;
          } else {
            this.speedY = -this.initialJumpSpeed_2;
          }

        }

        //When Jump key is held during jump
      } else {

        if (!this.jumpKeyReleased) {
          this.currentGravity = this.potentialHoldGravity;
        } else {
          this.currentGravity = this.potentialOriginalGravity;
        }

      }

      //When jump key is not pressed
    } else {

      if (this.isJumping) {
        this.currentGravity = this.potentialOriginalGravity;
      } else {
        this.currentGravity = 0;
      }

    }

    // --- --- --- 

    //Go for the left key first 
    if (isDPadLeft) {

      if (!this.isJumping) {

        if (!this.isTransforming)
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

            this.framesToKeepRunning = this.framesToKeepRunningDefault;

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

      } else {

        //Jumping left, pressed left
        if (this.isJumpingLeft) {

          if (abs(this.speedX) <= this.maxSpeedWalkX) {
            this.speedX += -this.walkingAcceleration;

            //Assign max run speed
            if (this.speedX < -this.maxSpeedRunX)
              this.speedX = -this.maxSpeedRunX;
          } else {
            this.speedX += -this.runningAcceleration;

            //Assign max run speed
            if (this.speedX < -this.maxSpeedRunX)
              this.speedX = -this.maxSpeedRunX;
          }

          //Jumping right, pressed left
        } else {

          if (abs(this.speedX) < this.maxSpeedWalkX) {

            if (abs(this.initialX) < this.initialXStandard) {
              this.speedX += -this.walkingAcceleration;
            } else {
              this.speedX += -this.releaseDeacceleration;
            }

          } else {
            this.speedX += -this.runningAcceleration;
          }

        }

      }

      //Next, the right key
    } else if (isDPadRight) {

      if (!this.isJumping) {

        if (!this.isTransforming)
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

            this.framesToKeepRunning = this.framesToKeepRunningDefault;

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

      } else {

        //Jumping right, pressed right
        if (!this.isJumpingLeft) {

          if (abs(this.speedX) <= this.maxSpeedWalkX) {
            this.speedX += this.walkingAcceleration;

            //Assign max run speed
            if (this.speedX > this.maxSpeedRunX)
              this.speedX = this.maxSpeedRunX;
          } else {
            this.speedX += this.runningAcceleration;

            //Assign max run speed
            if (this.speedX > this.maxSpeedRunX)
              this.speedX = this.maxSpeedRunX;
          }

          //Jumping left, pressed right
        } else {

          if (abs(this.speedX) < this.maxSpeedWalkX) {

            if (abs(this.initialX) < this.initialXStandard) {
              this.speedX += this.walkingAcceleration;
            } else {
              this.speedX += this.releaseDeacceleration;
            }

          } else {
            this.speedX += this.runningAcceleration;
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

        this.isSkidding = false;
        this.speedX = 0;

      }
    }

    if (this.isJumping) {

      if (this.y + this.speedY > this.previousY) 
        this.topReached = true;
      
      if (this.topReached)
        this.currentGravity = this.potentialOriginalGravity;

    }

    //Apply gravity
    this.speedY += this.currentGravity;

    //Limit gravity
    if (this.speedY > this.maxFallSpeed)
      this.speedY = this.maxFallSpeed;

    if (!this.isTransforming) {
      this.x += this.speedX;
      this.y += this.speedY;
      this.previousY = this.y;
    }

  }



  //Manage the animations
  Animate(sprite1, sprite2, newFrameRate, sprite3) {
    this.animationFrameRate = newFrameRate;
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

  //Called once on Powerup
  PowerupTo(targetState) {
    this.isTransforming = true;
    this.framesToKeepTransforming = this.framesToKeepTransformingDefault;
    switch (targetState) {
      case this.marioState.mario:
        this.nextPowerupState = this.marioState.mario;
        switch (this.powerupState) {
          case this.marioState.bigMario:

            break;

          case this.marioState.fireMario:

            break;
        }
        break;
      case this.marioState.bigMario:
        this.nextPowerupState = this.marioState.bigMario;
        switch (this.powerupState) {
          case this.marioState.mario:
            this.isTransforming = true;
            this.transformSprite_1 = this.spriteToDraw;
            if (this.isJumping) {
              this.transformSprite_2 = this.big_mario_jump;
            } else {
              this.transformSprite_2 = this.big_mario_stand_still;
            }
            break;
          case this.marioState.fireMario:

            break;
        }
        break;
      case this.marioState.fireMario:
        this.nextPowerupState = this.marioState.fireMario;
        switch (this.powerupState) {
          case this.marioState.mario:

            break;

          case this.marioState.bigMario:

            break;
        }
        break;
    }
  }

  RefreshSpritePool() {
    switch (this.powerupState) {
      case this.marioState.mario:
        this.stand_still = this.mario_stand_still;
        this.running_1 = this.mario_running_1;
        this.running_2 = this.mario_running_2;
        this.running_3 = this.mario_running_3;
        this.turnAround = this.mario_turnaround;
        this.jump = this.mario_jump;
        break;
      case this.marioState.bigMario:
        this.stand_still = this.big_mario_stand_still;
        this.running_1 = this.big_mario_running_1;
        this.running_2 = this.big_mario_running_2;
        this.running_3 = this.big_mario_running_3;
        this.turnAround = this.big_mario_turnaround;
        this.jump = this.big_mario_jump;
        break;
      case this.marioState.fireMario:

        break;
    }
  }



  //Call Animate() & Draw Mario
  Draw() {

    //return if isTransforming
    if (this.isTransforming) {

      this.Animate(this.transformSprite_1, this.transformSprite_2, this.transformFrameRate);

      if (this.framesToKeepTransforming == 0) {
        this.isTransforming = false;
        this.powerupState = this.nextPowerupState;
        this.RefreshSpritePool();
      } else {
        this.framesToKeepTransforming--;
      }

      if (!this.isJumping) {
        DrawSprite(this.spriteToDraw, this.x, this.y, this.isLookingLeft);
      } else {
        DrawSprite(this.spriteToDraw, this.x, this.y, this.isJumpingLeft);
      }

      return;

    }

    if (!this.isJumping) {
      if (!this.isSkidding) {
        //Change sprites according to speedX
        if (this.speedX == 0) {
          this.spriteToDraw = this.stand_still;
        } else if (abs(this.speedX) < this.maxSpeedWalkX) {
          this.Animate(this.running_1, this.running_2, this.walkFrameRateSlow, this.running_3);
        } else if (abs(this.speedX) <= this.maxSpeedWalkX + this.walkingAcceleration) {
          this.Animate(this.running_1, this.running_2, this.walkFrameRateFast, this.running_3);
        } else {
          this.Animate(this.running_1, this.running_2, this.runFrameRate, this.running_3);
        }
        //isSkidding -> draw turnAround
      } else {
        this.spriteToDraw = this.turnAround;
      }
      DrawSprite(this.spriteToDraw, this.x, this.y, this.isLookingLeft);
      //isJumping -> draw jump
    } else {
      this.spriteToDraw = this.jump;
      DrawSprite(this.spriteToDraw, this.x, this.y, this.isJumpingLeft);
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