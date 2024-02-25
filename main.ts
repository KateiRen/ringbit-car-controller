input.onButtonPressed(Button.A, function () {
    running = 0
    nextProgram()
})
function notImplemented () {
    music.play(music.stringPlayable("B E - - - - - - ", 300), music.PlaybackMode.UntilDone)
}
function nextProgram () {
    RingbitCar.freestyle(0, 0)
    if (mode < 5) {
        mode += 1
    } else {
        mode = 0
    }
    basic.showNumber(mode)
    radio.sendNumber(mode)
}
radio.onReceivedString(function (receivedString) {
    if (receivedString == "ButtonA") {
        running = 0
        nextProgram()
    } else if (receivedString == "ButtonB") {
        if (running) {
            RingbitCar.freestyle(0, 0)
            running = 0
        } else {
            running = 1
        }
    } else {
    	
    }
})
input.onButtonPressed(Button.B, function () {
    if (running) {
        RingbitCar.freestyle(0, 0)
        running = 0
    } else {
        running = 1
    }
})
radio.onReceivedValue(function (name, value) {
    if (name == "x") {
        x = value
    } else if (name == "y") {
        y = value
    }
})
let y = 0
let x = 0
let running = 0
let mode = 0
RingbitCar.init_wheel(AnalogPin.P1, AnalogPin.P2)
radio.setGroup(31)
radio.setFrequencyBand(0)
mode = 0
running = 0
x = 0
y = 0
let strip = neopixel.create(DigitalPin.P0, 128, NeoPixelMode.RGB)
strip.showRainbow(1, 360)
basic.showIcon(IconNames.Heart)
radio.sendNumber(mode)
basic.pause(1000)
basic.showNumber(mode)
loops.everyInterval(500, function () {
    // if stopped, display rainbow colors
    if (running == 1) {
        strip.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
        strip.setPixelColor(1, neopixel.colors(NeoPixelColors.Blue))
        strip.show()
        basic.pause(250)
        strip.setPixelColor(1, neopixel.colors(NeoPixelColors.Red))
        strip.setPixelColor(0, neopixel.colors(NeoPixelColors.Blue))
        strip.show()
    }
})
basic.forever(function () {
    if (running == 1) {
        if (mode == 0) {
            RingbitCar.freestyle(100, 25)
        } else if (mode == 1) {
            RingbitCar.running_time(RingbitCar.Direction_run.forward, 0.5)
            RingbitCar.steering_angle(RingbitCar.Direction_turn.right, 135)
            basic.pause(500)
        } else if (mode == 2) {
            RingbitCar.running_time(RingbitCar.Direction_run.forward, 0.5)
            RingbitCar.steering_angle(RingbitCar.Direction_turn.right, 90)
            basic.pause(100)
        } else if (mode == 3) {
            RingbitCar.freestyle(30, 90)
            basic.pause(1500)
            RingbitCar.freestyle(90, 30)
            basic.pause(1500)
        } else if (mode == 4) {
            RingbitCar.freestyle(randint(0, 100), randint(0, 100))
            basic.pause(randint(500, 5000))
        } else if (mode == 5) {
            RingbitCar.freestyle(x - y, (x + y) * -1)
        } else {
            notImplemented()
            running = 0
        }
    }
})
loops.everyInterval(100, function () {
    // if running, show police lights
    if (running == 0) {
        strip.rotate(1)
        strip.show()
    }
})
