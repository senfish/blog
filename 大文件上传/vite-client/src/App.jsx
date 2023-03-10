import { useState, useRef } from "react";
import { Button, Upload, Space, message, Progress, Divider } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Axios from "axios";
import SparkMD5 from 'spark-md5';
import "./app.less";
import "antd/dist/antd.css";
              // KB     MB    GB
const chunkSize = 4;

function App() {
  const [fileList, setFileList] = useState([]);
  const [progressFileList, setProgressFileList] = useState([]);
  const [filehash, setFilehash] = useState('');
  const [percent, setPercent] = useState(0);

  const beforeUpload = (file, fileList) => {
    console.log("file: ", file);
    setFileList([file]);
    return false;
  };
  const getFileHash = (file) => {
    const spark = new SparkMD5.ArrayBuffer();
    return new Promise((resolve) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        spark.append(e.target.result);
        resolve(spark.end());
      }
    })
  }
  const onSubmit = async () => {
    let chunks = handleChunkFile();
    // 对大文件hash处理
    const filehash = await getFileHash(fileList[0]);
    setFilehash(filehash);
    chunks = chunks.map((item) => {
      return {
        ...item,
        hash: fileList[0].name + "_" + item.index, // todo 对每一个chunk也要hash处理
      };
    });
    console.log("chunks", chunks);
    // 组成formdata数组
    chunks = chunks.map((chunk) => {
      const formData = new FormData();
      formData.append("hash", chunk.hash);
      formData.append("file", chunk.file);
      formData.append("index", chunk.index);
      formData.append("max", chunks.length);
      formData.append("filehash", filehash);
      return formData;
    });
    // 包装成数组请求
    let chunksRequests = chunks.map((chunkFormData) => {
      return new Promise((resolve, reject) => {
        Axios({
          url: "http://localhost:3000/upload",
          method: "POST",
          data: chunkFormData,
          onUploadProgress: (process) => {
          },
        }).then((res) => {
          resolve(res);
        });
      });
    });
    try {
      const data = await Promise.all(chunksRequests);
      console.log("data: ", data);
      message.success("上传成功");
    } catch (err) {
      message.error("上传失败");
    }
  };
  const handleChunkFile = () => {
    let file = fileList[0];
    let chunks = [];
    let cur = 0; // 开始的位置
    let index = 0;
    // 开始切片
    while (cur < file.size) {
      const chunk = file.slice(cur, cur + chunkSize);
      chunks.push({
        file: chunk,
        index: index++,
      });
      cur = cur + chunkSize;
    }
    return chunks;
  };
  const onMergeFile = () => {
    Axios({
      url: "http://localhost:3000/mergefile",
      method: "POST",
      data: {
        maxSize: chunkSize,
        originFilename: fileList[0].name,
        filehash
      },
    })
      .then((res) => {
        console.log("merge ==> res: ", res);
        message.success("合并成功");
      })
      .catch((err) => {
        message.error("err", err);
      });
  };

  const progressBeforeUpload = (file, fileList) => {
    setProgressFileList([file]);
    return false;
  };
  const onProgressSubmit = () => {
    const progressFormData = new FormData();
    progressFormData.append("file", progressFileList[0]);
    Axios({
      url: "http://localhost:3000/progress",
      method: "POST",
      data: progressFormData,
      onUploadProgress: (process) => {
        console.log("progressFormData====>: ", process);
        const { progress } = process;
        setPercent(() => progress.toFixed(2) * 100);
      },
    }).then((res) => {
      // resolve(res);
    });
  };
  return (
    <div className="upload-file">
      <Upload
        name="largeFile"
        action={"http://localhost:3000/upload"}
        beforeUpload={beforeUpload}
      >
        <Button icon={<UploadOutlined />}>上传切片文件</Button>
      </Upload>

      <Space>
        <Button type="primary" onClick={onSubmit}>
          切片提交
        </Button>
        <Button type="primary" onClick={onMergeFile}>
          合并切片
        </Button>
      </Space>
      <Divider />
      {/* 测试进度条的 */}
      <Upload
        name="progress"
        action={"http://localhost:3000/progress"}
        beforeUpload={progressBeforeUpload}
      >
        <Button icon={<UploadOutlined />}>上传进度条文件</Button>
      </Upload>
      <Space>
        <Button type="primary" onClick={onProgressSubmit}>
          展示进度条
        </Button>
        不要上传超过150mb的文件
      </Space>
      <Progress percent={percent} />
    </div>
  );
}

export default App;
