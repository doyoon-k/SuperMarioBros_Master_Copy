/*
  mario.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang found lots and lots of bugs in Mario's movement QA-ing constantly, and Wrote the stompCombo related codes.
  DoYoon Kim did ---
  SeungGeon Kim Wrote about 99% of this entire script.

  - Main Contributor Comment -


  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/



class Mario {

  constructor() {



    //Initial value
    this.hitbox = hitboxes.mario;



    this.x = 32;
    this.y = 208;
    
    this.initialX = 116;

    this.speedX = 0;
    this.speedY = 0;
    
    //needed to do the 10-frame speed conservation thing
    this.framesToKeepRunning = 0;
    this.framesToKeepRunningDefault = 10;

    this.framesToStayInvincible = 150;
    this.framesToStayInvincibleDefault = 150;

    this.walkingAcceleration = HexFloatToDec("0.098");
    this.runningAcceleration = HexFloatToDec("0.0E4");
    this.releaseDeacceleration = HexFloatToDec("0.0D0");

    this.skidDeacceleration = HexFloatToDec("0.1A0");
    this.skidTurnaroundSpeed = HexFloatToDec("0.900");

    this.maxSpeedWalkX = HexFloatToDec("1.900");
    this.maxSpeedRunX = HexFloatToDec("2.900");

    this.speedXStandard_1 = HexFloatToDec("1.000");
    this.speedXStandard_2 = HexFloatToDec("2.4FF");

    this.initialJumpXStandard = HexFloatToDec("1.D00");

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

    this.previousX = 0;
    this.previousY = 0;
    this.initialJumpX = 0;
    this.isDashJump = false;

    this.isGravityAssigned = false;
    this.gravityAssigned = 0;

    this.isRubbingLeft = false;
    this.isRubbingRight = false;



    // this.big_mario_climbing_1 = loadImage('Sprites/Mario/big_mario_climbing_1.png');
    // this.big_mario_climbing_2 = loadImage('Sprites/Mario/big_mario_climbing_2.png');

    this.mario_swimming = loadImage('Sprites/Mario/mario_swimming.png');
    this.big_mario_swimming = loadImage('Sprites/Mario/big_mario_swimming.png');



    this.marioState = {
      mario: 0,
      bigMario: 1,
      fireMario: 2
    };

    this.powerupState = 0;
    this.nextPowerupState = 0;

    this.isInvincible = false;
    this.isDamaged = false; 
    this.isEmberRestored = false;

    this.isDucking = false;
    this.isDuckJump = false;

    this.tickIndex = 0;
    this.tickFlash = false;
    this.tickCount = 0;

    this.isDead = false;
    this.isFalling = false;

    this.fireballCount = 0;



    /*
      We first tried to manage color-changing sprites dynamically by processing screen pixels (only around mario) during runtime, 
      but loading all those pixels and comparing their colors EVERY FRAME took so much computing resource that it almost halved the game's frame. 
      That's the reason that Joonho made pre-colored versions of the sprites and we're just switching over them.
    */



    this.stand_still = 0;

    this.mario_stand_still = loadImage('Sprites/Mario/mario_stand_still.png');
    this.mario_stand_still_transform1 = loadImage('Sprites/Mario/mario_stand_still_transform1.png');
    this.mario_stand_still_transform2 = loadImage('Sprites/Mario/mario_stand_still_transform2.png');
    this.mario_stand_still_transform3 = loadImage('Sprites/Mario/mario_stand_still_transform3.png');
    this.mario_getting_bigger = loadImage('Sprites/Mario/mario_getting_bigger.png');
    this.mario_getting_bigger_transform1 = loadImage('Sprites/Mario/mario_getting_bigger_transform1.png');
    this.mario_getting_bigger_transform2 = loadImage('Sprites/Mario/mario_getting_bigger_transform2.png');
    this.mario_getting_bigger_transform3 = loadImage('Sprites/Mario/mario_getting_bigger_transform3.png');
    this.big_mario_stand_still = loadImage('Sprites/Mario/big_mario_stand_still.png');
    this.big_mario_stand_still_transform1 = loadImage('Sprites/Mario/big_mario_stand_still_transform1.png');
    this.big_mario_stand_still_transform2 = loadImage('Sprites/Mario/big_mario_stand_still_transform2.png');
    this.big_mario_stand_still_transform3 = loadImage('Sprites/Mario/big_mario_stand_still_transform3.png');
    this.big_mario_stand_still_fire = loadImage('Sprites/Mario/big_mario_stand_still_fire.png');

    this.running_1 = 0;
    this.running_2 = 0;
    this.running_3 = 0;

    this.mario_running_1 = loadImage('Sprites/Mario/mario_running_3.png');
    this.mario_running_2 = loadImage('Sprites/Mario/mario_running_2.png');
    this.mario_running_3 = loadImage('Sprites/Mario/mario_running_1.png');
    this.mario_running_transform1_1 = loadImage('Sprites/Mario/mario_running_transform1_3.png');
    this.mario_running_transform1_2 = loadImage('Sprites/Mario/mario_running_transform1_2.png');
    this.mario_running_transform1_3 = loadImage('Sprites/Mario/mario_running_transform1_1.png');
    this.mario_running_transform2_1 = loadImage('Sprites/Mario/mario_running_transform2_3.png');
    this.mario_running_transform2_2 = loadImage('Sprites/Mario/mario_running_transform2_2.png');
    this.mario_running_transform2_3 = loadImage('Sprites/Mario/mario_running_transform2_1.png');
    this.mario_running_transform3_1 = loadImage('Sprites/Mario/mario_running_transform3_3.png');
    this.mario_running_transform3_2 = loadImage('Sprites/Mario/mario_running_transform3_2.png');
    this.mario_running_transform3_3 = loadImage('Sprites/Mario/mario_running_transform3_1.png');

    this.big_mario_running_1 = loadImage('Sprites/Mario/big_mario_running_3.png');
    this.big_mario_running_2 = loadImage('Sprites/Mario/big_mario_running_2.png');
    this.big_mario_running_3 = loadImage('Sprites/Mario/big_mario_running_1.png');
    this.big_mario_running_transform1_1 = loadImage('Sprites/Mario/big_mario_running_transform1_3.png');
    this.big_mario_running_transform1_2 = loadImage('Sprites/Mario/big_mario_running_transform1_2.png');
    this.big_mario_running_transform1_3 = loadImage('Sprites/Mario/big_mario_running_transform1_1.png');
    this.big_mario_running_transform2_1 = loadImage('Sprites/Mario/big_mario_running_transform2_3.png');
    this.big_mario_running_transform2_2 = loadImage('Sprites/Mario/big_mario_running_transform2_2.png');
    this.big_mario_running_transform2_3 = loadImage('Sprites/Mario/big_mario_running_transform2_1.png');
    this.big_mario_running_transform3_1 = loadImage('Sprites/Mario/big_mario_running_transform3_3.png');
    this.big_mario_running_transform3_2 = loadImage('Sprites/Mario/big_mario_running_transform3_2.png');
    this.big_mario_running_transform3_3 = loadImage('Sprites/Mario/big_mario_running_transform3_1.png');

    this.big_mario_running_fire_1 = loadImage('Sprites/Mario/big_mario_running_fire_3.png');
    this.big_mario_running_fire_2 = loadImage('Sprites/Mario/big_mario_running_fire_2.png');
    this.big_mario_running_fire_3 = loadImage('Sprites/Mario/big_mario_running_fire_1.png');

    this.turnAround = 0;

    this.mario_turnaround = loadImage('Sprites/Mario/mario_turnaround.png');
    this.mario_turnaround_transform1 = loadImage('Sprites/Mario/mario_turnaround_transform1.png');
    this.mario_turnaround_transform2 = loadImage('Sprites/Mario/mario_turnaround_transform2.png');
    this.mario_turnaround_transform3 = loadImage('Sprites/Mario/mario_turnaround_transform3.png');

    this.big_mario_turnaround = loadImage('Sprites/Mario/big_mario_turnaround.png');
    this.big_mario_turnaround_transform1 = loadImage('Sprites/Mario/big_mario_turnaround_transform1.png');
    this.big_mario_turnaround_transform2 = loadImage('Sprites/Mario/big_mario_turnaround_transform2.png');
    this.big_mario_turnaround_transform3 = loadImage('Sprites/Mario/big_mario_turnaround_transform3.png');

    this.big_mario_turnaround_fire = loadImage('Sprites/Mario/big_mario_turnaround_fire.png');

    this.jump = 0;

    this.mario_jump = loadImage('Sprites/Mario/mario_jump.png');
    this.mario_jump_transform1 = loadImage('Sprites/Mario/mario_jump_transform1.png');
    this.mario_jump_transform2 = loadImage('Sprites/Mario/mario_jump_transform2.png');
    this.mario_jump_transform3 = loadImage('Sprites/Mario/mario_jump_transform3.png');

    this.big_mario_jump = loadImage('Sprites/Mario/big_mario_jump.png');
    this.big_mario_jump_transform1 = loadImage('Sprites/Mario/big_mario_jump_transform1.png');
    this.big_mario_jump_transform2 = loadImage('Sprites/Mario/big_mario_jump_transform2.png');
    this.big_mario_jump_transform3 = loadImage('Sprites/Mario/big_mario_jump_transform3.png');

    this.big_mario_jump_fire = loadImage('Sprites/Mario/big_mario_jump_fire.png');

    this.duck = 0;

    this.big_mario_duck = loadImage('Sprites/Mario/big_mario_duck.png');
    this.big_mario_duck_fire = loadImage('Sprites/Mario/big_mario_duck_fire.png');

    this.mario_dead = loadImage('Sprites/Mario/mario_dead.png');

    this.spriteToDraw = this.mario_stand_still;



    this.animationFrameRate = 10;

    this.walkFrameRateSlow = 8;
    this.walkFrameRateFast = 2;
    this.runFrameRate = 1;
    this.transformFrameRate = 3;

    this.frameCount = 0;
    this.drawIndex = 0;

    this.isJumping = false;
    this.isJumpPast = false;

    this.isRubbingRight = false;
    this.isRubbingLeft = false;

    this.isSkidding = false;
    this.isTransforming = false;

    this.isLookingLeft = false;
    this.isJumpingLeft = false;

    this.isMoonwalkingLeft = false;

    this.jumpKeyReleased = false;
    this.topReached = false;



    this.stompCombo = 0;



    this.RefreshSpritePool();

  }

  // --- --- ---

  Debug() {
    text("frameRate : " + this.animationFrameRate, 10, 80);
    text("frameCount : " + this.frameCount, 10, 20);
    text("framesToKeepRunning : " + this.framesToKeepRunning, 10, 40);
    text("speedX : " + this.speedX, 10, 60);
    text("speedY : " + this.speedY, 10, 140);
    text("currentGravity : " + this.currentGravity, 10, 100);
    text("isJumping : " + this.isJumping, 10, 120);
    text("isMoonwalkingLeft : " + this.isMoonwalkingLeft, 10, 340);
    text("isJumpingLeft : " + this.isJumpingLeft, 10, 280);
    text("isLookingLeft : " + this.isLookingLeft, 10, 300);
    text("isDucking : " + this.isDucking, 10, 320);
    text("isJumpPast : " + this.isJumping, 10, 160);
    text("isDashJump : " + this.isDashJump, 10, 240);
    text("potentialHold : " + this.potentialHoldGravity, 10, 180);
    text("isTransforming : " + this.isTransforming, 10, 200);
    text("tickIndex : " + this.tickIndex, 10, 260);
    text("powerupState : " + this.powerupState, 10, 220);
    text("isRubbingLeft : " + this.isRubbingLeft, 10, 360);
    text("isRubbingRight : " + this.isRubbingRight, 10, 380);
  }

  // --- --- ---

  //Call the needed functions
  Update() {

    this.Debug();

    if (game.interfaceFlow.flowState == game.interfaceFlow.screenState.pause && !game.isGameOver)
    return; 

    if (!this.isTransforming && !game.gameOver) {
      this.Move();
      return;
    }

    //Run once on gameover
    if (game.isGameOver && !this.isDead) {
      this.spriteToDraw = this.mario_dead;
      game.interfaceFlow.flowState = game.interfaceFlow.screenState.pause;
      setTimeout(() => this.Kill(), 500);
      this.isDead = true;
    }

      if (this.isFalling) {
      this.y += this.speedY;
      this.speedY+=0.5;
      }

  }

  Kill () { 
    this.speedY = -6.5; 
    this.isFalling = true;
  }

  // --- --- ---

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

    if (this.isDashJump)
      this.potentialHoldGravity = this.holdGravity_3;

    // --- --- ---

    //Go for the Jump key
    if (isJump) {

      if (!this.isJumping) {

        this.currentGravity = 0;

        this.isDashJump = false;

        //Start Jump, gets called only once
        if (!this.isJumpPast) {

          game.soundManager.Play("mario_jump");

          if (this.isDucking)
            this.isDuckJump = true;

          this.isJumpPast = true;
          this.isJumping = true;

          this.jumpKeyReleased = false;
          this.topReached = false;

          this.initialJumpX = this.speedX;

          if (this.isLookingLeft) {
            this.isJumpingLeft = true;
          } else {
            this.isJumpingLeft = false;
          }

          if ((abs(this.speedX) < this.speedXStandard_2)) {
            this.speedY = -this.initialJumpSpeed_1;
          } else {
            this.isDashJump = true;
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

    //Duck
    this.isDucking = (isDPadDown && !isDPadLeft && !isDPadRight && !isDPadUp &&
      (this.powerupState == this.marioState.bigMario || this.powerupState == this.marioState.fireMario));

    if (!isDPadDown || this.isJumping) {

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
                if (this.speedX < -this.maxSpeedRunX && !this.isRubbingLeft)
                  this.speedX = -this.maxSpeedRunX;

              }

              this.framesToKeepRunning = this.framesToKeepRunningDefault;

            } else {

              if (this.framesToKeepRunning > 0)
                this.framesToKeepRunning--;

              if (this.speedX > -this.maxSpeedWalkX) {

                this.speedX += -this.walkingAcceleration;

                //Assign max walk speed
                if (this.speedX < -this.maxSpeedWalkX && !this.isRubbingLeft)
                  this.speedX = -this.maxSpeedWalkX;

              } else {

                if (this.framesToKeepRunning == 0 &&
                  this.speedX < -this.maxSpeedWalkX + -this.releaseDeacceleration)
                  this.speedX += this.releaseDeacceleration;

                //Assign max walk speed
                if (this.speedX > -this.maxSpeedWalkX + -this.releaseDeacceleration && !this.isRubbingLeft)
                  this.speedX = -this.maxSpeedWalkX;

              }

            }

          }

        } else {

          //Jumping left, pressed left
          if (this.isMoonwalkingLeft) {

            if (abs(this.speedX) <= this.maxSpeedWalkX) {
              this.speedX += -this.walkingAcceleration;

              //Assign max walk speed
              if (this.speedX < -this.maxSpeedWalkX && !this.isRubbingLeft)
                this.speedX = -this.maxSpeedWalkX;
            } else {
              this.speedX += -this.runningAcceleration;

              //Assign max run speed
              if (this.speedX < -this.maxSpeedRunX && !this.isRubbingLeft)
                this.speedX = -this.maxSpeedRunX;
            }

            //Jumping right, pressed left
          } else {

            if (abs(this.speedX) < this.maxSpeedWalkX) {

              if (abs(this.initialJumpX) < this.initialJumpXStandard) {
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
                if (this.speedX > this.maxSpeedRunX && !this.isRubbingRight)
                  this.speedX = this.maxSpeedRunX;

              }

              this.framesToKeepRunning = this.framesToKeepRunningDefault;

            } else {

              if (this.framesToKeepRunning > 0)
                this.framesToKeepRunning--;

              if (this.speedX < this.maxSpeedWalkX) {

                this.speedX += this.walkingAcceleration;

                //Assign max walk speed
                if (this.speedX > this.maxSpeedWalkX && !this.isRubbingRight)
                  this.speedX = this.maxSpeedWalkX;

              } else {

                if (this.framesToKeepRunning == 0 &&
                  this.speedX > this.maxSpeedWalkX + this.releaseDeacceleration)
                  this.speedX += -this.releaseDeacceleration;

                //Assign max walk speed
                if (this.speedX < this.maxSpeedWalkX + this.releaseDeacceleration && !this.isRubbingRight)
                  this.speedX = this.maxSpeedWalkX;

              }

            }

          }

        } else {

          //Jumping right, pressed right
          if (!this.isMoonwalkingLeft) {

            if (abs(this.speedX) <= this.maxSpeedWalkX) {
              this.speedX += this.walkingAcceleration;

              //Assign max walk speed
              if (this.speedX > this.maxSpeedWalkX && !this.isRubbingRight)
                this.speedX = this.maxSpeedWalkX;
            } else {
              this.speedX += this.runningAcceleration;

              //Assign max run speed
              if (this.speedX > this.maxSpeedRunX && !this.isRubbingRight)
                this.speedX = this.maxSpeedRunX;
            }

            //Jumping left, pressed right
          } else {

            if (abs(this.speedX) < this.maxSpeedWalkX) {

              if (abs(this.initialJumpX) < this.initialJumpXStandard) {
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

        this.ReleaseForce();

      }

      //Down key is pressed, and is not jumping
    } else {

      this.ReleaseForce();

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
    if (this.isGravityAssigned) {
      this.speedY += this.gravityAssigned;
    } else {
      this.speedY += this.currentGravity;
    }

    //Limit gravity
    if (this.speedY > this.maxFallSpeed)
      this.speedY = this.maxFallSpeed;

    if ((this.speedX > 0 && !this.isRubbingRight) || (this.speedX < 0 && !this.isRubbingLeft)) {
      this.x += this.speedX;
    }

    if (this.x < game.camera.x - this.initialX + 8)
      this.x = game.camera.x - this.initialX + 8;

    this.y += this.speedY;
    
    this.isMoonwalkingLeft = (this.x < this.previousX); 

    this.previousX = this.x;
    this.previousY = this.y;

  }

  // --- --- ---

  //Manage the animations
  Animate(sprite1, sprite2, newFrameRate, sprite3, isTransform) {

    if (game.interfaceFlow.flowState == game.interfaceFlow.screenState.pause)
      return;

    this.animationFrameRate = newFrameRate;

    if (this.frameCount > this.animationFrameRate) {
      this.frameCount = 0;
      this.drawIndex++;
    } else {
      this.frameCount++;
    }

    if (!isTransform) {

      if (this.drawIndex > 2)
        this.drawIndex = 0;

      if (sprite3) {
        if (this.drawIndex > 2)
          this.drawIndex = 0;
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
        if (this.drawIndex > 1)
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

      switch (this.nextPowerupState) {
        case this.marioState.mario:
          switch (this.drawIndex) {
            case 0:
              this.spriteToDraw = sprite1;
              break;
            case 1:
              this.spriteToDraw = sprite1;
              break;
            case 2:
              this.spriteToDraw = sprite1;
              break;
            case 3:
              this.spriteToDraw = sprite2;
              break;
            case 4:
              this.spriteToDraw = sprite3;
              break;
            case 5:
              this.spriteToDraw = sprite2;
              break;
            case 6:
              this.spriteToDraw = sprite3;
              break;
            case 7:
              this.spriteToDraw = sprite2;
              break;
            case 8:
              this.spriteToDraw = sprite3;
              break;
            case 9:
              this.spriteToDraw = sprite2;
              break;
            case 10:
              this.spriteToDraw = sprite3;
              break;
            case 11:
              this.spriteToDraw = sprite2;
              break;
            case 12:
              this.spriteToDraw = sprite3;
              break;
            case 13:
              this.spriteToDraw = sprite2;
              break;
          }
          if (this.drawIndex <= 3) {
            this.tickFlash = true;
          }
          if (this.drawIndex == 13) {
            this.isTransforming = false;
            this.powerupState = this.nextPowerupState;
            this.RefreshSpritePool();
          }
          break;

        case this.marioState.bigMario:
          switch (this.drawIndex) {
            case 0:
              this.spriteToDraw = sprite1;
              break;
            case 1:
              this.spriteToDraw = sprite2;
              break;
            case 2:
              this.spriteToDraw = sprite1;
              break;
            case 3:
              this.spriteToDraw = sprite2;
              break;
            case 4:
              this.spriteToDraw = sprite1;
              break;
            case 5:
              this.spriteToDraw = sprite2;
              break;
            case 6:
              this.spriteToDraw = sprite3;
              break;
            case 7:
              this.spriteToDraw = sprite1;
              break;
            case 8:
              this.spriteToDraw = sprite2;
              break;
            case 9:
              this.spriteToDraw = sprite3;
              break;
            case 10:
              this.spriteToDraw = sprite1;
              break;
            case 11:
              this.spriteToDraw = sprite3;
              break;
          }
          if (this.drawIndex == 11) {
            this.isTransforming = false;
            this.powerupState = this.nextPowerupState;
            this.RefreshSpritePool();
          }
          break;

        case this.marioState.fireMario:

          if (this.drawIndex == 11) {
            this.isTransforming = false;
            this.isEmberRestored = false;
            this.powerupState = this.nextPowerupState;
            this.RefreshSpritePool();
          }
          break;
      }
    }
  }

  //Called once on Powerup
  PowerupTo(targetState) {
    this.isTransforming = true;
    this.drawIndex = 0;
    this.jumpKeyReleased = true;
    switch (targetState) {
      case this.marioState.mario:
        this.nextPowerupState = this.marioState.mario;
        break;
      case this.marioState.bigMario:
        this.nextPowerupState = this.marioState.bigMario;
        break;
      case this.marioState.fireMario:
        this.isEmberRestored = true;
        this.nextPowerupState = this.marioState.fireMario;
        break;
    }
  }

  //Called once for powerupState, and called constantly for invincibility
  RefreshSpritePool() {
    if (this.isInvincible || this.isEmberRestored) {
      if (this.powerupState == this.marioState.mario) {
        //mario (small) invincible
        switch (this.tickIndex) {
          case 2:
            this.stand_still = this.mario_stand_still_transform1;
            this.running_1 = this.mario_running_transform1_1;
            this.running_2 = this.mario_running_transform1_2;
            this.running_3 = this.mario_running_transform1_3;
            this.turnAround = this.mario_turnaround_transform1;
            this.jump = this.mario_jump_transform1;
            break;
          case 0:
            this.stand_still = this.mario_stand_still_transform2;
            this.running_1 = this.mario_running_transform2_1;
            this.running_2 = this.mario_running_transform2_2;
            this.running_3 = this.mario_running_transform2_3;
            this.turnAround = this.mario_turnaround_transform2;
            this.jump = this.mario_jump_transform2;
            break;
          case 1:
            this.stand_still = this.mario_stand_still_transform3;
            this.running_1 = this.mario_running_transform3_1;
            this.running_2 = this.mario_running_transform3_2;
            this.running_3 = this.mario_running_transform3_3;
            this.turnAround = this.mario_turnaround_transform3;
            this.jump = this.mario_jump_transform3;
            break;
        }
      } else {
        //Big or Fire mario invincible
        switch (this.tickIndex) {
          case 2:
            this.stand_still = this.big_mario_stand_still_transform1;
            this.running_1 = this.big_mario_running_transform1_1;
            this.running_2 = this.big_mario_running_transform1_2;
            this.running_3 = this.big_mario_running_transform1_3;
            this.turnAround = this.big_mario_turnaround_transform1;
            this.jump = this.big_mario_jump_transform1;
            break;
          case 0:
            this.stand_still = this.big_mario_stand_still_transform2;
            this.running_1 = this.big_mario_running_transform2_1;
            this.running_2 = this.big_mario_running_transform2_2;
            this.running_3 = this.big_mario_running_transform2_3;
            this.turnAround = this.big_mario_turnaround_transform2;
            this.jump = this.big_mario_jump_transform2;
            break;
          case 1:
            this.stand_still = this.big_mario_stand_still_transform3;
            this.running_1 = this.big_mario_running_transform3_1;
            this.running_2 = this.big_mario_running_transform3_2;
            this.running_3 = this.big_mario_running_transform3_3;
            this.turnAround = this.big_mario_turnaround_transform3;
            this.jump = this.big_mario_jump_transform3;
            break;
        }
        if (this.isEmberRestored && this.tickIndex == 3) {
          this.stand_still = this.big_mario_stand_still_fire;
          this.running_1 = this.big_mario_running_fire_1;
          this.running_2 = this.big_mario_running_fire_2;
          this.running_3 = this.big_mario_running_fire_3;
          this.turnAround = this.big_mario_turnaround_fire;
          this.jump = this.big_mario_jump_fire;
        }
      }
    } else {
      switch (this.powerupState) {
        case this.marioState.mario:
          this.hitbox = hitboxes.mario;
          this.stand_still = this.mario_stand_still;
          this.running_1 = this.mario_running_1;
          this.running_2 = this.mario_running_2;
          this.running_3 = this.mario_running_3;
          this.turnAround = this.mario_turnaround;
          this.jump = this.mario_jump;
          break;
        case this.marioState.bigMario:
          this.hitbox = hitboxes.big_mario;
          this.stand_still = this.big_mario_stand_still;
          this.running_1 = this.big_mario_running_1;
          this.running_2 = this.big_mario_running_2;
          this.running_3 = this.big_mario_running_3;
          this.turnAround = this.big_mario_turnaround;
          this.jump = this.big_mario_jump;
          this.duck = this.big_mario_duck;
          break;
        case this.marioState.fireMario:
          this.hitbox = hitboxes.big_mario;
          this.stand_still = this.big_mario_stand_still_fire;
          this.running_1 = this.big_mario_running_fire_1;
          this.running_2 = this.big_mario_running_fire_2;
          this.running_3 = this.big_mario_running_fire_3;
          this.turnAround = this.big_mario_turnaround_fire;
          this.jump = this.big_mario_jump_fire;
          this.duck = this.big_mario_duck_fire;
          break;
      }
    }
  }

  // --- --- ---

  ThrowFireball() {
    if (this.fireballCount < 2) {
      let deltaX = 0;
      if (this.isLookingLeft) {
        deltaX = -3;
      } else {
        deltaX = 3;
      }
      game.Enroll(new Fireball(this.x + deltaX, this.y + 16));
      this.fireballCount++;
    }
  }

  ReleaseForce() {
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

  // --- --- ---

  //Call Animate() & Draw Mario
  Draw() {

    if (this.isDamaged){

      //Flash every frame
      this.tickFlash = !this.tickFlash;

      if (this.framesToStayInvincible == -1) {
        this.framesToStayInvincible = this.framesToStayInvincibleDefault;
      }

      if (this.framesToStayInvincible == 0) {
        this.isDamaged = false;
      }

      this.framesToStayInvincible--;

    }

    if (this.isDead) {
      DrawSprite(this.mario_dead, this.x, this.y, this.isLookingLeft, false, this.initialX);
      return;
    }

    if (!this.isTransforming)
      if (this.isDucking && !this.isJumping) {
        this.hitbox = hitboxes.big_mario_duck;
        DrawSprite(this.duck, this.x, this.y, this.isLookingLeft, false, this.initialX);
        return;
      } else if (this.isDuckJump) {
        this.hitbox = hitboxes.big_mario_duck;
        DrawSprite(this.duck, this.x, this.y, this.isLookingLeft, false, this.initialX);
        return;
      } else {
        this.RefreshSpritePool();
      }

    if (this.isInvincible) {

      if (this.tickCount > 1) {
        if (this.tickIndex > 1) {
          this.tickIndex = 0;
        } else {
          this.tickIndex++;
        }
        this.tickCount = 0;
      }
      this.tickCount++;

      this.RefreshSpritePool();

    }

    //return if isTransforming
    if (this.isTransforming) {

      switch (this.nextPowerupState) {

        case this.marioState.bigMario:

          this.Animate(this.mario_stand_still, this.mario_getting_bigger, this.transformFrameRate, this.big_mario_stand_still, true);

          if (!this.isJumping) {
            DrawSprite(this.spriteToDraw, this.x, this.y, this.isLookingLeft, false, this.initialX);
          } else {
            DrawSprite(this.spriteToDraw, this.x, this.y, this.isJumpingLeft, false, this.initialX);
          }

          break;

        case this.marioState.mario:

          this.Animate(this.big_mario_jump, this.mario_swimming, this.transformFrameRate, this.big_mario_swimming, true);

          if (game.interfaceFlow.flowState != game.interfaceFlow.screenState.pause) {
            if (this.tickCount > 2) {
              this.tickFlash = !this.tickFlash;
              this.tickCount = 0;
            }
            this.tickCount++;
          }

          if (this.tickFlash)
            DrawSprite(this.spriteToDraw, this.x, this.y, this.isLookingLeft, false, this.initialX);

          break;

        case this.marioState.fireMario:

          //Animate almost does nothing here, just for the timed isTransforming tick 
          this.Animate(this.big_mario_jump, this.mario_swimming, this.transformFrameRate, this.big_mario_swimming, true);

          if (this.tickCount > 3) {
            if (this.tickIndex > 2) {
              this.tickIndex = 0;
            } else {
              this.tickIndex++;
            }
            this.tickCount = 0;
          }
          this.tickCount++;

          if (game.interfaceFlow.flowState != game.interfaceFlow.screenState.pause)
            this.RefreshSpritePool();

          DrawSprite(this.spriteToDraw, this.x, this.y, this.isLookingLeft, false, this.initialX);

          break;

      }

      if (this.nextPowerupState != this.marioState.fireMario)
        return;

    }

    if (!this.isJumping) {
      if (!this.isSkidding) {
        //Change sprites according to speedX
        if (this.speedX == 0) {
          this.spriteToDraw = this.stand_still;
        } else if (abs(this.speedX) < this.maxSpeedWalkX) {
          if (!this.isTransforming) {
            this.Animate(this.running_1, this.running_2, this.walkFrameRateSlow, this.running_3);
          } else {
            //Assigning this to running_1 is maybe not strictly accurate, but should work anyways
            this.spriteToDraw = this.running_1;
          }
        } else if (abs(this.speedX) <= this.maxSpeedWalkX + this.walkingAcceleration) {
          if (!this.isTransforming) {
            this.Animate(this.running_1, this.running_2, this.walkFrameRateFast, this.running_3);
          } else {
            this.spriteToDraw = this.running_1;
          }
        } else {
          if (!this.isTransforming) {
            this.Animate(this.running_1, this.running_2, this.runFrameRate, this.running_3);
          } else {
            this.spriteToDraw = this.running_1;
          }
        }
        //isSkidding -> draw turnAround
      } else {
        this.spriteToDraw = this.turnAround;
      }

      if (!this.isDamaged || this.tickFlash)
      DrawSprite(this.spriteToDraw, this.x, this.y, this.isLookingLeft, false, this.initialX);
      //isJumping -> draw jump
    } else {

      this.spriteToDraw = this.jump;
      if (!this.isDamaged || this.tickFlash)
      DrawSprite(this.spriteToDraw, this.x, this.y, this.isJumpingLeft, false, this.initialX);
    }

  }

  // --- --- ---

  /*
    React to a collision with the 'collider' passed as parameter
    Collision will be handled like this :
   
    Mario collides with two Goombas.
    Mario will call ScoreManager.score() twice on him, 
    while Goombas will call this.kill() once on them each.
  */
  OnCollisionWith(collider, direction) {
    if (collider instanceof ActiveBlock) {
      switch (direction) {
        case DIRECTION.Down:
          this.stompCombo = 0;
          break;
      }
    }
    else if (collider instanceof InactiveBlock) {
      switch (direction) {
        case DIRECTION.Down:
          this.stompCombo = 0;
          break;
      }
    }
  }
  // ※거북이 등껍질 밟으면 튀어오르지 않음
  // ※soft ceiling hit이랑 hard ceiling hit 중력 값 다른 거 주의
}