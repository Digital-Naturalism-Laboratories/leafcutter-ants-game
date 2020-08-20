class Colony {
    constructor() {
        
        this.population;  // Adults+Brood
        this.adults; // Workers + Reproductives
        this.reproductives; //  Male REPRO + Female REPRO+QUEEN 
        this.totalEggsLaid; // Total count of all ants ever produced (dead or alive). This is basically the "Score" of the entire game
        this.colonyPubertyThreshold;  // if threshold of number of living WORKERS is passed, some of the new brood will grow into new Male reproductives and Female Reproductives. Once there are male and female reproductives, the NUPTIAL FLIGHT game is enabled.
        this.infectionSpreadChance; // When the infection timer of an ant goes off, what are the chances of some other amount of healthy ants also getting infected
        this.leaves;  // Current mass of collected leaves. Current leaves + Workers* (Leaf collection rate) - leaves*Fungus Conversion Rate - Workers(Worker Eating Rate)
        this.fungus; // Mass of Grown Fungus. Current fungus + Leaves*FungusConversionRate  - Brood(Brood eating rate)
        this.fungusConversionRate;  // Proportion of leaves that are converted to edible funugs for the babies  // This rate can get LOWERED temporarily by contaminants that were not cleaned by the Leaf Transport game
        this.broodEatingRate; // How much  fungus each brood will eat
        this.workerEatingRate; // how much leaf mass each worker will eat (Much less than a brood would eat of the fungus, the workers just drink a bit of the sap for more energy, let's make this like 10% of the Brood Rate)
        this.leafCollectionRate; // average input of leaves into the colony per worker. This rate can get INCREASED temporarily by playing the Leaf CUTTING and Leaf TRANSPORT games
        this.geneticDiversity;  // Basically just gives a new colony permanently elevated stats, a very slight boost to all the positives  and slight decline in all the negatives. For instance the Infection Spread chance would be lower for a colony with a higher genetic diversity
        this.newInfections; // this many new ants will be infected in the main simulation
        this.contaminantsCleaned;
    }
}