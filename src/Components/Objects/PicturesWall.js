import React from "react";
import { Upload, Icon, Modal } from "antd";
import firebase from "firebase";

export default class PicturesWall extends React.Component { 
  state = {
    previewVisible: false,
    previewImage: "",
    fileList: []
  };

  /**
   *   uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    
   */
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };
  handleUpload = () => {
    
    firebase
      .storage()
      .ref()
      .child(this.state.fileList[0].name)
      .put(this.state.fileList[0]);;
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <div className="clearfix">
        <button
          id="bt-uploadProject"
          className="btn btn-secondary"
          onClick={this.handleUpload}
        >
        Subir
        </button>
        <Upload
          action="//jsonplaceholder.typicode.com/posts/"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 25 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
