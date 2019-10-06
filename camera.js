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
        this.activationRange = 500;
        this.d = 28;
    }

    Update() {

        if (game.mario.x > this.x + this.d)
            this.x = game.mario.x - this.d;

        game.gameObjects.sort((a, b) => (a.x > b.x) ? 1 : -1);

        for (let i = 0; i < game.gameObjects.length; i++) {

            if (game.gameObjects[i].x < this.x - this.activationRange)
                //It seems like that Destroy() doesn't exist for some objects
                game.Expel(game.gameObjects[i]);

            if (game.gameObjects[i].x < this.x + this.activationRange) {
                game.Enroll(game.gameObjects[i]);
            } else {
                break;
            }

        }

    }

}