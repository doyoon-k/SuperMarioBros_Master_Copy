/*
  interface_flow.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang 
  DoYoon Kim 
  SeungGeon Kim Wrote this
  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/

class InterfaceFlow {

    constructor() {

        this.logo = loadImage("Sprites/Misc/misc_logo.png");
        this.indicator = loadImage("Sprites/Misc/misc_indicator_goomba.png");
        this.mario = loadImage("Sprites/Mario/mario_stand_still.png");

        this.screenState = {
            wallPaper: -1,
            blackScreen: 0,
            pause: 1,
            menu: 2,
            inGame: 3,
            preGame: 4,
            endGame: 5
        };

        this.isScreenBlack = false;

        this.flowState = 0;

        this.flowState = this.screenState.blackScreen;

        this.isMenu = false;
        this.screenTick = true;
        //isExit -> black -> blue, !isExit it is the opposite
        this.isExit = false;

    }

    Update() {
        switch (this.flowState) {
            case this.screenState.wallPaper:
                if (!this.screenTick) {
                    if (this.isExit) {
                        if (!game.isGameOver) {
                            setTimeout(function () { setFlowState(3); game.soundManager.Play("overworld");}, 100);
                            this.screenTick = true;
                        } else {
                            setTimeout(function () { setFlowState(5); }, 100);
                            this.screenTick = true;
                        }
                    } else {
                        if (this.isMenu) {
                            setTimeout(function () { setFlowState(4); }, 100);
                            this.screenTick = false;
                        } else {
                            setTimeout(function () { setFlowState(2); }, 100);
                            this.screenTick = false;
                        }
                    }
                }
                break;
            case this.screenState.blackScreen:
                if (this.screenTick) {
                    setTimeout(function () { setFlowState(-1); }, 100);
                    this.screenTick = false;
                }
                break;
            case this.screenState.preGame: // 3
                if (!this.screenTick) {
                    setTimeout(function () { setFlowState(0); }, 3000);
                    this.screenTick = true;
                    this.isExit = true;
                }
                break;
            case this.screenState.endGame:
                if (!this.screenTick) {
                    setTimeout(function () { setFlowState(0); }, 3000);
                    this.screenTick = true;
                }
                break;
        }
    }

    OnStartPressed() {
        switch (this.flowState) {
            case this.screenState.menu:

                //Do some initialize-at-the-start-of-every-game thing, like lives
                game.isGameOver = false;
                game.lives = 3;

                this.flowState = this.screenState.wallPaper;
                this.isExit = false;
                this.isMenu = true;

                break;
            case this.screenState.inGame:
                this.flowState = this.screenState.pause;
                game.soundManager.PauseResume(true);
                break;
            case this.screenState.pause:
                this.flowState = this.screenState.inGame;
                game.soundManager.PauseResume(false);
                break;
        }
    }

    DrawInterface() {

        switch (this.flowState) {
            case this.screenState.wallPaper:
                background(146, 144, 255);
                break;
            case this.screenState.blackScreen:
                background(0);
                break;
            case this.screenState.menu:
                DrawSprite(this.logo, 128, 121);

                DrawText("©", 105, 128, 8, color(254, 204, 197));
                DrawText("1985 NINTENDO", 112, 128, 8, color(254, 204, 197));

                DrawText("1 PLAYER GAME", 88, 160, 8);
                DrawText("2 PLAYER GAME", 88, 175, 8);

                if (game.isSinglePlayer) {
                    DrawSprite(this.indicator, 76, 161);
                } else {
                    DrawSprite(this.indicator, 76, 176);
                }
                break;
            case this.screenState.preGame:
                background(0);

                DrawText("WORLD 1-1", 88, 88, 8);

                DrawSprite(this.mario, 100, 130);
                DrawText("  *  " + game.lives, 100, 128, 8);

                break;
            case this.screenState.endGame:
                DrawSprite(this.logo, 100, 200);
                break;
        }

    }

}