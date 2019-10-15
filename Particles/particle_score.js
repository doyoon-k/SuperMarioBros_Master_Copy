class ParticleScore extends Particle
{
   constructor(x,y,score)
   {
       super(x,y);

       this.score = score;
       this.speedY = -HexFloatToDec("0.900");
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
       DrawText(this.score,this.x,this.y);
   }

   Destroy(){}

   Update(){}
}