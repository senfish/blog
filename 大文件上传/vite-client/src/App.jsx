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
    fetch('http://localhost:8020/?name=tom')
    .then((res) => res.json())
    .then(res => {
      console.log('res: ', res);
    })
  }
  return (
    // <div className="upload-file">
    //   <Upload
    //     name="largeFile"
    //     action={"http://localhost:8020/?userid=12"}
    //     // beforeUpload={beforeUpload}
    //   >
    //     <Button icon={<UploadOutlined />}>Click to Upload</Button>
    //   </Upload>
    //   <Button type='primary' onClick={onSubmit}>提交</Button>
    // </div>
    <div>
      <Button onClick={() => setAge((pre) => pre + 1) }>改变年龄</Button>
      <Button onClick={() => setFileList([])}>刷新</Button>
      <Son
        name={'ton'}
        age={age}
      />
    </div>
  );
}


export default App;
