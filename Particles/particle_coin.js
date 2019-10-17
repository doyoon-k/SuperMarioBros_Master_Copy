class ParticleCoin extends Particle
{
   constructor(x,y)
   {
      super(x,y);

      this.spriteToDraw = sprites.particle_coin_1;
      this.animationFrameRate = 1;
      this.lifeSpan = 32;

      this.speedY = -HexFloatToDec("0.900")*4;
      this.fallingAcceleration = HexFloatToDec("0.400");
   }

   *ChangeSprite()
   {
      while(true)
      {
          this.spriteToDraw = sprites.particle_coin_2;
          yield;
          this.spriteToDraw = sprites.particle_coin_3;
          yield;
      }
   }

   Animate()
   {
       if(this.animationFrameRate<this.animationFrameCount)
       {
           this.animationFrameCount = 0;
           this.animator.next();
           this.speedY += this.fallingAcceleration;
       }

        this.animationFrameCount++;
   }

   Draw()
   {
        DrawSprite(this.spriteToDraw,this.x,this.y,false,false);
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

       let particleScore = new ParticleScore(this.x, this.y, 200);
       game.gameObjects.push(particleScore);
       game.Enroll(particleScore);

   }

   Update()
   {
       if(this.lifeSpan == 0)
       {
           this.Destroy();
           return;
       }

       if (g_interfaceFlow.flowState == g_interfaceFlow.screenState.inGame)
       {
           this.Animate();
           this.y += this.speedY;
           this.lifeSpan--;
       }
    }
}