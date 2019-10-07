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
const bucketMap_one_cell_width = 3584 / 70;
const bucketMap_one_cell_height = 240 / 5;

class Physics
{
  constructor()
  {
    this.bucketMap = [];
    this.movingObjects = [];

    for (let row = 0; row < bucketMap_how_many_horizontal_cell + 1; row++)
    {
      //push the row arrays
      this.bucketMap.push([]);
      for (let column = 0; column < bucketMap_how_many_vertical_cell; column++)
      {
        //push the buckets in.
        this.bucketMap[row].push([]);
      }
    }
  }
  CheckCollision()
  {
    for (let obj of this.movingObjects)
    {
      //need to find a way how to get the colliding direction.
      let objHitbox = obj.hitbox;
      //temporary
      objHitbox.DebugDraw(obj);

      let objHitbox_rect = objHitbox.GetRect(obj);
      let speedX = obj.speedX;
      let speedY = obj.speedY;
      let buckets = this.GetBucket(objHitbox_rect.left_X, objHitbox_rect.top_Y);
      buckets.concat(this.GetBucket(objHitbox_rect.right_X, objHitbox_rect.top_Y));
      buckets.concat(this.GetBucket(objHitbox_rect.left_X, objHitbox_rect.bottom_Y ));
      buckets.concat(this.GetBucket(objHitbox_rect.right_X, objHitbox_rect.bottom_Y));
     
      for (let collidableObj of buckets)
      {
        let collidableObjHitbox = collidableObj.hitbox;
        //temporary
        collidableObjHitbox.DebugDraw(collidableObj);
        let collidableObjHitbox_rect = collidableObjHitbox.GetRect(collidableObj);
 
        let is_right_X_overlapping = collidableObjHitbox.IsXcoordInBetween(objHitbox_rect.right_X, collidableObj);
        let is_left_X_overlapping = collidableObjHitbox.IsXcoordInBetween(objHitbox_rect.left_X, collidableObj);
        let is_top_Y_overlapping = collidableObjHitbox.IsYcoordInBetween(objHitbox_rect.top_Y, collidableObj);
        let is_bottom_Y_overlapping = collidableObjHitbox.IsYcoordInBetween(objHitbox_rect.bottom_Y, collidableObj);

        let isColliding = collidableObjHitbox.IsHit(objHitbox_rect.left_X, objHitbox_rect.top_Y, collidableObj) ||
        collidableObjHitbox.IsHit(objHitbox_rect.left_X, objHitbox_rect.bottom_Y, collidableObj) ||
        collidableObjHitbox.IsHit(objHitbox_rect.right_X , objHitbox_rect.top_Y, collidableObj) ||
        collidableObjHitbox.IsHit(objHitbox_rect.right_X , objHitbox_rect.bottom_Y , collidableObj);
        
        //temporary
        if (collidableObj instanceof InactiveBlock)
          return;

        if (isColliding)
        {
          if (speedX > 0 && speedY > 0) //1)
          {
            if (objHitbox_rect.bottom_Y < collidableObjHitbox_rect.top_Y) //1) a)
            {
              // collidableObj.OnCollisionWith(obj, DIRECTION.Up);
              text("Up", 10, height - 30);
            }
            else if (is_bottom_Y_overlapping || is_top_Y_overlapping) //1) b)
            {
              // collidableObj.OnCollisionWith(obj, DIRECTION.Left);
              push();
              text("Left", 10, height - 30);
            }
          }
          else if (speedX <= 0 && speedY > 0)
          {
            if (objHitbox_rect.bottom_Y < collidableObjHitbox_rect.top_Y) //2) a)
            {
              // collidableObj.OnCollisionWith(obj, DIRECTION.Up);
              text("Up", 10, height - 30);
            }
            else if (is_bottom_Y_overlapping || is_top_Y_overlapping) //2) b)
            {
              // collidableObj.OnCollisionWith(obj, DIRECTION.Right);
              text("Right", 10, height - 30);
            }
          }
          else if (speedX > 0 && speedY <= 0)
          {
            if (objHitbox_rect.top_Y > collidableObjHitbox_rect.bottom_Y)//3) a) 
            {
              // collidableObj.OnCollisionWith(obj, DIRECTION.Down);    
              text("Down", 10, height - 30);
            }
            else if (is_top_Y_overlapping || is_bottom_Y_overlapping)//3) b)
            {
              // collidableObj.OnCollisionWith(obj, DIRECTION.Left);
              text("Left", 10, height - 30);
            }
          }
          else if (speedX <= 0 && speedY <= 0)
          {
            if (objHitbox_rect.top_Y > collidableObjHitbox_rect.bottom_Y)//3) a) 
            {
              // collidableObj.OnCollisionWith(obj, DIRECTION.Down);
              text("Down", 10, height - 30);
            }
            else if (is_top_Y_overlapping || is_bottom_Y_overlapping)
            {
              // collidableObj.OnCollisionWith(obj, DIRECTION.Right);
              text("Right", 10, height - 30);
            }
          }
        }
      }
    }
  }
  

  //calculate the bucketMap index by passed x,y coordinate and return a bucket at the index. 
  GetBucket(x, y)
  {
    let i = floor(x / bucketMap_one_cell_width);
    let j = floor(y / bucketMap_one_cell_height);
    return this.bucketMap[j][i];
  }

  RegisterToBucketMap(object)
  {
    let i = floor(object.x / bucketMap_one_cell_width);
    let j = floor(object.y / bucketMap_one_cell_height);
    this.bucketMap[j][i].push(object);
  }

  RegisterToMovingObjectsArray(object)
  {
    this.movingObjects.push(object);
  }

  RemoveFromBucketMap(object)
  {
    let i = floor(object.x / bucketMap_one_cell_width);
    let j = floor(object.y / bucketMap_one_cell_height);
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
      this.movingObjects.splice(this.movingObjects.indexOf(object), 1);
    }
  }

  Update()
  {
    for (let object of this.movingObjects)
    {
      this.RemoveFromBucketMap(object);
      this.RegisterToBucketMap(object);
    }
  }
}