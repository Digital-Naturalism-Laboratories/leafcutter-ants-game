//3 bindings to fill in. Also, change the names of the pngs that are 10 and above to have similar naming pattern.
//example, 00010, not 0010

var baseName = 'Minim walk cycle_000'; //**fill me in** similar part of filepath, ex: 'Worker_no_Leaf Walking_000';

var animPics = []; //array for holding individual pngs of sheet

var picsToLoad = 12; //**fill me in** total number of pngs 
var totalPics = 12; //**fill me in** total number of pngs

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
	console.log('dimensionHeight: ' + dimensionHeight);

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