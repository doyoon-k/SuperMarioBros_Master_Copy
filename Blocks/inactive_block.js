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
    }

    Draw()
    {
        switch (this.type)
        {
            case EInactiveBlockType.Ground:
                DrawSprite(sprites.block_ground, this.x, this.y);
                break;
            case EInactiveBlockType.Hard:
                DrawSprite(sprites.block_hard, this.x, this.y);
                break;
            case EInactiveBlockType.Empty:
                DrawSprite(sprites.block_empty, this.x, this.y);
                break;
        }
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
                    if (collider instanceof Goomba)
                    {
                        text("굼바가 벽돌 위에 충돌",width/2,height/2);    
                    }
                    collider.speedY = -HexFloatToDec("0.900");
                    collider.y = this.y - this.hitbox.height -collider.hitbox.y-1;
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