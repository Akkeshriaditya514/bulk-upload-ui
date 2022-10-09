import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { FileUploader } from "./components/FileUploader/FileUploader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Preview } from "./components/Preview/Preview";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [isUpload, setIsUpload] = useState(false);

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://bulk-uploadlist-app.herokuapp.com/count",
    })
      .then((res) => {
        setCount(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
    setIsUpload(false);
  }, [isUpload]);

  return (
    <>
      <Navbar count={count} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Preview />} />
          <Route path="/product" element={<Preview />} />
          <Route
            path="/upload"
            element={<FileUploader setIsUpload={setIsUpload} />}
          />
        </Routes>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
