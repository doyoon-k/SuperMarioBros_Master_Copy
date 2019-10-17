/*
  inactive_block.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang Arranged & Wrote all of the main properties and functions
  DoYoon Kim 
  SeungGeon Kim Wrote the mario's collision handling part
  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/

class InactiveBlock
{
    constructor(x, y, type)
    {
        this.x = x;
        this.y = y;
        this.type = type;  // EInactiveBlockType; See below

        this.zWeight = 0;

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
                    collider.isDuckJump = false;
                    
                    collider.isGravityAssigned = false;
                    collider.y = this.y - this.hitbox.height + collider.hitbox.y;

                    if (game.mario.isClimbing)
                        game.mario.isBottomReach = true;

                    collider.stompCombo = 0;
                    break;
                case DIRECTION.Down:
                    
                    collider.gravityAssigned = HexFloatToDec("1.0");
                    collider.isGravityAssigned = true;
                    collider.y = this.y + collider.hitbox.height;
                    collider.speedY = 0;
                    g_soundManager.Play("block_hit");
                    
                    break;
                case DIRECTION.Right:
                    collider.speedX = 0;
                    collider.x = (this.x) + ((this.hitbox.width / 2) + (collider.hitbox.width / 2)) - 16;
                    collider.isRubbingLeft = true;
                    break;
                case DIRECTION.Left:
                    collider.speedX = 0;
                    collider.x = (this.x) - ((this.hitbox.width / 2) + (collider.hitbox.width / 2)) - 16;
                    collider.isRubbingRight = true;
                    break;

            }
        }
        else if (collider instanceof BaseEnemy)
        {
            switch (direction)
            {
                case DIRECTION.Up:
                    if (collider.isInstaKilled)
                    {
                        return;
                    }
                    
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
                
                case DIRECTION.Right:
                case DIRECTION.Left:
                    collider.Destroy();
                    // particle here
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