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
        this.isQuestion = isQuestion;
        this.containingItem = containingItem;  // EContainingItemType

        objectsToUpdate.push(this);
    }

    Draw()
    {

    }

    Update()
    {
        this.Draw();
    }

    Destroy()
    {
        objectsToUpdate.splice(objectsToUpdate.indexOf(this), 1);
    }

    OnHit()
    {
        physics.movingObjects.push(this);
        setTimeout(() => physics.movingObjects.splice(physics.movingObjects.indexOf(this), 1), 0.2 * 1000);
    }

    OnCollisionWith(collider, direction)
    {
        switch (typeof collider)
        {
            case Mario:
                if (direction == "DOWN")
                {
                    this.OnHit();
                }
        }
    }
}


const EContainingItemType = {
    PowerUp : 0,  // Mushroom or Fire Flower
    OneUp : 1,
    Star : 2,
    Coin : 3
};