let question = prompt("Do you want to be a Strawberry or a Banana?");
const displayResults = document.getElementById("displayResults")


class Food {
    constructor(options) {
        this.name = options.name,
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

    combust(fruit) {
        const fireDamage = Math.random() < this.chanceToBlowUp ?
            this.baseDamage * 2 :
            this.baseDamage
        fruit.maxFreshness -= fireDamage
        this.moveUsed = "combust"
        this.damageDealt = fireDamage
    }

    rot(fruit) {
        const rotDamage = Math.random() < this.chanceToRot ?
            this.baseDamage * 3 :
            this.baseDamage
        fruit.maxFreshness -= rotDamage
        this.moveUsed = "ROT"
        this.damageDealt = rotDamage
    }

    cannibalize(fruit) {
        const cannibalDamage = Math.random() <
            this.chanceToCannibalize ?
            this.baseDamage * 2 :
            this.baseDamage
        fruit.maxFreshness -= cannibalDamage
        this.moveUsed = "cannibalize!!"
        this.damageDealt = cannibalDamage
    }
}

class Fruit extends Food{
    constructor(options) {
        super(options)
        this.nickname = options.nickname
    }

    foodFight(...fruits) {
    
        fruits.forEach(fruit => {
            while (this.maxFreshness > 0 && fruit.maxFreshness > 0) {
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
        })
    
    }
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


let startButton = document.getElementById("startFight");
if (question === "banana" || question === "Banana") {
    startButton.addEventListener("click", () => banana.foodFight(strawberry))
} else if (question === "strawberry" || question === "Strawberry") {
    startButton.addEventListener("click", () => strawberry.foodFight(banana))
} else {
    alert("I SAID PICK STRAWBERRY OR BANANA!!")
}