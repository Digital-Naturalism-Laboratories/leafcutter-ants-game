class Colony {
    constructor() {

        //colony population stats
        this.population = 1; // Adults+Brood
        this.adultCount = 0; // Workers + Reproductives
        this.broodCount = 0;
        this.workerCount = 0;
        this.maleReproductiveCount = 0;
        this.femaleReproductiveCount = 0;
        this.reproductiveCount = 0; //  Male REPRO + Female REPRO+QUEEN 
        this.deadCount = 0;
        this.totalEggsLaid = 0; // Total count of all ants ever produced (dead or alive). This is basically the "Score" of the entire game
        this.colonyPubertyThreshold = 20; // if threshold of number of living WORKERS is passed, some of the new brood will grow into new Male reproductives and Female Reproductives. Once there are male and female reproductives, the NUPTIAL FLIGHT game is enabled.
        this.colonyPubertyThresholdReached = false;
        this.infectionSpreadChance = 0.1; // When the infection timer of an ant goes off, what are the chances of some other amount of healthy ants also getting infected

        //colony resource stats
        this.leaves = 100; // Current mass of collected leaves. Current leaves + Workers* (Leaf collection rate) - leaves*Fungus Conversion Rate - Workers(Worker Eating Rate)
        this.fungus = 0; // Mass of Grown Fungus. Current fungus + Leaves*FungusConversionRate  - Brood(Brood eating rate)

        this.fungusConversionRate = (0.0030 / 60); // Proportion of leaves that are converted to edible funugs for the babies  // This rate can get LOWERED temporarily by contaminants that were not cleaned by the Leaf Transport game (roughly per frame)
        this.broodEatingRate = (0.0050 / 60); // How much  fungus each brood will eat
        this.workerEatingRate = (0.0030 / 60); // how much leaf mass each worker will eat (Much less than a brood would eat of the fungus, the workers just drink a bit of the sap for more energy, let's make this like 10% of the Brood Rate)
        this.leafCollectionRate = (0.35 / 60); // average input of leaves into the colony per worker. This rate can get INCREASED temporarily by playing the Leaf CUTTING and Leaf TRANSPORT games

        this.geneticDiversity = geneticDiversity; // Basically just gives a new colony permanently elevated stats, a very slight boost to all the positives  and slight decline in all the negatives. For instance the Infection Spread chance would be lower for a colony with a higher genetic diversity
        this.newInfections; // this many new ants will be infected in the main simulation
        this.contaminantsCleaned;

        this.reproductionTimerLength = 60;
        this.reproductionTimerCount = 0;
        this.newAntsPerCycle = Math.floor(1 + (this.leaves * 0.01));

        //colonyGameUI.push(this);
    }

    event() {

    }

    update() {

        if (!infoScreenDismissed) return;

        this.updatePopulationCounts();
        this.updateConversionRates();
        this.updateResourceCounts();
        this.reproduction();
        this.updateInfections();
    }

    reproduction() {

        this.newAntsPerCycle = Math.floor(this.leaves * 0.01);

        this.reproductionTimerCount++;
        if (this.reproductionTimerCount >= this.reproductionTimerLength) {

            if (eggClusters.length > 0){
                var attemptCount = 0;
                for (var i = 0; i < this.newAntsPerCycle;) {

                    attemptCount++;
                    var randomEggClusterIndex = getRandomInt(0, eggClusters.length);

                    if (eggClusters[randomEggClusterIndex].isVisible) {
                        new ColonyAnt(eggClusters[randomEggClusterIndex].gridCoord.col, eggClusters[randomEggClusterIndex].gridCoord.row, totalCycles);
                        i++;;
                    }

                    if (attemptCount > 50){
                        new ColonyAnt(fungus.gridCoord.col, fungus.gridCoord.row, totalCycles);
                        i++;
                    }
                }
            } 

            this.reproductionTimerCount = 0;
        }
    }

    updateInfections(){

        if (infectedAntsReturning != 0){
            this.newInfections = infectedAntsReturning;
            infectedAntsReturning = 0;
        }

        for (i = 0; i < this.newInfections; i++) {
            colonyAnts[Math.floor(Math.random() * colonyAnts.length)].isInfected = true;
            console.log("Ant Infected");
        }
        this.newInfections = 0;

    }

    updateConversionRates() {

        if (geneticDiversity != 0){
            this.geneticDiversity = geneticDiversity;
            geneticDiversity = 0;
        }

        this.adjustedfungusConversionRate = this.geneticDiversity > 0 ? this.fungusConversionRate + (this.fungusConversionRate * this.geneticDiversity) : this.fungusConversionRate;
        //this.adjustedbroodEatingRate;
        //this.adjustedworkerEatingRate;
        this.adjustedleafCollectionRate = this.geneticDiversity > 0 ? this.leafCollectionRate + (this.leafCollectionRate * this.geneticDiversity) : this.leafCollectionRate;
    }

    updateResourceCounts() {
        this.fungus += this.leaves * this.adjustedfungusConversionRate;
        this.fungus -= this.fungus * (this.broodCount * this.broodEatingRate);

        this.fungus = Math.max(0, this.fungus);

        if (leafMaterial != 0){
            this.leaves += leafMaterial;
            leafMaterial = 0;
        }

        this.leaves += Math.max(this.adjustedleafCollectionRate, this.workerCount * this.adjustedleafCollectionRate);
        this.leaves = this.leaves - (this.leaves * this.adjustedfungusConversionRate);
        this.leaves -= this.adultCount * (this.leaves * this.workerEatingRate);
        this.leaves = Math.max(0, this.leaves);
    }

    updatePopulationCounts() {

        this.adultCount = 0;
        this.broodCount = 0;
        this.workerCount = 0;
        this.maleReproductiveCount = 0;
        this.femaleReproductiveCount = 0;
        this.reproductiveCount = 0;
        this.deadCount = 0;
        this.totalEggsLaid = 0;

        for (i = 0; i < colonyAnts.length; i++) {

            switch (colonyAnts[i].state) {
                case colonyAntStates.BROOD:
                    this.broodCount++;
                    break;
                case colonyAntStates.WORKER:
                    this.workerCount++;
                    break;
                case colonyAntStates.MALE_REPRODUCTIVE:
                    this.maleReproductiveCount++;
                    break;
                case colonyAntStates.FEMALE_REPRODUCTIVE:
                    this.femaleReproductiveCount++;
                    break;
                case colonyAntStates.DEAD:
                    this.deadCount++;
                    //deadAnts.push(colonyAnts.splice(i, 1));
            }

        }

        this.reproductiveCount = this.maleReproductiveCount + this.femaleReproductiveCount;
        this.adultCount = this.workerCount + this.reproductiveCount;
        this.population = this.adultCount + this.broodCount;

        this.totalEggsLaid = colonyAnts.length + previousEggTotal;

        if (this.workerCount >= this.colonyPubertyThreshold) {
            this.colonyPubertyThresholdReached = true;
        }
    }

    draw() {

    }

}