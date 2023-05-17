from flask import Flask, request,send_from_directory
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
    print("file to save ::",file,"\npath ::",file_path,"\n")
    # dataset_prepare.prepare_one_dataset("human_seg")
    evaluate_segmentation.main("human_seg","human_seg","0010-15.11.2020..05.25__human_seg/",file_path)
    # os.remove(file_path)
    # shutil.rmtree("datasets_processed")
    # print("seg",segmentation)
    message_to_show = "segementation is "
    return {'message': message_to_show}

@app.route('/models/<path:filename>')
def serve_model(filename):
    print(filename)
    return send_from_directory('datasets_raw/from_meshcnn/human_seg/test', filename)

if __name__ == '__main__':
    app.run(debug=True)