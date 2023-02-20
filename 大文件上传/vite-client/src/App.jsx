import { useState } from 'react'
import {Button, Upload} from 'antd';
import './app.less'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Upload>上传文件</Upload>
  )
}

export default App
