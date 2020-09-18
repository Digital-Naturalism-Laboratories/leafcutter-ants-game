const MAINMENUUI = 0;

var mainMenuUI = [];

var mainMenuFontSize;

var titleScreenSprites = [];
var animationFrameLength = 5;
var animationFrameCount = 29;
var animationFrameCurrent = 0;
var animationTimer = 0

var isGameSelectEnabled = false;

var gameModes = [
    "COLONY",
    "CUTTER",
    "DEFENSE",
    "FLIGHT"
];

var languages = [{
        text_label: "Español"
    },

    {
        text_label: "English"
    }
]

var currentLanguage = ESPAÑOL;

var mainMenuSFX = [
    document.createElement('audio')
]

var mainMenuSFXPaths = [
    "audio/SFX/UI Menu Buttons.mp3"
]

var SFX_BUTTON = 0;

function setupMainMenuUI() {
    titleScreenSprites.push(new Sprite(tr(vec2(gameWidth / 2, gameHeight / 2), vec2(gameWidth / 1000, gameHeight / 750)),
        new ImageObject("images/Animations/Title_Screen_Spritesheet_ES.png", vec2(1000, 750))));
    titleScreenSprites.push(new Sprite(tr(vec2(gameWidth / 2, gameHeight / 2), vec2(gameWidth / 1000, gameHeight / 750)),
        new ImageObject("images/Animations/Title_Screen_Spritesheet.png", vec2(1000, 750))));

    mainMenuFontSize = 34 * pixelSize;
    
    menuBigPlayButton = new Button(tr(vec2(gameWidth*0.2,gameHeight*0.67), vec2(gameWidth*0.6, gameHeight*0.2)),
        "#00000000", "#00000000", "#00000000");
    mainMenuUI.push(menuBigPlayButton);

    languageBtn = new TextButton(tr(vec2(1, gameHeight-(btnSize.y*2)), vec2(gameWidth-2, btnSize.y*2)),
        new Label(tr(), string_LANGUAGE[currentLanguage] + (currentLanguage == ENGLISH ? languages[1].text_label : languages[0].text_label), mainMenuFontSize.toString() + "px SmallBoldPixel", "white", 0),
        new Button(tr(), "#00000044", "#00000044", "#00000044"), 
        "");
    mainMenuUI.push(languageBtn);

    if (isGameSelectEnabled)
    {
        gameModeButtons = [];

        emptyMenuBtn = new TextButton(tr(vec2(), btnSize),
            new Label(tr(), "", mainMenuFontSize.toString() + "px SmallBoldPixel", "white", 0),
            new Button(tr(), "#00000000", "#00000000", "#00000000"),
            "");
        gameModeButtons.push(emptyMenuBtn);

        prevMenuBtn = new TextButton(tr(vec2(), btnSize),
            new Label(tr(), "PREV", mainMenuFontSize.toString() + "px SmallBoldPixel", "white", 0),
            new Button(tr(), "#00000011", "#00000055", "#00000033"),
            "");
        gameModeButtons.push(prevMenuBtn);

        playMenuBtn = new TextButton(tr(vec2(), btnSize),
            new Label(tr(), gameModes[0], mainMenuFontSize.toString() + "px SmallBoldPixel", "white", 0),
            new Button(tr(), "#00000000", "#00000044", "#00000022"),
            "");
        gameModeButtons.push(playMenuBtn);

        nextMenuBtn = new TextButton(tr(vec2(), btnSize),
            new Label(tr(), "NEXT", mainMenuFontSize.toString() + "px SmallBoldPixel", "white", 0),
            new Button(tr(), "#00000011", "#00000055", "#00000033"),
            "");
        gameModeButtons.push(nextMenuBtn);

        mainMenuUI.push(
            new FlexGroup(tr(vec2(0, gameHeight*0.86), vec2(gameWidth, 60 * pixelSize)),
            new SubState(tr(), gameModeButtons),
            false, 
            vec2(), 
            vec2(5, 1), 
            true));
    }
     
    for (let i = 0; i < mainMenuSFX.length; i++) {
      mainMenuSFX[i].setAttribute('src', mainMenuSFXPaths[i]);
      mainMenuSFX[i].volume = 0.25;
    }
}

function mainMenuUIResize()
{
    mainMenuFontSize = 34 * pixelSize;

    for(let i = 0; i < titleScreenSprites.length; i++)
    {
        titleScreenSprites[i].transform.position = vec2(gameWidth/2, gameHeight/2);
        titleScreenSprites[i].transform.scale = vec2(gameWidth/1000, gameHeight/750);
    }

    menuBigPlayButton.transform.position = vec2(gameWidth*0.2,gameHeight*0.67);
    menuBigPlayButton.transform.scale = vec2(gameWidth*0.6, gameHeight*0.2);

    languageBtn.transform.position = vec2(1, gameHeight-(btnSize.y*2));
    languageBtn.transform.scale = vec2(gameWidth-2, btnSize.y*2);
    languageBtn.label.font = mainMenuFontSize.toString() + "px SmallBoldPixel";

    if(isGameSelectEnabled)
    {
        emptyMenuBtn.transform.scale = btnSize;
        emptyMenuBtn.label.font = mainMenuFontSize.toString() + "px SmallBoldPixel";
        prevMenuBtn.transform.scale = btnSize;
        prevMenuBtn.label.font = mainMenuFontSize.toString() + "px SmallBoldPixel";
        playMenuBtn.transform.scale = btnSize;
        playMenuBtn.label.font = mainMenuFontSize.toString() + "px SmallBoldPixel";
        nextMenuBtn.transform.scale = btnSize;
        nextMenuBtn.label.font = mainMenuFontSize.toString() + "px SmallBoldPixel";

        mainMenuUI[2].transform.position = vec2(0, gameHeight*0.86);
        mainMenuUI[2].transform.scale = vec2(gameWidth, 60 * pixelSize);
    }
}

