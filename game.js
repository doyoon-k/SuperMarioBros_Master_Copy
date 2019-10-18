/*
  game.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang Arranged & Wrote all of the main properties and functions
  DoYoon Kim 
  SeungGeon Kim Arranged the function calls afterwards to match the 'g_interfaceFlow scene' switch mechanism
  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/

class Game {
    constructor() 
    {
        this.physics = new Physics();
        this.mario = new Mario();
        this.camera = new Camera();
        this.statistics = new Statistics();

        this.backgroundObjects = [];
        this.gameObjects = [];
        this.objectsToUpdate = [];
        this.particlesToUpdate = [];
        this.objectsToDraw = {};

        this.twinkleFrameCount = 0;
        this.twinkleFrameRate = 10;
        this.twinkleIndex = 0;

        this.isGameOver = true;
        this.isSinglePlayer = true;

        this.underworldMapList = ["Stages/underground1.json"];
        this.isUnderground = false;

        this.hasPassedCheckpoint = false;
    }

    Enroll(object) 
    {
        //Safeguard to stop mario from being included in the objects list
        if (object instanceof Mario)
        {
            return;
        }

        if (object instanceof Particle && this.particlesToUpdate.indexOf(object) == -1)
        {
            this.particlesToUpdate.push(object);
        }
        else if (this.objectsToUpdate.indexOf(object) == -1)
        {
            this.objectsToUpdate.push(object);
        }

        if (!this.objectsToDraw[object.zWeight])
        {
            this.objectsToDraw[object.zWeight] = [];
        }
        if (this.objectsToDraw[object.zWeight].indexOf(object) == -1)
        {
            this.objectsToDraw[object.zWeight].push(object);
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

        index = this.objectsToDraw[object.zWeight].indexOf(object);
        if (index != -1)
        {
            this.objectsToDraw[object.zWeight].splice(index, 1);
        }

        index = this.gameObjects.indexOf(object);
        if (index != -1)
        {
            this.gameObjects.splice(index, 1);
        }

        index = this.particlesToUpdate.indexOf(object);
        if (index != -1)
        {
            this.particlesToUpdate.splice(index, 1);
        }
    }

    Update()
    {
        if (!this.hasPassedCheckpoint && this.mario.x >= 87 * BLOCK_SIZE)
        {
            this.hasPassedCheckpoint = true;
        }

        g_interfaceFlow.Update();

        switch (g_interfaceFlow.flowState) 
        {
            case g_interfaceFlow.screenState.blackScreen:

                break;
            case g_interfaceFlow.screenState.pause:
                this.mario.Update();
                break;
            case g_interfaceFlow.screenState.menu:
                this.camera.Update();
                break; 
            case g_interfaceFlow.screenState.preGame:

                break;
            case g_interfaceFlow.screenState.underWorld:
            case g_interfaceFlow.screenState.inGame:

                this.mario.Update();
                this.particlesToUpdate.forEach(particle => particle.Update());

                if (!this.mario.isTransforming) {
                this.camera.Update();
                
                this.physics.UpdateMovingObjectsPrevCoords();
                    
                this.objectsToUpdate.forEach(object => object.Update());
                
                this.physics.UpdateBucketMap();
                    
                    if (!game.mario.isPipeDown && !game.mario.isPipeRight && !game.mario.isPipeUp)
                this.physics.CheckCollision();

                this.statistics.Update();
                }
            break; 
            case g_interfaceFlow.screenState.endGame:

                break;
        }
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

        this.isUnderground = this.underworldMapList.includes(mapFile);

        this.mapLoader.LoadMap(mapFile);
        
        this.physics.RegisterToMovingObjectsArray(this.mario);
        this.physics.RegisterToBucketMap(this.mario);

        g_soundManager.shouldHurry = false;
    }

    OneUp()
    {
        g_lives++;
        g_soundManager.Play("mario_1up");
    }

    LevelClear(nextLevel)
    {
        this.TIMELastDigit = Math.floor(this.statistics.time / 24) % 10;
        this.statistics.doTickTime = false;
        this.mario.isClimbing = true;
    }

    OnFlagDragEnd()
    {
        setTimeout(() => {
            this.mario.EndGame();
            g_soundManager.Play("level_clear");
            this.statistics.TimeToScore();
        }, 400);
        this.mario.isLookingLeft = true;
    }

    OnTimeToScoreEnd()
    {
        setTimeout(() => Reset("Stages/stage1.json", 5), 3000);
    }

    Draw() 
    {

        if (game.mario.isPipeDown || game.mario.isPipeUp || game.mario.isPipeRight) {

            if (4 > g_interfaceFlow.flowState > 0 || g_interfaceFlow.flowState == g_interfaceFlow.screenState.underWorld)
                if (!game.mario.hide)
                    this.mario.Draw();

            this.backgroundObjects.forEach(object => object.Draw());
            for (let zWeight in this.objectsToDraw)
            {
                this.objectsToDraw[zWeight].forEach(object => object.Draw());
            }

        } else {

            this.backgroundObjects.forEach(object => object.Draw());
            for (let zWeight in this.objectsToDraw) {
                this.objectsToDraw[zWeight].forEach(object => object.Draw());
            }

            if (4 > g_interfaceFlow.flowState > 0 || g_interfaceFlow.flowState == g_interfaceFlow.screenState.underWorld)
                if (!game.mario.hide)
                    this.mario.Draw();
        
        }
        
        g_interfaceFlow.DrawInterface();

        if (g_interfaceFlow.flowState > 0)
            this.TwinkleAnimate();

        if (g_interfaceFlow.flowState > 0) 
            this.statistics.DrawStatistics();
    }
}