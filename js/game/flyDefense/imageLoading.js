let splashScreenImage = document.createElement("img");
// ImageObject constructor(imageSrc, size, img)
//let splashScreenImage = new ImageObject('images/flyDefense/splashScreen.png');
let fungusLossImage = document.createElement("img");
let eggPlantedLossImage = document.createElement("img");
let winTextImage = document.createElement("img");

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


let fungusNestImage = document.createElement("img");

let leftArrowButtonImage = document.createElement("img");
let rightArrowButtonImage = document.createElement("img");
let swatButtonImage = document.createElement("img");

let bigAntNeutralImage = document.createElement("img");
let bigAntFrontRightForwardImage = document.createElement('img');
let bigAntFrontLeftForwardImage = document.createElement('img');

let soldierFacingRightImage = document.createElement("img");
let soldierFacingLeftImage = document.createElement("img");

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



let bigAntNeutralFlippedImage = document.createElement("img");
let bigAntFrontRightForwardFlippedImage = document.createElement("img");
let bigAntFrontLeftForwardFlippedImage = document.createElement("img");

let bigAntSwatting1Image = document.createElement('img');
let bigAntSwatting2Image = document.createElement('img');
let bigAntSwatting3Image = document.createElement('img');
let bigAntSwatting4Image = document.createElement('img');


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


let eggImage = document.createElement('img');

let leafImage = document.createElement('img');
let fungusImage = document.createElement('img');

let numberOfDefenseGameImagesToLoad = undefined;
let arrayOfDefenseGameImagesToLoad = [];

function loadDefenseGameImages()
{
	
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: splashScreenImage, theFile: 'images/flyDefense/splashScreen.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: fungusLossImage, theFile: 'images/flyDefense/fungusLossText.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: eggPlantedLossImage, theFile: 'images/flyDefense/eggPlantedText.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: winTextImage, theFile: 'images/flyDefense/winText.png'});


	
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

	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: fungusNestImage, theFile: 'images/flyDefense/Official Placeholder Art/fungusNest.png'});


	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: leftArrowButtonImage, theFile: 'images/flyDefense/GUI/leftArrow.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: rightArrowButtonImage, theFile: 'images/flyDefense/GUI/rightArrow.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: swatButtonImage, theFile: 'images/flyDefense/GUI/swat.png'});

	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: bigAntNeutralImage, theFile: 'images/flyDefense/Official Placeholder Art/soldier.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: bigAntFrontRightForwardImage, theFile: 'images/flyDefense/creatures/bigAntFrontRightForward.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: bigAntFrontLeftForwardImage, theFile: 'images/flyDefense/creatures/bigAntFrontLeftForward.png'});

	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: soldierFacingRightImage, theFile: 'images/flyDefense/Official Placeholder Art/soldierFacingRight.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: soldierFacingLeftImage, theFile: 'images/flyDefense/Official Placeholder Art/soldierFacingLeft.png'});

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

	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: bigAntNeutralFlippedImage, theFile: 'images/flyDefense/creatures/bigAntNeutralFlippedImage.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: bigAntFrontRightForwardFlippedImage, theFile: 'images/flyDefense/creatures/bigAntFrontRightForwardFlipped.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: bigAntFrontLeftForwardFlippedImage, theFile: 'images/flyDefense/creatures/bigAntFrontLeftForwardFlipped.png'});

	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: bigAntSwatting1Image, theFile: 'images/flyDefense/creatures/bigAntSwattingRight90_1.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: bigAntSwatting2Image, theFile: 'images/flyDefense/creatures/bigAntSwattingRight30_1.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: bigAntSwatting3Image, theFile: 'images/flyDefense/creatures/bigAntSwattingRight60_1.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: bigAntSwatting4Image, theFile: 'images/flyDefense/creatures/bigAntSwattingRight90_2.png'});


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
