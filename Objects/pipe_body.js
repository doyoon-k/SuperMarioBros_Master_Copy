/*
  pipe_body.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang Wrote all of this
  DoYoon Kim
  SeungGeon Kim 
  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/

class PipeBody
{
    constructor(x, y, isHorizontal)
    {
        this.x = x;
        this.y = y;
        this.isHorizontal = isHorizontal;

        this.spriteToDraw = isHorizontal ? sprites.pipe_body_hor : sprites.pipe_body_ver;

        this.hitbox = isHorizontal ? hitboxes.pipe_horizontal : hitboxes.pipe_vertical;
    }

    Update() {}

    Draw()
    {
        DrawSprite(this.spriteToDraw, this.x, this.y);
    }

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
                    collider.isDuckJump = false;
                    
                    collider.isGravityAssigned = false;
                    collider.y = this.y - this.hitbox.height + collider.hitbox.y;
                    break;

                case DIRECTION.Right:
                    collider.speedX = 0;
                    collider.x = (this.x) + ((this.hitbox.width / 2) + (collider.hitbox.width / 2)) - BLOCK_SIZE;
                    collider.isRubbingLeft = true;
                    break;

                case DIRECTION.Left:
                    collider.speedX = 0;
                    collider.x = (this.x) - ((this.hitbox.width / 2) + (collider.hitbox.width / 2)) - BLOCK_SIZE;
                    collider.isRubbingRight = true;
                    break;
            }
        }
        else if (collider instanceof BaseEnemy)
        {
            switch (direction)
            {
                case DIRECTION.Up:
                    collider.isOnGround = true;
                    collider.y = this.y - this.hitbox.height - collider.hitbox.y;
                    break;

                case DIRECTION.Right:
                    collider.isGoingLeft = false;
                    collider.x = this.x + this.hitbox.width / 2 + collider.hitbox.width / 2;
                    break;

                case DIRECTION.Left:
                    collider.isGoingLeft = true;
                    collider.x = this.x - this.hitbox.width / 2 - collider.hitbox.width / 2;
                    break;
            }
        }
        else if (collider instanceof Powerup)
        {
            switch (direction)
            {
                case DIRECTION.Up:
                    if (collider.type == EPowerupType.Star)
                    {
                        collider.Soar();
                        return;
                    }
                    
                    collider.isOnGround = true;
                    collider.y = this.y - this.hitbox.height - collider.hitbox.y;
                    collider.isBouncing = false;
                    break;
                
                case DIRECTION.Right:
                    collider.isGoingLeft = false;
                    collider.x = this.x + this.hitbox.width / 2 + collider.hitbox.width / 2;
                    break;

                case DIRECTION.Left:
                    collider.isGoingLeft = true;
                    collider.x = this.x - this.hitbox.width / 2 - collider.hitbox.width / 2;
                    break;
            }
        }
    }
}