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

// p5 sound library DOENS'T provide a method to change the pitch. WOW.

class SoundManager
{
    constructor()
    {
        this.sounds = sounds;
        this.BGMs = ["overworld", "overworld_tempo_up", "overworld_volume_down", "overworld_tempo_up_volume_down",
                     "underground", "underground_tempo_up", "underground_volume_down", "underground_tempo_up_volume_down",
                     "star", "star_tempo_up", "star_volume_down", "star_tempo_up_volume_down"];

        this.SFXsBeingPlayed = [];

        this.currentBGM = undefined;

        this.shouldHurry = false;

        this.starTimeout = undefined;

        for (let sound in this.sounds)
        {
            this.sounds[sound].onended(this.GetOnSFXEnd(sound));
            this.sounds[sound].playMode("sustain");
        }

        for (let bgm of this.BGMs)
        {
            this.sounds[bgm].setLoop(true);
        }
    }

    ChangeTempoPitch(isTempoUp, isMelodyVolumeDown)
    {
        let BGMName;
        for (let key in this.sounds)
        {
            if (this.sounds[key] == this.currentBGM)
            {
                BGMName = key;
            }
        }

        let newBGM;
        if (BGMName.includes("overworld"))
        {
            newBGM = "overworld" + (isTempoUp ? "_tempo_up" : "") + (isMelodyVolumeDown ? "_volume_down" : "");
        }
        else if (BGMName.includes("underground"))
        {
            newBGM = "underground" + (isTempoUp ? "_tempo_up" : "") + (isMelodyVolumeDown ? "_volume_down" : "");
        }
        else if (BGMName.includes("star"))
        {
            newBGM = "star" + (isTempoUp ? "_tempo_up" : "") + (isMelodyVolumeDown ? "_volume_down" : "");
        }

        if (BGMName == newBGM)
        {
            return;
        }
        
        let time = this.currentBGM.currentTime();
        this.currentBGM.stop();

        this.currentBGM = this.sounds[newBGM];
        this.currentBGM.play(0, this.currentBGM.playbackRate, this.currentBGM.output.gain.value, time);
    }

    Play(soundName)
    {
        if (this.BGMs.includes(soundName))
        {
            if (soundName.includes("star") && !this.starTimeout)
            {
                this.starTimeout = setTimeout(() => {
                    if (!this.sounds.hurry_up.isPlaying())
                    {
                        this.Play(game.IsUnderground() ? "underground" : "overworld");
                    }
                    this.starTimeout = undefined;
                }, STAR_BGM_LASTS_SECONDS * 1000);
            }
            if (this.currentBGM)
            {
                this.currentBGM.stop();
            }
            this.currentBGM = this.sounds[soundName];
            this.currentBGM.play();
            if (this.shouldHurry)
            {
                this.ChangeTempoPitch(true, false);
            }
            else
            {
                this.ChangeTempoPitch(false, false);
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
                    this.ChangeTempoPitch(this.shouldHurry, true);
                    break;

                case "hurry_up":
                    this.currentBGM.pause();
                    break;
            }

            this.sounds[soundName].play();
            this.SFXsBeingPlayed.push(this.sounds[soundName]);
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

            this.SFXsBeingPlayed.forEach(sfx => sfx.pause());
        }
        else
        {
            this.SFXsBeingPlayed.forEach(sfx => sfx.play());

            if (this.currentBGM && !this.sounds.hurry_up.isPlaying())
            {
                this.currentBGM.play();
            }
        }
    }

    GetOnSFXEnd(sound)
    {
        switch (sound)
        {
            case "coin":
                return () => {
                    if (!this.sounds[sound].isPaused())
                    {
                        this.ChangeTempoPitch(this.shouldHurry, false);
    
                        let index = this.SFXsBeingPlayed.indexOf(this.sounds[sound]);
                        if (index != -1)
                        {
                            this.SFXsBeingPlayed.splice(index, 1);
                        }
                    }
                };

            case "hurry_up":
                return () => {
                    if (!this.sounds[sound].isPaused())
                    {
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
    
                        let index = this.SFXsBeingPlayed.indexOf(this.sounds[sound]);
                        if (index != -1)
                        {
                            this.SFXsBeingPlayed.splice(index, 1);
                        }
                    }
                };
            
            default:
                if (this.BGMs.includes(sound))
                {
                    return () => {};
                }

                return () => {
                    if (!this.sounds[sound].isPaused())
                    {
                        let index = this.SFXsBeingPlayed.indexOf(this.sounds[sound]);
                        if (index != -1)
                        {
                            this.SFXsBeingPlayed.splice(index, 1);
                        }
                    }
                };
        }
    }
}