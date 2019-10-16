/*
  active_block.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang Arranged & Wrote all of the main properties and functions
  DoYoon Kim 
  SeungGeon Kim Wrote the mario's collision handling part
  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/

class ActiveBlock
{
    constructor(x, y, containingItem)
    {
        this.x = x;
        this.y = y;
        this.originalY = y;
        this.containingItem = containingItem;  // EContainingItemType; See below

        this.hitbox = hitboxes.active_block;

        // If it is soft or not
        this.isBouncing = false;
        this.hasReachedMaxHeight = false;

        this.bouncingSpeed = HexFloatToDec("1.800");  // should be tested
        
        this.speedX = 0;  // only for collision detection, never get changed
        this.speedY = 0;  // while this can be changed when bouncing

        this.spriteToDraw = undefined;
    }

    Draw() {}

    Update()
    {
        if (this.y > this.originalY)  // putting this here since the block goes down by one pixel before recovering to normal
        {
            this.isBouncing = false;
            this.hasReachedMaxHeight = false;
            this.y = this.originalY;
            this.speedY = 0;

            this.BouncingEndCallBack();
        }

        if (this.isBouncing)
        {
            if (this.y <= this.originalY - BLOCK_SIZE / 2)
            {
                this.hasReachedMaxHeight = true;
            }
            this.speedY = this.bouncingSpeed * (this.hasReachedMaxHeight ? 1 : -1);
            this.y += this.speedY;
        }
    }

    BouncingEndCallBack() {}

    Emptied()
    {
        let newBlock = new InactiveBlock(this.x, this.y, EInactiveBlockType.Empty);
        game.gameObjects.push(newBlock);
        game.Enroll(newBlock);

        this.Destroy();
    }

    Hit() {}

    Destroy()
    {
        game.Expel(this);
    }

    OnCollisionWith(collider, direction)
    {
        // Links to Mario
        if (collider instanceof Mario)
        {
            switch (direction)
            {
                case DIRECTION.Down:
                
                    this.Hit();

                    if (this.isBouncing) {

                        collider.gravityAssigned = HexFloatToDec("0.9");
                        collider.isGravityAssigned = true;
                        collider.y = this.y + collider.hitbox.height;
                        collider.speedY = 0;

                    } else {

                        collider.gravityAssigned = HexFloatToDec("1.0");
                        collider.isGravityAssigned = true;
                        collider.y = this.y + collider.hitbox.height;
                        collider.speedY = 0;

                    }
            
                    break;
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
                    if (this.isBouncing)
                    {
                        collider.InstaKilled(this.x >= collider.x ? DIRECTION.Left : DIRECTION.Right);
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

                    if (collider.isBouncing)
                    {
                        collider.Bounce(collider.x >= collider.x ? DIRECTION.Left : DIRECTION.Right);
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
                
                default:
                    collider.Destroy();
                    // particle here
                    break;
            }
        }
    }
}


const EContainingItemType = {
    PowerUp : 0,  // Mushroom or Fire Flower
    OneUp : 1,
    Star : 2,
    Coin : 3,  // One coin for Question, Multiple coins for Brick
    None : 4  // Only for Brick
};