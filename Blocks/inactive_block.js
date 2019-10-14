/*
  inactive_block.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang Wrote all of this
  DoYoon Kim 
  SeungGeon Kim 
  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/

class InactiveBlock
{
    constructor(x, y, type)
    {
        this.x = x;
        this.y = y;
        this.type = type;  // EInactiveBlockType; See below
        this.hitbox = hitboxes.inactive_block;

        this.spriteToDraw = undefined;
        switch (this.type)
        {
            case EInactiveBlockType.Ground:
                this.spriteToDraw = sprites["block_ground" + (game.IsUnderground() ? "_underground" : "")];
                break;

            case EInactiveBlockType.Hard:
                this.spriteToDraw = sprites["block_hard" + (game.IsUnderground() ? "_underground" : "")];
                break;

            case EInactiveBlockType.Empty:
                this.spriteToDraw = sprites["block_empty" + (game.IsUnderground() ? "_underground" : "")];
                break;
        }
    }

    Draw()
    {
        DrawSprite(this.spriteToDraw, this.x, this.y);
    }

    Update() {}

    Destroy()
    {
        game.Expel(this);
    }

    OnCollisionWith(collider, direction)
    {
        if (collider instanceof Mario)
        {
            switch (direction)
            {
                case DIRECTION.Up:
                    collider.speedY = 0;
                    collider.isJumping = false;
                    collider.y = this.y - this.hitbox.height;
                    break;
                case DIRECTION.Down:
                    collider.speedY = 0;
                    collider.y = this.y + collider.hitbox.height;

                    game.soundManager.Play("block_hit");
                    break;
                case DIRECTION.Right:
                    collider.speedX = 0;
                    collider.x = this.x;
                    break;
                case DIRECTION.Left:
                    collider.speedX = 0;
                    collider.x = this.x - this.hitbox.width-collider.hitbox.width*1.5;
                    break;

            }
        }
        else if (collider instanceof BaseEnemy || collider instanceof Powerup)
        {
            switch (direction)
            {
                case DIRECTION.Up:
                        collider.isOnGround = true;
                        collider.y = this.y - this.hitbox.height - collider.hitbox.y;

                    break;
                case DIRECTION.Down:

                    break;
                case DIRECTION.Right:

                    break;
                case DIRECTION.Left:

                    break;

            }
        }

    }
}


const EInactiveBlockType = {
    Ground : 0,
    Hard : 1,
    Empty : 2
};