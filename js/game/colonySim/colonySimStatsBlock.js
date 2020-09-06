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

}