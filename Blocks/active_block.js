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
        this.containingItem = containingItem;  // EContainingItemType; See below

        this.isBouncing = false;
        
        this.speedX = 0;  // only for collision detection, never get changed
        this.speedY = 0;  // while this can be changed, when bouncing

        this.spriteToDraw = undefined;
    }

    Draw() {}

    Update() {}

    Destroy()
    {
        let newBlock = new InactiveBlock(this.x, this.y, EInactiveBlockType.Empty);
        game.gameObjects.push(newBlock);
        game.Enroll(newBlock);
        game.Expel(this);
    }

    OnCollisionWith(collider, direction)
    {
        if (collider instanceof Mario)
        {
            switch (direction)
            {
                case "DOWN":
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