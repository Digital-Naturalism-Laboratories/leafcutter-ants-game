
const COLONYGAMEUI = 2;
var colonyGameUI = [];

var groundBG = document.createElement('img');
groundBG.src = 'Visual Assets/Ground_Cross_Section.png';

function setupColonyGameUI()
{

}

function colonyGameUICustomDraw(deltaTime)
{

    renderer.drawImage(groundBG, 0, 0, gameWidth, gameHeight);

}

function colonyGameUICustomEvents(deltaTime)
{
    
}