class ParticleScore extends Particle
{
   constructor(x,y,score)
   {
       super(x,y);

       this.score = score;
       this.speedY = -HexFloatToDec("1.800");
       this.lifeSpan = 75;
       this.animationFrameCount = 0;
       this.animationFrameRate = 3;
   }

   Animate()
   {
       if(this.animationFrameRate<this.animationFrameCount)
       {
          this.animationFrameCount = 0;
          this.y += this.speedY;
       }
       this.animationFrameCount++;
   }

   Draw()
   {
       push();
       textAlign(CENTER);
       DrawText(this.score, this.x - (game.camera.x - 100), this.y, 5);
       pop();
    //    push();
    //    textSize(10);
    //    stroke(255);
    //    text(this.score, this.x*pixelMultiplier, this.y*pixelMultiplier);
    //    pop();
   }

    Destroy()
    {
        let index = game.objectsToUpdate.indexOf(this);
        if (index != -1)
        {
            game.objectsToUpdate.splice(index, 1);
        }

        index = game.objectsToDraw[this.zWeight].indexOf(this);
        if (index != -1)
        {
            game.objectsToDraw[this.zWeight].splice(index, 1);
        }

        index = game.gameObjects.indexOf(this);
        if (index != -1)
        {
            game.gameObjects.splice(index, 1);
        }
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
           this.Animate();
           this.lifeSpan--;
       }
    }
}