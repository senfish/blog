import { useState } from "react";
import { Button, Upload, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Son from './son';

import "./app.less";
import "antd/dist/antd.css";

const maxChunkSize = 2 * 1024
function App() {
  const [fileList, setFileList] = useState([]);
  const [age, setAge] = useState(12);

  const beforeUpload = (file, fileList) => {
    console.log('file: ', file.size);
    console.log('fileList: ', fileList);
    setFileList([file]);
    return false;
  };

  const onSubmit = () => {
    console.log('onSubmit => fileList', fileList);
  }
  return (
    <div className="upload-file">
      <Upload
        name="largeFile"
        action={"http://localhost:3001/?userid=12"}
        // beforeUpload={beforeUpload}
      >
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      <Button type='primary' onClick={onSubmit}>提交</Button>
    </div>
  );
}


export default App;
