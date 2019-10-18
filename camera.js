/*
  camera.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang 
  DoYoon Kim
  SeungGeon Kim Wrote this
  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/

class Camera {

    constructor() {
        this.x = 100;
        this.activationRange = 120;
        this.d = 0;
    }

    Update() {

        if (!g_isCheckedPoint) {
        if (this.x < 200 && g_interfaceFlow.flowState == g_interfaceFlow.screenState.inGame) {
            this.d = this.x - 200;
        }
    } else {
        this.d = 0;
    }

        if (game.mario.x > this.x + this.d)
            this.x = game.mario.x - this.d;

        game.gameObjects.sort((a, b) => (a.x > b.x) ? 1 : -1);

        for (let object of game.gameObjects) {
            
            if (object.x < this.x + this.activationRange + 56) {
                game.Enroll(object);
            } else {
                break;
            }

        }

        for (let object of game.objectsToUpdate) {

            if (object.y > 15 * 16) {
                object.Destroy();
            }

            if (object.x > this.x + this.activationRange + 100) {
                object.Destroy();
            } else if (object.x < this.x - this.activationRange) {
                object.Destroy();
            } 

        }

    }

}