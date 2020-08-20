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

let groundMinimWalkingLeftSpriteSheet = document.createElement("img");
let groundMinimWalkingRightSpriteSheet = document.createElement("img");

let leafMinimWalkingSpriteSheet = document.createElement("img");

let flyFacingLeftSpriteSheet = document.createElement('img');
let flyFacingRightSpriteSheet = document.createElement('img');

let bigAntWalkingSpriteSheet = document.createElement('img');
let bigAntWalkingInfectedSpriteSheet = document.createElement('img');

//let eggImage = document.createElement('img');

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

	
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: groundMinimWalkingLeftSpriteSheet, theFile: 'images/flyDefense/GroundMinimWalking/groundMinimWalkingLeftSpriteSheet.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: groundMinimWalkingRightSpriteSheet, theFile: 'images/flyDefense/GroundMinimWalking/groundMinimWalkingRightSpriteSheet.png'});
	//63 x 38
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: leafMinimWalkingSpriteSheet, theFile: 'images/flyDefense/LeafMinimWalking/leafMinimWalking.png'});
	//120 x 108
	
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: flyFacingLeftSpriteSheet, theFile: 'images/flyDefense/Fly/flyFacingLeftSpriteSheet.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: flyFacingRightSpriteSheet, theFile: 'images/flyDefense/Fly/flyFacingRightSpriteSheet.png'});

	//arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: eggImage, theFile: 'images/flyDefense/creatures/egg.png'});

	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: leafImage, theFile: 'images/flyDefense/leaf.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: fungusImage, theFile: 'images/flyDefense/Official Placeholder Art/fungus.png'});

	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: bigAntWalkingSpriteSheet, theFile: 'images/flyDefense/BigAntWalking/bigAntWalkingSpriteSheet.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: bigAntWalkingInfectedSpriteSheet, theFile: 'images/flyDefense/BigAntWalking/bigAntWalkingSpriteSheet.png'});


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
