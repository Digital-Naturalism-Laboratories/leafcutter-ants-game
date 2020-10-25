class ResultsScreen {
    constructor(level) {

        this.levels = {
            CUTTING: "cutting",
            DEFENSE: "defense",
            FLYING: "flying"
        }
        this.level = level

        this.pauseTimer = 150;

        leafcuttingUI.push(this);
    }

    draw(){

        renderer.textAlign = "center";
        renderer.fillStyle = "white";
        renderer.font = (60 * pixelSize) + "px SmallBoldPixel";
        
        switch (this.level) {
            case this.levels.CUTTING:

                renderer.fillText(string_LeavesCollected_COLON[currentLanguage] + leafcuttingScore, gameWidth/2, gameHeight * 0.33);
                
                if (leafcuttingScore > 1000) {
                    renderer.fillText(string_INCREDIBLE[currentLanguage], gameWidth/2, gameHeight * 0.5);
                }
                else if (leafcuttingScore > 800) {
                    renderer.fillText(string_AMAZING_WORK[currentLanguage], gameWidth/2, gameHeight * 0.5);
                }
                else if (leafcuttingScore > 600) {
                    renderer.fillText(string_GreatJob[currentLanguage], gameWidth/2, gameHeight * 0.5);
                }
                else if (leafcuttingScore > 400) {
                    renderer.fillText(string_OK[currentLanguage], gameWidth/2, gameHeight * 0.5);
                }
                else if (leafcuttingScore > 200) {
                    renderer.fillText(string_KEEP_TRYING[currentLanguage], gameWidth/2, gameHeight * 0.5);
                } else {
                    renderer.fillText(string_TRY_AGAIN[currentLanguage], gameWidth/2, gameHeight * 0.5);
                }

                if (this.pauseTimer < 0) {
                    renderer.fillText(string_ClickToContinue[currentLanguage], gameWidth/2, gameHeight * 0.66);
                }

                break;
            case this.levels.DEFENSE:
                break;
            case this.levels.FLYING:
                break;
            default:
        }  
        
    }

    update(){
        this.pauseTimer--;
    }

    event(){
    }

}