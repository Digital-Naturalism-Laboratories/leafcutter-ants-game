var isDebugModeEnabled = false;

function drawStatsBlock() {
    renderer.fillStyle = "white";
    renderer.textAlign = "left";
    renderer.font = (30 * pixelSize).toString() + "px SmallBoldPixel";

    renderer.fillText(string_LEAVES[currentLanguage] + Math.floor(colony.leaves) + "mg", 50 * pixelSize, gameHeight - (85 * pixelSize));
    renderer.fillText(string_FUNGUS[currentLanguage] + Math.floor(colony.fungus) + "mg", 50 * pixelSize, gameHeight - (65 * pixelSize));
    renderer.fillText(string_TotalEggsLaid[currentLanguage] + colony.totalEggsLaid, 50 * pixelSize, gameHeight - (15 * pixelSize));

    renderer.fillText(string_Population[currentLanguage] + colony.population, gameWidth - (250 * pixelSize), gameHeight - (85 * pixelSize));
    renderer.font = (30 * pixelSize).toString() + "px SmallBoldPixel";
    renderer.fillText(string_Workers[currentLanguage] + colony.workerCount, gameWidth - (250 * pixelSize), gameHeight - (60 * pixelSize));
    renderer.fillText(string_Brood[currentLanguage] + colony.broodCount, gameWidth - (250 * pixelSize), gameHeight - (40 * pixelSize));
    renderer.fillText(string_Reproductives[currentLanguage] + colony.reproductiveCount, gameWidth - (250 * pixelSize), gameHeight - (20 * pixelSize));


    renderer.fillStyle = "white";
    renderer.textAlign = "center";
    renderer.font = (10 * pixelSize).toString() + "px Pixelmania";
    //renderer.fillText("Click to mate and start a new colony!", queen.x * pixelSize, (queen.y + 30) * pixelSize);
    //renderer.fillText("Click to protect the colony's leaves!", 800, 75);
    renderer.textAlign = "left";

    renderer.fillStyle = "white";
    renderer.textAlign = "center";
    renderer.font = (10 * pixelSize).toString() + "px Pixelmania";
    //renderer.fillText("Click to help the workers collect leaves!", 200, 75);
    renderer.textAlign = "left";

    if (isDebugModeEnabled) drawDebugInfo();
}

function drawDebugInfo() {

    renderer.font = (16 * pixelSize) + "px SmallBoldPixel";
    renderer.fillStyle = 'white';

    renderer.fillText("Leaf Mass                           : " + colony.leaves, 20 * pixelSize, 40 * pixelSize);
    renderer.fillText("Fungus Mass                         : " + colony.fungus, 20 * pixelSize, 50 * pixelSize);
    renderer.fillText("Adults (Workers + Reproductives)    : " + colony.adultCount, 20 * pixelSize, 60 * pixelSize);
    renderer.fillText("Male Reproductive Count             : " + colony.maleReproductiveCount, 20 * pixelSize, 70 * pixelSize);
    renderer.fillText("Female Reproductive Count           : " + colony.femaleReproductiveCount, 20 * pixelSize, 80 * pixelSize);
    renderer.fillText("Genetic Diversity                   : " + colony.geneticDiversity, 20 * pixelSize, 90 * pixelSize);
    renderer.fillText("New Infections                      : " + colony.newInfections, 20 * pixelSize, 100 * pixelSize);
    renderer.fillText("Contaminants Cleaned                : " + colony.contaminantsCleaned, 20 * pixelSize, 110 * pixelSize);
    renderer.fillText("Dead Count                          : " + colony.deadCount, 20 * pixelSize, 120 * pixelSize);
    renderer.fillText("Colony Puberty Threshold            : " + colony.colonyPubertyThreshold, 20 * pixelSize, 130 * pixelSize);
    renderer.fillText("Colony Puberty Threshold Reached    : " + colony.colonyPubertyThresholdReached, 20 * pixelSize, 140 * pixelSize);

    this.colonyPubertyThresholdReached = false;
}