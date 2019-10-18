/*
<<<<<<< HEAD
  physics.js
=======
  particle.js
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
class Particle
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
       this.zWeight = 5;

       this.spriteToDraw = null;
       this.animationFrameCount = 0;
       this.animationFrameRate = 0;
       this.animator = this.ChangeSprite();
    }

    *ChangeSprite(){}

    Animate(){}

    Draw(){}

    Destroy(){}

    Update(){}
}