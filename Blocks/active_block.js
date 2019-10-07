/*
  active_block.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang Wrote all of this
  DoYoon Kim 
  SeungGeon Kim 
  
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

        this.isBouncing = false;
        this.hasReachedMaxHeight = false;

        this.bouncingSpeed = HexFloatToDec("1.000");  // should be tested
        
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
        if (collider instanceof Mario)
        {
            switch (direction)
            {
                case DIRECTION.Down:
                    this.Hit();
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