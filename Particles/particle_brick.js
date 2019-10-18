/*
  particle_brick.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang 
  DoYoon Kim Wrote all of this base on Joonho Hwang's class
  SeungGeon Kim


  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/

class ParticleBrick extends Particle
{
    constructor(x, y)
    {
        super(x, y);
        this.animationFrameRate = 4;

        this.spriteToDraw = sprites.particle_brick;

        this.speedY = -HexFloatToDec("1.200") * 4;
        this.fallingAcceleration = HexFloatToDec("0.400");

        this.rotationFactor = 0;
        this.distanceBetweenBlocks = BLOCK_SIZE / 4;
        this.distanceAcceleration = HexFloatToDec("1.200");
    }

    *ChangeSprite()
    { 
        
    }
    
    Animate()
    {
        if (this.animationFrameRate < this.animationFrameCount)
        {
            this.animationFrameCount = 0;
            this.rotationFactor = (this.rotationFactor+1) % 2;
        }
        this.animationFrameCount++;
    }

    Draw()
    {
        let width = this.spriteToDraw.width;
        let height = this.spriteToDraw.height;
        push();
        imageMode(CENTER);
        scale(pixelMultiplier);
        translate(this.x-(game.camera.x - 100), this.y-height/2);
        rotate(HALF_PI * this.rotationFactor);
        image(this.spriteToDraw, -this.distanceBetweenBlocks, -this.distanceBetweenBlocks, width, height);
        image(this.spriteToDraw, +this.distanceBetweenBlocks, -this.distanceBetweenBlocks, width, height);
        image(this.spriteToDraw, -this.distanceBetweenBlocks,+this.distanceBetweenBlocks, width, height);
        image(this.spriteToDraw, +this.distanceBetweenBlocks, +this.distanceBetweenBlocks, width, height);
        pop();
    }

    Destroy()
    {
        let index = game.objectsToUpdate.indexOf(this);
        if (index != -1)
        {
            game.objectsToUpdate.splice(index, 1);
        }

        index = game.objectsToDraw[this.zWeight].indexOf(this);
        if (index != -1)
        {
            game.objectsToDraw[this.zWeight].splice(index, 1);
        }

        index = game.gameObjects.indexOf(this);
        if (index != -1)
        {
            game.gameObjects.splice(index, 1);
        }
    }

    Update()
    {
        if (g_interfaceFlow.flowState == g_interfaceFlow.screenState.inGame)
       {
            this.Animate();
            this.speedY += this.fallingAcceleration;
            this.y += this.speedY;
            this.distanceBetweenBlocks += this.distanceAcceleration;
       }
    }
}