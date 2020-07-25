let splashScreenImage = document.createElement("img");
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

let numberOfImagesToLoad = undefined;
let arrayOfImagesToLoad = [];
function loadImages()
{
	arrayOfImagesToLoad.push({imageObjectBinding: splashScreenImage, theFile: 'images/splashScreen.png'});
	arrayOfImagesToLoad.push({imageObjectBinding: fungusLossImage, theFile: 'images/fungusLossText.png'});
	arrayOfImagesToLoad.push({imageObjectBinding: eggPlantedLossImage, theFile: 'images/eggPlantedText.png'});
	arrayOfImagesToLoad.push({imageObjectBinding: winTextImage, theFile: 'images/winText.png'});


	arrayOfImagesToLoad.push({imageObjectBinding: skyBackgroundImage, theFile: 'images/Official Placeholder Art/skyBackgroundImage.png'});
	arrayOfImagesToLoad.push({imageObjectBinding: groundBackgroundImage, theFile: 'images/Official Placeholder Art/groundCrossSection.png'});
	arrayOfImagesToLoad.push({imageObjectBinding: groundBackground2Image, theFile: 'images/Official Placeholder Art/groundCrossSection2.png'});

	arrayOfImagesToLoad.push({imageObjectBinding: fungusNestImage, theFile: 'images/Official Placeholder Art/fungusNest.png'});


	arrayOfImagesToLoad.push({imageObjectBinding: leftArrowButtonImage, theFile: 'images/GUI/leftArrow.png'});
	arrayOfImagesToLoad.push({imageObjectBinding: rightArrowButtonImage, theFile: 'images/GUI/rightArrow.png'});
	arrayOfImagesToLoad.push({imageObjectBinding: swatButtonImage, theFile: 'images/GUI/swat.png'});

	arrayOfImagesToLoad.push({imageObjectBinding: bigAntNeutralImage, theFile: 'images/Official Placeholder Art/soldier.png'});
	arrayOfImagesToLoad.push({imageObjectBinding: bigAntFrontRightForwardImage, theFile: 'images/creatures/bigAntFrontRightForward.png'});
	arrayOfImagesToLoad.push({imageObjectBinding: bigAntFrontLeftForwardImage, theFile: 'images/creatures/bigAntFrontLeftForward.png'});

	arrayOfImagesToLoad.push({imageObjectBinding: smallAntImage, theFile: 'images/Official Placeholder Art/minim.png'});


	arrayOfImagesToLoad.push({imageObjectBinding: bigAntNeutralFlippedImage, theFile: 'images/creatures/bigAntNeutralFlippedImage.png'});
	arrayOfImagesToLoad.push({imageObjectBinding: bigAntFrontRightForwardFlippedImage, theFile: 'images/creatures/bigAntFrontRightForwardFlipped.png'});
	arrayOfImagesToLoad.push({imageObjectBinding: bigAntFrontLeftForwardFlippedImage, theFile: 'images/creatures/bigAntFrontLeftForwardFlipped.png'});

	arrayOfImagesToLoad.push({imageObjectBinding: bigAntSwatting1Image, theFile: 'images/creatures/bigAntSwattingRight90_1.png'});
	arrayOfImagesToLoad.push({imageObjectBinding: bigAntSwatting2Image, theFile: 'images/creatures/bigAntSwattingRight30_1.png'});
	arrayOfImagesToLoad.push({imageObjectBinding: bigAntSwatting3Image, theFile: 'images/creatures/bigAntSwattingRight60_1.png'});
	arrayOfImagesToLoad.push({imageObjectBinding: bigAntSwatting4Image, theFile: 'images/creatures/bigAntSwattingRight90_2.png'});


	arrayOfImagesToLoad.push({imageObjectBinding: flyFacingLeftImage, theFile: 'images/creatures/flyFacingLeft.png'});
	arrayOfImagesToLoad.push({imageObjectBinding: eggImage, theFile: 'images/creatures/egg.png'});

	arrayOfImagesToLoad.push({imageObjectBinding: leafImage, theFile: 'images/Official Placeholder Art/leaf.png'});
	arrayOfImagesToLoad.push({imageObjectBinding: fungusImage, theFile: 'images/Official Placeholder Art/fungus.png'});

	numberOfImagesToLoad = arrayOfImagesToLoad.length;

    for (let imageToLoadIndex = 0; imageToLoadIndex < arrayOfImagesToLoad.length; imageToLoadIndex++)
    {
	  beginLoadingImage(arrayOfImagesToLoad[imageToLoadIndex].imageObjectBinding,
      encodeURI(arrayOfImagesToLoad[imageToLoadIndex].theFile),
      imageToLoadIndex);
    }


}

function beginLoadingImage(imageVariable, fileName, imageToLoadIndex) 
{
  imageVariable.src = fileName;
  imageVariable.onload = countLoadedImageAndLaunchIfReady(fileName, imageToLoadIndex);
}

let loadingImages = true;
function countLoadedImageAndLaunchIfReady(fileName, imageToLoadIndex)
{
  arrayOfImagesToLoad[imageToLoadIndex].loaded = true;
  numberOfImagesToLoad--;
  if (numberOfImagesToLoad === 0)
  {
  	loadingImages = false;
  	splashScreenShouldBeShowing = true;
  	setTimeout(function()
  		{
  			window.splashScreenShouldBeShowing = false
  			leafcutterGame.countdownInterval.start();
  		}, 7500);
  	leafcutterGame.initialize();
  }
}
