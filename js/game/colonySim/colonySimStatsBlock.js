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

    //Full Screen Button
    //colorRect(gameWidth - 105, gameHeight * 0.8, 100, 50, 'white');
    //renderer.fillStyle = "black";
    renderer.font = "24px SmallBoldPixel";
    //renderer.fillText("Full Screen", gameWidth - 100, gameHeight * 0.84);

    //draw full screen button
    renderer.drawImage(fullscreen_button, 0, 0, gameWidth, gameHeight);

    //draw mute/unmute buttons
    if (defenseGame.audioManager.isMutingEverything){
        renderer.drawImage(unmute_button, 0, 0, gameWidth, gameHeight);
    } else {
        renderer.drawImage(mute_button, 0, 0, gameWidth, gameHeight);
    }

}