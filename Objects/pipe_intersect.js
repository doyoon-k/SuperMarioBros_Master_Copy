class PipeIntersect
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;

        this.zWeight = 0;

        this.spriteToDraw = strites.pipe_intersect_underground;
    }

    Update() { }
    
    Draw()
    {
        DrawSprite(this.spriteToDraw, this.x, this.y);
    }

    Destroy()
    {
        let index = game.objectsToUpdate.indexOf(this);
        if (index != -1)
        {
            game.objectsToUpdate.splice(index, 1);
        }

        index = game.objectsToDraw[this.zWeight].indexOf(this);
        if (index != -1)
        {
            game.objectsToDraw[this.zWeight].splice(index, 1);
        }

        index = this.gameObjects.indexOf(this);
        if (index != -1)
        {
            game.gameObjects.splice(index, 1);
        }
    }
}