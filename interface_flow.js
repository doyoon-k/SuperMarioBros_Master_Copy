/*
  interface_flow.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang 
  DoYoon Kim 
  SeungGeon Kim Wrote this all
  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/

class InterfaceFlow {

    constructor() {

        this.logo = loadImage("Sprites/Misc/misc_logo.png");
        this.indicator = loadImage("Sprites/Misc/misc_indicator_goomba.png");

        this.screenState = {
            wallPaper: -1,
            blackScreen: 0,
            pause: 1,
            menu: 2,
            inGame: 3,
            preGame: 4,
            endGame: 5,
            underWorld: 6
        };

        this.isScreenBlack = false;

        this.flowState = 0;

        this.flowState = this.screenState.blackScreen;

        this.isMenu = false;
        this.screenTick = true;
        //isExit -> black -> blue, !isExit it is the opposite
        this.isExit = false;

        this.isReset = false;

    }

    Update() {
        switch (this.flowState) {
            case this.screenState.wallPaper:
                if (!this.screenTick) {
                    if (this.isExit) {
                        if (!game.isGameOver) {
                            if (this.isReset) {
                                Reset();
                                this.isReset = false;
                            }
                            setTimeout(function () { setFlowState(3); g_soundManager.Play("overworld");}, 100);
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
                            if (this.isReset) {
                            Reset();
                            this.isReset = false;
                            }
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
            case this.screenState.endGame: // 5
                if (!this.screenTick) {
                    setTimeout(function () { setFlowState(0); }, 6000);
                    this.screenTick = true;
                    this.isMenu = false;
                    this.isExit = false;
                }
                break;
        }
    }

    OnStartPressed() {
        if (!game.mario.isDead)
        switch (this.flowState) {
            case this.screenState.menu:

                //Do some initialize-at-the-start-of-every-game thing, like lives
                game.isGameOver = false;
                g_lives = 3;

                this.flowState = this.screenState.wallPaper;
                this.isExit = false;
                this.isMenu = true;

                break;
            case this.screenState.underWorld:
            case this.screenState.inGame:
                this.flowState = this.screenState.pause;
                g_soundManager.PauseResume(true);
                break;
            case this.screenState.pause:
                if (game.isUnderground) {  
                    this.flowState = this.screenState.underWorld;
                } else {
                    this.flowState = this.screenState.inGame;
                }
                g_soundManager.PauseResume(false);
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

                DrawText("1 PLAYER GAME", 88, 150, 8);
                DrawText("2 PLAYER GAME", 88, 165, 8);

                let tempString = game.statistics.highScore.toString().padStart(6, '0')

                DrawText("TOP- " + tempString, 98, 190, 8);

                if (game.isSinglePlayer) {
                    DrawSprite(this.indicator, 76, 150);
                } else {
                    DrawSprite(this.indicator, 76, 165);
                }
                break;
            case this.screenState.preGame:
                background(0);

                DrawText("WORLD 1-1", 88, 88, 8);

                DrawSprite(g_marioSprite, 100, 130);
                DrawText("  *  " + g_lives, 100, 128, 8);

                break;
            case this.screenState.endGame:
                background(0);

                DrawText("GAME OVER", 88, 130, 8);
                break;
        }

    }

}