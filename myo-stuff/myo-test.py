import myo
import time
import requests
import asyncio
from aiohttp import ClientSession
import json
import socket

class Listener(myo.DeviceListener):

    def on_paired(self, event):
        print("Hello, {}!".format(event.device_name))
        event.device.vibrate(myo.VibrationType.short)

    def on_unpaired(self, event):
        return False  # Stop the hub

    def on_orientation(self, event):
        orientation = event.orientation
        acceleration = event.acceleration
        gyroscope = event.gyroscope
        global last_time

        # ... do something with that
        try:
            # loop = asyncio.get_event_loop()
            # loop.run_until_complete(hello("http://localhost:5000/getDataMyo"))
            dY = orientation[0]
            dX = orientation[2]
            requests.post("http://localhost:5000/getDataMyo", data=json.dumps({'x': dX, 'y': dY}))

            # print(dX)
            # print(dX)
            # print(calculateDisplacement("y", acceleration[1]) * 10000)
            last_time = time.time()

            # print(orientation)
            # Maybe make an http call to send za data?
        except Exception as e:
            print(e)
            pass

    # def on_event(self, event):
    #     print(event.type)

# global vars for calulating displament

async def send():
    

if __name__ == '__main__':
    myo.init(sdk_path='./myo-sdk-win-0.9.0/')
    last_time = time.time()
    hub = myo.Hub()
    listener = Listener()
    while hub.run(listener.on_event, 500):
        pass

# async def main():
#     myo.init(sdk_path='./myo-sdk-win-0.9.0/')
#     last_time = time.time()
#     hub = myo.Hub()
#     listener = Listener()
#     while hub.run(listener.on_event, 500):
#         pass

# def mysend(socket, msg):
#         totalsent = 0
#         while totalsent < len(msg):
#             sent = socket.send(msg[totalsent:])
#             if sent == 0:
#                 raise RuntimeError("socket connection broken")
#             totalsent = totalsent + sent

s = socket.socket(
    socket.AF_INET, socket.SOCK_STREAM)
#now connect to the web server on port 80
# - the normal http port
# s.connect(("443d1c69.ngrok.io", 5000))
# s.send("head".encode('UTF-8'))
# mysend(s, "hello")

# loop = asyncio.get_event_loop()
# loop.run_until_complete(main())