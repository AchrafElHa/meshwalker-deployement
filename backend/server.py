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
    file_path = 'datasets_raw/from_meshcnn/cubes/apple/test/' + file.filename
    file.save(file_path)
    #dataset_prepare.prepare_one_dataset('cubes')
    print(file)
    class_num = evaluate_classification.main("cubes","cubes")
    os.remove(file_path)
    shutil.rmtree("datasets_processed")
    return {'message': f"class num is {class_num}"}
if __name__ == '__main__':
    app.run(debug=True)


