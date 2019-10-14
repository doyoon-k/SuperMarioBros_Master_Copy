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

const bucketMap_how_many_vertical_cell = 5;
const bucketMap_how_many_horizontal_cell = 70;
const bucketMap_one_cell_width = 3584 / 70;
const bucketMap_one_cell_height = 240 / 5;

class Physics
{
  constructor()
  {
    this.bucketMap = [];
    this.movingObjects = [];

    this.InitializeArrays();
  }

  InitializeArrays()
  {
    for (let row = 0; row < bucketMap_how_many_vertical_cell + 1; row++)
    {
      //push the row arrays
      this.bucketMap.push([]);
      for (let column = 0; column < bucketMap_how_many_horizontal_cell+1; column++)
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
      let objHitbox = obj.hitbox;
      //temporary
      // if(obj instanceof Mario)
      // objHitbox.DebugDraw(obj);

      let objHitbox_rect = objHitbox.GetRect(obj);
      let speedX = obj.speedX;
      let speedY = obj.speedY;
      let buckets = this.GetBucket(objHitbox_rect.left_X + speedX*1.2, objHitbox_rect.top_Y + speedY*1.2);
      buckets = buckets.concat(this.GetBucket(objHitbox_rect.right_X+speedX*1.2, objHitbox_rect.top_Y+speedY*1.2));
      buckets = buckets.concat(this.GetBucket(objHitbox_rect.left_X+speedX*1.2, objHitbox_rect.bottom_Y+speedY*1.2));
      buckets = buckets.concat(this.GetBucket(objHitbox_rect.right_X+speedX*1.2, objHitbox_rect.bottom_Y+speedY*1.2));

      if (obj instanceof Mario)
      {
        push();
        stroke(0, 255, 0);
        line(0, objHitbox_rect.bottom_Y*pixelMultiplier, width, objHitbox_rect.bottom_Y*pixelMultiplier);  
        pop();
      }

      let is_CollidedWithBlock = false;
      let is_OnBlockSurface = false;
      
      for (let collidableObj of buckets)
      {
        let collidableObjHitbox = collidableObj.hitbox;
        // //temporary
        // collidableObjHitbox.DebugDraw(collidableObj);
        let collidableObjHitbox_rect = collidableObjHitbox.GetRect(collidableObj);
        let is_top_Y_overlapping = collidableObjHitbox.IsYcoordInBetween(objHitbox_rect.top_Y, collidableObj);
        let is_bottom_Y_overlapping = collidableObjHitbox.IsYcoordInBetween(objHitbox_rect.bottom_Y, collidableObj);
        
        let willCollide = collidableObjHitbox.IsColliding(objHitbox_rect, speedX, speedY, collidableObj);

        if (is_CollidedWithBlock && collidableObj instanceof ActiveBlock)
          continue;
        //temporary

        if (willCollide)
        {
          // if (obj instanceof Mario && collidableObj instanceof InactiveBlock)
          //   print("!");
          if (collidableObj instanceof ActiveBlock || collidableObj instanceof InactiveBlock)
            is_CollidedWithBlock = true;
          
          if (speedX > 0 && speedY > 0) //1)
          {
            if (objHitbox_rect.bottom_Y <= collidableObjHitbox_rect.top_Y) //1) a)
            {
              collidableObj.OnCollisionWith(obj, DIRECTION.Up);
              if(collidableObj instanceof ActiveBlock || collidableObj instanceof InactiveBlock)
              is_OnBlockSurface = true;
              // if(obj instanceof Mario)
              // print("l-t-up");
            }
            else if (is_bottom_Y_overlapping || is_top_Y_overlapping) //1) b)
            {
              collidableObj.OnCollisionWith(obj, DIRECTION.Left);
              // if(obj instanceof Mario)
              // print("l-t-l");
            }
          }
          else if (speedX < 0 && speedY > 0)
          {
            if (objHitbox_rect.bottom_Y <= collidableObjHitbox_rect.top_Y) //2) a)
            {
              collidableObj.OnCollisionWith(obj, DIRECTION.Up);
              if(collidableObj instanceof ActiveBlock || collidableObj instanceof InactiveBlock)
              is_OnBlockSurface = true;
              // obj.OnCollisionWith(collidableObj, DIRECTION.Down);
              // if(obj instanceof Mario)
              // print("r-t-u");
            }
            else if (is_bottom_Y_overlapping || is_top_Y_overlapping) //2) b)
            {
              collidableObj.OnCollisionWith(obj, DIRECTION.Right);
              // if(obj instanceof Mario)
              // print("r-t-r");
            }
          }
          else if (speedX > 0 && speedY < 0)
          {
            if (objHitbox_rect.top_Y >= collidableObjHitbox_rect.bottom_Y)//3) a) 
            {
              collidableObj.OnCollisionWith(obj, DIRECTION.Down);
              // if(obj instanceof Mario && collidableObj instanceof ActiveBlock)
              // print("l-b-d");
            }
            else if (is_top_Y_overlapping || is_bottom_Y_overlapping)//3) b)
            {
              collidableObj.OnCollisionWith(obj, DIRECTION.Left);
              // if(obj instanceof Mario && collidableObj instanceof ActiveBlock)
              // print("l-b-l");
            }
          }
          else if (speedX < 0 && speedY < 0)
          {
            if (objHitbox_rect.top_Y >= collidableObjHitbox_rect.bottom_Y)//3) a) 
            {
              collidableObj.OnCollisionWith(obj, DIRECTION.Down);
              // if(obj instanceof Mario)
              // print("r-b-d");
            }
            else if (is_top_Y_overlapping || is_bottom_Y_overlapping)
            {
              collidableObj.OnCollisionWith(obj, DIRECTION.Right);
              // if(obj instanceof Mario)
              // print("r-b-r");
            }
          }
          else if (speedX == 0 && speedY < 0)
          {
            collidableObj.OnCollisionWith(obj, DIRECTION.Down);
          }
          else if (speedX == 0 && speedY > 0)
          {
            collidableObj.OnCollisionWith(obj, DIRECTION.Up);
            if(collidableObj instanceof ActiveBlock || collidableObj instanceof InactiveBlock)
              is_OnBlockSurface = true;
          }
          else if (speedX > 0 && speedY == 0)
          {    
            if (objHitbox_rect.bottom_Y < collidableObjHitbox_rect.bottom_Y)
            {
              collidableObj.OnCollisionWith(obj, DIRECTION.Up);
              if(collidableObj instanceof ActiveBlock || collidableObj instanceof InactiveBlock)
              is_OnBlockSurface = true;
            }
            else
            {
              collidableObj.OnCollisionWith(obj, DIRECTION.Left);
              if(collidableObj instanceof ActiveBlock || collidableObj instanceof InactiveBlock)
              is_OnBlockSurface = true;
            }
          }
          else if (speedX < 0 && speedY == 0)
          {
            if (objHitbox_rect.bottom_Y < collidableObjHitbox_rect.bottom_Y)
            {
              collidableObj.OnCollisionWith(obj, DIRECTION.Up);
              if(collidableObj instanceof ActiveBlock || collidableObj instanceof InactiveBlock)
              is_OnBlockSurface = true;
            }
            else
            {
              collidableObj.OnCollisionWith(obj, DIRECTION.Right);
              if(collidableObj instanceof ActiveBlock || collidableObj instanceof InactiveBlock)
              is_OnBlockSurface = true;
            }
            // print("surface_r");
          }
          else // speedX == 0 && speedY == 0 
          {
            if(collidableObj instanceof ActiveBlock || collidableObj instanceof InactiveBlock)
              is_OnBlockSurface = true;
            collidableObj.OnCollisionWith(obj, DIRECTION.Up);
          }
        }
        if (obj instanceof Mario && is_OnBlockSurface == false)
        {
          obj.isJumping = true;
          // print("B : "+collidableObj.x+","+collidableObj.y);
          // print("M : "+objHitbox_rect.left_X+","+objHitbox_rect.bottom_Y);
        }
        else if ((obj instanceof Goomba || obj instanceof Powerup) && is_OnBlockSurface == false)
        {
          obj.isOnGround = false;
        }
      }
    }
  }
  

