from flask import Flask, request
from flask_cors import CORS
import os
import shutil
import dataset_prepare
import evaluate_classification

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['objFile']
    print(file,"======> ",file.filename)
    file_path = 'datasets_raw/' + file.filename
    file.save(file_path)
    #dataset_prepare.prepare_one_dataset('cubes')
    print(file)
    class_num = evaluate_classification.main("human_seg","--- model_trained/0010-15.11.2020..05.25__human_seg")
    os.remove(file_path)
    shutil.rmtree("datasets_processed")
    return {'message': f"class num is {class_num}"}
if __name__ == '__main__':
    app.run(debug=True)