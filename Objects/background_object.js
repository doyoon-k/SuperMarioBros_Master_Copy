/*
  background_object.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang
  DoYoon Kim Wrote all of this
  SeungGeon Kim 
  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/

class BackgroundObject
{
    constructor(x,y,type)
    {
        this.x = x;
        this.y = y;
        this.type = type;
        this.spriteToDraw = undefined;
        switch(type)
        {
            case EBackgroundObjectType.Mountain:
                this.spriteToDraw = sprites.mountain;
                break;
            case EBackgroundObjectType.Cloud1:
                this.spriteToDraw = sprites.cloud_single;
                break;
            case EBackgroundObjectType.Cloud2:
                this.spriteToDraw = sprites.cloud_double;
                break;
            case EBackgroundObjectType.Cloud3:
                this.spriteToDraw = sprites.cloud_triple;
                break;
            case EBackgroundObjectType.Bush1:
                this.spriteToDraw = sprites.bush_single;
                break;
            case EBackgroundObjectType.Bush2:
                this.spriteToDraw = sprites.bush_double;
                break;
            case EBackgroundObjectType.Bush3:
                this.spriteToDraw = sprites.bush_triple;
                break;
            
            case EBackgroundObjectType.Castle:
                this.spriteToDraw = sprites.castle;
                break;
        }
    }

    Draw()
    {
       DrawSprite(this.spriteToDraw,this.x,this.y);
    }
}


const EBackgroundObjectType = {
    Mountain:0,
    Cloud1:1,
    Cloud2:2,
    Cloud3:3,
    Bush1:4,
    Bush2:5,
    Bush3:6,
    Castle: 7
};