/*
  helper_functions.js
  Super Mario Bros.

  GAM100
  Fall 2019

  JunHo Hwang did ---
  DoYoon Kim did ---
  SeungGeon Kim Wrote DrawSprite();

  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/



//Translates & draws sprites (16x16 system onto 32x32 system)
function DrawSprite(sprite, x, y) {
    image(sprite, x * pixelMutliplier, y * pixelMutliplier, sprite.width * pixelMutliplier, sprite.height * pixelMutliplier);
}