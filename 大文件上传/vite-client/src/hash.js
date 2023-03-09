const calculateHashIdle = async () => {
  return new Promise(resolve => {
    const spark = new SparkMD5.ArrayBuffer();
    let count = 0;
    // 根据文件内容追加计算
    const appendToSpark = async file => {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = e => {
          spark.append(e.target.result);
          resolve();
        };
      });
    };
    const workLoop = async deadline => {
      // 有任务，并且当前帧还没结束
      while (count < chunks.length && deadline.timeRemaining() > 1) {
        await appendToSpark(chunks[count].file);
        count++;
        // 没有了 计算完毕
        if (count < chunks.length) {
          // 计算中
          this.hashProgress = Number(
            ((100 * count) / chunks.length).toFixed(2)
          );
          // console.log(this.hashProgress)
        } else {
          // 计算完毕
          this.hashProgress = 100;
          resolve(spark.end());
        }
      }
      window.requestIdleCallback(workLoop);
    };
    window.requestIdleCallback(workLoop);
  });
}
