/*
<<<<<<< HEAD
  physics.js
=======
  pipe_intersect.js
>>>>>>> 5dde7e04a1dc8232ad78e4a8bb6983f45319f088
  Super Mario Bros.

  GAM100 
  Fall 2019

<<<<<<< HEAD
  JoonHo Hwang did ---
  DoYoon Kim wrote this all
  SeungGeon Kim did ---
=======
  JoonHo Hwang
  DoYoon Kim Wrote all of this base on Joonho Hwang's class
  SeungGeon Kim 
>>>>>>> 5dde7e04a1dc8232ad78e4a8bb6983f45319f088
  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/

<<<<<<< HEAD

=======
>>>>>>> 5dde7e04a1dc8232ad78e4a8bb6983f45319f088
class PipeIntersect
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;

        this.zWeight = 9;

        this.spriteToDraw = sprites["pipe_intersect" + (game.isUnderground ? "_underground" : "")];
    }

    Update() { }
    
    Draw()
    {
        DrawSprite(this.spriteToDraw, this.x, this.y);
    }

    Destroy()
    {
        game.Expel(this);
    }
}