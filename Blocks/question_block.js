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

        switch (this.containingItem)
        {
            case EContainingItemType.Coin:
                game.statistics.IncrementCoin();
                break;
            
            default:
                // spawn powerup
                break;
        }
        
        setTimeout(() => {physics.RemoveFromMovingObjectsArray(this); this.isBouncing = false;}, BLOCK_BOUNCING_SECONDS * 1000);
    }
    
    Update()
    {
        
    }
}