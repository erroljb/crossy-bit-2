function hit_chicken () {
    play = false
    chicken.set(LedSpriteProperty.Blink, 10)
    game.removeLife(1)
    chicken.move(-3)
    music.playMelody("C5 B A G F E D C ", 500)
    chicken.set(LedSpriteProperty.Blink, 0)
    play = true
}
input.onButtonPressed(Button.A, function () {
    if (play) {
        chicken.move(1)
        if (chicken.isTouchingEdge()) {
            play = false
            chicken.set(LedSpriteProperty.Blink, 10)
            speed = Math.max(speed - 0.1, 0.5)
            music.playMelody("C D E F G A B C5 ", 500)
            game.addScore(1)
            chicken.ifOnEdgeBounce()
            basic.pause(200)
            chicken.set(LedSpriteProperty.Blink, 0)
            play = true
        } else {
            music.playTone(466, music.beat(BeatFraction.Sixteenth))
        }
    }
})
function start_car (car: game.LedSprite, delay: number) {
    car.set(LedSpriteProperty.Brightness, 128)
    if (car.get(LedSpriteProperty.X) == 0) {
        car.set(LedSpriteProperty.Direction, 90)
    } else {
        car.set(LedSpriteProperty.Direction, -90)
    }
    for (let index = 0; index < 4; index++) {
        basic.pause(delay * speed)
        car.move(1)
        if (car.isTouching(chicken)) {
            hit_chicken()
        }
    }
    basic.pause(delay * speed)
    car.delete()
}
input.onButtonPressed(Button.B, function () {
    if (play) {
        chicken.move(-1)
        music.playTone(415, music.beat(BeatFraction.Sixteenth))
    }
})
function add_chicken () {
    chicken = game.createSprite(2, 4)
    chicken.set(LedSpriteProperty.Direction, 0)
    play = true
}
function add_car (y: number) {
    basic.pause(randint(500, 1500) * speed)
    if (Math.randomBoolean()) {
        start_car(game.createSprite(0, y), randint(50, 500))
    } else {
        start_car(game.createSprite(4, y), randint(50, 500))
    }
}
let chicken: game.LedSprite = null
let play = false
let speed = 0
speed = 1
game.setLife(5)
music.playMelody("E - E - E - C5 - ", 140)
add_chicken()
basic.forever(function () {
	
})
control.inBackground(function () {
    while (true) {
        add_car(1)
    }
})
control.inBackground(function () {
    while (true) {
        add_car(2)
    }
})
control.inBackground(function () {
    while (true) {
        add_car(3)
    }
})
