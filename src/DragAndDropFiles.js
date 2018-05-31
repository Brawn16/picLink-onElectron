import React, { Component } from "react";
import { storage, db } from "./firebase";
import "./DragAndDropFiles.css";

export default class DragAndDropFiles extends Component {
  state = {
    dropArea: null
  };

  componentDidMount() {
    console.log("did mount");
    const dropArea = document.getElementById("drop-area");

    this.setState({
      dropArea: dropArea,
      user: this.props.user
    });
    this.state.dropArea
      ? this.addEventListeners(this.state.dropArea)
      : console.log("not ready");
  }
  render() {
    console.log("db", db);

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
    let storageRef = storage
      .ref("/photographers-images")
      .child(this.state.user.uid)
      .child(file.name);
    console.log("storage Ref:   ", storageRef);
    storageRef
      .put(file)
      .then(onSnapshot => {
        return onSnapshot.ref.getDownloadURL();
      })
      .then(url => {
        const userRef = db.collection("photographers").doc(this.state.user.uid);
        db
          .runTransaction(transaction => {
            // This code may get re-run multiple times if there are conflicts.
            return transaction.get(userRef).then(doc => {
              const imagesUrl = doc.data().imagesUrl;
              imagesUrl.push(url);
              transaction.update(userRef, {
                imagesUrl: imagesUrl
              });
            });
          })
          .then(function() {
            console.log("Transaction successfully committed!");
          })
          .catch(function(error) {
            console.log("Transaction failed: ", error);
          });
      });
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
