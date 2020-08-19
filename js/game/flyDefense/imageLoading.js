//let splashScreenImage = document.createElement("img");
// ImageObject constructor(imageSrc, size, img)
//let splashScreenImage = new ImageObject('images/flyDefense/splashScreen.png');
//let fungusLossImage = document.createElement("img");
//let eggPlantedLossImage = document.createElement("img");
//let winTextImage = document.createElement("img");

let groundLayerImage1 = document.createElement("img");
let groundLayerImage2 = document.createElement("img");
let grassLayerImage1 = document.createElement("img");
let grassLayerImage2 = document.createElement("img");
let leavesLayerImage1 = document.createElement("img");
let leavesLayerImage2 = document.createElement("img");
let forageLayerImage1 = document.createElement("img");
let forageLayerImage2 = document.createElement("img");

let pheremoneStripImage1 = document.createElement("img");
let pheremoneStripImage2 = document.createElement("img");
let pheremoneGapFillImage = document.createElement("img");


//let fungusNestImage = document.createElement("img");
let groundMinimWalk0 = document.createElement("img");
let groundMinimWalk1 = document.createElement("img");
let groundMinimWalk2 = document.createElement("img");
let groundMinimWalk3 = document.createElement("img");
let groundMinimWalk4 = document.createElement("img");
let groundMinimWalk5 = document.createElement("img");
let groundMinimWalk6 = document.createElement("img");
let groundMinimWalk7 = document.createElement("img");
let groundMinimWalk8 = document.createElement("img");
let groundMinimWalk9 = document.createElement("img");
let groundMinimWalk10 = document.createElement("img");



let smallAntImage = document.createElement("img");

let leafMinimWalk0 = document.createElement("img");
let leafMinimWalk1 = document.createElement("img");
let leafMinimWalk2 = document.createElement("img");
let leafMinimWalk3 = document.createElement("img");
let leafMinimWalk4 = document.createElement("img");
let leafMinimWalk5 = document.createElement("img");
let leafMinimWalk6 = document.createElement("img");
let leafMinimWalk7 = document.createElement("img");
let leafMinimWalk8 = document.createElement("img");
let leafMinimWalk9 = document.createElement("img");
let leafMinimWalk10 = document.createElement("img");
let leafMinimWalk11 = document.createElement("img");

let flyFacingLeftImage = document.createElement('img');

let flyFacingLeft0Image = document.createElement('img');
let flyFacingLeft1Image = document.createElement('img');
let flyFacingLeft2Image = document.createElement('img');
let flyFacingLeft3Image = document.createElement('img');
let flyFacingLeft4Image = document.createElement('img');
let flyFacingLeft5Image = document.createElement('img');
let flyFacingLeft6Image = document.createElement('img');

let flyFacingRight0Image = document.createElement('img');
let flyFacingRight1Image = document.createElement('img');
let flyFacingRight2Image = document.createElement('img');
let flyFacingRight3Image = document.createElement('img');
let flyFacingRight4Image = document.createElement('img');
let flyFacingRight5Image = document.createElement('img');
let flyFacingRight6Image = document.createElement('img');

let bigAntWalkingImage0 = document.createElement('img');
let bigAntWalkingImage1 = document.createElement('img');
let bigAntWalkingImage2 = document.createElement('img');
let bigAntWalkingImage3 = document.createElement('img');
let bigAntWalkingImage4 = document.createElement('img');
let bigAntWalkingImage5 = document.createElement('img');
let bigAntWalkingImage6 = document.createElement('img');
let bigAntWalkingImage7 = document.createElement('img');
let bigAntWalkingImage8 = document.createElement('img');
let bigAntWalkingImage9 = document.createElement('img');
let bigAntWalkingImage10 = document.createElement('img');


let eggImage = document.createElement('img');

let leafImage = document.createElement('img');
let fungusImage = document.createElement('img');

let numberOfDefenseGameImagesToLoad = undefined;
let arrayOfDefenseGameImagesToLoad = [];

