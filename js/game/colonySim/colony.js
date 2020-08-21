class Colony {
    constructor() {
        
        this.population = 0;  // Adults+Brood
        this.adults = 30; // Workers + Reproductives
        this.brood = 30;
        this.workers = 30;
        this.reproductives = 30; //  Male REPRO + Female REPRO+QUEEN 
        this.totalEggsLaid; // Total count of all ants ever produced (dead or alive). This is basically the "Score" of the entire game
        this.colonyPubertyThreshold;  // if threshold of number of living WORKERS is passed, some of the new brood will grow into new Male reproductives and Female Reproductives. Once there are male and female reproductives, the NUPTIAL FLIGHT game is enabled.
        this.infectionSpreadChance; // When the infection timer of an ant goes off, what are the chances of some other amount of healthy ants also getting infected
        this.leaves = 0;  // Current mass of collected leaves. Current leaves + Workers* (Leaf collection rate) - leaves*Fungus Conversion Rate - Workers(Worker Eating Rate)
        this.fungus = 5; // Mass of Grown Fungus. Current fungus + Leaves*FungusConversionRate  - Brood(Brood eating rate)
        this.fungusConversionRate = 0.2;  // Proportion of leaves that are converted to edible funugs for the babies  // This rate can get LOWERED temporarily by contaminants that were not cleaned by the Leaf Transport game
        this.broodEatingRate = 10; // How much  fungus each brood will eat
        this.workerEatingRate = 1; // how much leaf mass each worker will eat (Much less than a brood would eat of the fungus, the workers just drink a bit of the sap for more energy, let's make this like 10% of the Brood Rate)
        this.leafCollectionRate = 50; // average input of leaves into the colony per worker. This rate can get INCREASED temporarily by playing the Leaf CUTTING and Leaf TRANSPORT games
        this.geneticDiversity;  // Basically just gives a new colony permanently elevated stats, a very slight boost to all the positives  and slight decline in all the negatives. For instance the Infection Spread chance would be lower for a colony with a higher genetic diversity
        this.newInfections; // this many new ants will be infected in the main simulation
        this.contaminantsCleaned;
    }

    update(){
        this.population = this.adults + this.brood;
        this.adults = this.workers + this.reproductives;

        this.leaves += leafMaterial;
        leafMaterial = 0;

        //this.leaves = (this.leaves * 0.99) - (this.workerEatingRate * this.workers) - (this.broodEatingRate * this.brood);
        this.leaves += 0.02

        this.fungus = this.leaves * 0.2;



    }
}