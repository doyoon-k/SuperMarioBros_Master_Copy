/*
  flagpole.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang Wrote all of this
  DoYoon Kim
  SeungGeon Kim 
  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/

class Flagpole
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;

        this.zWeight = 0;

        this.flagOffset = 0;
        this.isDragging = false;

        this.flagDraggingStep = 2.5;
        this.maxFlagOffset = 8 * BLOCK_SIZE - BLOCK_SIZE * 1 / 3;

        this.hitbox = hitboxes.flagpole;

        this.hasCollided = false;
    }

    Update()
    {
        if (this.isDragging)
        {
            this.flagOffset += this.flagDraggingStep;

            if (this.flagOffset > this.maxFlagOffset)
            {
                this.flagOffset = this.maxFlagOffset;
                this.isDragging = false;
                game.OnFlagDragEnd();
            }
        }
    }

    Draw()
    {
        for (let i = 0; i < 9; ++i)
        {
            DrawSprite(sprites.flagpole, this.x, this.y - i * BLOCK_SIZE);
        }
        DrawSprite(sprites.flagpole_head, this.x, this.y - 9 * BLOCK_SIZE);
        DrawSprite(sprites.flag, this.x - BLOCK_SIZE / 2, this.y - 8 * BLOCK_SIZE + this.flagOffset);
    }

    DragFlagDown()
    {
        game.soundManager.Play("flag_down");
        this.isDragging = true;
    }

    ScoreAccordingToHeight(marioY)
    {
        let yDifference = this.y - marioY;
        if (yDifference < BLOCK_SIZE)
        {
            game.statistics.AddScore(SCORES.Flagpole[0], true);
        }
        else if (yDifference < BLOCK_SIZE * 3)
        {
            game.statistics.AddScore(SCORES.Flagpole[1], true);
        }
        else if (yDifference < BLOCK_SIZE * 5)
        {
            game.statistics.AddScore(SCORES.Flagpole[2], true);
        }
        else if (yDifference < BLOCK_SIZE * 8)
        {
            game.statistics.AddScore(SCORES.Flagpole[3], true);
        }
        else
        {
            game.statistics.AddScore(SCORES.Flagpole[4], true);
        }
    }

    Destroy()
    {
        game.Expel(this);
    }

    OnCollisionWith(collider, direction)
    {
        if (collider instanceof Mario)
        {
            if (this.hasCollided)
            {
                return;
            }

            this.hasCollided = true;
            game.LevelClear();
            if (!collider.isEndGame)
            {
                collider.x = this.x - 16;
            }
            this.ScoreAccordingToHeight(collider.y);
            this.DragFlagDown();
        }
    }
}