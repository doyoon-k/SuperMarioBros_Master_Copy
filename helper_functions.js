/*
  helper_functions.js
  Super Mario Bros.

  GAM100
  Fall 2019

  JoonHo Hwang wrote HexFloatToDec()
  DoYoon Kim did ---
  SeungGeon Kim Wrote DrawSprite();

  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/



//Translates & draws sprites (16x16 system onto 32x32 system)
function DrawSprite(sprite, x, y) {
    image(sprite, x * pixelMutliplier, y * pixelMutliplier, sprite.width * pixelMutliplier, sprite.height * pixelMutliplier);
}

function HexFloatToDec(hexStr)
{
  [integerPart, floatPart] = hexStr.split('.');
  result = 0;
  for (let i in integerPart)
  {
    result += parseInt(integerPart[i], 16) * Math.pow(16, integerPart.length - i - 1);
  }
  for (let i in floatPart)
  {
    result += parseInt(floatPart[i], 16) * Math.pow(16, -i - 1);
  }

  return result;
}