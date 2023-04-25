import React, { useState } from 'react';
import axios from 'axios';
import '../../assets/css/home.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

function Home() {
//   const toastOptions = {
//     position: "top-right",
//     autoClose: 8000,  
//     pauseOnHover: true,
//     draggable: true,
//     theme: "dark",
// };
//   const [file, setFile] = useState(null);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     var formData = new FormData();
//     formData.append('objFile', file);
//     console.log(file);
//     if(file.name.split('.').pop() !== 'obj') {
//       toast.error('Please upload a .obj file', toastOptions);
//       return;
//     }

//     try {
//       var response = await axios.post('http://localhost:5000/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       console.log(response.data); // Do something with the response data
//       toast.success(response.data.message, toastOptions);
//     } catch (error) {
//       console.log(error); // Handle any errors
//     }
//     // Do something with the formData, like send it to a server
//   };

  return (
    <div className="upload-form-container">
      {/* <h2 className="upload-form-title">Upload a .obj file</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Choose a file:</label>
          <input type="file" className="form-control-file" accept=".obj" onChange={handleFileChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <ToastContainer /> */}
    </div>
  );
}

export default Home;

