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
            this.sounds[sound].onended(this.GetOnSFXEnd(sound));
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
                this.currentBGM.rate(2);
            }
        }
        else
        {
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
                    this.sounds.coin.stop();
                    this.currentBGM.rate(0.5);
                    break;

                case "hurry_up":
                    this.currentBGM.pause();
                    break;
            }

            this.sounds[soundName].play();
            this.SFXBeingPlayed.push(this.sounds[soundName]);
        }
    }

    PauseResume(isPause)
    {
        this.sounds.pause.play();

        if (isPause)
        {
            if (this.currentBGM)
            {
                this.currentBGM.pause();
            }
            this.SFXBeingPlayed.forEach(sfx => sfx.pause());
        }
        else
        {
            if (this.currentBGM)
            {
                this.currentBGM.play();
            }
            this.SFXBeingPlayed.forEach(sfx => sfx.play());
        }
    }

    GetOnSFXEnd(sound)
    {
        return () => {
            this.SFXBeingPlayed.splice(this.SFXBeingPlayed.indexOf(sound), 1);

            switch (sound)
            {
                case "coin":
                    this.currentBGM.rate(this.shouldHurry ? 2 : 1);
                    break;

                case "hurry_up":
                    this.shouldHurry = true;
                    let BGMName;
                    for (let key in this.sounds)
                    {
                        if (this.sounds[key] == this.currentBGM)
                        {
                            BGMName = key;
                        }
                    }
                    this.Play(BGMName);
                    break;

                case "star":
                    this.Play(game.IsUnderground() ? "underground" : "overworld");
                    break;
            }
        };
    }
}