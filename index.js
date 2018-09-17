// I want to create a constructor function called Fruit, as well as two instances of Fruit which will be named specific fruits.  
// The function will have three methods:  one for exploding, one for canibalizing, and one for rotting.  Death will result from more than 100 pts of either method.
// I'll use prompt to get the user will interact with the game by choosing which fruit character he/she wants to play. I'll attach images to HMTL and do document.write to share the status of the game with the player.

let question = prompt("Do you want to be a Strawberry or a Banana?");
// change selection method to a dropdown box to avoid typos
// the rest of this would return a message reiterating which was chosen and would start the game.

// eventually the dropdown menu will be put here  dropdownMenu.foodFight(opponents)
// displaying the results of the fight
// tying the selection of a player to the activity (in a way that the selection makes a difference in the game)
const displayResults = document.getElementById("displayResults")

function Fruit(options) {
    Food.call(this, options)

}
// Fruit.prototype = new Food()
Fruit.prototype = Object.create(Food.prototype)
Fruit.prototype.constructor = Fruit

// function Veggie(options){
//     Food.call(this,options)
// }
// Veggie.prototype = Object.create(Food.prototype)
// Veggie.prototype.constructor = Fruit

function Food(options) {
    this.name = options.name,
        // add this.nickname = options.nickname,
        this.maxFreshness = options.maxFreshness < 1000 ?
        options.maxFreshness :
        1000,
        this.baseDamage = options.baseDamage || 30
    this.chancetoMiss = options.chanceToMiss || .2,
        this.chanceToCannibalize = options.chanceToCannibalize || .3,
        this.chanceToBlowUp = options.chanceToBlowUp || .3,
        this.damageDealt = 0,
        this.moveUsed = ""
}

Fruit.prototype.combust = function (fruit) {
        // Do I want a message giving status of combust? Yes
        const fireDamage = Math.random() < this.chanceToBlowUp ?
            this.baseDamage * 2 :
            this.baseDamage
        fruit.maxFreshness -= fireDamage
        this.moveUsed = "combust"
        this.damageDealt = fireDamage
    },

    Fruit.prototype.rot = function (fruit) {
        const rotDamage = Math.random() < this.chanceToRot ?
            this.baseDamage * 3 :
            this.baseDamage
        fruit.maxFreshness -= rotDamage
        this.moveUsed = "ROT"
        this.damageDealt = rotDamage
    },

    Fruit.prototype.cannibalize = function (fruit) {
        const cannibalDamage = Math.random() <
            this.chanceToCannibalize ?
            this.baseDamage * 2 :
            this.baseDamage
        fruit.maxFreshness -= cannibalDamage
        this.moveUsed = "cannibalize!!"
        this.damageDealt = cannibalDamage
    }
Fruit.prototype.foodFight = function (...fruits) {

    fruits.forEach(fruit => {

        while (this.maxFreshness > 0 && fruit.maxFreshness > 0) {
            // think about features that will prevent the player from fighting the selected fruit
            let rollofDice = Math.random()
            if (rollofDice < .3) {
                this.rot(fruit)
                fruit.rot(this)
            } else if ((rollofDice >= .3 && rollofDice < .6)) {
                fruit.combust(this)
                this.combust(fruit)
            } else {
                fruit.cannibalize(this)
                this.cannibalize(fruit)
            }

            displayResults.textContent = displayResults.textContent + (`\r\n Your  ${this.name} used ${this.moveUsed} and dealt ${this.damageDealt} damage to ${fruit.name}`)
            displayResults.textContent = displayResults.textContent + (`\r\n ${fruit.name} used ${fruit.moveUsed} and dealt ${fruit.damageDealt} damage to ${this.name}`)

        }
        console.log("after while loop", this, fruit)

        // what i really want to do with this is randomize the selection of the 'fighting' prototype method and have the fight roll through all of the instances in the array.  not sure how to do this
        // if (question === "strawberry") {
        // do a particular battle sequence,
        // else,
        // do a different particular battle sequence?
    })
}

const strawberry = new Fruit({
    name: "Sissy Strawberry",
    maxFreshness: 1000,
})

const banana = new Fruit({
    name: "Bad Ass Banana",
    maxFreshness: 800,
    chanceToRot: 60,
})


let startButton = document.getElementById("startFight")
// startButton.addEventListener("click", () => strawberry.foodFight(banana))


if (question === "banana" || question === "Banana") {
    startButton.addEventListener("click", () => banana.foodFight(strawberry))
} else if (question === "strawberry" || question === "Strawberry") {
    startButton.addEventListener("click", () => strawberry.foodFight(banana))
} else {
    alert("I SAID PICK STRAWBERRY OR BANANA!!")
}








// const peach = new Fruit ({
//     name: "Pathetic Peach",
//     maxFreshness: 700,
//     chanceToRot: 70,
//     chanceToCannibalize: .0,
//     // chanceToBlowUp: .3,
// })

// new prototype method for future versions
// Fruit.prototype.smash = function (fruit) {
//     const smashDamage = Math.random() <
//     this.chanceToSmash
//     ? this.baseDamage * 4
//     : this.baseDamage
//     fruit.maxFreshness -= smashDamage
// }
// new prototype method for future versions
// Fruit.prototype.sweat = function (fruit) {
//     const sweatDamage = Math.random() <
//     this.chanceToSweat
//     ? this.baseDamage * 4
//     : this.baseDamage
//     fruit.maxFreshness -= sweatDamage

// // function name (options){
//     inheritedItem.call(this, options)
//     any properties you want to add that are unique to this particular object
// }
//     name.prototype = inherited.prototype
//     name.prototype.constructor = name.
//     if any, new methods
// }

// TODO: clear the screen after the game has been played once.
// TODO: use drop down menu to select characters. prevent the character selected from being included in the array looped through during the fight code
// TODO: add nickname as a property to the constructor object






