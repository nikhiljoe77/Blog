import "./Write.css";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
export default function Write() {
  const [value, setValue] = useState("");
  return (
    <div className="add">
      <div className="content">
        <input type="text" placeholder="Title" />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
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
          <input style={{ display: "none" }} type="File" id="file" />
          <label htmlFor="file">Upload Image</label>
          <div className="buttons">
            <button id="save">Save as draft</button>
            <button id="update">Update</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <input type="radio" name="cat" value="tech" id="tech" />
          <label htmlFor="tech">Tech</label>
          <input type="radio" name="cat" value="cinema" id="cinema" />
          <label htmlFor="cinema">Cinema</label>
          <input type="radio" name="cat" value="food" id="food" />
          <label htmlFor="food">Food</label>
        </div>
      </div>
    </div>
  );
}
