/*
  question_block.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang Wrote all of this
  DoYoon Kim 
  SeungGeon Kim 
  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/

class QuestionBlock extends ActiveBlock
{
    constructor(x, y, containingItem)
    {
        super(x, y, containingItem);

        this.animationFrameCount = 0;
        this.animationFrameRate = 6;

        this.animator = this.ChangeSprite();

        this.spriteToDraw = sprites.block_question_1;
    }

    Draw()
    {
        this.Animate();
        DrawSprite(this.spriteToDraw, this.x, this.y);
    }

    Animate()
    {
        if (this.animationFrameRate < this.animationFrameCount)
        {
            this.animationFrameCount = 0;
            this.animator.next();
        }
        else
        {
            this.animationFrameCount++;
        }
    }

    *ChangeSprite()
    {
        while (true)
        {
            this.spriteToDraw = sprites.block_question_1;
            yield;
            this.spriteToDraw = sprites.block_question_1;
            yield;
            this.spriteToDraw = sprites.block_question_2;
            yield;
            this.spriteToDraw = sprites.block_question_3;
            yield;
        }
    }

    Hit()
    {
        this.isBouncing = true;
        physics.RegisterToMovingObjectsArray(this);

        this.spriteToDraw = sprites.block_empty;

        setTimeout(this.Emptied, BLOCK_BOUNCING_SECONDS * 1000);

        if (this.containingItem == EContainingItemType.Coin)
        {
            game.statistics.IncrementCoin();
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
    }
}