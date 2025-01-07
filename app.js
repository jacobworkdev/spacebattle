
let game = document.getElementById('gamefield')
let start = document.getElementById('start')
let attack = document.getElementById('attack')
let retreat = document.getElementById('retreat')
let restart = document.getElementById('restart')
let hp = document.getElementById('hpNumeric')
let updatesBoard = document.getElementById('updateMsg')
let enemyShip=document.getElementById('enemyShip')
let myShipDisplay=document.getElementById('myShip')
attack.disabled = true


let playerStats = document.getElementById('playerStats')

playerStats.style.width = '100px'
playerStats.style.height = '10px'
playerStats.style.border = 'solid red'
playerStats.style.display = 'flex'
playerStats.style.justifyContent = 'start'
playerStats.style.backgroundColor = 'red'

function gameOver() {
    start.disabled = true
    attack.disabled = true
    retreat.disabled = true

    let gameOverSign = document.createElement('div')
    gameOverSign.innerText = "Game Over"
    gameOverSign.style.position='fixed'
    gameOverSign.style.top='50%'
    gameOverSign.style.left='30%'
    gameOverSign.style.textAlign = 'center'
    gameOverSign.style.alignItems = 'center'
    gameOverSign.style.fontSize = '200px'
    gameOverSign.style.color = 'red'
    gameOverSign.style.transition='2s'
    document.body.style.background='black'
    
    document.body.appendChild(gameOverSign)
}


for (let i = 0; i < 100; i++) {
    let healthUnit = document.createElement('div')
    healthUnit.style.width = '1px'
    healthUnit.style.height = '10px'
    healthUnit.style.backgroundColor = 'green'
    playerStats.append(healthUnit)
}



function takeDamage(damage) {
    for (let i = 0; i < damage * 5; i++) {
        if (playerStats.lastChild) { //making sure the div container is not empty
            playerStats.removeChild(playerStats.lastChild);
        }
    }
}


// //gamefield populating
// let enemyIcon=document.createElement('div')



//ship class is general ship class
class Ship {
    //class constructor for initializing the instance
    constructor(name, hull, firepower, accuracy) {
        this.name = name
        this.hull = hull
        this.firepower = firepower
        this.accuracy = accuracy
    }

    attack(enemy) {
        let chance = Math.random()
        if (this.accuracy >= chance) {
            enemy.hull -= this.firepower
            updatePrint(`${this.name} attacked ${enemy.name} their hull:${enemy.hull}`)
            console.log(`${this.name} attacked ${enemy.name} their hull:${enemy.hull}`)
        } else {
            console.log(`${this.name}shot missed`)
            updatePrint(`${this.name}shot missed`)
        }
    }
}


//enemy ship class
class EnemyShip extends Ship {

    constructor(name, hull, firepower, accuracy) {
        super(name, hull, firepower, accuracy)
        this.name = 'enemy'
        this.hull = Math.round((Math.random() * 3)) + 3 // hull random between 3-6
        this.firepower = Math.round((Math.random() * 2)) + 2  // firepower between 2 and 4
        this.accuracy = Math.random() * 0.2 + 0.6// call to randomaccuracy function
    }

    attack(enemy) {
        let chance = Math.random()
        if (this.accuracy >= chance) {
            enemy.hull -= this.firepower
            console.log(`${this.name} attacked ${enemy.name} their hull:${enemy.hull}`)
            updatePrint(`${this.name} attacked ${enemy.name} their hull:${enemy.hull}`)
        } else {
            console.log(`${this.name}shot missed`)
            updatePrint(`${this.name}shot missed`)
        }
    }
}

start.addEventListener('click', startGame)
//initiating my ship with default values
let myship = new Ship('uss battlemage', 20, 5, 0.7)
//array of enemy ships
let enemyarr = []


hp.innerText = myship.hull

function startGame() {
    start.disabled = true
    attack.disabled = false
    let enemy = new EnemyShip()
    enemyarr.push(enemy)
    console.log('game started')
    updatePrint('game started')
}


attack.addEventListener('click', attackF)
function attackF() {
    myship.attack(enemyarr[0])
    enemyShip.style.backgroundColor='white'
    enemyShip.style.transition='1000ms'
    setTimeout(() => {
        enemyShip.style.backgroundColor='red'
    }, 500);

    if (enemyarr[0].hull <= 0) {
        updatePrint('enemy defeated!')
        console.log('enemy defeated!')
        enemyarr.pop()
        let newEnemy = new EnemyShip()
        enemyarr.push(newEnemy)
        console.log('new enemy ship deployed')
        updatePrint('new enemy ship deployed')
    }
    else if (enemyarr[0].hull > 0) {

        myShipDisplay.style.backgroundColor='red'
        myShipDisplay.style.transition='1000ms'
        setTimeout(() => {
            myShipDisplay.style.backgroundColor='blue'
        }, 500);

        enemyarr[0].attack(myship)
        hp.innerText = myship.hull
        takeDamage(enemyarr[0].firepower)
    }
    if (myship.hull <= 0) {
        gameOver()
        console.log('game over')
    }
}

restart.addEventListener('click', function () {
    window.location.reload()
})

retreat.addEventListener('click', function () {
    console.log('Defeat you retreated!')
    gameOver()
})


function updatePrint(passMessage) {
    let message = document.createElement('div')
    message.innerText = passMessage
    updatesBoard.append(message)
    updatesBoard.scrollTop = updatesBoard.scrollHeight

}

// ----------------My test Field--------
