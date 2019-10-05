/*
  game.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang Wrote all of this
  DoYoon Kim 
  SeungGeon Kim 
  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/

class Game {
    constructor() 
    {
        this.mario = new Mario();
        this.camera = new Camera();
        this.backgroundObjects = [];
        this.gameObjects = [];
        this.objectsToUpdate = [];
        this.statistics = new Statistics();

        this.Enroll(this.mario);
    }

    Enroll(object) 
    {
        this.objectsToUpdate.push(object);
    }

    Expel(object) 
    {
        this.objectsToUpdate.splice(this.objectsToUpdate.indexOf(object), 1);
    }

    Update() 
    {
        this.objectsToUpdate.forEach(object => object.Update());
        this.statistics.Update();
        this.camera.Update();
    }

    Draw() 
    {
        this.backgroundObjects.forEach(object => object.Draw());
        this.statistics.DrawStatistics();
        this.objectsToUpdate.forEach(object => object.Draw());
    }
}