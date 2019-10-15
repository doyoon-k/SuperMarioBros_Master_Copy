class Particle
{
    constructor(x,y)
    {
       this.x = x;
       this.y = y;

       this.spriteToDraw = null;
       this.animationFrameCount = 0;
       this.animationFrameRate = 0;
       this.animator = this.ChangeSprite();
    }

    *ChangeSprite(){}

    Animate(){}

    Draw(){}

    Destroy(){}

    Update(){}
}