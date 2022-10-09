import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import "./style.css";

// Upload file component 
export const FileUploader = ({ setIsUpload }) => {
  const [files, setFiles] = useState([]);

  // Set with path of file that is being uploaded
  const onInputChange = (e) => {
    setFiles(e.target.files);
  };

  // Submit function to upload file.
  const onSubmit = (e) => {
    e.preventDefault();

  //If no file attached toaster message will show
    if (files.length === 0) {
      toast.error("No Files selected");
      return;
    }

    const data = new FormData();

    data.append("file", files[0]);

    axios
    // API endpoint for uploading CSV file.
      .post("https://bulk-uploadlist-app.herokuapp.com/upload", data)
      .then((response) => {
        setIsUpload(true);
        setFiles([]);
        e.target.reset();

    // toaster message when file uploaded successful.
        toast.success("Upload Success");
      })
      .catch((e) => {
    // toaster message when some error is there.
        toast.error("Upload Error");
      });
  };



  return (
    <div className="uploadBox">
    <form method="post" action="#" id="#" onSubmit={onSubmit}>
      <div className="form-group files">
        <label>Upload Your File </label>
        <input type="file" onChange={onInputChange} className="form-control" />
      </div>

      <button>Submit</button>
    </form>
 </div>
  );
};
