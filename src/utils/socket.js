// import { Message } from 'element-ui'
// websocket实例
let wsObj = null;
// ws连接地址
let wsUrl = null;
// let userId = null;
// 是否执行重连 true/不执行 ； false/执行
let lockReconnect = false;
// 重连定时器
let wsCreateHandler = null;
// 连接成功，执行回调函数
let messageCallback = null;
// 连接失败，执行回调函数
let errorCallback = null;
// 发送给后台的数据
let sendDatas = {};

// 20秒一次心跳
const timeout = 10 * 1000;
// 心跳心跳倒计时
let timeoutObj = null;
// 心跳倒计时
let serverTimeoutObj = null;


/**
 * 发起websocket请求函数
 * @param {string} url ws连接地址
 * @param {Object} agentData 传给后台的参数
 * @param {function} successCallback 接收到ws数据，对数据进行处理的回调函数
 * @param {function} errCallback ws连接错误的回调函数
 */
export const connectWebsocket = (url, successCallback, errCallback) => {
  wsUrl = url;
  createWebSoket();
  messageCallback = successCallback;
  errorCallback = errCallback;
  // sendDatas = agentData;
}

// 手动关闭websocket （这里手动关闭会执行onclose事件）
export const closeWebsocket = () => {
  if (wsObj) {
    writeToScreen('手动关闭websocket');
    wsObj.close() // 关闭websocket
    wsObj.onclose() // 关闭websocket(如果上面的关闭不生效就加上这一条)
    // 关闭重连
    lockReconnect = true;
    wsCreateHandler && clearTimeout(wsCreateHandler);
  }
}

// 创建ws函数
const createWebSoket = () => {
  if (typeof (WebSocket) === 'undefined') {
    this.$message.error("您的浏览器不支持WebSocket，无法获取数据");
    return false
  }
  try {
    wsObj = new WebSocket(wsUrl);
    initWsEventHandle();
  } catch (e) {
    this.$message.error("连接异常，开始重连");
    reconnect();
  }
}

const initWsEventHandle = () => {
  try {
    // 连接成功
    wsObj.onopen = (event) => {
      onWsOpen(event);
      // 开启心跳
      heartCheckWebSocket();
    }

    // 监听服务器端返回的信息
    wsObj.onmessage = (event) => {
      onWsMessage(event);
    }

    wsObj.onclose = (event) => {
      writeToScreen('onclose执行关闭事件');
      onWsClose(event);
    }

    wsObj.onerror = (event) => {
      this.$message.error('onerror执行error事件，开始重连');
      onWsError(event);
      reconnect();
    }
  } catch (err) {
    this.$message.error('绑定事件没有成功，开始重连');
    reconnect();
  }
}

const heartCheckWebSocket = () => {
  timeoutObj && clearTimeout(timeoutObj);
  serverTimeoutObj && clearTimeout(serverTimeoutObj);
  timeoutObj = setTimeout(function() {
    // 这里发送一个心跳，后端收到后，返回一个心跳消息
    if (wsObj.readyState == 1) {
      // 如果连接正常
      wsObj.send("heartBeat");
    } else {
      // 否则重连
      reconnect();
    }
    serverTimeoutObj = setTimeout(function() {
      // 超时关闭
      wsObj.close();
    }, timeout);
  }, timeout);
}

const heartCheckWebSocketReset = () => {
  // 清除时间
  clearTimeout(timeoutObj);
  clearTimeout(serverTimeoutObj);
  // 重置心跳
  heartCheckWebSocket();
}

const onWsOpen = (event) => {
  writeToScreen('CONNECT');
  // // 客户端与服务器端通信
  // wsObj.send('我发送消息给服务端');
  // 添加状态判断，当为OPEN时，发送消息
  if (wsObj.readyState === wsObj.OPEN) { // wsObj.OPEN = 1
    console.log("开始通信发送消息")
    // 发给后端的数据需要字符串化
    console.log(sendDatas)
    wsObj.send(JSON.stringify(sendDatas));
  }
  if (wsObj.readyState === wsObj.CLOSED) { // wsObj.CLOSED = 3
    writeToScreen('wsObj.readyState=3, ws连接异常，开始重连');
    reconnect();
    errorCallback();
  }
}
const onWsMessage = (event) => {
  const jsonStr = event.data;
  // writeToScreen('onWsMessage接收到服务器的数据: '+event);
  messageCallback(jsonStr);
  // 收到服务数据信息，重置心跳
  heartCheckWebSocketReset()
}
const onWsClose = (event) => {
  writeToScreen('DISCONNECT');
  // e.code === 1000  表示正常关闭。 无论为何目的而创建, 该链接都已成功完成任务。
  // e.code !== 1000  表示非正常关闭。
  console.log('onclose event: ', event)
  if (event && event.code !== 1000) {
    writeToScreen('非正常关闭');
    errorCallback();
    // 如果不是手动关闭，这里的重连会执行；如果调用了手动关闭函数，这里重连不会执行
    reconnect();
  }
}
const onWsError = (event) => {
  writeToScreen('onWsError: ', event.data);
  errorCallback();
}

const writeToScreen = (massage) => {
  console.log(massage);
}

// 重连函数
const reconnect = () => {
  if (lockReconnect) {
    return;
  }
  writeToScreen('3秒后重连');
  lockReconnect = true;
  // 没连接上会一直重连，设置延迟避免请求过多
  wsCreateHandler && clearTimeout(wsCreateHandler);
  wsCreateHandler = setTimeout(() => {
    writeToScreen('重连...' + wsUrl);
    createWebSoket();
    lockReconnect = false;
    writeToScreen('重连完成');
  }, 3000);
}
