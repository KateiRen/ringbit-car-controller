def startProgram():
    if mode == 0:
        fahreKreis()
    elif mode == 1:
        fahreStern()
    elif mode == 2:
        fahreViereck()
    elif mode == 3:
        fahreSchlangenlinie()
    else:
        notImplemented()
def fahreSchlangenlinie():
    while mode == 3:
        RingbitCar.freestyle(30, 90)
        basic.pause(1500)
        RingbitCar.freestyle(90, 30)
        basic.pause(1500)

def on_button_pressed_a():
    nextProgram()
input.on_button_pressed(Button.A, on_button_pressed_a)

def fahreStern():
    while mode == 1:
        RingbitCar.running_time(RingbitCar.Direction_run.FORWARD, 0.5)
        RingbitCar.steering_angle(RingbitCar.Direction_turn.RIGHT, 135)
        radio.send_number(mode)
        control.wait_micros(500001)
        basic.pause(500)
def notImplemented():
    music.play(music.string_playable("B E - - - - - - ", 300),
        music.PlaybackMode.UNTIL_DONE)
def fahreViereck():
    while mode == 2:
        RingbitCar.running_time(RingbitCar.Direction_run.FORWARD, 0.5)
        RingbitCar.steering_angle(RingbitCar.Direction_turn.RIGHT, 90)
        basic.pause(100)
def nextProgram():
    global mode
    RingbitCar.freestyle(0, 0)
    if mode < 9:
        mode += 1
    else:
        mode = 0
    basic.show_number(mode)
    radio.send_number(mode)

def on_received_string(receivedString):
    if receivedString == "ButtonA":
        nextProgram()
    elif receivedString == "ButtonB":
        startProgram()
    else:
        pass
radio.on_received_string(on_received_string)

def on_button_pressed_b():
    startProgram()
input.on_button_pressed(Button.B, on_button_pressed_b)

def fahreKreis():
    RingbitCar.freestyle(100, 25)
mode = 0
hue = 0
RingbitCar.init_wheel(AnalogPin.P1, AnalogPin.P2)
radio.set_group(31)
radio.set_frequency_band(0)
mode = 0
strip = neopixel.create(DigitalPin.P0, 128, NeoPixelMode.RGB)
strip.show_rainbow(1, 360)
basic.show_icon(IconNames.HEART)
radio.send_number(mode)
basic.pause(1000)
basic.show_number(mode)

def on_forever():
    pass
basic.forever(on_forever)

def on_in_background():
    strip.rotate(1)
    strip.show()
    control.wait_micros(50001)
control.in_background(on_in_background)
