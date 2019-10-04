/*
  goomba.js
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
    constructor(x, y, isQuestion, containingItem)
    {
        this.x = x;
        this.y = y;
        this.isQuestion = isQuestion;  // else Brick
        this.containingItem = containingItem;  // EContainingItemType; See below

        this.isBouncing = false;
        
        this.speedX = this.speedY = 0;  // very ugly variables for collision detection, never get changed
    }

    Draw()
    {

    }

    Update()
    {
        
    }

    Destroy()
    {
        game.Expel(this);
    }

    Hit()
    {
        this.isBouncing = true;
        physics.RegisterToMovingObjectsArray(this);
        setTimeout(() => {physics.RemoveFromMovingObjectsArray(this); this.isBouncing = false;}, BLOCK_BOUNCING_SECONDS * 1000);
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