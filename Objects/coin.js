/*
  coin.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang Wrote all of this
  DoYoon Kim
  SeungGeon Kim 
  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/

class Coin
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;

        this.speedX = this.speedY = 0;  // ugly variables for collision checking

        this.animationFrameCount = 0;
        this.animationFrameRate = 10;

        this.spriteToDraw = sprites.coin_1;
    }

    *ChangeSprite()
    {
        while (true)
        {
            this.spriteToDraw = sprites.coin_1;
            yield;
            this.spriteToDraw = sprites.coin_1;
            yield;
            this.spriteToDraw = sprites.coin_2;
            yield;
            this.spriteToDraw = sprites.coin_3;
            yield;
        }
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

    Draw()
    {
        DrawSprite(this.x, this.y, this.spriteToDraw);
    }

    Destroy()
    {
        game.Expel(this);
    }

    OnCollisionWith(collider, direction)
    {
        if (collider instanceof Mario)
        {
            game.statistics.IncrementCoin();
            this.Destroy();
        }
        else if (collider instanceof ActiveBlock)
        {
            switch (direction)
            {
                case DIRECTION.Down:
                    game.statistics.IncrementCoin();
                    this.Destroy();
                    break;
            }
        }
    }
}