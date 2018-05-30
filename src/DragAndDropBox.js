import React, { Component } from "react";
import firebase from "./firebase";
import FileUploader from "react-firebase-file-uploader";

export default class DragAndDropBox extends Component {
  state = {
    username: "",
    avatar: "",
    isUploading: false,
    progress: 0,
    avatarURL: ""
  };

  handleChangeUsername = event =>
    this.setState({
      username: event.target.value
    });
  handleUploadStart = () =>
    this.setState({
      isUploading: true,
      progress: 0
    });
  handleProgress = progress =>
    this.setState({
      progress
    });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({
      avatar: filename,
      progress: 100,
      isUploading: false
    });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ avatarURL: url }));
  };
  render() {
    return (
      <div>
        <h1>Drag your files here</h1>
        <div>
          <form>
            <label>Username:</label>
            <input
              type="text"
              value={this.state.username}
              name="username"
              onChange={this.handleChangeUsername}
            />
            <label>Avatar:</label>
            {this.state.isUploading && (
              <progress value={this.state.progress} max="100" />
            )}
            {this.state.avatarURL && (
              <img src={this.state.avatarURL} width="20px" height="20px" />
            )}
            <FileUploader
              multiple
              accept="image/*"
              name="avatar"
              randomizeFilename
              storageRef={firebase.storage().ref("images")}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
            />
          </form>
        </div>
      </div>
    );
  }
}
