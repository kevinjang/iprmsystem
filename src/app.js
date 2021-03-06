import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import Index from './pages/index'
import orderStore from './store/orderInfoStore'

import './app.styl'

import {AtTabBar} from 'taro-ui'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = {
  orderStore
}

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/logs/logs',
      'pages/notification/notification',
      'pages/uploadProof/uploadProof',
      'pages/orderInfo/orderInfo',
      'pages/orderInfo/materialItemInfo',
      'pages/utils/camera',
      'pages/utils/myPreviewImage'
    ],
    window: {
      backgroundTextStyle: 'light',
      // backgroundColor:'',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '窜货上报管理系统',
      navigationBarTextStyle: 'black'
    }
    ,
    tabBar:{
      list:[
        {
          text:'HomePage',
          pagePath:'pages/index/index',
          // iconPath: './assets/basic/moon.png',
          // selectedIconPath: './assets/basic/store.png'
        },
        {
          text:'消息',
          pagePath:'pages/notification/notification',
          // iconPath: './assets/basic/moon.png',
          // selectedIconPath: './assets/basic/online_shopping.png'
        },
        {
          text:'Me',
          pagePath:'pages/logs/logs',
          // iconPath: './assets/basic/moon.png',
          // selectedIconPath: './assets/basic/online_shopping.png'
        }
      ]
    }
  }

  constructor(props){
    super(props)
  }

  componentDidMount () {
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
