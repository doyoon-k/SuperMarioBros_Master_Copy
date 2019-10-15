/*
  helper_functions.js
  Super Mario Bros.

  GAM100
  Fall 2019

  JoonHo Hwang Wrote HexFloatToDec() and DrawText().
  DoYoon Kim improved DrawSprite() and wrote CheckIsRectContainsThisPoint
  SeungGeon Kim Wrote DrawSprite() and ReturnAbsoluteAcceleration().

  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/



//Translates & flips & draws sprites (16x16 system onto 32x32 system if pixelmultiplier is 2)
function DrawSprite(sprite, x, y, isFlippedHorizontally = false, isFlippedVertically = false, initialX = 100) {
  
  //Keep working on this here

  x -= (game.camera.x - initialX);

  xMultiplier = 1;
  yMultiplier = 1;

  baseHeight = 0;

  push();

  //base position
  ellipse(x * pixelMultiplier, y * pixelMultiplier, 25);

  if (isFlippedVertically) {
    baseHeight = sprite.height;
    yMultiplier = -1;
  } else {
    yMultiplier = 1;
  }
  if (isFlippedHorizontally) {
    xMultiplier = -1;
  } else {
    xMultiplier = 1;
  }

  translate((x - xMultiplier * sprite.width / 2) * pixelMultiplier, (y - yMultiplier * sprite.height) * pixelMultiplier);

  //Drawing position
  ellipse(0, 0, 5);

  scale(xMultiplier, yMultiplier);

  //x and y coordinate of an object is center-bottom.
  image(sprite, 0, baseHeight * pixelMultiplier, sprite.width * pixelMultiplier, sprite.height * pixelMultiplier);

  pop();

}

function DrawText(string, x, y, size, color = 255) {
  push();
  fill(color);
  textFont(font);
  textSize(size * pixelMultiplier);
  text(string, x * pixelMultiplier, y * pixelMultiplier);
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

function CheckIsRectContainsThisPoint(x,y,LeftX,topY,RightX,bottomY)
{
  return ((LeftX<x)&&(x<RightX))?(((topY<y)&&(y<bottomY))?true:false):false;
}

function clamp(value,min,max)
{
  if(value<min)
  {
    return min;
  }
  else if(value>max)
  {
    return max;
  }
  else 
  {
    return value;
  }
}

function setFlowState(state) {
  game.interfaceFlow.flowState = state;
}