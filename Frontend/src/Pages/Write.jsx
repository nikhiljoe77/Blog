import "./Write.css";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";

export default function Write() {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], 
      ["link"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };

 
  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "link",
    "list",
    "bullet",
  ];

  const navigate = useNavigate();
  const state = useLocation().state;
  console.log(state)
  const [value, setValue] = useState(state?.desc|| "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      console.log(formData)
      const res = await axios.post("http://localhost:8800/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    try {
      state
        ? await axios.put(
            `http://localhost:8800/post/updatepost/${state.id}`,
            {
              title,
              desc: value,
              cat,
              img: file ? imgUrl : "",
            },
            { withCredentials: true }
          )
        : await axios.post(
            `http://localhost:8800/post/addpost`,
            {
              title,
              desc: value,
              cat,
              img: file ? imgUrl : "",
              date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            { withCredentials: true }
          );
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            modules={modules} // pass the modules
            formats={formats} // pass the formats
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <br></br>
          <span>
            <b>Status:</b>Draft
          </span>
          <span>
            <b>Visibility:</b>Public
          </span>
          <input
            // style={{ display: "none" }}
            type="File"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {/* <label htmlFor="file">Upload Image</label> */}
          <div className="buttons">
            <button id="save">Save as draft</button>
            <button id="update" onClick={handleSubmit}>
              Update
            </button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <input
            type="radio"
            checked={cat === "tech"}
            name="cat"
            value="tech"
            id="tech"
            onChange={(e) => setCat(e.target.value)}
          />
          <label htmlFor="tech">Tech</label>
          <input
            type="radio"
            checked={cat === "cinema"}
            name="cat"
            value="cinema"
            id="cinema"
            onChange={(e) => setCat(e.target.value)}
          />
          <label htmlFor="cinema">Cinema</label>
          <input
            type="radio"
            checked={cat === "food"}
            name="cat"
            value="food"
            id="food"
            onChange={(e) => setCat(e.target.value)}
          />
          <label htmlFor="food">Food</label>
        </div>
      </div>
    </div>
  );
}
