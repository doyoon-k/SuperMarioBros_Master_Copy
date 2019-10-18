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
    constructor(x, y, parent=null)
    {
        this.x = x;
        this.y = y;
        this.parent = parent;

        this.zWeight = 0;

        this.flagOffset = 0;
        this.isDragging = false;

        this.flagDraggingStep = 2.5;
        this.maxFlagOffset = 8 * BLOCK_SIZE - BLOCK_SIZE * 1 / 3;
        this.hitbox = hitboxes.inactive_block;

        this.hasCollided = false;
    }

    Update()
    {
        if (this.parent)
        {
            return;
        }
        
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
        if (this.parent)
        {
            return;
        }
 
        for (let i = 0; i < 9; ++i)
        {
            DrawSprite(sprites.flagpole, this.x, this.y - i * BLOCK_SIZE);
        }
        DrawSprite(sprites.flagpole_head, this.x, this.y - 9 * BLOCK_SIZE);
        DrawSprite(sprites.flag, this.x - BLOCK_SIZE / 2, this.y - 8 * BLOCK_SIZE + this.flagOffset);
    }

    DragFlagDown()
    {
        g_soundManager.Play("flag_down");
        this.isDragging = true;
    }

    ScoreAccordingToHeight(marioY)
    {
        let yDifference = this.y - marioY;
        let score;

        if (yDifference <= BLOCK_SIZE)
        {
            score = SCORES.Flagpole[0];
        }
        else if (yDifference <= BLOCK_SIZE * 3)
        {
            score = SCORES.Flagpole[1];
        }
        else if (yDifference <= BLOCK_SIZE * 5)
        {
            score = SCORES.Flagpole[2];
        }
        else if (yDifference <= BLOCK_SIZE * 8)
        {
            score = SCORES.Flagpole[3];
        }
        else
        {
            score = SCORES.Flagpole[4];
        }
        
        game.statistics.AddScore(score);

        let particleFlagScore = new ParticleFlagScore(this.x + BLOCK_SIZE / 2, this.y, this.y - BLOCK_SIZE, score);
        game.gameObjects.push(particleFlagScore);
        game.Enroll(particleFlagScore);
    }

    Destroy()
    {
        game.Expel(this);
    }

    OnCollisionWith(collider, direction)
    {
        if (this.parent)
        {
            this.parent.OnCollisionWith(collider, direction);
            return;
        }

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