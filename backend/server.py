from flask import Flask, request,send_from_directory,jsonify
from flask_cors import CORS
import evaluate_segmentation
import pymongo
from pymongo import MongoClient
from dotenv import load_dotenv
import os

app = Flask(__name__)
app.secret_key = "maked by yassine boujrada"
load_dotenv()

URL_LINK = os.getenv("URL_LINK")

cluster = MongoClient(URL_LINK)
db = cluster["3dsf"]

CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    print(data)
    email = data["email"]
    password = data["password"]
    print(email,password)
    collection = db["users"]
    query = {"email":email,"password":password}
    result = collection.find_one(query)
    if result:
        return jsonify({"status":200,"data":result})
    else:
        return jsonify({"status":500})

@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['objFile']
    file_path = 'datasets_raw/from_meshcnn/human_seg/test/' + file.filename
    file.save(file_path)
    print("file to save ::",file,"\npath ::",file_path,"\n")
    # dataset_prepare.prepare_one_dataset("human_seg")
    segments_val = evaluate_segmentation.main("human_seg","human_seg","0010-15.11.2020..05.25__human_seg/",file_path)
    return jsonify(segments_val)


@app.route('/models/<path:filename>')
def serve_model(filename):
    return send_from_directory('datasets_raw/from_meshcnn/human_seg/test', filename)

if __name__ == '__main__':
    app.run(debug=True)