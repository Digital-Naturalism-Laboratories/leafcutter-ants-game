# leafcutter-ants-game
An open-source, educational game all about leaf-cutter ants! It covers the life cycles of a colony, how they forage and defend themselves from parasites!

Test code live here: https://digital-naturalism-laboratories.github.io/leafcutter-ants-game/

Produced by Digital Naturalism Laboratories for The Smithsonian Tropical Research Institute and the Q Bus.

Development by Brian Boucher, Bilal Cheema, Steven Solof, and Andrew Quitmeyer

Art design by Kitty Quitmeyer

Scientific advising by Dr. Hannah Marti

Music and Sound Effects by Dan Singer https://ridgedchippies.bandcamp.com/releases

# Licensing 
Creative Commons Attribution 4.0 International https://creativecommons.org/licenses/by/4.0/
You are free to remix, re-use, and re-make the elements and art assetts in this game, but you just need to Attribute Digital Naturalism Laboratories (www.dinalab.net) and the Smithsonian Tropical Research Institute's QBUS (stri.si.edu/qbus) and the corresponding credits listed above.

# Game Outline

## GAMEPLAY
From the Colony game, the only options the player should be able to choose to "Collect Leaves" or "Nuptial Flight" (If the colony is matured)

Original Colony>"Collect Leaves">Leaf Cutting Game>Leaf Transport Game>Original Colony
(So the two leaf collecting games always happen one after the other)
Original Colony>"Nuptial Flight">Flight Game> NEW Colony

## VARIABLES
### ANT CLASS
-State // BROOD or WORKER or MALE REPRODUCTIVE or FEMALE REPRODUCTIVE or QUEEN-isAlive // YES OR NO
-Age //How many cycles this ant has been going since it was born
-Death Age  // Past this age, this ant will automatically dies, Queens aren't affected by this-Energy // Goes down if there are no leaves until the ant dies-Infection Timer //  Null for healthy ants, but for infected Starts a timer for this ant, once the time happens, this ant rolls against its infection death chance to see if it will die. This infection will also trigger the colony class to decide if a number of other ants get infected too
-Infection Death Chance  // Generally a pretty high number between 0-1.0 //1.0 means it will always die, 0.0 is never die// Most ants have a .9 let's say


### COLONY CLASS
-Population // Adults+Brood-Adults // Workers + Reproductives-Reproductives //  Male REPRO + Female REPRO+QUEEN 
-Total Eggs Laid // Total count of all ants ever produced (dead or alive). This is basically the "Score" of the entire game

Colony Puberty Threshold  // if threshold of number of living WORKERS is passed, some of the new brood will grow into new Male reproductives and Female Reproductives. Once there are male and female reproductives, the NUPTIAL FLIGHT game is enabled.

-Infection SPREAD chance // When the infection timer of an ant goes off, what are the chances of some other amount of healthy ants also getting infected
-Leaves  // Current mass of collected leaves,Current Leaves = current leaves + Workers* (Leaf collection rate) - leaves*Fungus Conversion Rate - Workers(Worker Eating Rate)

-Fungus // Mass of Grown FungusCurrent Fungus = Current fungus + Leaves*FungusConversionRate  - Brood(Brood eating rate)

-Fungus Conversion Rate  // Proportion of leaves that are converted to edible funugs for the babies  // This rate can get LOWERED temporarily by contaminants that were not cleaned by the Leaf Transport game

-Brood eating Rate // How much  fungus each brood will eat
-Worker eating rate // how much leaf mass each worker will eat (Much less than a brood would eat of the fungus, the workers just drink a bit of the sap for more energy, let's make this like 10% of the Brood Rate)

Leaf collection rate - average input of leaves into the colony per worker. This rate can get INCREASED temporarily by playing the Leaf CUTTING and Leaf TRANSPORT games



-Genetic Diversity  //  Basically just gives a new colony permanently elevated stats, a very slight boost to all the positives  and slight decline in all the negatives. For instance the Infection Spread chance would be lower for a colony with a higher genetic diversity


## TRANSFER OF VARIABLES BETWEEN GAMES
Leaf Cutting Game -  There is a basic timer, and we keep track of how many leaves get collected during this time.  More leave = Temporary boost to Leaf Collection rate

Leaf Transport Game - There is a default timer, but it is just a timeout kill switch and quite long and basically for kids who don't understand what is going on. 

The desired limit is a standard "distance" walked until the ants get back to the colony. We keep track of the time it takes to get back to the colony.
Short times = Temporary boost to leaf collection rateLong times (or timeout)  = Temporary decrease to leaf collection rate
This game also brings in 2 other variables that get passed to the main colony game
Infections = this many new ants will be infected in the main simulation
Contaminants cleaned = The more contaminants cleaned during this game, the FUNGUS conversion rate is temporarily  Boosted. If very few contaminants are cleaned, the fungus conversion rate is LOWERED

Nuptial Flight - The time is regulated by the queen's energy being limited and always diminishing. She tries to mate as many times before she runs out of energy and has to land. each time she mates, her "genetic diversity" goes up. 

The genetic diversity variable gets passed to the game and affects the rest of the new colony.











