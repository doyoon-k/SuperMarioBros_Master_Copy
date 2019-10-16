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

        this.zWeight = 0;

        this.hitbox = hitboxes.powerup;

        this.sprites = [sprites.coin_1, sprites.coin_1, sprites.coin_2, sprites.coin_3];
        this.undergroundSprites = [sprites.coin_underground_1, sprites.coin_underground_2, sprites.coin_underground_3];
    }

    Draw()
    {
        DrawSprite(this.x, this.y, game.IsUnderground() ? this.undergroundSprites[game.twinkleIndex] : this.sprites[game.twinkleIndex]);
    }

    Destroy()
    {
        game.statistics.IncrementCoin();
        game.statistics.AddScore(SCORES.Coin);
        game.soundManager.Play("coin");
        game.Expel(this);
    }

    OnCollisionWith(collider, direction)
    {
        if (collider instanceof Mario)
        {
            this.Destroy();
        }
        else if (collider instanceof ActiveBlock)
        {
            switch (direction)
            {
                case DIRECTION.Down:
                    this.Destroy();
                    break;
            }
        }
    }
}