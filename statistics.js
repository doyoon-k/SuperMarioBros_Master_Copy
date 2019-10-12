/*
  statistics.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang Wrote all of this
  DoYoon Kim 
  SeungGeon Kim 
  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/

class Statistics
{
    constructor()
    {
        this.isPlayerMario = true;
        this.score = 0;
        this.coin = 0;
        this.world = 1; // this will never be changed since we're doing only 1-1 and (possibly) 1-2.
        this.level = 1;
        this.time = LEVEL_SECONDS * 60; // Note that it's not TIME, it's in seconds * 60
        /*************CONVERSION TABLE***********
         * 1 TIME == 0.4 second == 24 this.time *
         * 1 second == 2.5 TIME == 60 this.time *
         ****************************************/

        this.isUnderground = false;  // we should get this value somewhere outside of this class in the future, it's temporary
        this.doTickTime = true;

        this.sprites = {
            coin_1 : loadImage("Sprites/Misc/misc_hud_coin_1.png"),
            coin_2 : loadImage("Sprites/Misc/misc_hud_coin_2.png"),
            coin_3 : loadImage("Sprites/Misc/misc_hud_coin_3.png"),

            coin_underground_1 : loadImage("Sprites/Misc/misc_hud_coin_underground_1.png"),
            coin_underground_2 : loadImage("Sprites/Misc/misc_hud_coin_underground_2.png"),
            coin_underground_3 : loadImage("Sprites/Misc/misc_hud_coin_underground_3.png"),
        };

        this.coinSprites = [this.sprites.coin_1, this.sprites.coin_1, this.sprites.coin_2, this.sprites.coin_3];
    }

    AddScore(amount)
    {
        if (amount == "1UP")
        {
            // 1-up
            return;
        }
        
        this.score += amount;
    }

    IncrementCoin()
    {
        this.coin++;
        if (this.coin == 100)
        {
            this.coin = 0;
            // 1-up
        }
    }

    Update()
    {
        this.TickTime();
    }

    TickTime()
    {
        if (this.doTickTime)
        {
            this.time--;
            
            if (this.time == 2400)
            {
                // call something that TIME left is 100
            }
            else if (this.time == 0)
            {
                this.doTickTime = false;
                // call something that time is over
            }
        }
    }

    DrawStatistics()
    {
        DrawText(this.isPlayerMario ? "MARIO" : "LUIGI", 24, 24, 8);
        DrawText(this.score.toString().padStart(6, '0'), 24, 32, 8);

        if (game.interfaceFlow.flowState < 4) {
            image(this.coinSprites[game.twinkleIndex], 88 * pixelMultiplier, 24 * pixelMultiplier, 8 * pixelMultiplier, 8 * pixelMultiplier);
        } else {
            image(this.sprites.coin_underground_1, 88 * pixelMultiplier, 24 * pixelMultiplier, 8 * pixelMultiplier, 8 * pixelMultiplier);
        }
        DrawText("*" + this.coin.toString().padStart(2, '0'), 96, 32, 8);

        DrawText("WORLD", 144, 24, 8);
        DrawText(this.world + "-" + this.level, 152, 32, 8);
        
        DrawText("TIME", 200, 24, 8);
        if (!isNaN(this.time))
        {
            DrawText(Math.floor(this.time / 24).toString().padStart(3, '0'), 208, 32, 8);
        }
    }
}