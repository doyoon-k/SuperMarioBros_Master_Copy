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


class ParticleScore extends Particle
{
   constructor(x,y,score)
   {
       super(x,y);

       this.offsetX = x-game.camera.x+100;
       this.score = score;
       this.speedY = -HexFloatToDec("0.800");
       this.lifeSpan = 75;
   }

   Draw()
   {
       push();
       textAlign(CENTER);
       DrawText(this.score, this.offsetX, this.y, 5);
       pop();
    //    push();
    //    textSize(10);
    //    stroke(255);
    //    text(this.score, this.x*pixelMultiplier, this.y*pixelMultiplier);
    //    pop();
   }

    Destroy()
    {
        // let index = game.objectsToUpdate.indexOf(this);
        // if (index != -1)
        // {
        //     game.objectsToUpdate.splice(index, 1);
        // }

        // index = game.objectsToDraw[this.zWeight].indexOf(this);
        // if (index != -1)
        // {
        //     game.objectsToDraw[this.zWeight].splice(index, 1);
        // }

        // index = game.gameObjects.indexOf(this);
        // if (index != -1)
        // {
        //     game.gameObjects.splice(index, 1);
        // }
        game.Expel(this);
    }

    Update()
    {
        if (this.lifeSpan == 0)
        {
            this.Destroy();
            return;
        }

        if (g_interfaceFlow.flowState == g_interfaceFlow.screenState.inGame)
       {
        this.y += this.speedY;
           this.lifeSpan--;
       }
    }
}