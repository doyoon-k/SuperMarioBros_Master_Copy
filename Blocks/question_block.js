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

        this.sprites = [sprites.block_question_1, sprites.block_question_1, sprites.block_question_2, sprites.block_question_3];
        this.spriteToDraw = undefined;
    }

    Draw()
    {
        DrawSprite(this.spriteToDraw ? this.spriteToDraw : this.sprites[game.twinkleIndex], this.x, this.y);
    }

    Hit()
    {
        this.isBouncing = true;
        game.physics.RegisterToMovingObjectsArray(this);

        this.spriteToDraw = sprites.block_empty;

        if (this.containingItem == EContainingItemType.Coin)
        {
            game.statistics.IncrementCoin();
            game.statistics.AddScore(SCORES.Coin);

            this.BouncingEndCallBack = this.Emptied;
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
            newPowerup = new Powerup(this.x, this.y - BLOCK_SIZE / 2, powerUpType);
            game.gameObjects.push(newPowerup);
            game.Enroll(newPowerup);

            this.Emptied();
        };
    }
}