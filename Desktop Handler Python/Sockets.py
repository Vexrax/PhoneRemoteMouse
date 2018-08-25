#! python3
import requests
import json
import MouseHandler
import TaskBar

def someConditional():
    return True

while(True):
    try:
        r = requests.post("http://b0565861.ngrok.io")
        json_file = json.loads(r.text)
        i = 0
        while i < len(json_file["dataCache"]):
            json_obj = json_file["dataCache"][i]
            if(json_obj["eventType"] ==  "EVENT_MOVE"):
                print(json_obj)
                MouseHandler.MouseMove(json_obj["data"]["x"], json_obj["data"]["y"])
            elif(json_obj["eventType"] == "EVENT_LEFTCLICK"):
                MouseHandler.LeftMouseClick()
            elif(json_obj["eventType"] == "EVENT_RIGHTCLICK"):
                MouseHandler.RightMouseClick()
            i += 1
    except Exception:
        print(Exception)




