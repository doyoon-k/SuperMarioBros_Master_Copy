/*
  koopa_troopa.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang Wrote all of this
  DoYoon Kim 
  SeungGeon Kim 
  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/

class KoopaTroopa extends BaseEnemy
{
    constructor(x, y, isRed)
    {
        super(x, y);
        this.isRed = isRed;

        // these three values are exclusive to each other, only one value can be set true at a given time
        this.isInShell = false;
        this._isAwakening = false;
        this.isSliding = false;

        this.slidingSpeed = HexFloatToDec("3.500");  // should be tested

        this.awakeningTimer = undefined;

        this.instaKillCombo = 0;

        this.hitbox = hitboxes.koopa_troopa;

        this.spriteToDraw = sprites.turtle_1;

        game.physics.RegisterToMovingObjectsArray(this);
    }

    get isAwakening()
    {
        return this._isAwakening;
    }

    set isAwakening(value)
    {
        this._isAwakening = value;
        this.animator = this.ChangeSprite();  // see *ChangeSprite() for explanation
    }

    Move()
    {
        if (this.isInShell || this.isAwakening)
        {
            return;
        }

        this.speedX = (this.isInstaKilled ? this.instaKilledWalkingSpeed : this.isSliding ? this.slidingSpeed : this.walkingSpeed) * (this.isGoingLeft ? -1 : 1);
        this.x += this.speedX;
    }

    Stomped()
    {
        if (this.isSliding)
        {
            this.isSliding = false;
        }
        this.isInShell = true;
        this.awakeningTimer = setTimeout(() => this.Awakening(), KOOPA_TROOPA_AWAKENING_SECONDS * 1000);

        this.spriteToDraw = sprites.turtle_shell;

        game.statistics.AddScore(SCORES.Stomp[map(game.mario.stompCombo++, 0, SCORES.Stomp.length - 1, 0, SCORES.Stomp.length - 1, true)]);
    
        game.soundManager.Play("enemy_stomped");
    }

    Awakening()
    {
        this.isInShell = false;
        this.isAwakening = true;

        this.awakeningTimer = setTimeout(() => this.Recover(), KOOPA_TROOPA_RECOVER_SECONDS * 1000);
    }

    Recover()
    {
        this.isInShell = false;
        this.isAwakening = false;

        this.isGoingLeft = true;
        let distanceBetweenMario = abs(game.mario.x - this.x);
        if (BLOCK_SIZE / 2 <= distanceBetweenMario && distanceBetweenMario <= BLOCK_SIZE)
        {
            this.isGoingLeft = this.x > game.mario.x ? false : true;
        }
    }

    ShellPushed(direction)
    {
        clearTimeout(this.awakeningTimer);

        this.isInShell = false;
        this.isAwakening = false;
        this.isSliding = true;

        this.isGoingLeft = direction != DIRECTION.Left;

        this.spriteToDraw = sprites.turtle_shell;

        game.soundManager.Play("enemy_instakilled");
    }

    InstaKilled(direction)
    {
        if (this.isInstaKilled)
        {
            return;
        }

        clearTimeout(this.awakeningTimer);
        this.isInShell = false;
        this.isAwakening = false;
        this.isSliding = false;

        this.isInstaKilled = true;

        this.isOnGround = false;

        this.spriteToDraw = sprites.turtle_shell;
        
        this.speedY = this.instaKilledInitialSpeed;
        this.isGoingLeft = direction == DIRECTION.Right;
        
        game.physics.RemoveFromMovingObjectsArray(this);
        game.physics.RemoveFromBucketMap(this);

        game.statistics.AddScore(SCORES.InstaKillKoopaTroopa);
    
        game.soundManager.Play("enemy_instakilled");
    }

    *ChangeSprite()
    {
        // every time its iterator is made, it'll check whether isAwakening and will be trapped in that loop
        // so, we should make a new iterator when isAwakening's value is changed
        if (this.isAwakening)
        {
            while (true)
            {
                this.spriteToDraw = sprites.turtle_shell;
                yield;
                this.spriteToDraw = sprites.turtle_awakening;
                yield;
            }
        }

        while (true)
        {
            this.spriteToDraw = sprites.turtle_1;
            yield;
            this.spriteToDraw = sprites.turtle_2;
            yield;
        }
    }

    Animate()
    {
        if (this.isInShell || this.isInstaKilled || this.isSliding)
        {
            return;
        }

        if (this.animationFrameRate < this.animationFrameCount)
        {
            this.animationFrameCount = 0;
            this.animator.next();
        }
        else
        {
            this.animationFrameCount++;
        }
    }

    Update()
    {
        this.Move();
        this.Gravitate();
    }

    Draw()
    {
        if (game.interfaceFlow.flowState == game.interfaceFlow.screenState.inGame && !game.mario.isTransforming)
            this.Animate();

        DrawSprite(this.spriteToDraw, this.x, this.y, !this.isGoingLeft, this.isInstaKilled);
    }

    OnCollisionWith(collider, direction)
    {
        if (collider === this)
        {
            return;
        }

        if (collider instanceof Mario)
        {
            if (collider.isInvincible)
            {
                this.InstaKilled(this.x >= collider.x ? DIRECTION.Left : DIRECTION.Right);
                return;
            }

            switch (direction)
            {
                case DIRECTION.Up:
                    if (this.isInShell || this.isAwakening)
                    {
                        this.ShellPushed(direction);
                        game.statistics.AddScore(SCORES.StompShell);
                    }
                    else
                    {
                        collider.y = this.y - this.hitbox.height - collider.hitbox.y;
                        collider.speedY = -HexClampTo("4", collider.speedY);
                        this.Stomped();
                    }
                    break;
                    
                case DIRECTION.Left:
                case DIRECTION.Right:
                    if (this.isInShell || this.isAwakening)
                    {
                        this.ShellPushed(direction);
                        game.statistics.AddScore(SCORES.PushShell);
                    }
                    break;
            }
        }
        else if (collider instanceof BaseEnemy)
        {
            if (collider instanceof KoopaTroopa && collider.isSliding)
            {
                this.InstaKilled(this.x >= collider.x ? DIRECTION.Left : DIRECTION.Right);
                game.statistics.AddScore(SCORES.InstaKillWithShell[map(this.instaKillCombo++, 0, SCORES.InstaKillWithShell.length - 1, 0, SCORES.InstaKillWithShell.length - 1, true)]);
                return;
            }

            switch (direction)
            {
                case DIRECTION.Right:
                    collider.isGoingLeft = false;
                    collider.x = this.x + this.hitbox.width / 2 + collider.hitbox.width / 2;
                    break;

                case DIRECTION.Left:
                    collider.isGoingLeft = true;
                    collider.x = this.x - this.hitbox.width / 2 - collider.hitbox.width / 2;
                    break;
            }
        }
        else if (collider instanceof Fireball)
        {
            this.InstaKilled(this.x >= collider.x ? DIRECTION.Left : DIRECTION.Right);
            //particle here
            collider.Destroy();
        }
    }
}