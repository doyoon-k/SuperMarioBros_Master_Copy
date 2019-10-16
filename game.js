/*
  game.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang Arranged & Wrote all of the main properties and functions
  DoYoon Kim 
  SeungGeon Kim Arranged the function calls afterwards to match the 'interfaceFlow scene' switch mechanism
  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/

class Game {
    constructor() 
    {
        this.physics = new Physics();
        this.mario = new Mario();
        this.camera = new Camera();
        this.statistics = new Statistics();
        this.soundManager = new SoundManager();
        this.interfaceFlow = new InterfaceFlow();

        this.backgroundObjects = [];
        this.gameObjects = [];
        this.objectsToUpdate = [];
        this.objectsToDraw = {};

        this.twinkleFrameCount = 0;
        this.twinkleFrameRate = 10;
        this.twinkleIndex = 0;

        this.lives = 3;
        this.isGameOver = true;
        this.isSinglePlayer = true;

        this.underworldMapList = [];
        this.map = undefined;

        this.TIMELastDigit = NaN;
    }

    Enroll(object) 
    {
        //Safeguard to stop mario from being included in the objects list
        if (object instanceof Mario)
        {
            return;
        }
        if (this.objectsToUpdate.indexOf(object) == -1)
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
    }

    Update()
    {

        this.interfaceFlow.Update();

        switch (game.interfaceFlow.flowState) 
        {
            case game.interfaceFlow.screenState.blackScreen:

                break;
            case game.interfaceFlow.screenState.pause:
                this.mario.Update();
                break;
            case game.interfaceFlow.screenState.menu:
                this.camera.Update();
                break; 
            case game.interfaceFlow.screenState.preGame:

                break;
            case game.interfaceFlow.screenState.inGame:


                this.mario.Update();

                if (!this.mario.isTransforming) {
                this.camera.Update();
                this.physics.Update();

                this.objectsToUpdate.forEach(object => object.Update());
                
                this.physics.CheckCollision();

                this.statistics.Update();
                }
            break; 
            case game.interfaceFlow.screenState.endGame:

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

        this.mapLoader.LoadMap(mapFile);
        
        this.physics.RegisterToMovingObjectsArray(this.mario);
        this.physics.RegisterToBucketMap(this.mario);
    }

    IsUnderground()
    {
        return this.underworldMapList.includes(this.map);
    }

    OneUp()
    {
        this.lives++;
        this.soundManager.Play("mario_1up");
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
            this.soundManager.Play("level_clear");
            this.statistics.TimeToScore();
        }, 400);
        this.mario.isLookingLeft = true;
    }

    OnTimeToScoreEnd()
    {
        if (this.TIMELastDigit == 1 || this.TIMELastDigit == 3 || this.TIMELastDigit == 6)
        {
            // 폭죽
        }
        // 검정 화면
        // 다음 레벨 로드
    }

    Draw() 
    {
        this.backgroundObjects.forEach(object => object.Draw());
        for (let zWeight in this.objectsToDraw)
        {
            this.objectsToDraw[zWeight].forEach(object => object.Draw());
        }

        if (4 > this.interfaceFlow.flowState > 0) 
        this.mario.Draw();
        
        this.interfaceFlow.DrawInterface();

        if (this.interfaceFlow.flowState > 1 && game.interfaceFlow.flowState == game.interfaceFlow.screenState.inGame && !game.mario.isTransforming)
            this.TwinkleAnimate();

        if (this.interfaceFlow.flowState > 0) 
            this.statistics.DrawStatistics();
    }
}