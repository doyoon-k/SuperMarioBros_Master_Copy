/*
  sound_manager.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang Wrote all of this
  DoYoon Kim
  SeungGeon Kim 
  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/

class SoundManager
{
    constructor()
    {
        this.sounds = sounds;

        this.currentBGM = undefined;
        this.SFXBeingPlayed = [];

        this.shouldHurry = false;

        for (let sound of ["overworld", "underground", "star"])
        {
            this.sounds[sound].playMode("sustain");
        }

        for (let sound in this.sounds)
        {
            this.sounds[sound].onended(this.GetOnSFXEnd(this.sounds[sound]));
        }
    }

    Play(soundName)
    {
        if (["overworld", "underground", "star"].includes(soundName))
        {
            if (this.currentBGM)
            {
                this.currentBGM.stop();
            }
            this.currentBGM = this.sounds[soundName];
            this.currentBGM.loop();
            if (this.shouldHurry)
            {
                this.currentBGM.rate(1.5);
            }
        }
        else
        {
            this.sounds[soundName].play();
            this.SFXBeingPlayed.push(this.sounds[soundName]);

            switch (soundName)
            {
                case "block_hit":
                    this.sounds.mario_jump.stop();
                    this.sounds.mario_shoot.stop();
                    break;

                case "enemy_instakilled":
                    this.sounds.block_hit.stop();
                    break;

                case "coin":
                    this.currentBGM.rate(0.5);
                    break;

                case "hurry_up":
                    this.shouldHurry = true;
                    break;
            }
        }
    }

    Pause()
    {
        this.sounds.pause.play();
        if (this.currentBGM)
        {
            if (game.isPaused)
            {
                this.currentBGM.pause();
                this.SFXBeingPlayed.forEach(sfx => sfx.pause());
            }
            else
            {
                this.currentBGM.play();
                this.SFXBeingPlayed.forEach(sfx => sfx.play());
            }
        }
    }

    GetOnSFXEnd(sound)
    {
        return () => {
            this.SFXBeingPlayed.splice(this.SFXBeingPlayed.indexOf(sound), 1);
            if (sound == "coin")
            {
                this.currentBGM.rate(1);
            }
        };
    }
}