  //calculate the bucketMap index by passed x,y coordinate and return a bucket at the index. 
  GetBucket(x, y)
  {
    let i = floor(x / bucketMap_one_cell_width);
    let j = floor(y / bucketMap_one_cell_height);
    i = clamp(i,0,bucketMap_how_many_horizontal_cell);
    j = clamp(j,0,bucketMap_how_many_vertical_cell);

    return this.bucketMap[j][i];
  }

  RegisterToBucketMap(object)
  {
    let object_hitbox_rect = object.hitbox.GetRect(object);
    // if (object instanceof Mario)
    // {
    //   text("l_x : "+object_hitbox_rect.left_X+ "r_x : "+object_hitbox_rect.right_X,width/2,height/2);  
    // }

    let i = floor(object_hitbox_rect.left_X / bucketMap_one_cell_width);
    let j = floor(object_hitbox_rect.top_Y / bucketMap_one_cell_height);
    i = clamp(i,0,bucketMap_how_many_horizontal_cell);
    j = clamp(j,0,bucketMap_how_many_vertical_cell);

    this.bucketMap[j][i].push(object);

    i = floor(object_hitbox_rect.left_X / bucketMap_one_cell_width);
    j = floor(object_hitbox_rect.bottom_Y / bucketMap_one_cell_height);
    i = clamp(i,0,bucketMap_how_many_horizontal_cell);
    j = clamp(j,0,bucketMap_how_many_vertical_cell);

    this.bucketMap[j][i].push(object);

    i = floor(object_hitbox_rect.right_X / bucketMap_one_cell_width);
    j = floor(object_hitbox_rect.top_Y / bucketMap_one_cell_height);
    i = clamp(i,0,bucketMap_how_many_horizontal_cell);
    j = clamp(j,0,bucketMap_how_many_vertical_cell);

    this.bucketMap[j][i].push(object);

    i = floor(object_hitbox_rect.right_X / bucketMap_one_cell_width);
    j = floor(object_hitbox_rect.bottom_Y / bucketMap_one_cell_height);
    i = clamp(i,0,bucketMap_how_many_horizontal_cell);
    j = clamp(j,0,bucketMap_how_many_vertical_cell);

    this.bucketMap[j][i].push(object);
  }

