from flask import Flask, request
from flask_sockets import Sockets
import json

app = Flask(__name__, static_url_path='/static')
dataItems = {}

sockets = Sockets(app=app)

@sockets.route('/')
def socket(ws):
    while True:
        message = ws.receive()
        print(message)
        ws.send("Hey".encode('UTF-8'))

        
# @app.route('/', methods=["GET", "POST"])
# def home():
#     print("connection")
#     return "hello world"

@app.route('/submitDataMobile', methods=["POST"])
def mobile_data_submit():
    # Get data
    data = request.data
    data = json.loads(data)

    toAdd = ""
    if data["eventType"] == "EVENT_MOVE":
        toAdd = {"id": data["i"], 
                "eventType": data["eventType"],
                "data": {
                    "dX": data["x"],
                    "dY": data["y"]
                }
                }
    else:
        toAdd = {"id": data["i"], 
                "eventType": data["eventType"],
                "data": {
                }
                }
    # get name of mobile device
    name = data["name"]
    try:
        dataItems[name]
        # name already exists so add to existing dict
        dataItems[name].append(toAdd)
    except KeyError as e:
        dataItems[name] = []
        dataItems[name].append(toAdd)
    return "Data Accepted"

@app.route('/getDataDesktop', methods=["POST"])
def desktop_data_get():
    data = request.data
    data = json.loads(data)
    name = data["name"]
    temp = dataItems[name]
    dataItems[name] = []
    return str({"data": temp})

@app.route('/getDataMyo', methods=["POST"])
def myo_data_get():
    data = request.data
    # data = json.loads(data)
    print(data)     
    return "x"


@app.route('/data')
def data():
    return str(dataItems)

if(__name__ == '__main__'):
    app.run(debug=True)