class ParticleCoin extends Particle
{
   constructor(x,y)
   {
      super(x,y);

      this.spriteToDraw = sprites.particle_coin_1;
      this.animationFrameRate = 1;
      this.lifeSpan = 32;

      this.speedY = -HexFloatToDec("0.900")*4;
      this.fallingAcceleration = HexFloatToDec("0.900");
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
       else
       {
           this.animationFrameCount++;
           this.y += this.speedY;
       }
   }

   Draw()
   {
        DrawSprite(this.spriteToDraw,this.x,this.y,false,false);
   }

   Destroy()
   {
       //particle 담아놓은 배열에서 this 객체 splice해버림.
   }

   Update()
   {
       if(this.lifeSpan == 0)
       {
           this.Destroy();
           return;
       }

       if (game.interfaceFlow.flowState == game.interfaceFlow.screenState.inGame)
       {
           this.Animate();
           this.lifeSpan--;
       }
    }
}