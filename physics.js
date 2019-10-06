/*
  physics.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang did ---
  DoYoon Kim wrote this file.
  SeungGeon Kim did ---
  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/

const bucketMap_how_many_vertical_cell = 70;
const bucketMap_how_many_horizontal_cell = 5;
const bucketMap_one_cell_width = 3584/70;
const bucketMap_one_cell_height = 240/5;

class Physics {
    constructor() {
        this.bucketMap = [];
        this.movingObjects = [];

        for(let row = 0; row<bucketMap_how_many_horizontal_cell+1;row++)
        {
          //push the row arrays
          this.bucketMap.push([]);
          for(let column = 0;column<bucketMap_how_many_vertical_cell;column++)
          {
            //push the buckets in.
            this.bucketMap[row].push([]);
          }
        }
    }
    CheckCollision()
    {
      for(let obj of this.movingObjects)
      {
         if(obj instanceof ActiveBlock)
         {
           let left_X = obj.x-BLOCK_SIZE/2;
           let right_X = obj.x+BLOCK_SIZE/2;
           let top_Y = obj.y-BLOCK_SIZE;
           let speedY = obj.speedY;
           //going down
           let buckets = this.GetBucket(left_X,top_Y+speedY);
           buckets.concat(this.GetBucket(right_X,top_Y+speedY));

           for(let collidableObj of buckets)
           {
             if(collidableObj.hitbox != undefined)
             {
               let isColliding = collidableObj.hitbox.IsHit(left_X,top_Y+speedY,collidableObj)||
                                 collidableObj.hitbox.IsHit(right_X,top_Y+speedY,collidableObj);
               if(isColliding)
               {
                 collidableObj.OnCollisionWith(obj,DIRECTION.Down);
               }
             }
           }
         }
         else
         {
            //need to find a way how to get the colliding direction.
         }
      }
    }

    //calculate the bucketMap index by passed x,y coordinate and return a bucket at the index. 
    GetBucket(x,y)
    {
      let i = floor(x/bucketMap_one_cell_width);
      let j = floor(y/bucketMap_one_cell_height);
      return this.bucketMap[j][i];
    }

    RegisterToBucketMap(object)
    {
      let i = floor(object.x/bucketMap_one_cell_width);
      let j = floor(object.y/bucketMap_one_cell_height);
      this.bucketMap[j][i].push(object);
    }

    RegisterToMovingObjectsArray(object)
    {
      this.movingObjects.push(object);
    }

    RemoveFromBucketMap(object)
    {
      let i = floor(object.x/bucketMap_one_cell_width);
      let j = floor(object.y/bucketMap_one_cell_height);
      let bucket = this.bucketMap[j][i];
      if (bucket.indexOf(object) != -1)
      {
        bucket.splice(bucket.indexOf(object), 1);
      }
    }

    RemoveFromMovingObjectsArray(object)
    {
      if (this.movingObjects.indexOf(object) != -1)
      {
        this.movingObjects.splice(this.movingObjects.indexOf(object),1);
      }
    }

    Update()
    {
      for(let object of this.movingObjects)
      {
        this.RemoveFromBucketMap(object);
        this.RegisterToBucketMap(object);
      }
    }
}