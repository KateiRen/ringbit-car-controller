def on_button_pressed_a():
    global running
    running = 0
    nextProgram()
input.on_button_pressed(Button.A, on_button_pressed_a)

def notImplemented():
    music.play(music.string_playable("B E - - - - - - ", 300),
        music.PlaybackMode.UNTIL_DONE)
def nextProgram():
    global mode
    RingbitCar.freestyle(0, 0)
    if mode < 4:
        mode += 1
    else:
        mode = 0
    basic.show_number(mode)
    radio.send_number(mode)

def on_received_string(receivedString):
    global running
    if receivedString == "ButtonA":
        running = 0
        nextProgram()
    elif receivedString == "ButtonB":
        running = 1
    else:
        pass
radio.on_received_string(on_received_string)

def on_button_pressed_b():
    global running
    running = 1
input.on_button_pressed(Button.B, on_button_pressed_b)

running = 0
mode = 0
RingbitCar.init_wheel(AnalogPin.P1, AnalogPin.P2)
radio.set_group(31)
radio.set_frequency_band(0)
mode = 0
running = 0
strip = neopixel.create(DigitalPin.P0, 128, NeoPixelMode.RGB)
strip.show_rainbow(1, 360)
basic.show_icon(IconNames.HEART)
radio.send_number(mode)
basic.pause(1000)
basic.show_number(mode)

def on_every_interval():
    # if stopped, display rainbow colors
    if running == 1:
        strip.set_pixel_color(0, neopixel.colors(NeoPixelColors.RED))
        strip.set_pixel_color(1, neopixel.colors(NeoPixelColors.BLUE))
        strip.show()
        basic.pause(250)
        strip.set_pixel_color(1, neopixel.colors(NeoPixelColors.RED))
        strip.set_pixel_color(0, neopixel.colors(NeoPixelColors.BLUE))
        strip.show()
loops.every_interval(500, on_every_interval)

def on_forever():
    global running
    if running == 1:
        if mode == 0:
            RingbitCar.freestyle(100, 25)
        elif mode == 1:
            RingbitCar.running_time(RingbitCar.Direction_run.FORWARD, 0.5)
            RingbitCar.steering_angle(RingbitCar.Direction_turn.RIGHT, 135)
            basic.pause(500)
        elif mode == 2:
            RingbitCar.running_time(RingbitCar.Direction_run.FORWARD, 0.5)
            RingbitCar.steering_angle(RingbitCar.Direction_turn.RIGHT, 90)
            basic.pause(100)
        elif mode == 3:
            RingbitCar.freestyle(30, 90)
            basic.pause(1500)
            RingbitCar.freestyle(90, 30)
            basic.pause(1500)
        elif mode == 4:
            RingbitCar.freestyle(randint(0, 100), randint(0, 100))
            basic.pause(randint(500, 5000))
        else:
            notImplemented()
            running = 0
basic.forever(on_forever)

def on_every_interval2():
    # if running, show police lights
    if running == 0:
        strip.rotate(1)
        strip.show()
loops.every_interval(100, on_every_interval2)
