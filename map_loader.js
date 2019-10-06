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

        switch(block.ItemType)
        {
          case "Power Up":
              itemType = EContainingItemType.PowerUp;
              break;
          case "1-Up Mushroom":
              itemType = EContainingItemType.OneUp;
              break;
          case "Star":
              itemType = EContainingItemType.Star;
              break;
          case "Coin":
              itemType = EContainingItemType.Coin;
              break;
          case "None":
              itemType = EContainingItemType.None;
              break;

        }

        let isQuestionMarkBlock = blockType.indexOf("Questionmark");
        let isBrickBlock = blockType.indexOf("Brick");

        if(isQuestionMarkBlock != -1)
        {
           let questionMarkBlock = new QuestionBlock(x,y,itemType);
           game.gameObjects.push(questionMarkBlock);
           physics.RegisterToBucketMap(questionMarkBlock);
        }
        else if(isBrickBlock != -1)
        {
           let brickBlock = new BrickBlock(x,y,itemType);
           game.gameObjects.push(brickBlock);
           physics.RegisterToBucketMap(brickBlock);
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

         switch(backgroundType)
         {
            case "Mountain":
              let mountain = new BackgroundObject(x,y,EBackgroundObjectType.Mountain);
              game.backgroundObjects.push(mountain);
              break;
            case "Cloud1":
                let cloud1 = new BackgroundObject(x,y,EBackgroundObjectType.Cloud1);
                game.backgroundObjects.push(cloud1);
                break;
            case "Cloud2":
                let cloud2 = new BackgroundObject(x,y,EBackgroundObjectType.Cloud2);
                game.backgroundObjects.push(cloud2);
                break;
            case "Cloud3":
                let cloud3 = new BackgroundObject(x,y,EBackgroundObjectType.Cloud3);
                game.backgroundObjects.push(cloud3);
                break;
            case "Bush1":
                let bush1 = new BackgroundObject(x,y,EBackgroundObjectType.Bush1);
                game.backgroundObjects.push(bush1);
                break;
            case "Bush2":
                let bush2 = new BackgroundObject(x,y,EBackgroundObjectType.Bush2);
                game.backgroundObjects.push(bush2);
                break;
            case "Bush3":
                let bush3 = new BackgroundObject(x,y,EBackgroundObjectType.Bush3);
                game.backgroundObjects.push(bush3);
                break;
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

         switch(characterType)
         {
            case "Goomba":
              let goomba = new Goomba(x,y);
              game.gameObjects.push(goomba);
              physics.RegisterToBucketMap(goomba);
              break;
            case "Green Koopa Troopa":
              let greenKoopaTroopa = new KoopaTroopa(x,y,false);
              game.gameObjects.push(greenKoopaTroopa);
              physics.RegisterToBucketMap(greenKoopaTroopa);
              break;
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