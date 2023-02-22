import { Button } from "antd";
import React, { memo } from 'react'

function Son (props) {
    console.log('son组件');
  return(
    <div>
      {props.name} | {props.age}
    </div>
  )
}

export default memo(Son);