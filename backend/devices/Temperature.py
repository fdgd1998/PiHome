from Adafruit_DHT import DHT11, read_retry
class Temperature:
    def __init__(self, name, pin):
        self.__name = name
        self.__pin = pin
    
    def getName(self):
        return self.__name
    
    def getData(self):
        data = [self.getName(), 0, 0]
        data[1], data[2] = read_retry(DHT11, self.__pin, 7, 0.01)
        return data