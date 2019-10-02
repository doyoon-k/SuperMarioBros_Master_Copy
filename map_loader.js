/*
  helper_functions.js
  Super Mario Bros.

  GAM100
  Fall 2019

  JoonHo Hwang did ---
  DoYoon Kim wrote all
  SeungGeon Kim did ---

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
      this.createBackgrounds(jsonMap.backgrounds);
      this.createBlocks(jsonMap.blocks);
      this.createCharacters(jsonMap.characters);
    }

    //determines the blocktype and create & add the block instance in gameObjects array.
    createBlocks(blocks)
    {
      for(let block of blocks)
      {
        let x = block.position.x;
        let y = block.position.y;
        let blockType = block.blockType;
        let isContainingItem = block.isContainingItem;
        let itemType;
        if(block.ItemType == "Power Up")
        {
          itemType = EContainingItemType.PowerUp;
        }
        else if(block.ItemType == "1-Up Mushroom")
        {
          itemType = EContainingItemType.OneUp;
        }
        else if(block.ItemType == "Star")
        {
          itemType = EContainingItemType.Star;
        }
        else if(block.ItemType == "Coin")
        {
          itemType = EContainingItemType.Coin;
        }
        else if(block.ItemType == "None")
        {
          itemType = EContainingItemType.None;
        }


        let isQuestionMarkBlock = blockType.indexOf("Questionmark");
        let isBrickBlock = blockType.indexOf("Brick");

        if(isQuestionMarkBlock != -1)
        {
           let QuestionMarkBlock = new ActiveBlock(x,y,true,itemType);
           gameObjects.push(QuestionMarkBlock);
        }
        else if(isBrickBlock != -1)
        {
           let BrickBlock = new ActiveBlock(x,y,false,itemType);
           gameObjects.push(BrickBlock);
        }
        else
        {
          let inactiveBlockType;
          if(blockType == "HardBlock")
          {
             inactiveBlockType = EInactiveBlockType.Hard;
          }
          else if(blockType == "GroundBlock")
          {
             inactiveBlockType = EInactiveBlockType.Ground;
          }
           let inactiveBlock = new inactiveBlock(x,y,inactiveBlockType);
           gameObjects.push(inactiveBlock);
        }
      }
    }

    createBackgrounds(backgrounds)
    {
       
    }

    createCharacters(characters)
    {
       for(let character of characters)
       {
         let x = character.position.x;
         let y = character.position.y;
         let characterType = character.characterType;
         if(characterType == "Mario")
         {
            
         }
         else if(characterType == "Goomba")
         {
           let goomba = new goomba(x,y);
           gameObjects.push(goomba);
         }
         else if(characterType == "Green Koopa Troopa")
         {
           let greenKoopaTroopa = new KoopaTroopa(x,y,false);
           gameObjects.push(greenKoopaTroopa);
         }
         //going to add as soon as the rest of the character classes are made.
       }
    }

    createEnvironments(environments)
    {

    }

    createItems(items)
    {
       for(let item of items)
       {
         
       }
    }
}