window.onload = function()
{
	let canvas = document.getElementById('canvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	let canvasContext = canvas.getContext('2d');

	let background = document.createElement('img');
	background.src = 'background.png';

	let midpointDimensions = {width: 1000, height: 500};
	let maxPossibleDimensions = {width: 2000, height: 1000};
	if (maxPossibleDimensions.width > canvas.width)
	{
		maxPossibleDimensions.width = canvas.width;
	}
	if (maxPossibleDimensions.height > canvas.height)
	{
		maxPossibleDimensions.height = canvas.height;
	}

	let minimumPossibleDimensions = {width: 750, height: 300};

	let arrayOfDimensions = [maxPossibleDimensions,midpointDimensions,minimumPossibleDimensions];
	let arrayOfDimensionsIndex = 0;
	let currentDimensions = arrayOfDimensions[arrayOfDimensionsIndex];

	let backgroundStartingX = 0;
	let backgroundStartingY = 0;

	function toggleDimensions()
	{
		arrayOfDimensionsIndex++;
		if (arrayOfDimensionsIndex > arrayOfDimensions.length - 1)
		{
			arrayOfDimensionsIndex = 0;
			backgroundStartingX = 0;
			backgroundStartingY = 0;
		}	
		if (arrayOfDimensionsIndex !== 0)
		{
			backgroundStartingX = canvas.width/2 - arrayOfDimensions[arrayOfDimensionsIndex].width/2;
			backgroundStartingY = canvas.height/2 - arrayOfDimensions[arrayOfDimensionsIndex].height/2;

		}
		canvasContext.clearRect(0,0, canvas.width,canvas.height);
		canvasContext.drawImage(background, backgroundStartingX,backgroundStartingY, 
								arrayOfDimensions[arrayOfDimensionsIndex].width,arrayOfDimensions[arrayOfDimensionsIndex].height);
	}

	document.addEventListener('mousedown', toggleDimensions, false);
	background.onload = function()
	{
		canvasContext.drawImage(background, backgroundStartingX,backgroundStartingY, 
								arrayOfDimensions[arrayOfDimensionsIndex].width,arrayOfDimensions[arrayOfDimensionsIndex].height);
	}
}