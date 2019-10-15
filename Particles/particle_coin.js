class ParticleCoin extends Particle
{
   constructor(x,y)
   {
      super(x,y);

      this.spriteToDraw = sprites.particle_coin_1;
      this.animationFrameRate = 3;
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
       }
       else{
           this.animationFrameCount++;
       }
   }

   Draw()
   {
        if (game.interfaceFlow.flowState == game.interfaceFlow.screenState.inGame)
           this.Animate();

        DrawSprite(this.spriteToDraw,this.x,this.y,false,false);
   }

   Destroy(){}

   Update(){}
}