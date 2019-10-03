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
           let inactiveBlock = new InactiveBlock(x,y,inactiveBlockType);
           gameObjects.push(inactiveBlock);
        }
      }
    }

    createBackgrounds(backgrounds)
    {
       for(let backgroundObj of backgrounds)
       {
         let x = backgroundObj.position.x;
         let y = backgroundObj.position.y;
         let backgroundType = backgroundObj.backgroundType;

         if(backgroundType == "Mountain")
         {
           let mountain = new BackgroundObject(x,y,EBackgroundObjectType.Mountain);
           backgroundObjects.push(mountain);
         }
         else if(backgroundType == "Cloud1")
         {
           let cloud1 = new BackgroundObject(x,y,EBackgroundObjectType.Cloud1);
           backgroundObjects.push(cloud1);
         }
         else if(backgroundType == "Cloud2")
         {
           let cloud2 = new BackgroundObject(x,y,EBackgroundObjectType.Cloud2);
           backgroundObjects.push(cloud2);
         }
         else if(backgroundType == "Cloud3")
         {
           let cloud3 = new BackgroundObject(x,y,EBackgroundObjectType.Cloud3);
           backgroundObjects.push(cloud3);
         }
         else if(backgroundType == "Bush1")
         {
           let bush1 = new BackgroundObject(x,y,EBackgroundObjectType.Bush1);
           backgroundObjects.push(bush1);
         }
         else if(backgroundType == "Bush2")
         {
           let bush2 = new BackgroundObject(x,y,EBackgroundObjectType.Bush2);
           backgroundObjects.push(bush2);
         }
         else if(backgroundType == "Bush3")
         {
          let bush3 = new BackgroundObject(x,y,EBackgroundObjectType.Bush3);
          backgroundObjects.push(bush3);
         }

       }
    }

    createCharacters(characters)
    {
       for(let character of characters)
       {
         let x = character.position.x;
         let y = character.position.y;
         let characterType = character.characterType;
         if(characterType == "Goomba")
         {
           let goomba = new Goomba(x,y);
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