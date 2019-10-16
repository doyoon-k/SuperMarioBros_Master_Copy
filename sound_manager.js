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
        this.sounds = {
            overworld: loadSound("SFX/bgm_overworld.mp3"),
            underground: loadSound("SFX/bgm_underground_melody.mp3"),
            star: loadSound("SFX/bgm_star.mp3"),
        
            overworld_tempo_up: loadSound("SFX/bgm_overworld_tempo_up.mp3"),
            underground_tempo_up: loadSound("SFX/bgm_underground_melody_tempo_up.mp3"),
            star_tempo_up: loadSound("SFX/bgm_star_tempo_up.mp3"),
        
            hurry_up: loadSound("SFX/environmental_100_time_left.mp3"),
            level_clear: loadSound("SFX/environmental_level_clear.mp3"),
            life_lost: loadSound("SFX/environmental_life_lost.mp3"),
            game_over: loadSound("SFX/environmental_game_over.mp3"),
        
            mario_jump: loadSound("SFX/mario_jump.mp3"),
            mario_power_up: loadSound("SFX/mario_powerup.mp3"),
            mario_power_down: loadSound("SFX/mario_powerdown.mp3"),
            mario_shoot: loadSound("SFX/mario_shoot.mp3"),
            mario_1up: loadSound("SFX/mario_1up.mp3"),

            big_mario_jump: loadSound("SFX/big_mario_jump.mp3"),
        
            block_hit: loadSound("SFX/block_hit.mp3"),
            block_break: loadSound("SFX/block_brick_breaking.mp3"),
        
            enemy_instakilled: loadSound("SFX/enemy_instakilled.mp3"),
            enemy_stomped: loadSound("SFX/enemy_stomped.mp3"),
        
            coin: loadSound("SFX/object_coin.mp3"),
            powerup: loadSound("SFX/object_powerup_popup.mp3"),
            flag_down: loadSound("SFX/object_flag_down.mp3"),
            firework: loadSound("SFX/object_firework.mp3"),
        
            time_to_score : loadSound("SFX/environment_time_score.mp3"),
            pause: loadSound("SFX/environment_pause.mp3")
          };
          
        this.BGMs = ["overworld", "overworld_tempo_up", "underground", "underground_tempo_up", "star", "star_tempo_up"];

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
            newBGM = "overworld" + (isTempoUp ? "_tempo_up" : "");
        }
        else if (BGMName.includes("underground"))
        {
            newBGM = "underground" + (isTempoUp ? "_tempo_up" : "");
        }
        else if (BGMName.includes("star"))
        {
            newBGM = "star" + (isTempoUp ? "_tempo_up" : "");
        }

        if (BGMName == newBGM)
        {
            this.currentBGM.setVolume(isMelodyVolumeDown ? 0.5 : 1);
            return;
        }
        
        let time = this.currentBGM.currentTime();
        this.currentBGM.stop();

        this.currentBGM = this.sounds[newBGM];
        this.currentBGM.play(0, this.currentBGM.playbackRate, this.currentBGM.output.gain.value, time);
        this.currentBGM.setVolume(isMelodyVolumeDown ? 0.5 : 1);
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
                case "life_lost":
                case "flag_down":
                    this.currentBGM.stop();
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