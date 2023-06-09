from flask import Flask, request,send_from_directory,jsonify, session
from flask_cors import CORS
import evaluate_segmentation
import pymongo
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import bcrypt

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
    email = data["email"]
    password = data["password"]
    collection = db["users"]
    query = {"email":email,"password":password}
    result = collection.find_one(query)
    if result != None :
      token_to_send = bcrypt.hashpw(bytes(email,'ascii'), bcrypt.gensalt(rounds=15))
      session["email"] = result["email"]
      return jsonify({"status":200,"data":result["email"],"token":token_to_send.decode("utf-8")})
    else:
        return jsonify({"status":500})
    
@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data["email"]
    password = data["password"]
    collection = db["users"]
    try:
      collection.insert_one({"email":email,"password":password})
      return jsonify({"status":200})
    except:
        return jsonify({"status":500})

@app.route('/api/auth/setting', methods=['POST'])
def setting():
    data = request.get_json()
    email = data["email"]
    password = data["password"]
    collection = db["users"]
    try:
        collection.update_one({"email":email},{"$set":{"password":password}})
        return jsonify({"status":200})
    except:
        return jsonify({"status":500})


@app.route('/api/auth/upload', methods=['POST'])
def upload():
    file = request.files['objFile']
    file_path = 'datasets_raw/from_meshcnn/human_seg/test/' + file.filename
    file.save(file_path)
    print("file to save ::",file,"\npath ::",file_path,"\n")
    # dataset_prepare.prepare_one_dataset("human_seg")
    segments_val = evaluate_segmentation.main("human_seg","human_seg","0010-15.11.2020..05.25__human_seg/",file_path)
    return jsonify(segments_val)


@app.route('/api/auth/models/<path:filename>')
def serve_model(filename):
    return send_from_directory('datasets_raw/from_meshcnn/human_seg/test', filename)

if __name__ == '__main__':
    app.run(debug=True)