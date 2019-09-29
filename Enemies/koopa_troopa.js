/*
  koopa_troopa.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang Wrote all of this
  DoYoon Kim 
  SeungGeon Kim 
  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/

class KoopaTroopa extends BaseEnemy
{
    constructor(x, y, isRed)
    {
        super(x, y);
        this.isRed = isRed;
    }
}