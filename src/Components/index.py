from pynput.keyboard import Key, Controller
import time  # Import the time module
# Initialize the keyboard controller
keyboard = Controller()
try:
    while True:
        # Wait for 8 minutes (480 seconds)
        time.sleep(60 * 8)
        # Press and release Caps Lock to turn it on
        keyboard.press(Key.caps_lock)
        keyboard.release(Key.caps_lock)
        print('Caps Lock ON')
        # Pause for 2 seconds before turning it off again
        time.sleep(2)
        # Press and release Caps Lock to turn it off
        keyboard.press(Key.caps_lock)
        keyboard.release(Key.caps_lock)
        print('Caps Lock OFF')
except KeyboardInterrupt:
    print("Program stopped manually.")