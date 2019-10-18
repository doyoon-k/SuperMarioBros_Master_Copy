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
        DrawText(this.score, this.x - game.camera.x + 100, this.y, 5);
    }

    // Draw()
    // {
    //     push();
    //     textAlign(CENTER);
    //     DrawText(this.score, this.x - (game.camera.x - 100), this.y, 5);
    //     pop();
    // }
}