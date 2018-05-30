import React, { Component } from "react";
import firebase from "./firebase";
import FileUploader from "react-firebase-file-uploader";
import "./DragAndDropFiles.css";

export default class DragAndDropFiles extends Component {
  state = {
    dropArea: null
  };

  componentDidMount() {
    console.log("did mount");
    const dropArea = document.getElementById("drop-area");
    const progressBar = document.getElementById("progress-bar");
    this.setState({
      dropArea: dropArea,
      uploadProgress: [],
      progressBar: progressBar
    });
    this.state.dropArea
      ? this.addEventListeners(this.state.dropArea)
      : console.log("not ready");
  }
  render() {
    this.state.dropArea
      ? this.addEventListeners(this.state.dropArea)
      : console.log("not ready in render yet");

    return (
      <div>
        <div id="drop-area">
          <form className="my-form">
            <p>
              Upload multiple files with the file dialog or by dragging and
              dropping images onto the dashed region
            </p>
            <input
              type="file"
              id="fileElem"
              multiple
              accept="image/*"
              onChange={e => this.handleFiles(e.target.files)}
            />
            <label className="button" htmlFor="fileElem">
              Select some files
            </label>
          </form>

          <div id="gallery" />
        </div>
      </div>
    );
  }

  uploadFile = (file, i) => {
    let url = `https://api.cloudinary.com/v1_1/sumbal/image/upload`;
    let xhr = new XMLHttpRequest();
    let formData = new FormData();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    formData.append("upload_preset", "s8xhg5kj");
    formData.append("file", file);
    xhr.send(formData);
  };

  previewFile = file => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function() {
      let img = document.createElement("img");
      img.src = reader.result;
      document.getElementById("gallery").appendChild(img);
    };
  };

  handleFiles = files => {
    // console.log(e);
    // const dt = e.dataTransfer;
    // let files = dt.files;
    files = [...files];
    files.forEach(this.uploadFile);
    files.forEach(this.previewFile);
  };
  preventDefaults = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  highlight = e => {
    this.state.dropArea.classList.add("highlight");
  };

  unhighlight = e => {
    this.state.dropArea.classList.remove("active");
  };

  handleDrop = e => {
    const dt = e.dataTransfer;
    const files = dt.files;
    this.handleFiles(files);
  };

  addEventListeners = dropArea => {
    // Prevent default drag behaviors
    ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
      this.state.dropArea.addEventListener(
        eventName,
        this.preventDefaults,
        false
      );
    });

    // Highlight drop area when item is dragged over it
    ["dragenter", "dragover"].forEach(eventName => {
      this.state.dropArea.addEventListener(eventName, this.highlight, false); //
    });

    ["dragleave", "drop"].forEach(eventName => {
      this.state.dropArea.addEventListener(eventName, this.unhighlight, false); //
    });

    // Handle dropped files
    this.state.dropArea.addEventListener("drop", this.handleDrop, false); //
  };
}
