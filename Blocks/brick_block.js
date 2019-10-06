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

        this.coinTimer = undefined;
        this.isCoinTimedOut = false;

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

        if (this.containingItem == EContainingItemType.None)
        {
            if (game.mario.powerupState != game.mario.marioState.mario)
            {
                setTimeout(this.Break, ONE_FRAME_SECONDS);
            }
            else
            {
                setTimeout(() => physics.RemoveFromMovingObjectsArray(this), BLOCK_BOUNCING_SECONDS * 1000);
            }

            return;
        }

        if (this.containingItem == EContainingItemType.Coin)
        {
            if (this.isCoinTimedOut)
            {
                game.statistics.incrementCoin();
                
                this.spriteToDraw = sprites.block_empty;
                setTimeout(this.Emptied, BLOCK_BOUNCING_SECONDS * 1000);
                return;
            }

            if (!this.coinTimer)
            {
                this.coinTimer = setTimeout(() => this.isCoinTimedOut = true, BRICK_COIN_SPIT_SECONDS * 1000);
            }

            game.statistics.incrementCoin();
            return;
        }
        
        let powerUpType = NaN;
        switch (this.containingItem)
        {
            case EContainingItemType.PowerUp:
                powerUpType = game.mario.powerUpState == game.mario.marioState.mario ? EPowerupType.Mushroom : EPowerupType.FireFlower;
                break;
            
            case EContainingItemType.OneUp:
                powerUpType = EPowerupType.OneUp;
                break;
            
            case EContainingItemType.Star:
                powerUpType = EPowerupType.Star;
                break;
        } 

        newPowerup = new Powerup(this.x, this.y, powerUpType);
        game.gameObjects.push(newPowerup);
        game.Enroll(newPowerup);
        
        this.spriteToDraw = sprites.block_empty;
        setTimeout(this.Emptied, BLOCK_BOUNCING_SECONDS * 1000);
    }

    Break()
    {
        // particle here
        this.Destroy();
    }
}