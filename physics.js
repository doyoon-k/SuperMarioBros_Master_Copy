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
    // let tempMovingObjectsContainer = [];
    for (let obj of this.movingObjects)
    {
      let objHitbox = obj.hitbox;
      //temporary
      if(obj instanceof Mario)
      objHitbox.DebugDraw(obj);

      let objHitbox_rect = objHitbox.GetRect(obj);
      let speedX = obj.speedX;
      let speedY = obj.speedY;
      let buckets = this.GetBucket(objHitbox_rect.left_X + speedX*1.2, objHitbox_rect.top_Y + speedY*1.2);
      buckets = buckets.concat(this.GetBucket(objHitbox_rect.right_X+speedX*1.2, objHitbox_rect.top_Y+speedY*1.2));
      buckets = buckets.concat(this.GetBucket(objHitbox_rect.left_X+speedX*1.2, objHitbox_rect.bottom_Y+speedY*1.2));
      buckets = buckets.concat(this.GetBucket(objHitbox_rect.right_X+speedX*1.2, objHitbox_rect.bottom_Y+speedY*1.2));

      let is_CollidedWithBlock = false;
      let is_OnSurface = false;
      let isMarioRubbingRight = false;
      let isMarioRubbingLeft = false;
      
      for (let collidableObj of buckets)
      {
        let collidableObjHitbox = collidableObj.hitbox;
        // //temporary
        if(collidableObj instanceof PipeBody || collidableObj instanceof PipeHead)
          collidableObjHitbox.DebugDraw(collidableObj);

        let collidableObjHitbox_rect = collidableObjHitbox.GetRect(collidableObj);
        let is_top_Y_overlapping = collidableObjHitbox.IsYcoordInBetween(objHitbox_rect.top_Y + 1, collidableObj);
        let is_bottom_Y_overlapping = collidableObjHitbox.IsYcoordInBetween(objHitbox_rect.bottom_Y - 1, collidableObj);
        
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
              // obj.OnCollisionWith(collidableObj, DIRECTION.Down);
              if (collidableObj instanceof ActiveBlock || collidableObj instanceof InactiveBlock
                  || collidableObj instanceof PipeHead || collidableObj instanceof PipeBody)
              {
                is_OnSurface = true;
              }
              // print("!");
              // if(obj instanceof Mario)
              // print("l-t-up");
            }
            else if (is_bottom_Y_overlapping || is_top_Y_overlapping) //1) b)
            {
              collidableObj.OnCollisionWith(obj, DIRECTION.Left);
              // obj.OnCollisionWith(collidableObj, DIRECTION.Right);
              // if(obj instanceof Mario)
              // print("l-t-l");
            }
          }
          else if (speedX < 0 && speedY > 0)
          {
            if (objHitbox_rect.bottom_Y <= collidableObjHitbox_rect.top_Y) //2) a)
            {
              collidableObj.OnCollisionWith(obj, DIRECTION.Up);
              // obj.OnCollisionWith(collidableObj, DIRECTION.Down);
              if (collidableObj instanceof ActiveBlock || collidableObj instanceof InactiveBlock
                || collidableObj instanceof PipeHead || collidableObj instanceof PipeBody)
                 is_OnSurface = true;
              // obj.OnCollisionWith(collidableObj, DIRECTION.Down);
              // if(obj instanceof Mario)
              // print("r-t-u");
            }
            else if (is_bottom_Y_overlapping || is_top_Y_overlapping) //2) b)
            {
              collidableObj.OnCollisionWith(obj, DIRECTION.Right);
              // obj.OnCollisionWith(collidableObj, DIRECTION.Left);
              // if(obj instanceof Mario)
              // print("r-t-r");
            }
          }
          else if (speedX > 0 && speedY < 0)
          {
            if (objHitbox_rect.top_Y > collidableObjHitbox_rect.bottom_Y)//3) a) 
            {
              collidableObj.OnCollisionWith(obj, DIRECTION.Down);
              // obj.OnCollisionWith(collidableObj, DIRECTION.Up);
              // if(obj instanceof Mario && collidableObj instanceof ActiveBlock)
              // print("l-b-d");
            }
            else if (is_top_Y_overlapping || is_bottom_Y_overlapping)//3) b)
            {
              collidableObj.OnCollisionWith(obj, DIRECTION.Left);
              // obj.OnCollisionWith(collidableObj, DIRECTION.Right);
              // if(obj instanceof Mario && collidableObj instanceof ActiveBlock)
              // print("l-b-l");
            }
          }
          else if (speedX < 0 && speedY < 0)
          {
            if (objHitbox_rect.top_Y > collidableObjHitbox_rect.bottom_Y)//3) a) 
            {
              collidableObj.OnCollisionWith(obj, DIRECTION.Down);
              print(collidableObjHitbox_rect.right_X+","+objHitbox_rect.left_X);
              // obj.OnCollisionWith(collidableObj, DIRECTION.Up);
              // if(obj instanceof Mario)
              // print("r-b-d");
            }
            else if (is_top_Y_overlapping || is_bottom_Y_overlapping)
            {
              collidableObj.OnCollisionWith(obj, DIRECTION.Right);
              // obj.OnCollisionWith(collidableObj, DIRECTION.Left);
              // if(obj instanceof Mario)
              // print("r-b-r");
            }
          }
          else if (speedX == 0 && speedY < 0)
          {
            // print("!");
            collidableObj.OnCollisionWith(obj, DIRECTION.Down);
            // obj.OnCollisionWith(collidableObj, DIRECTION.Up);
          }
          else if (speedX == 0 && speedY > 0)
          {
            // print("!");
            collidableObj.OnCollisionWith(obj, DIRECTION.Up);
            // obj.OnCollisionWith(collidableObj, DIRECTION.Down);
            if (collidableObj instanceof ActiveBlock || collidableObj instanceof InactiveBlock
              || collidableObj instanceof PipeHead || collidableObj instanceof PipeBody)
            is_OnSurface = true;
          }
          else if (speedX > 0 && speedY == 0)
          {
            if (objHitbox_rect.bottom_Y < collidableObjHitbox_rect.bottom_Y)
            {
              // print("?");
              collidableObj.OnCollisionWith(obj, DIRECTION.Up);
              // obj.OnCollisionWith(collidableObj, DIRECTION.Down);
              if (collidableObj instanceof ActiveBlock || collidableObj instanceof InactiveBlock
                || collidableObj instanceof PipeHead || collidableObj instanceof PipeBody)
              is_OnSurface = true;
            }
            else
            {
              collidableObj.OnCollisionWith(obj, DIRECTION.Left);
              // obj.OnCollisionWith(collidiableObj, DIRECTION.Right);
              // if (collidableObj instanceof ActiveBlock || collidableObj instanceof InactiveBlock)
              //   is_OnBlockSurface = true;
            }
          }
          else if (speedX < 0 && speedY == 0)
          {
            if (objHitbox_rect.bottom_Y < collidableObjHitbox_rect.bottom_Y)
            {
              collidableObj.OnCollisionWith(obj, DIRECTION.Up);
              // obj.OnCollisionWith(collidableObj, DIRECTION.Down);
              if (collidableObj instanceof ActiveBlock || collidableObj instanceof InactiveBlock
                || collidableObj instanceof PipeHead || collidableObj instanceof PipeBody)
              is_OnSurface = true;
            }
            else
            {
              collidableObj.OnCollisionWith(obj, DIRECTION.Right);
              // obj.OnCollisionWith(collidableObj, DIRECTION.Left);
              // if (collidableObj instanceof ActiveBlock || collidableObj instanceof InactiveBlock)
              //   is_OnBlockSurface = tradkue;
            }
            // print("surface_r");
          }
          else // speedX == 0 && speedY == 0 
          {
            if (collidableObj instanceof ActiveBlock || collidableObj instanceof InactiveBlock
              || collidableObj instanceof PipeHead || collidableObj instanceof PipeBody)
            {
              if(objHitbox_rect.bottom_Y < collidableObjHitbox_rect.bottom_Y)
              {
                is_OnSurface = true;
                collidableObj.OnCollisionWith(obj, DIRECTION.Up);
              }
            }
            // obj.OnCollisionWith(collidableObj, DIRECTION.Down);
          }
  
          // if (this.movingObjects.indexOf(collidableObj) != -1)
          // {
          //   this.movingObjects.splice(this.movingObjects.indexOf(obj),1);
          //   tempMovingObjectsContainer.push(obj);

          //   this.movingObjects.splice(this.movingObjects.indexOf(collidableObj),1);
          //   tempMovingObjectsContainer.push(collidableObj);
          // }
        }
        if(obj instanceof Mario && (collidableObj instanceof ActiveBlock || collidableObj instanceof InactiveBlock || collidableObj instanceof PipeHead || collidableObj instanceof PipeBody))
        {
          // print("Rub!R");
          if(is_bottom_Y_overlapping||is_top_Y_overlapping)
            isMarioRubbingRight = collidableObjHitbox.IsXcoordInBetween(objHitbox_rect.right_X+1,collidableObj);
        }
        if(obj instanceof Mario && (collidableObj instanceof ActiveBlock || collidableObj instanceof InactiveBlock || collidableObj instanceof PipeHead || collidableObj instanceof PipeBody))
        {
          // print("Rub!L");
          // print("leftRubbed!");
          if(is_bottom_Y_overlapping||is_top_Y_overlapping)
            isMarioRubbingLeft = collidableObjHitbox.IsXcoordInBetween(objHitbox_rect.left_X-2,collidableObj);
        }


        if(obj instanceof Mario && (isMarioRubbingLeft || isMarioRubbingRight))
        {
            if(isMarioRubbingLeft)
            {
              obj.isRubbingLeft = true;
              // print("rub L");
            }
            if(isMarioRubbingRight)
            {
              obj.isRubbingRight = true;
            }
        }

        if (obj instanceof Mario && !is_OnSurface)
        {
          obj.isJumping = true;
          // print("B : "+collidableObj.x+","+collidableObj.y);
          // print("M : "+objHitbox_rect.left_X+","+objHitbox_rect.bottom_Y);
        }
        else if ((obj instanceof Goomba || obj instanceof Powerup) && !is_OnSurface)
        {
          obj.isOnGround = false;
        }

        if(obj instanceof Mario && (!isMarioRubbingLeft || !isMarioRubbingRight))
        {
          if(!isMarioRubbingLeft)
          {
            // print("!rubL");
            obj.isRubbingLeft = false;
          }
          if(!isMarioRubbingRight)
          {
            // print("!rubR");
            obj.isRubbingRight = false;
          }
        }
      }
    }
    // for (let obj of tempMovingObjectsContainer)
    // {
    //   this.movingObjects.push(obj);  
    // }

    // tempMovingObjectsContainer = null;
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
      this.RegisterToBucketMap(object);
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