let splashScreenImage = document.createElement("img");
// ImageObject constructor(imageSrc, size, img)
//let splashScreenImage = new ImageObject('images/flyDefense/splashScreen.png');
let fungusLossImage = document.createElement("img");
let eggPlantedLossImage = document.createElement("img");
let winTextImage = document.createElement("img");

let skyBackgroundImage = document.createElement("img");
let groundBackgroundImage = document.createElement("img");
let groundBackground2Image = document.createElement("img");

let fungusNestImage = document.createElement("img");

let leftArrowButtonImage = document.createElement("img");
let rightArrowButtonImage = document.createElement("img");
let swatButtonImage = document.createElement("img");

let bigAntNeutralImage = document.createElement("img");
let bigAntFrontRightForwardImage = document.createElement('img');
let bigAntFrontLeftForwardImage = document.createElement('img');

let smallAntImage = document.createElement("img");

let bigAntNeutralFlippedImage = document.createElement("img");
let bigAntFrontRightForwardFlippedImage = document.createElement("img");
let bigAntFrontLeftForwardFlippedImage = document.createElement("img");

let bigAntSwatting1Image = document.createElement('img');
let bigAntSwatting2Image = document.createElement('img');
let bigAntSwatting3Image = document.createElement('img');
let bigAntSwatting4Image = document.createElement('img');


let flyFacingLeftImage = document.createElement('img');
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


	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: skyBackgroundImage, theFile: 'images/flyDefense/Official Placeholder Art/skyBackgroundImage.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: groundBackgroundImage, theFile: 'images/flyDefense/Official Placeholder Art/groundCrossSection.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: groundBackground2Image, theFile: 'images/flyDefense/Official Placeholder Art/groundCrossSection2.png'});

	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: fungusNestImage, theFile: 'images/flyDefense/Official Placeholder Art/fungusNest.png'});


	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: leftArrowButtonImage, theFile: 'images/flyDefense/GUI/leftArrow.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: rightArrowButtonImage, theFile: 'images/flyDefense/GUI/rightArrow.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: swatButtonImage, theFile: 'images/flyDefense/GUI/swat.png'});

	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: bigAntNeutralImage, theFile: 'images/flyDefense/Official Placeholder Art/soldier.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: bigAntFrontRightForwardImage, theFile: 'images/flyDefense/creatures/bigAntFrontRightForward.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: bigAntFrontLeftForwardImage, theFile: 'images/flyDefense/creatures/bigAntFrontLeftForward.png'});

	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: smallAntImage, theFile: 'images/flyDefense/Official Placeholder Art/minim.png'});


	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: bigAntNeutralFlippedImage, theFile: 'images/flyDefense/creatures/bigAntNeutralFlippedImage.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: bigAntFrontRightForwardFlippedImage, theFile: 'images/flyDefense/creatures/bigAntFrontRightForwardFlipped.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: bigAntFrontLeftForwardFlippedImage, theFile: 'images/flyDefense/creatures/bigAntFrontLeftForwardFlipped.png'});

	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: bigAntSwatting1Image, theFile: 'images/flyDefense/creatures/bigAntSwattingRight90_1.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: bigAntSwatting2Image, theFile: 'images/flyDefense/creatures/bigAntSwattingRight30_1.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: bigAntSwatting3Image, theFile: 'images/flyDefense/creatures/bigAntSwattingRight60_1.png'});
	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: bigAntSwatting4Image, theFile: 'images/flyDefense/creatures/bigAntSwattingRight90_2.png'});


	arrayOfDefenseGameImagesToLoad.push({imageObjectBinding: flyFacingLeftImage, theFile: 'images/flyDefense/creatures/flyFacingLeft.png'});
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
