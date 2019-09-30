/*
  helper_functions.js
  Super Mario Bros.

  GAM100
  Fall 2019

  JoonHo Hwang Wrote HexFloatToDec() and DrawText().
  DoYoon Kim did ---
  SeungGeon Kim Wrote DrawSprite() and ReturnAbsoluteAcceleration().

  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/

class MapLoader
{
    constructor()
    {

    }

    loadMap(jsonMap)
    {
      let mapData = loadJSON(jsonMap);
      for(let block of mapData.blocks)
      {
        let x = block.position.x;
        let y = block.position.y;
        let blockType = block.blockType;

        if(blockType == "MushroomBlock")
        {

        }
        else if(blockType == "")
        {
          
        }
      }
    }
}