/*
<<<<<<< HEAD
  physics.js
=======
  particle_score.js
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