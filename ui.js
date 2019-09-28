/*
  ui.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang Wrote all of this
  DoYoon Kim 
  SeungGeon Kim 
  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/

class UI
{
    constructor()
    {
        this.isPlayerMario = true;
        this.score = 0;
        this.coin = 0;
        this.world = 1; // this will never be changed since we're doing only 1-1 and (possibly) 1-2.
        this.level = 1;
        this.time = NaN;

        this.sprites = {
            coin_1 : loadImage("Sprites/Misc/misc_hud_coin_1.png"),
            coin_2 : loadImage("Sprites/Misc/misc_hud_coin_2.png"),
            coin_3 : loadImage("Sprites/Misc/misc_hud_coin_3.png"),

            coin_underground_1 : loadImage("Sprites/Misc/misc_hud_coin_underground_1.png"),
            coin_underground_2 : loadImage("Sprites/Misc/misc_hud_coin_underground_2.png"),
            coin_underground_3 : loadImage("Sprites/Misc/misc_hud_coin_underground_3.png"),
        };

        this.coinSpriteToDraw = this.sprites.coin_1;
        this.frameCount = 0;
        this.animationFrameRate = 12;
        this.animator = this.ChangeSprite();

        this.isUnderground = false;
    }

    Update()
    {
        this.Animate();
        this.Draw();
    }

    Draw()
    {
        DrawText(this.isPlayerMario ? "MARIO" : "LUIGI", 24, 24, 8);
        DrawText(this.score.toString().padStart(6, '0'), 24, 32, 8);

        DrawSprite(this.coinSpriteToDraw, 88, 24 + 1);
        DrawText("*" + this.coin.toString().padStart(2, '0'), 96, 32, 8);

        DrawText("WORLD", 144, 24, 8);
        DrawText(this.world + "-" + this.level, 152, 32, 8);
        
        DrawText("TIME", 200, 24, 8);
        if (this.time)
        {
            DrawText(this.time.toString().padStart(3, '0'), 208, 32, 8);
        }
    }

    *ChangeSprite()
    {
        while (true)
        {
            this.coinSpriteToDraw = this.sprites["coin" + (this.isUnderground ? "_underground_" : "_") + "1"];
            yield;
            this.coinSpriteToDraw = this.sprites["coin" + (this.isUnderground ? "_underground_" : "_") + "1"];
            yield;
            this.coinSpriteToDraw = this.sprites["coin" + (this.isUnderground ? "_underground_" : "_") + "2"];
            yield;
            this.coinSpriteToDraw = this.sprites["coin" + (this.isUnderground ? "_underground_" : "_") + "3"];
            yield;
        }
    }

    Animate()
    {
        if (this.animationFrameRate < this.frameCount)
        {
            this.frameCount = 0;
            this.animator.next();
        }
        else {
            this.frameCount++;
        }
    }
}