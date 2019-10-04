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

const bucketMap_one_cell_width = 3584/70;
const bucketMap_one_cell_height = 240/5;

class Physics {
    constructor() {
        this.bucketMap = [];
        this.movingObjects = [];

        for(let row = 0; row<6;row++)
        {
          //push the row arrays
          this.bucketMap.push([]);
          for(let column = 0;column<70;column++)
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
          //후보 1obj.pos + obj.velocity 해서 bucket맵 인덱싱 하고 bucket 안의 오브젝트들이랑 충돌체크 후 충돌하면 object.collisionWith() 호출해줌.
          let i = floor(obj.x/bucketMap_one_cell_width);
          let j = floor(obj.y/bucketMap_one_cell_height);
          let bucket = this.bucketMap[j][i];
          for(let collidableObject of bucket)
          {
            //if collision, collidableObject.OnCollisionWith();
            // let p1 = 
          }
      }
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