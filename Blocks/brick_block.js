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

        this.spriteToDraw = game.IsUnderground() ? sprites.block_brick_underground : sprites.block_brick;
    }

    Draw()
    {
        DrawSprite(this.spriteToDraw, this.x, this.y);
    }

    Hit()
    {
        this.isBouncing = true;
        if (game.IsUnderground())
        {
            this.spriteToDraw = sprites.block_brick_hit_underground;
        }
        game.physics.RegisterToMovingObjectsArray(this);

        if (this.containingItem == EContainingItemType.None)
        {
            if (game.mario.powerupState != game.mario.marioState.mario)
            {
                setTimeout(() => this.Break(), ONE_FRAME_SECONDS);
            }
            else
            {
                game.soundManager.Play("block_hit");
                this.BouncingEndCallBack = () => {
                    game.physics.RemoveFromMovingObjectsArray(this);
                    this.spriteToDraw = game.IsUnderground() ? sprites.block_brick_underground : sprites.block_brick;
                };
            }

            return;
        }

        if (this.containingItem == EContainingItemType.Coin)
        {
            if (this.isCoinTimedOut)
            {
                game.statistics.IncrementCoin();
                game.statistics.AddScore(SCORES.Coin);
                game.soundManager.Play("coin");
                
                this.spriteToDraw = sprites.block_empty;

                this.BouncingEndCallBack = () => this.Emptied();
                return;
            }

            if (!this.coinTimer)
            {
                this.coinTimer = setTimeout(() => this.isCoinTimedOut = true, BRICK_COIN_SPIT_SECONDS * 1000);
            }

            game.statistics.IncrementCoin();
            game.statistics.AddScore(SCORES.Coin);
            game.soundManager.Play("coin");

            this.BouncingEndCallBack = () => this.spriteToDraw = game.IsUnderground() ? sprites.block_brick_underground : sprites.block_brick;
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

        this.BouncingEndCallBack = () => {
            let newPowerup = new Powerup(this.x, this.y - BLOCK_SIZE / 2, powerUpType);
            game.gameObjects.push(newPowerup);
            game.Enroll(newPowerup);

            this.Emptied();
        };
        
        this.spriteToDraw = sprites.block_empty;
    }

    Break()
    {
        // particle here
        game.soundManager.Play("block_break");
        this.Destroy();

        game.statistics.AddScore(SCORES.BreakBrickBlock);
    }
}