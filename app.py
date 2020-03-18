# ----------------------------------- General imports ---------------------------------------
from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit, disconnect
import json, os, time
from threading import Thread
from multiprocessing import Process
import RPi.GPIO as GPIO
from IOPi import IOPi

# ------------------------------------ Global variables --------------------------------------
thread = None

# ------------------------------------ Importing devices -------------------------------------
from backend.devices.Bulb import *
from backend.devices.Blind import *
from backend.devices.Door import *
from backend.devices.Temperature import *

# --------------------------- Setting up Raspberry Pi GPIO ports -------------------------------
# Setting up RPi pinout (BOARD: physical layout numbering)
GPIO.setmode(GPIO.BOARD)

# Setting up pins
GPIO.setup(7, GPIO.IN) # GPIO 4
GPIO.setup(11, GPIO.IN) # GPIO 17
GPIO.setup(12, GPIO.IN) # GPIO 18

# ------------------------------ Setting up IO Pi Plus ports -----------------------------------
# Defining the ports with I2C addresses
bus1 = IOPi(0x20) 
bus2 = IOPi(0x21)

# Configuring the ports (0: pins 1-8 | 1: pins 9-16)
bus1.set_port_direction(0, 0x00) # 0x00 = 0000 0000 (0:OUT - 1:IN)
bus1.set_port_direction(1, 0x00)  
bus2.set_port_direction(0, 0x00)
bus2.set_port_direction(1, 0x00) # 0x07 = 0000 0111 

# Turning all the pins off
bus1.write_port(0, 0x00) # 0x00 = 0000 0000 (0:LOW - 1:HIGH)
bus1.write_port(1, 0x00)
bus2.write_port(0, 0x00)
bus2.write_port(1, 0x00)

# --------------------------- Defining and creating device objects ------------------------------
devices = {
    "living_room_bulb": Bulb("living_room_bulb", bus1, 1),
    "garage_bulb": Bulb("garage_bulb", bus1, 2),
    "kitchen_bulb": Bulb("kitchen_bulb", bus1, 3),
    "terrace_bulb": Bulb("terrace_bulb", bus1, 4),
    "entrance_bulb": Bulb("entrance_bulb", bus1, 5),
    "bedroom_bulb": Bulb("bedroom_bulb", bus1, 6),
    "stairs_bulb": Bulb("stairs_bulb", bus1, 7),
    "bathroom_bulb": Bulb("bathroom_bulb", bus1, 8),
    "living_room_blind": Blind("living_room_blind", bus1, [9, 10, 11, 12], 1, 512),
    "bedroom_blind": Blind("bedroom_blind", bus2, [9, 10, 11, 12], 1, 512),
    "bathroom_blind": Blind("bathroom_blind", bus2, [1, 2, 3, 4], 1, 512),
    "garage_door": Door("garage_door", bus2, [5, 6, 7, 8], 1, 512)    
}

temp_devices = {
    "living_room_dht11": Temperature("living_room_dht11", 4),
    "bedroom_dht11": Temperature("bedroom_dht11", 17),
    "outdoor_dht11": Temperature("outdoor_dht11", 18)
}

# ---------------------------- Function to load device's status -------------------------------
def get_devices_status(objects):
    data = []
    for key in objects:
        data.append([objects[key].getName(), objects[key].getStatus()])
    return json.dumps(data)

# ------------------------------------ Main application --------------------------------------
app = Flask (__name__, template_folder="frontend/templates", static_folder="frontend/assets")
app.debug = True
app.config['SECRET_KEY'] = "secret!"
socketio = SocketIO(app, async_mode='gevent') # asyc_mode='gevent' allows sending socket data
                                              # within a thread.

# ---------------------- Sending temp and humidity data to the client ------------------------
def get_data_temps():
    data = []
    for key in temp_devices:
        data.append(temp_devices[key].getData())
    return json.dumps(data)

def send_temp_to_client():
    while True:
        data = get_data_temps()
        socketio.emit('set-temps', data, namespace="/temp")
        time.sleep(5)

if thread is None:
    send_temp = Thread(target=send_temp_to_client, daemon=True)
    send_temp.start()

# ------------------------------------ Website routes ----------------------------------------
@app.route("/")
def home_page():
    return render_template("index.html", devices=get_devices_status(devices))

@app.route("/config")
def config_page():
    return render_template("configuration.html")

# @app.route("/device/<string:name>/<int:status>")
# def set_device_status(name, status):
#     devices[name].setStatus(status)
#     return '', 204

@socketio.on('connection', namespace='/temp')
def my_event(msg):
    print (msg['data'])

@socketio.on('device-state', namespace='/device')
def device_state(device):
    device = json.loads(device)
    devices[str(device[0])].setStatus(int(device[1]))

@socketio.on('connect', namespace='/temp')
def test_connect():
    emit('my response', {'data': 'Connected', 'count': 0})

@socketio.on('disconnect', namespace='/temp')
def test_disconnect():
    print('Client disconnected')

@app.route("/reboot")
def reboot():
    os.system('sudo reboot now')
# ------------------------------- Starting the web server ------------------------------------
if __name__ == "__main__":
    socketio.run(app, host='0.0.0.0', port=80)