
import tensorflow as tf
from tensorflow import keras
# import pickle
import rnn_model
import json
from easydict import EasyDict
# import utils
# model_mesh.keras


# model = keras.models.load_model('./model_trained/model_mesh.keras')
# load_weights()
# with open('./model_trained/model_mesh.keras', 'rb') as f:
#     model = pickle.load(f)
with open('./model_trained/params.txt') as fp:
    params = EasyDict(json.load(fp))

model_fn = './model_trained/model_mesh.keras'

params.model_fn = "./model_trained/model_mesh.keras"
params.new_run = 0
params.mix_models_in_minibatch = False
params.batch_size = 1
params.net_input.append('vertex_indices')
params.n_walks_per_model = 32
params.net_input_dim = 4

model = rnn_model.RnnWalkNet(params, params.n_classes, params.net_input_dim-1 , model_fn, model_must_be_load=True,
                                       dump_model_visualization=False)

model.load_weights('./model_trained/model_mesh.keras')
# print(model.summary())