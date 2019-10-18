/*
  map_loader.js
  Super Mario Bros.

  GAM100
  Fall 2019

  JoonHo Hwang wrote CreateEnvironments based on the code DoYoon wrote
  DoYoon Kim wrote the rest
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
      game.map = jsonMap;
      this.mapData = loadJSON(jsonMap, this.Loaded);
    }

    Loaded()
    {
      game.mapLoader.CreateBackgrounds(game.mapLoader.mapData.backgrounds);
      game.mapLoader.CreateBlocks(game.mapLoader.mapData.blocks);
      game.mapLoader.CreateCharacters(game.mapLoader.mapData.characters);
      game.mapLoader.CreateEnvironments(game.mapLoader.mapData.environments);
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
          case "No Item":
              itemType = EContainingItemType.None;
              break;

        }

        if(blockType.includes("Question"))
        {
           let questionMarkBlock = new QuestionBlock(x,y,itemType, blockType.includes("Hidden"));
           game.gameObjects.push(questionMarkBlock);
           game.physics.RegisterToBucketMap(questionMarkBlock);
        }
        else if(blockType.includes("Brick"))
        {
           let brickBlock = new BrickBlock(x,y,itemType);
           game.gameObjects.push(brickBlock);
           game.physics.RegisterToBucketMap(brickBlock);
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
           game.physics.RegisterToBucketMap(inactiveBlock);
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
            case "Castle":
                let newCastle = new BackgroundObject(x, y, EBackgroundObjectType.Castle);
                game.backgroundObjects.push(newCastle);
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
              game.physics.RegisterToBucketMap(goomba);
              break;
            case "Green Koopa Troopa":
              let greenKoopaTroopa = new KoopaTroopa(x,y,false);
              game.gameObjects.push(greenKoopaTroopa);
              game.physics.RegisterToBucketMap(greenKoopaTroopa);
              break;
         }
         //going to add as soon as the rest of the character classes are made.
       }
    }

    CreateEnvironments(environments)
    {
      let parent = null;
        for (let environment of environments)
        {
            let x = environment.position.x;
            let y = environment.position.y;
            let isParent = environment.isParent;
            let environmentType = environment.environmentType;

            let newObject;
            switch (environmentType)
            {
                case "Pipe Head Horizontal":
                    newObject = new PipeHead(x, y, true);
                    break;

                case "Pipe Head Vertical":
                    newObject = new PipeHead(x, y, false);
                    break;
                
                case "Pipe Body Horizontal":
                    newObject = new PipeBody(x, y, true);
                    break;
                
                case "Pipe Body Vertical":
                    newObject = new PipeBody(x, y, false);
                    break;
                
                case "Pipe Intersect":
                    newObject = new PipeIntersect(x, y);
                    game.gameObjects.push(newObject);
                    continue;
              
                case "Flag":
                    newObject = new Flagpole(x, y, parent);
                    break;
            }
            game.gameObjects.push(newObject);
            game.physics.RegisterToBucketMap(newObject);

            if (isParent)
            {
              parent = newObject;
            }
        }
    }

    CreateItems(items)
    {
       for(let item of items)
       {
         
       }
    }
}