function mainMenuUICustomDraw(deltaTime) {
    var inSize = {
        x: 1000,
        y: 750
    }
    var inPos = {
        x: (animationFrameCurrent * inSize.x),
        y: 0
    }
    if (animationTimer > animationFrameLength - 1) {
        animationFrameCurrent++
        animationTimer = 0;
    }
    if (animationFrameCurrent >= animationFrameCount) {
        animationFrameCurrent = 0;
    }
    animationTimer++
    titleScreenSprites[currentLanguage].drawScIn(inPos, inSize);
}

function mainMenuUICustomUpdate(deltaTime) {}

function mainMenuUICustomEvents(deltaTime)
{

    if(menuBigPlayButton.output == UIOUTPUT_SELECT)
    {
        ui.stateIndex = COLONYGAMEINTROUI;
        //ui.stateIndex = DEFENSEGAMEINTROUI;
        menuBigPlayButton.resetOutput();
      
        if (!mainMenuSFX[SFX_BUTTON].isPlaying) {
          mainMenuSFX[SFX_BUTTON].play();
        }
    }
    // else if(languageBtn.button.output == UIOUTPUT_SELECT)
    // {
    //     if(currentLanguage == ENGLISH)

    if (!isGameSelectEnabled) {
        if(menuBigPlayButton.output == UIOUTPUT_SELECT) {
            ui.stateIndex = COLONYGAMEINTROUI;
            //ui.stateIndex = DEFENSEGAMEINTROUI;
            if (defenseGame.hasBeenPlayedOnce)
            {
                defenseGame.restartIntervals();
            }
        } else if(languageBtn.button.output == UIOUTPUT_SELECT)
        {
          
          if (!mainMenuSFX[SFX_BUTTON].isPlaying) {
                mainMenuSFX[SFX_BUTTON].play();
           }
            var done = false;
            for (let i = 1; i < languages.length; i++) {
                if (languageBtn.label.text == string_LANGUAGE[currentLanguage] + languages[i].text_label) {
                    languageBtn.label.text = string_LANGUAGE[0] + languages[i - 1].text_label;
                    done = true;
                    break;
                }
            }
            if (!done) languageBtn.label.text = string_LANGUAGE[1] + languages[languages.length - 1].text_label;
            languageBtn.button.resetOutput();

            if (languageBtn.label.text == string_LANGUAGE[0] + "Español") {
                currentLanguage = ESPAÑOL;
            } else {
                currentLanguage = ENGLISH;
            }

        }
    } else if (playMenuBtn.button.output == UIOUTPUT_SELECT || menuBigPlayButton.output == UIOUTPUT_SELECT) {

        if (playMenuBtn.label.text == gameModes[0]) {
            ui.stateIndex = COLONYGAMEINTROUI;
        } else if (playMenuBtn.label.text == gameModes[1]) {
            ui.stateIndex = LEAFCUTTINGINTROUI;
        }
        else if(playMenuBtn.label.text == gameModes[2])

        {
            currentLanguage = ESPAÑOL;
            languageBtn.label.text = string_LANGUAGE[0] + languages[0].text_label;
        }
        else if(currentLanguage == ESPAÑOL)
        {
            currentLanguage = ENGLISH;
            languageBtn.label.text = string_LANGUAGE[1] + languages[1].text_label;
        }
        languageBtn.button.resetOutput();
    }

    if(isGameSelectEnabled)
    {
        if(playMenuBtn.button.output == UIOUTPUT_SELECT || menuBigPlayButton.output == UIOUTPUT_SELECT)
        {
            if(playMenuBtn.label.text == gameModes[0]) 
            {
                ui.stateIndex = COLONYGAMEINTROUI;
            }
            else if(playMenuBtn.label.text == gameModes[1])
            {
                ui.stateIndex = LEAFCUTTINGINTROUI;
            }
            else if(playMenuBtn.label.text == gameModes[2])
            {
                ui.stateIndex = DEFENSEGAMEINTROUI;
            }
            else if(playMenuBtn.label.text == gameModes[3])
            {
                ui.stateIndex = FLIGHTGAMEINTROUI;
                
            }
            playMenuBtn.button.resetOutput();
            menuBigPlayButton.resetOutput;
        }
        else if(prevMenuBtn.button.output == UIOUTPUT_SELECT)
        {
            var done = false;
            for(let i = 1; i < gameModes.length; i++)
            {
                if(playMenuBtn.label.text == gameModes[i])
                {
                    playMenuBtn.label.text = gameModes[i - 1];
                    done = true;
                    break;
                }
            }
            if(!done) playMenuBtn.label.text = gameModes[gameModes.length - 1];
            prevMenuBtn.button.resetOutput();
        }
        else if(nextMenuBtn.button.output == UIOUTPUT_SELECT)
        {
            var done = false;
            for(let i = 0; i < gameModes.length - 1; i++)
            {
                if(playMenuBtn.label.text == gameModes[i])
                {
                    playMenuBtn.label.text = gameModes[i + 1];
                    done = true;
                    break;
                }

            }
            if(!done) playMenuBtn.label.text = gameModes[0];
            nextMenuBtn.button.resetOutput();
        }

    }

}