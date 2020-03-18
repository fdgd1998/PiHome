class Bulb:
    def __init__ (self, name, bus, pin):
        self.__name = name
        self.__bus = bus
        self.__pin = pin
        self.__status = 0

    def setStatus (self, status):
        self.__status = status
        if self.__status == 1:
            self.__bus.write_pin(self.__pin, 1)
        else:
            self.__bus.write_pin(self.__pin, 0)

    def getStatus (self):
        return self.__status

    def getName (self):
        return self.__name