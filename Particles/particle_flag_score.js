/*
<<<<<<< HEAD
  physics.js
=======
  particle_flag_score.js
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
class ParticleFlagScore extends ParticleScore
{
    constructor(x, initialY, finalY, score)
    {
        super(x, initialY, score);
        this.initailY = initialY;
        this.finalY = finalY;
        this.speedY = -HexFloatToDec("1.400");
    }

    Animate() {}

    Update()
    {
    if (g_interfaceFlow.flowState == g_interfaceFlow.screenState.inGame)
       {
        if(this.y>this.finalY)
        {
            this.y += this.speedY;
        }
        else
        {
            this.y = this.finalY;
        }
       }
    }

    Draw()
    {
        push();
        textAlign(CENTER);
        DrawText(this.score, this.x - game.camera.x + 100, this.y, 5);
        pop();
    }

    // Draw()
    // {
    //     push();
    //     textAlign(CENTER);
    //     DrawText(this.score, this.x - (game.camera.x - 100), this.y, 5);
    //     pop();
    // }
}