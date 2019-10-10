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
        this.physics = new Physics();
        this.mario = new Mario();
        this.camera = new Camera();
        this.backgroundObjects = [];
        this.gameObjects = [];
        this.objectsToUpdate = [];
        this.statistics = new Statistics();
        this.soundManager = new SoundManager();

        this.twinkleFrameCount = 0;
        this.twinkleFrameRate = 10;
        this.twinkleIndex = 0;

        this.isPaused = false;
    }

    Enroll(object) 
    {
        if (this.objectsToUpdate.indexOf(object) == -1)
        {
            this.objectsToUpdate.push(object);
        }
    }

    Expel(object) 
    {
        this.physics.RemoveFromMovingObjectsArray(object);
        this.physics.RemoveFromBucketMap(object);

        let index = this.objectsToUpdate.indexOf(object);
        if (index != -1)
        {
            this.objectsToUpdate.splice(index, 1);
        }

        index = this.gameObjects.indexOf(object);
        if (index != -1)
        {
            this.gameObjects.splice(index, 1);
        }
    }

    Update()
    {
        this.physics.Update();
        this.physics.CheckCollision();
        this.objectsToUpdate.forEach(object => object.Update());
        this.statistics.Update();
        this.camera.Update();
    }

    TwinkleAnimate()
    {
        if (this.twinkleFrameRate < this.twinkleFrameCount)
        {
            this.twinkleFrameCount = 0;
            this.twinkleIndex = ++this.twinkleIndex % 4;
        }
        else
        {
            this.twinkleFrameCount++;
        }
    }

    LoadNewMap(mapFile)
    {
        this.backgroundObjects = [];
        this.gameObjects = [];
        this.objectsToUpdate = [];
        this.physics.InitializeArrays();

        this.mapLoader.LoadMap(mapFile);
        
        this.Enroll(this.mario);
        this.physics.RegisterToMovingObjectsArray(this.mario);
        this.physics.RegisterToBucketMap(this.mario);
    }

    Draw() 
    {
        this.TwinkleAnimate();
        
        this.backgroundObjects.forEach(object => object.Draw());
        this.statistics.DrawStatistics();
        this.objectsToUpdate.forEach(object => object.Draw());
    }
}