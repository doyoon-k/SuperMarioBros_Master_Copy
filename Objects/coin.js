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

        this.sprites = [sprites.coin_1, sprites.coin_1, sprites.coin_2, sprites.coin_3];
    }

    Draw()
    {
        DrawSprite(this.x, this.y, this.sprites[game.twinkleIndex]);
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