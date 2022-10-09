import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import "./style.css";

export const FileUploader = ({ setIsUpload }) => {
  const [files, setFiles] = useState([]);

  const onInputChange = (e) => {
    setFiles(e.target.files);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log();
    if (files.length === 0) {
      toast.error("No Files selected");
      return;
    }

    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append("file", files[i]);
    }

    axios
      .post("https://bulk-uploadlist-app.herokuapp.com/upload", data)
      .then((response) => {
        setIsUpload(true);
        setFiles([]);
        e.target.reset();
        toast.success("Upload Success");
      })
      .catch((e) => {
        toast.error("Upload Error");
      });
  };

  return (
    <form method="post" action="#" id="#" onSubmit={onSubmit}>
      <div className="form-group files">
        <label>Upload Your File </label>
        <input type="file" onChange={onInputChange} className="form-control" />
      </div>

      <button>Submit</button>
    </form>
  );
};
