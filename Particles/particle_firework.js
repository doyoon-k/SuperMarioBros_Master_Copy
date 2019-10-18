/*
  particle_firework.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang 
  DoYoon Kim Wrote all of this base on Joonho Hwang's class
  SeungGeon Kim


  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/

class ParticleFirework extends Particle
{
    constructor(x, y,isFireballParticle)
    {
        super(x, y);
        this.spriteToDraw = sprites.particle_firework_1;
        this.animationFrameRate = 2;
        this.count = 0;
        this.isFireballParticle = isFireballParticle;
    }

    *ChangeSprite()
    {
        while (true)
        {
            this.spriteToDraw = sprites.particle_firework_2;
            yield;
            if (this.isFireballParticle)
            {
                this.spriteToDraw = sprites.particle_firework_3;
                yield;
            }
        }
    }

    Animate()
    {
        if (this.animationFrameRate < this.animationFrameCount)
        {
            this.animationFrameCount = 0;
            this.animator.next();
            this.count++;
        }
        else
        {
            this.animationFrameCount++;
        }
    }

    Draw()
    {
        DrawSprite(this.spriteToDraw,this.x,this.y,false,false);   
    }

    Destroy()
    {
        game.Expel(this);
    }

    Update()
    {
        if (this.count == 2)
        {
            this.Destroy();
            return;
        }

        if (g_interfaceFlow.flowState == g_interfaceFlow.screenState.inGame)
        {
           this.Animate();
        }
    }
}