class ParticleFirework extends Particle
{
    constructor(x, y)
    {
        super(x, y);
        this.spriteToDraw = sprites.particle_firework_1;
        this.animationFrameRate = 10;
        this.count = 0;
    }

    *ChangeSprite()
    {
        while (true)
        {
            this.spriteToDraw = sprites.particle_firework_2;
            yield;
            this.spriteToDraw = sprites.particle_firework_3;
            yield;
        }
    }
}