  RegisterToMovingObjectsArray(object)
  {
    this.movingObjects.push(object);
  }

  RemoveFromBucketMap(object)
  {
    let object_hitbox_rect = object.hitbox.GetRect(object);
    // if(object.prevX == undefined || object.prevY == undefined)
    // return;
    if (object instanceof ActiveBlock)
    {
      // print("ActiveBlock Removed From Bucket Map!");  
    }
    let i = floor(object_hitbox_rect.left_X / bucketMap_one_cell_width);
    let j = floor(object_hitbox_rect.top_Y / bucketMap_one_cell_height);
    i = clamp(i,0,bucketMap_how_many_horizontal_cell);
    j = clamp(j,0,bucketMap_how_many_vertical_cell);

    let bucket = this.bucketMap[j][i];
    if (bucket.indexOf(object) != -1)
    {
      bucket.splice(bucket.indexOf(object), 1);
    }

    i = floor(object_hitbox_rect.left_X / bucketMap_one_cell_width);
    j = floor(object_hitbox_rect.bottom_Y / bucketMap_one_cell_height);
    i = clamp(i,0,bucketMap_how_many_horizontal_cell);
    j = clamp(j,0,bucketMap_how_many_vertical_cell);

    bucket = this.bucketMap[j][i];
    if (bucket.indexOf(object) != -1)
    {
      bucket.splice(bucket.indexOf(object), 1);
    }

    i = floor(object_hitbox_rect.right_X / bucketMap_one_cell_width);
    j = floor(object_hitbox_rect.top_Y / bucketMap_one_cell_height);
    i = clamp(i,0,bucketMap_how_many_horizontal_cell);
    j = clamp(j,0,bucketMap_how_many_vertical_cell);

    bucket = this.bucketMap[j][i];
    if (bucket.indexOf(object) != -1)
    {
      bucket.splice(bucket.indexOf(object), 1);
    }

    i = floor(object_hitbox_rect.right_X / bucketMap_one_cell_width);
    j = floor(object_hitbox_rect.bottom_Y / bucketMap_one_cell_height);
    i = clamp(i,0,bucketMap_how_many_horizontal_cell);
    j = clamp(j,0,bucketMap_how_many_vertical_cell);

    bucket = this.bucketMap[j][i];
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
      // object.prevX = object.x;
      // object.prevy = object.y;
      this.RegisterToBucketMap(object);

      let nMario = 0;
      // for (let row = 0; row < bucketMap_how_many_vertical_cell + 1; row++)
      // {
      //   //push the row arrays
      //   for (let column = 0; column < bucketMap_how_many_horizontal_cell + 1; column++)
      //   {
      //     for (let x of this.bucketMap[row][column])
      //       if (x instanceof Mario)
      //       {
      //         nMario++;
      //         print("mario"+nMario+": ",x.speedY);
      //       }
      //   }
      // }
    }
  }

  BucketMapDebugDraw()
  {
    for(let i = 0; i<bucketMap_how_many_horizontal_cell; i++)
    {
      for(let j = 0; j<bucketMap_how_many_vertical_cell;j++)
      {
        push();
        stroke(0,255,0);
        line((bucketMap_one_cell_width*i-game.camera.x)*pixelMultiplier,0,(bucketMap_one_cell_width*i-game.camera.x)*pixelMultiplier,height);
        line(0,bucketMap_one_cell_height*j*pixelMultiplier,width,bucketMap_one_cell_height*j*pixelMultiplier);
        pop();
      }
    }
  }
}