function loadDefenseGameImages()
{

	//arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: splashScreenImage, theFile: 'images/flyDefense/splashScreen.png'});
	//arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: fungusLossImage, theFile: 'images/flyDefense/fungusLossText.png'});
	//arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: eggPlantedLossImage, theFile: 'images/flyDefense/eggPlantedText.png'});
	//arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: winTextImage, theFile: 'images/flyDefense/winText.png'});

	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: groundLayerImage1, theFile: 'images/flyDefense/Official Placeholder Art/gravelDirtLayer1.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: groundLayerImage2, theFile: 'images/flyDefense/Official Placeholder Art/gravelDirtLayer2.png'});
	
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: grassLayerImage1, theFile: 'images/flyDefense/Official Placeholder Art/grassLayer1.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: grassLayerImage2, theFile: 'images/flyDefense/Official Placeholder Art/grassLayer2.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: leavesLayerImage1, theFile: 'images/flyDefense/Official Placeholder Art/leavesLayer1.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: leavesLayerImage2, theFile: 'images/flyDefense/Official Placeholder Art/leavesLayer2.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: forageLayerImage1, theFile: 'images/flyDefense/Official Placeholder Art/backgroundForageLayer1.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: forageLayerImage2, theFile: 'images/flyDefense/Official Placeholder Art/backgroundForageLayer2.png'});
	
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: pheremoneStripImage1, theFile: 'images/flyDefense/Official Placeholder Art/pheremoneStrip1.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: pheremoneStripImage2, theFile: 'images/flyDefense/Official Placeholder Art/pheremoneStrip2.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: pheremoneGapFillImage, theFile: 'images/flyDefense/Official Placeholder Art/pheremoneGapFill.png'});

	//arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: fungusNestImage, theFile: 'images/flyDefense/Official Placeholder Art/fungusNest.png'});

	
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: smallAntImage, theFile: 'images/flyDefense/Official Placeholder Art/minim.png'});

	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: leafMinimWalk0, theFile: 'images/flyDefense/minimWalk/Minim walk cycle_00000.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: leafMinimWalk1, theFile: 'images/flyDefense/minimWalk/Minim walk cycle_00001.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: leafMinimWalk2, theFile: 'images/flyDefense/minimWalk/Minim walk cycle_00002.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: leafMinimWalk3, theFile: 'images/flyDefense/minimWalk/Minim walk cycle_00003.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: leafMinimWalk4, theFile: 'images/flyDefense/minimWalk/Minim walk cycle_00004.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: leafMinimWalk5, theFile: 'images/flyDefense/minimWalk/Minim walk cycle_00005.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: leafMinimWalk6, theFile: 'images/flyDefense/minimWalk/Minim walk cycle_00006.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: leafMinimWalk7, theFile: 'images/flyDefense/minimWalk/Minim walk cycle_00007.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: leafMinimWalk8, theFile: 'images/flyDefense/minimWalk/Minim walk cycle_00008.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: leafMinimWalk9, theFile: 'images/flyDefense/minimWalk/Minim walk cycle_00009.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: leafMinimWalk10, theFile: 'images/flyDefense/minimWalk/Minim walk cycle_00010.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: leafMinimWalk11, theFile: 'images/flyDefense/minimWalk/Minim walk cycle_00011.png'});

	//arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: bigAntNeutralFlippedImage, theFile: 'images/flyDefense/creatures/bigAntNeutralFlippedImage.png'});
	
	
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: flyFacingLeftImage, theFile: 'images/flyDefense/creatures/flyFacingLeft.png'});
		
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: flyFacingLeft0Image, theFile: 'images/flyDefense/Fly/Fly_Upscaled_00000.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: flyFacingLeft1Image, theFile: 'images/flyDefense/Fly/Fly_Upscaled_00001.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: flyFacingLeft2Image, theFile: 'images/flyDefense/Fly/Fly_Upscaled_00002.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: flyFacingLeft3Image, theFile: 'images/flyDefense/Fly/Fly_Upscaled_00003.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: flyFacingLeft4Image, theFile: 'images/flyDefense/Fly/Fly_Upscaled_00004.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: flyFacingLeft5Image, theFile: 'images/flyDefense/Fly/Fly_Upscaled_00005.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: flyFacingLeft6Image, theFile: 'images/flyDefense/Fly/Fly_Upscaled_00006.png'});

	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: flyFacingRight0Image, theFile: 'images/flyDefense/Fly/Fly_Upscaled_00000_Flipped.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: flyFacingRight1Image, theFile: 'images/flyDefense/Fly/Fly_Upscaled_00001_Flipped.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: flyFacingRight2Image, theFile: 'images/flyDefense/Fly/Fly_Upscaled_00002_Flipped.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: flyFacingRight3Image, theFile: 'images/flyDefense/Fly/Fly_Upscaled_00003_Flipped.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: flyFacingRight4Image, theFile: 'images/flyDefense/Fly/Fly_Upscaled_00004_Flipped.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: flyFacingRight5Image, theFile: 'images/flyDefense/Fly/Fly_Upscaled_00005_Flipped.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: flyFacingRight6Image, theFile: 'images/flyDefense/Fly/Fly_Upscaled_00006_Flipped.png'});

	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: eggImage, theFile: 'images/flyDefense/creatures/egg.png'});

	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: leafImage, theFile: 'images/flyDefense/Official Placeholder Art/leaf.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: fungusImage, theFile: 'images/flyDefense/Official Placeholder Art/fungus.png'});

	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: bigAntWalkingImage0, theFile: 'images/flyDefense/BigAntWalking/Worker_With_Leaf Walking_00000.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: bigAntWalkingImage1, theFile: 'images/flyDefense/BigAntWalking/Worker_With_Leaf Walking_00001.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: bigAntWalkingImage2, theFile: 'images/flyDefense/BigAntWalking/Worker_With_Leaf Walking_00002.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: bigAntWalkingImage3, theFile: 'images/flyDefense/BigAntWalking/Worker_With_Leaf Walking_00003.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: bigAntWalkingImage4, theFile: 'images/flyDefense/BigAntWalking/Worker_With_Leaf Walking_00004.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: bigAntWalkingImage5, theFile: 'images/flyDefense/BigAntWalking/Worker_With_Leaf Walking_00005.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: bigAntWalkingImage6, theFile: 'images/flyDefense/BigAntWalking/Worker_With_Leaf Walking_00006.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: bigAntWalkingImage7, theFile: 'images/flyDefense/BigAntWalking/Worker_With_Leaf Walking_00007.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: bigAntWalkingImage8, theFile: 'images/flyDefense/BigAntWalking/Worker_With_Leaf Walking_00008.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: bigAntWalkingImage9, theFile: 'images/flyDefense/BigAntWalking/Worker_With_Leaf Walking_00009.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: bigAntWalkingImage10, theFile: 'images/flyDefense/BigAntWalking/Worker_With_Leaf Walking_00010.png'});



	numberOfDefenseGameImagesToLoad = arrayOfDefenseGameImagesToLoad.length;

    for (let imageToLoadIndex = 0; imageToLoadIndex < arrayOfDefenseGameImagesToLoad.length; imageToLoadIndex++)
    {
	  beginLoadingDefenseGameImage(arrayOfDefenseGameImagesToLoad[imageToLoadIndex].imageObjectBinding,
      encodeURI(arrayOfDefenseGameImagesToLoad[imageToLoadIndex].theFile),
      imageToLoadIndex);
    }


}

function beginLoadingDefenseGameImage(imageVariable, fileName, imageToLoadIndex) 
{
  imageVariable.src = fileName;
  imageVariable.onload = countLoadedDefenseGameImageAndLaunchIfReady(fileName, imageToLoadIndex);
}

let loadingImages = true;
function countLoadedDefenseGameImageAndLaunchIfReady(fileName, imageToLoadIndex)
{
  arrayOfDefenseGameImagesToLoad[imageToLoadIndex].loaded = true;
  numberOfDefenseGameImagesToLoad--;
  if (numberOfDefenseGameImagesToLoad === 0)
  {
  	
  	loadingImages = false;
  	splashScreenShouldBeShowing = true;
  	// setTimeout(function()
  	// 	{
  	// 		window.splashScreenShouldBeShowing = false
  	// 		defenseGame.countdownInterval.start();
  	// 	}, 7500);
  	// defenseGame.initialize();
  }
}
