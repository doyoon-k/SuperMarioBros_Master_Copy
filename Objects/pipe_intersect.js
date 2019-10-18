class PipeIntersect
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;

        this.zWeight = 0;

        this.spriteToDraw = sprites.pipe_intersect + (game.isUnderground ? "_underground" : "");
    }

    Update() { }
    
    Draw()
    {
        DrawSprite(this.spriteToDraw, this.x, this.y);
    }

    Destroy()
    {
        game.Expel(this);
    }
}