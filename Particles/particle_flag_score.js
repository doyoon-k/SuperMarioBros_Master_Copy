class ParticleFlagScore extends ParticleScore
{
    constructor(x, initialY, finalY, score)
    {
        super(x, initialY, score);
        this.initailY = initialY;
        this.finalY = finalY;
        this.speedY = -HexFloatToDec("2.400");
    }

    Animate()
    {
       if(this.animationFrameRate<this.animationFrameCount)
       {
           this.animationFrameCount = 0;
           if(this.y>this.finalY)
           {
               this.y += this.speedY;
           }
           else
           {
               this.y = this.finalY;
           }
       }
       this.animationFrameCount++;
    }

    Update()
    {
    if (g_interfaceFlow.flowState == g_interfaceFlow.screenState.inGame)
       {
           this.Animate();
       }
    }
}