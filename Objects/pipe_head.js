/*
  pipe_head.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang Wrote all of this
  DoYoon Kim
  SeungGeon Kim 
  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/

class PipeHead
{
    constructor(x, y, isHorizontal, containingMap=null)
    {
        this.x = x;
        this.y = y;
        this.isHorizontal = isHorizontal;
        this.containingMap = containingMap;

        this.zWeight = 0;

        this.spriteToDraw = (isHorizontal ? sprites.pipe_head_hor : sprites.pipe_head_ver) + (game.isUnderground ? "_underground" : "");

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
                    collider.y = this.y - this.hitbox.height - collider.hitbox.y;
                    
                    collider.stompCombo = 0;
                    break;

                case DIRECTION.Right:
                    collider.speedX = 0;
                    collider.x = (this.x) + ((this.hitbox.width / 2) + (collider.hitbox.width / 2)) - BLOCK_SIZE;
                    collider.isRubbingLeft = true;
                    break;
                    
                case DIRECTION.Left:
                    if (this.containingMap)
                    collider.isPipeRight = true;
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
        else if (collider instanceof Fireball)
        {
            switch (direction)
            {
                case DIRECTION.Up:
                    collider.Bounce();
                    break;
                
                case DIRECTION.RIGHT:
                case DIRECTION.Left:
                    collider.Destroy();
                    // particle here
                    break;
            }
        }
    }
}