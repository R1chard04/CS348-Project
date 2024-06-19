from flask import Flask
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
@cross_origin()
def hello():
    return json.dumps({'msg': 'HELLO WORLDDDDD'})

@app.route('/about')
def about():
    return '<h1>About</h1>'

if __name__ == '__main__':
    app.run()

