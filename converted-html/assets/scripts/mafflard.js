/**
 * @author     James Wright <lioneljitro@gmail.com>
 * @version    0.1
 */
// retrieve the elements
head = document.getElementById("beastHead");
mouth = document.getElementById("beastMouth");
// State of beast
neutral = true; // Head centre looking foward
mouthMove = true;
mouth.classList.add("bigMouth");
// Full list of animations
var headAnimations=new Array("praiseSun","rotateFull","bigHead","systemFailure","depower","rightLook");
// A list to ensure animations aren't repeated too often.
var animationsLeft = headAnimations.slice(0);
 // var headAnimations=new Array("praiseSun");
/**
 * Adds an animation to an element
 *
 * All classes are stripped from the element and then a new class is added.
 *
 * @element         The dom that will have the classes manipulated.
 * @animationClass  The class that will be added.
 */
function reAnimate(element, animationClass)
{
  element.className = "";
  element.offsetWidth = element.offsetWidth;
  element.classList.add(animationClass);
}

/** Gives and animation to the object
 *
 *  @obj The object that will be given
 *  @str An extra string for the secondary object (eyes)
 */
function giveAnimation(obj,str)
{
  if (animationsLeft.length == 0)
  {
    animationsLeft = headAnimations.slice(0);
  }
  var tRan = Math.floor(Math.random()*animationsLeft.length);
  if (animationsLeft[tRan] == "systemFailure")
  {
    mouthMove = false;
  }
  else
  {
    mouthMove = true;
    reAnimate(mouth,"bigMouth");
  }
  reAnimate(obj,animationsLeft[tRan]);
  reAnimate(eyes,str+animationsLeft[tRan]);
  // Remove the last used animation
  animationsLeft.splice(tRan,1);
}

// head.addEventListener("click", function(e){
//   e.preventDefault;
//   reAnimate(this,"depower");
//   mouth.classList.add("bigMouth");
// }, false);

/**
 * Webkit head event listener.
 */
head.addEventListener('webkitAnimationEnd', function(event) {
  var aniName = event.animationName;

  if(aniName!="mouthMoveWK" && (aniName.indexOf("eye") == -1))
  {
    setTimeout(function(){giveAnimation(head,"eye")},
      Math.floor(Math.random()*(1500-200+1)+200));
  }
}, false );

/**
 * Head event listener.
 */
head.addEventListener('animationend', function(event) {
  var aniName = event.animationName;
  if(aniName!="mouthMove" && (aniName.indexOf("eye") == -1))
  {
    giveAnimation(head,"eye");
  }
}, false );

/**
 * Webkit mouth event listener.
 */
mouth.addEventListener('webkitAnimationEnd', function(event) {
  if(mouthMove)
    reAnimate(mouth,"bigMouth");
}, false );

/**
 * Moz and opera mouth event listener.
 */
mouth.addEventListener('animationend', function(event) {
  if(mouthMove)
    reAnimate(this,"bigMouth");
}, false );

