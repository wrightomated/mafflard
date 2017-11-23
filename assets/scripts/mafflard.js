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
var headAnimations=new Array("rotateFull","systemFailure","depower","rightLook");

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
function giveAnimation(obj,str){
  var tRan = Math.floor(Math.random()*headAnimations.length);
  reAnimate(obj,headAnimations[tRan]);
  reAnimate(eyes,str+headAnimations[tRan]);
}

head.addEventListener("click", function(e){
  e.preventDefault;
  reAnimate(this,"depower");
  mouth.classList.add("bigMouth");
}, false);

/**
 * Webkit head event listener.
 */
head.addEventListener('webkitAnimationEnd', function(event) {
  var aniName = event.animationName;
  if(aniName!="mouthMoveWK" && (aniName.indexOf("eye") == -1))
  {
    giveAnimation(head,"eye");
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

