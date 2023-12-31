/*
  physics.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang did ---
  DoYoon Kim wrote this all
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
    this.movingObjectsPrevCoordsMap = new Map();

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

      let objHitbox_rect = objHitbox.GetRect(obj);
      let speedX = obj.speedX;
      let speedY = obj.speedY;
      let buckets = this.GetBucket(objHitbox_rect.left_X + speedX*1.2, objHitbox_rect.top_Y + speedY*1.2);
      buckets = buckets.concat(this.GetBucket(objHitbox_rect.right_X+speedX*1.2, objHitbox_rect.top_Y+speedY*1.2));
      buckets = buckets.concat(this.GetBucket(objHitbox_rect.left_X+speedX*1.2, objHitbox_rect.bottom_Y+speedY*1.2));
      buckets = buckets.concat(this.GetBucket(objHitbox_rect.right_X+speedX*1.2, objHitbox_rect.bottom_Y+speedY*1.2));
      buckets = new Set(buckets);

      let is_CollidedWithBlock = false;
      let is_OnSurface = false;
      let isMarioRubbingRight = false;
      let isMarioRubbingLeft = false;
      
      for (let collidableObj of buckets)
      {
        let collidableObjHitbox = collidableObj.hitbox;

        let collidableObjHitbox_rect = collidableObjHitbox.GetRect(collidableObj);
        let is_top_Y_overlapping = collidableObjHitbox.IsYcoordInBetween(objHitbox_rect.top_Y + 1, collidableObj);
        let is_bottom_Y_overlapping = collidableObjHitbox.IsYcoordInBetween(objHitbox_rect.bottom_Y - 1, collidableObj);
        
        let willCollide = collidableObjHitbox.IsColliding(objHitbox_rect, speedX, speedY, collidableObj)||objHitbox.IsColliding(collidableObjHitbox_rect,0,0,obj);

        if (is_CollidedWithBlock && collidableObj instanceof ActiveBlock && obj instanceof Mario)
          continue;

        if (willCollide)
        {
          if (collidableObj instanceof ActiveBlock || collidableObj instanceof InactiveBlock)
            is_CollidedWithBlock = true;
          
          if (speedX > 0 && speedY > 0) //1)
          {
            if (objHitbox_rect.bottom_Y-0.5 <= collidableObjHitbox_rect.top_Y) //1) a)
            {
              collidableObj.OnCollisionWith(obj, DIRECTION.Up);
              if (collidableObj instanceof ActiveBlock || collidableObj instanceof InactiveBlock || collidableObj instanceof PipeHead || collidableObj instanceof PipeBody)
              {
                is_OnSurface = true;
              }
            }
            else if (is_bottom_Y_overlapping || is_top_Y_overlapping) //1) b)
            {
              collidableObj.OnCollisionWith(obj, DIRECTION.Left);
            }
          }
          else if (speedX < 0 && speedY > 0)
          {
            if (objHitbox_rect.bottom_Y-0.5 <= collidableObjHitbox_rect.top_Y) //2) a)
            {
              collidableObj.OnCollisionWith(obj, DIRECTION.Up);
              if (collidableObj instanceof ActiveBlock || collidableObj instanceof InactiveBlock || collidableObj instanceof PipeHead || collidableObj instanceof PipeBody)
              {
                is_OnSurface = true;
              }
            }
            else if (is_bottom_Y_overlapping || is_top_Y_overlapping) //2) b)
            {
              collidableObj.OnCollisionWith(obj, DIRECTION.Right);
            }
          }
          else if (speedX > 0 && speedY < 0)
          {
            if (objHitbox_rect.top_Y > collidableObjHitbox_rect.bottom_Y)//3) a) 
            {
              collidableObj.OnCollisionWith(obj, DIRECTION.Down);
            }
            else if (is_top_Y_overlapping || is_bottom_Y_overlapping)//3) b)
            {
              collidableObj.OnCollisionWith(obj, DIRECTION.Left);
            }
          }
          else if (speedX < 0 && speedY < 0)
          {
            if (objHitbox_rect.top_Y > collidableObjHitbox_rect.bottom_Y)//3) a) 
            {
              collidableObj.OnCollisionWith(obj, DIRECTION.Down);
            }
            else if (is_top_Y_overlapping || is_bottom_Y_overlapping)
            {
              collidableObj.OnCollisionWith(obj, DIRECTION.Right);
            }
          }
          else if (speedX == 0 && speedY < 0)
          {
            collidableObj.OnCollisionWith(obj, DIRECTION.Down);
          }
          else if (speedX == 0 && speedY > 0)
          {
            collidableObj.OnCollisionWith(obj, DIRECTION.Up);
            if (collidableObj instanceof ActiveBlock || collidableObj instanceof InactiveBlock || collidableObj instanceof PipeHead || collidableObj instanceof PipeBody)
            { 
              is_OnSurface = true;
            }
          }
          else if (speedX > 0 && speedY == 0)
          {
            if (objHitbox_rect.bottom_Y < collidableObjHitbox_rect.bottom_Y)
            {
              collidableObj.OnCollisionWith(obj, DIRECTION.Up);
              if (collidableObj instanceof ActiveBlock || collidableObj instanceof InactiveBlock || collidableObj instanceof PipeHead || collidableObj instanceof PipeBody)
              {
                is_OnSurface = true;
              }
            }
            else
            {
              collidableObj.OnCollisionWith(obj, DIRECTION.Left);
            }
          }
          else if (speedX < 0 && speedY == 0)
          {
            if (objHitbox_rect.bottom_Y < collidableObjHitbox_rect.bottom_Y)
            {
              collidableObj.OnCollisionWith(obj, DIRECTION.Up);
              if (collidableObj instanceof ActiveBlock || collidableObj instanceof InactiveBlock || collidableObj instanceof PipeHead || collidableObj instanceof PipeBody)
              is_OnSurface = true;
            }
            else
            {
              collidableObj.OnCollisionWith(obj, DIRECTION.Right);
            }
          }
          else // speedX == 0 && speedY == 0 
          {
            if (collidableObj instanceof ActiveBlock || collidableObj instanceof InactiveBlock || collidableObj instanceof PipeHead || collidableObj instanceof PipeBody)
            {
              if(objHitbox_rect.bottom_Y < collidableObjHitbox_rect.bottom_Y)
              {
                is_OnSurface = true;
                collidableObj.OnCollisionWith(obj, DIRECTION.Up);
              }
            }
          }
        }
        if(obj instanceof Mario && (collidableObj instanceof ActiveBlock || collidableObj instanceof InactiveBlock || collidableObj instanceof PipeHead || collidableObj instanceof PipeBody))
        {
          let is_bottom_Y_overlapping = collidableObjHitbox.IsYcoordInBetween(objHitbox_rect.bottom_Y-1,collidableObj);
          let is_top_Y_overlapping = collidableObjHitbox.IsYcoordInBetween(objHitbox_rect.top_Y-1,collidableObj);
          if(is_bottom_Y_overlapping||is_top_Y_overlapping)
            isMarioRubbingRight = collidableObjHitbox.IsXcoordInBetween(objHitbox_rect.right_X+1,collidableObj);
        }
        if(obj instanceof Mario && (collidableObj instanceof ActiveBlock || collidableObj instanceof InactiveBlock || collidableObj instanceof PipeHead || collidableObj instanceof PipeBody))
        {
          let is_bottom_Y_overlapping = collidableObjHitbox.IsYcoordInBetween(objHitbox_rect.bottom_Y-1,collidableObj);
          let is_top_Y_overlapping = collidableObjHitbox.IsYcoordInBetween(objHitbox_rect.top_Y-1,collidableObj);
          if(is_bottom_Y_overlapping||is_top_Y_overlapping)
            isMarioRubbingLeft = collidableObjHitbox.IsXcoordInBetween(objHitbox_rect.left_X-1,collidableObj);
        }
      }
      if(obj instanceof Mario && (isMarioRubbingLeft || isMarioRubbingRight))
      {
          if(isMarioRubbingLeft)
          {
            obj.isRubbingLeft = true;
          }
          if(isMarioRubbingRight)
          {
            obj.isRubbingRight = true;
          }
      }

      if (obj instanceof Mario && !is_OnSurface)
      {
        obj.isJumping = true;
      }
      else if ((obj instanceof Goomba || obj instanceof Powerup) && !is_OnSurface)
      {
        obj.isOnGround = false;
      }

      if(obj instanceof Mario && (!isMarioRubbingLeft || !isMarioRubbingRight))
      {
        if(!isMarioRubbingRight)
        {
          obj.isRubbingRight = false;
        }
        if(!isMarioRubbingLeft)
        {
          obj.isRubbingLeft = false;
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
    let object_hitbox_rect = object.hitbox.GetRect(object);
    this.movingObjectsPrevCoordsMap.set(object,{ left_X: object_hitbox_rect.left_X, right_X: object_hitbox_rect.right_X,top_Y:object_hitbox_rect.top_Y,bottom_Y:object_hitbox_rect.bottom_Y});
  }

  RemoveFromBucketMap(object)
  {
    let object_hitbox_rect;

    if (object.hitbox == undefined)
      return;

    if (this.movingObjects.indexOf(object) != -1)
    {
      object_hitbox_rect = this.movingObjectsPrevCoordsMap.get(object);  
    }
    else
    {
      object_hitbox_rect = object.hitbox.GetRect(object);
    }

    if (!object_hitbox_rect)
    {
        return;
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
      this.movingObjectsPrevCoordsMap.delete(object);
    }
  }

  UpdateBucketMap()
  {
    for (let object of this.movingObjects)
    {
      this.RemoveFromBucketMap(object);
      this.RegisterToBucketMap(object);
    }
  }

  UpdateMovingObjectsPrevCoords()
  {
    for (let obj of this.movingObjects)
    {
      let prevCoords = this.movingObjectsPrevCoordsMap.get(obj);
      if (!prevCoords)
      {
          return;
      }
      
      let object_hitbox_rect = obj.hitbox.GetRect(obj);
      prevCoords.left_X = object_hitbox_rect.left_X;
      prevCoords.right_X = object_hitbox_rect.right_X;
      prevCoords.bottom_Y = object_hitbox_rect.bottom_Y;
      prevCoords.top_Y = object_hitbox_rect.top_Y;
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