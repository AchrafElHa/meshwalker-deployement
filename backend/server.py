from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['objFile']
    print(file)
    return {'message': 'File uploaded successfully'}

if __name__ == '__main__':
    app.run(debug=True)


