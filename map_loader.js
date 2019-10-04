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

    LoadMap(jsonMap)
    {
      this.mapData = loadJSON(jsonMap, this.Loaded);
    }

    Loaded()
    {
      mapLoader.CreateBackgrounds(mapLoader.mapData.backgrounds);
      mapLoader.CreateBlocks(mapLoader.mapData.blocks);
      mapLoader.CreateCharacters(mapLoader.mapData.characters);
    }

    //determines the blocktype and create & add the block instance in gameObjects array and BucketMap.
    CreateBlocks(blocks)
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
           game.gameObjects.push(QuestionMarkBlock);
           physics.RegisterToBucketMap(QuestionMarkBlock);
        }
        else if(isBrickBlock != -1)
        {
           let BrickBlock = new ActiveBlock(x,y,false,itemType);
           game.gameObjects.push(BrickBlock);
           physics.RegisterToBucketMap(BrickBlock);
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
           game.gameObjects.push(inactiveBlock);
           physics.RegisterToBucketMap(inactiveBlock);
        }
      }
    }

    CreateBackgrounds(backgrounds)
    {
       for(let backgroundObj of backgrounds)
       {
         let x = backgroundObj.position.x;
         let y = backgroundObj.position.y;
         let backgroundType = backgroundObj.backgroundType;

         if(backgroundType == "Mountain")
         {
           let mountain = new BackgroundObject(x,y,EBackgroundObjectType.Mountain);
           game.backgroundObjects.push(mountain);
         }
         else if(backgroundType == "Cloud1")
         {
           let cloud1 = new BackgroundObject(x,y,EBackgroundObjectType.Cloud1);
           game.backgroundObjects.push(cloud1);
         }
         else if(backgroundType == "Cloud2")
         {
           let cloud2 = new BackgroundObject(x,y,EBackgroundObjectType.Cloud2);
           game.backgroundObjects.push(cloud2);
         }
         else if(backgroundType == "Cloud3")
         {
           let cloud3 = new BackgroundObject(x,y,EBackgroundObjectType.Cloud3);
           game.backgroundObjects.push(cloud3);
         }
         else if(backgroundType == "Bush1")
         {
           let bush1 = new BackgroundObject(x,y,EBackgroundObjectType.Bush1);
           game.backgroundObjects.push(bush1);
         }
         else if(backgroundType == "Bush2")
         {
           let bush2 = new BackgroundObject(x,y,EBackgroundObjectType.Bush2);
           game.backgroundObjects.push(bush2);
         }
         else if(backgroundType == "Bush3")
         {
          let bush3 = new BackgroundObject(x,y,EBackgroundObjectType.Bush3);
          game.backgroundObjects.push(bush3);
         }

       }
    }

    CreateCharacters(characters)
    {
       for(let character of characters)
       {
         let x = character.position.x;
         let y = character.position.y;
         let characterType = character.characterType;
         if(characterType == "Goomba")
         {
           let goomba = new Goomba(x,y);
           game.gameObjects.push(goomba);
           physics.RegisterToBucketMap(goomba);
         }
         else if(characterType == "Green Koopa Troopa")
         {
           let greenKoopaTroopa = new KoopaTroopa(x,y,false);
           game.gameObjects.push(greenKoopaTroopa);
           physics.RegisterToBucketMap(greenKoopaTroopa);
         }
         //going to add as soon as the rest of the character classes are made.
       }
    }

    CreateEnvironments(environments)
    {

    }

    CreateItems(items)
    {
       for(let item of items)
       {
         
       }
    }
}