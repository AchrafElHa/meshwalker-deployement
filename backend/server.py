from flask import Flask, request
from flask_cors import CORS
import os
import shutil
import dataset_prepare
import evaluate_segmentation
app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['objFile']
    file_path = 'datasets_raw/from_meshcnn/human_seg/test/' + file.filename
    file.save(file_path)
    print(file)
    dataset_prepare.prepare_one_dataset("human_seg")
    segmentation = evaluate_segmentation.main("human_seg","human_seg","0010-15.11.2020..05.25__human_seg")
    os.remove(file_path)
    shutil.rmtree("datasets_processed")
    return {'message': f"segementation is {segmentation}"}
if __name__ == "__main__":
    app.run()



