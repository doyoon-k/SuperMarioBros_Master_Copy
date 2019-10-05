/*
  brick_block.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang Wrote all of this
  DoYoon Kim 
  SeungGeon Kim 
  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/

class BrickBlock extends ActiveBlock
{
    constructor(x, y, containingItem)
    {
        super(x, y, containingItem);

        this.spriteToDraw = sprites.block_brick;
    }

    Draw()
    {
        DrawSprite(this.spriteToDraw, this.x, this.y);
    }

    Hit()
    {
        this.isBouncing = true;
        physics.RegisterToMovingObjectsArray(this);

        if (game.mario.powerupState != Mario.marioState.mario)
        {
            setTimeout(this.Break, ONE_FRAME_SECONDS);
        }
        else
        {
            setTimeout(() => {physics.RemoveFromMovingObjectsArray(this); this.isBouncing = false;}, BLOCK_BOUNCING_SECONDS * 1000);
        }
    }

    Break()
    {
        // particle here
        physics.RemoveFromMovingObjectsArray(this);
        this.Destroy();
    }
}