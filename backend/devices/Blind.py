import time
class Blind:
    def __init__ (self, name, bus, pins, port, movement):
        self.__name = name
        self.__bus = bus
        self.__port = port
        self.__pins = pins
        self.__status = 0
        self.__movement = movement
        self.__halfstep_seq_clockwise = [
            [1,0,0,0],
            [1,1,0,0],
            [0,1,0,0],
            [0,1,1,0],
            [0,0,1,0],
            [0,0,1,1],
            [0,0,0,1],
            [1,0,0,1]
        ]
        self.__halfstep_seq_anticlockwise = [
            [1,0,0,1],
            [0,0,0,1],
            [0,0,1,1],
            [0,0,1,0],
            [0,1,1,0],
            [0,1,0,0],
            [1,1,0,0],
            [1,0,0,0]
        ]

    def setStatus (self, status):
        self.__status = status
        if self.__status == 1: # Clockwise
            for i in range(self.__movement):
                for halfstep in range(8):
                    for pin in range(4):
                        self.__bus.write_pin(self.__pins[pin], self.__halfstep_seq_clockwise[halfstep][pin])
                    time.sleep(0.001)
        else:
            for i in range(self.__movement): # Anticlockwise
                for halfstep in range(8):
                    for pin in range(4):
                        self.__bus.write_pin(self.__pins[pin], self.__halfstep_seq_anticlockwise[halfstep][pin])
                    time.sleep(0.001)

        # Powering off all the pins
        for pin in self.__pins:
            self.__bus.write_pin(pin, 0)
        
    def getStatus (self):
        return self.__status

    def getName (self):
        return self.__name