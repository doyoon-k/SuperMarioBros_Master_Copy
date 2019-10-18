/*
  particle_flag_score.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang 
  DoYoon Kim Wrote all of this base on Joonho Hwang's class
  SeungGeon Kim


  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/

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