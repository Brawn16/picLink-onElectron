import React, { Component } from "react";
import { storage, db } from "./firebase";
import "./DragAndDropFiles.css";

export default class DragAndDropFiles extends Component {
  state = {
    dropArea: null
  };

  componentDidMount() {
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
      .ref("/photographers")
      .child(this.state.user.uid)
      .child(file.name);
    storageRef.put(file).then(res => {
      console.log("file uploaded");
    });
    // .then(onSnapshot => {
    //   //return onSnapshot.ref.getDownloadURL();
    // })
    // .then(url => {
    //   const userRef = db.collection("photographers").doc(this.state.user.uid);
    //   db
    //     .runTransaction(transaction => {
    //       return transaction.get(userRef).then(doc => {
    //         const uploadedImages = doc.data().uploadedImages;
    //         uploadedImages.push(url);
    //         transaction.update(userRef, {
    //           uploadedImages: uploadedImages
    //         });
    //       });
    //     })
    //     .then(function() {
    //       console.log("Transaction successfully committed!");
    //     })
    //     .catch(function(error) {
    //       console.log("Transaction failed: ", error);
    //     });
    // });
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
    ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
      this.state.dropArea.addEventListener(
        eventName,
        this.preventDefaults,
        false
      );
    });

    ["dragenter", "dragover"].forEach(eventName => {
      this.state.dropArea.addEventListener(eventName, this.highlight, false);
    });

    ["dragleave", "drop"].forEach(eventName => {
      this.state.dropArea.addEventListener(eventName, this.unhighlight, false);
    });

    this.state.dropArea.addEventListener("drop", this.handleDrop, false);
  };
}
