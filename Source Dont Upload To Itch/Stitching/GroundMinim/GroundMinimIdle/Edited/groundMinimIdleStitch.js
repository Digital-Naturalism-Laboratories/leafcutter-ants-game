var baseName = 'Worker_no_Leaf Walking_000';

var animPics = [];

var picsToLoad = 22;
var totalPics = 22;

var canvas, canvasContext;

window.onload = function()
{
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	loadImages();
}

function loadingDoneSoStartGame()
{
	var dimensionWidth = animPics[0].width;
	var dimensionHeight = animPics[0].height;

	console.log('dimensionWidth: ' + dimensionWidth);

	canvas.width = dimensionWidth*totalPics;
	canvas.height = dimensionHeight;

	for (let i = 0; i < totalPics; i++)
	{
		canvasContext.drawImage(animPics[i], i*dimensionWidth,0, dimensionWidth,dimensionHeight);
	}
}

function countLoadedImageAndLaunchIfReady()
{
	picsToLoad--;
	console.log(picsToLoad);
	if (picsToLoad === 0)
	{
		loadingDoneSoStartGame();
	}
}

function beginLoadingImage(imgVar, filename)
{
	imgVar.onload = countLoadedImageAndLaunchIfReady;
	imgVar.src = filename;
}

function loadImageForAnimCode(index, filename)
{
	animPics[index] = document.createElement("img");
	beginLoadingImage(animPics[index],filename);
}


function loadImages()
{
	var imageList = [];
	
	var stringedIndex = undefined;
	for (let i = 0; i < picsToLoad; i++)
	{
		
		stringedIndex = i.toString();
		console.log(stringedIndex);
		indexForFilepath = stringedIndex;
		
		var filename = baseName+stringedIndex+'.png';
		console.log(filename);
		imageList.push({index: i, theFile: filename})
		loadImageForAnimCode(imageList[i].index, imageList[i].theFile);
	}
}