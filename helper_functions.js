/*
  helper_functions.js
  Super Mario Bros.

  GAM100
  Fall 2019

  JoonHo Hwang Wrote HexFloatToDec() and DrawText().
  DoYoon Kim improved DrawSprite().
  SeungGeon Kim Wrote DrawSprite() and ReturnAbsoluteAcceleration().

  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/



//Translates & draws sprites (16x16 system onto 32x32 system if pixelmultiplier is 2)
function DrawSprite(sprite, x, y, isLeft, isUpsideDown, baseHeightDivision) {

  xMultiplier = 1;
  yMultiplier = 1;

  if (!baseHeightDivision)
  baseHeightDivision = 2;

  push();

  //base position
  ellipse(x * pixelMutliplier, y * pixelMutliplier, 3);

  if (isUpsideDown) {
    yMultiplier = -1;
    if (isLeft) {
      xMultiplier = -1;
    } else {
      xMultiplier = 1;
    }
  } else {
    yMultiplier = 1;
   if (isLeft) {
     xMultiplier = -1;
   } else {
     xMultiplier = 1;
   }
  }

  translate((x - xMultiplier * sprite.width / 2) * pixelMutliplier, (y - yMultiplier * sprite.height / baseHeightDivision) * pixelMutliplier);

  scale(xMultiplier, yMultiplier);

  //Drawing position
  ellipse(0, 0, 5);

  //x and y coordinate of an object is center-bottom.
  image(sprite, 0, 0, sprite.width * pixelMutliplier, sprite.height * pixelMutliplier);

  pop();

}

function DrawText(string, x, y, size) {
  push();
  fill(255);
  textFont(font);
  textSize(size * pixelMutliplier);
  text(string, x * pixelMutliplier, y * pixelMutliplier);
  pop();
}

function HexFloatToDec(hexStr) {
  [integerPart, floatPart] = hexStr.split('.');
  result = 0;
  for (let i in integerPart) {
    result += parseInt(integerPart[i], 16) * Math.pow(16, integerPart.length - i - 1);
  }
  for (let i in floatPart) {
    result += parseInt(floatPart[i], 16) * Math.pow(16, -i - 1);
  }

  return result;
}

function ReturnAbsoluteAcceleration(speed, acceleration) {
  speed += acceleration * speed / abs(speed);
  return speed;
}