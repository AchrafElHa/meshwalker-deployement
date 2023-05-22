import React, { useState } from 'react';
import axios from 'axios';
import '../../assets/css/home.css';
import '../../assets/css/ObjViewer.css';
import { useNavigate } from "react-router-dom";
// import ObjViewer from './ObjViewer.jsx';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

function Home() {
  const toastOptions = {
    position: "top-right",
    autoClose: 8000,  
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
};
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  // const [objUrl, setObjUrl] = useState(null);
  // const [showObjViewer, setShowObjViewer] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    var formData = new FormData();
    formData.append('objFile', file);
    console.log(file);
    if(file.name.split('.').pop() !== 'obj') {
      toast.error('Please upload a .obj file', toastOptions);
      return;
    }

    // const reader = new FileReader();

    // reader.onload = function(event) {
    //   const url = URL.createObjectURL(new Blob([event.target.result], { type: 'text/plain' }));
    //   setObjUrl(url);
    //   setShowObjViewer(true);
    //   console.log("here");
      
    // };

    // reader.readAsText(file);

    // console.log("render",reader);
    // console.log("url",objUrl);

    try {
      var response = await axios.post('https://6810-34-126-139-41.ngrok-free.app/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data); // Do something with the response data

      toast.success(response.data.message, toastOptions);
      // console.log("wak"+file.name);
      navigate("/home/fileUploaded", {state:{ file }});
    } catch (error) {
      console.log(error); // Handle any errors
    }
    // Do something with the formData, like send it to a server
  };

  return (
    <>
        <main>
            <h1>Home :</h1><br /><br />
            <div className="aboutus-holder" id="aboutus-holder"><br />
                <div className='form-holder'>
                    <div className='title-form'> 
                        <h2>Choose a file to upload</h2>
                    </div><br />

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            {/* {showObjViewer && <ObjViewer url={objUrl}/>} */}
                            <label className="form-label"><h3>Choose a file:</h3></label>
                            <input type="file" className="form-control-file" accept=".obj" onChange={handleFileChange} />
                        </div>
                        <div className='btn-holder'>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>

            <div id='objViewerDiv'>

    </div>
        </main>
        <ToastContainer />
    </>
  );
}

export default Home;