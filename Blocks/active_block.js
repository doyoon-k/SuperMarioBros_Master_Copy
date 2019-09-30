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
    }

    Draw()
    {

    }

    Update()
    {
        
    }

    Awake()
    {
        objectsToUpdate.push(this);
    }

    Destroy()
    {
        objectsToUpdate.splice(objectsToUpdate.indexOf(this), 1);
    }

    Hit()
    {
        physics.movingObjects.push(this);
        setTimeout(() => physics.movingObjects.splice(physics.movingObjects.indexOf(this), 1), BLOCK_BOUNCING_SECONDS * 1000);
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