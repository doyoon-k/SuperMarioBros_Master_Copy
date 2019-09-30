/*
  physics.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang did ---
  DoYoon Kim did all.
  SeungGeon Kim did ---
  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/

const bucketMap_one_cell_width = 3584/70;
const bucketMap_one_cell_height = 240/5;

class Physics {
    constructor() {
        this.bucketMap = [];
        this.movingObject = [];
  

        //make the bucketmap.
        for(let row = 0; row<bucketMap_one_cell_height;row++)
        {
          //push the row arrays
          this.bucketMap.push([]);
          for(let column = 0;column<bucketMap_one_cell_width;column++)
          {
            //push the buckets in.
            this.bucketMap[row].push([]);
          }
        }

    }
    collisionCheck()
    {
      for(obj of movingObject)
      {
          //obj.pos + obj.velocity 해서 bucket맵 인덱싱 하고 bucket 안의 오브젝트들이랑 충돌체크 후 충돌하면 object.collisionWith() 호출해줌.
      }
    }
}