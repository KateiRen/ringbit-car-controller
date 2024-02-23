function startProgram () {
    if (mode == 0) {
        fahreKreis()
    } else if (mode == 1) {
        fahreStern()
    } else if (mode == 2) {
        fahreViereck()
    } else if (mode == 3) {
        fahreSchlangenlinie()
    } else {
        notImplemented()
    }
}
function fahreSchlangenlinie () {
    while (mode == 3) {
        RingbitCar.freestyle(30, 90)
        basic.pause(1500)
        RingbitCar.freestyle(90, 30)
        basic.pause(1500)
    }
}
input.onButtonPressed(Button.A, function () {
    nextProgram()
})
function fahreStern () {
    while (mode == 1) {
        RingbitCar.running_time(RingbitCar.Direction_run.forward, 0.5)
        RingbitCar.steering_angle(RingbitCar.Direction_turn.right, 135)
        radio.sendNumber(mode)
        control.waitMicros(500001)
        basic.pause(500)
    }
}
function notImplemented () {
    music.play(music.stringPlayable("B E - - - - - - ", 300), music.PlaybackMode.UntilDone)
}
function fahreViereck () {
    while (mode == 2) {
        RingbitCar.running_time(RingbitCar.Direction_run.forward, 0.5)
        RingbitCar.steering_angle(RingbitCar.Direction_turn.right, 90)
        basic.pause(100)
    }
}
function nextProgram () {
    RingbitCar.freestyle(0, 0)
    if (mode < 9) {
        mode += 1
    } else {
        mode = 0
    }
    basic.showNumber(mode)
    radio.sendNumber(mode)
}
radio.onReceivedString(function (receivedString) {
    if (receivedString == "ButtonA") {
        nextProgram()
    } else if (receivedString == "ButtonB") {
        startProgram()
    } else {
    	
    }
})
input.onButtonPressed(Button.B, function () {
    startProgram()
})
function fahreKreis () {
    RingbitCar.freestyle(100, 25)
}
let mode = 0
let hue = 0
RingbitCar.init_wheel(AnalogPin.P1, AnalogPin.P2)
radio.setGroup(31)
radio.setFrequencyBand(0)
mode = 0
let strip = neopixel.create(DigitalPin.P0, 128, NeoPixelMode.RGB)
strip.showRainbow(1, 360)
basic.showIcon(IconNames.Heart)
radio.sendNumber(mode)
basic.pause(1000)
basic.showNumber(mode)
basic.forever(function () {
	
})
control.inBackground(function () {
	
})
loops.everyInterval(100, function () {
    strip.rotate(1)
    strip.show()
})
