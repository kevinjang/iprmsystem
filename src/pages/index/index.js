// import Taro, { Component } from '@tarojs/taro'
// import { View, Button, Text } from '@tarojs/components'
// import { observer, inject } from '@tarojs/mobx'

// import './index.styl'


// @inject('counterStore')
// @observer
// class Index extends Component {

//   config = {
//     navigationBarTitleText: '首页'
//   }

//   componentWillMount () { }

//   componentWillReact () {
//     console.log('componentWillReact')
//   }

//   componentDidMount () { }

//   componentWillUnmount () { }

//   componentDidShow () { }

//   componentDidHide () { }

//   increment = () => {
//     const { counterStore } = this.props
//     counterStore.increment()
//   }

//   decrement = () => {
//     const { counterStore } = this.props
//     counterStore.decrement()
//   }

//   incrementAsync = () => {
//     const { counterStore } = this.props
//     counterStore.incrementAsync()
//   }

//   render () {
//     const { counterStore: { counter } } = this.props
//     return (
//       <View className='index'>
//         <Button onClick={this.increment}>+</Button>
//         <Button onClick={this.decrement}>-</Button>
//         <Button onClick={this.incrementAsync}>Add Async</Button>
//         <Text>{counter}</Text>
//       </View>
//     )
//   }
// }

// export default Index 

import Taro, { Component } from '@tarojs/taro'
import { AtTabBar, AtCard, AtButton, AtIcon, AtDrawer } from 'taro-ui'
import { View } from '@tarojs/components'
import 'taro-ui/dist/weapp/css/index.css'

export default class Index extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      current: 0,
      showDrawer: false
    }
  }

  handleClick = (value) => {
    this.setState({
      current: value
    })
  }

  toggleDrawer = ()=>{
    const visi = this.state.showDrawer;
    this.setState({
      showDrawer: !visi
    })
  }

  render() {
    return (
      <View>
        <AtDrawer
          show={this.state.showDrawer}
          left
          mask
          onClose={this.toggleDrawer}
          // items={['menu1','menu2']}
          >
 <View className='drawer-item'>优先展示items里的数据</View>
  <View className='drawer-item'>如果items没有数据就会展示children</View>
  <View className='drawer-item'>这是自定义内容 <AtIcon value='home' size='20' /></View>
  <View className='drawer-item'>这是自定义内容</View>

        </AtDrawer>
        <View className='at-row'>
          <View className='at-col'>
            <AtButton type="secondary" style={{ marginLeft: '5px' }}
              onClick={this.toggleDrawer}>
              <AtIcon className="at-icon at-icon-menu"></AtIcon>
            </AtButton>
          </View>
          <View className='at-col'>
          </View>
          <View className='at-col'>
          </View>
          <View className='at-col'>
          </View>
          <View className='at-col'>
            <AtButton type="primary">
              <AtIcon className="at-icon at-icon-user"></AtIcon>
            </AtButton>
          </View>
        </View>
        <View className='view-content-self'>
          <AtTabBar
            tabList={[
              {
                title: '事项', text: 8
              },
              {
                title: '消息', dot: true
              },
              {
                title: '我的', text: 10
              }
            ]}
            onClick={(value) => this.handleClick(value)}
            current={this.state.current}
            fixed={true}
            fontSize={18}
            style={{ inlineHeight: '64px', backgroundColor: 'steelblue' }}>

          </AtTabBar>
        </View>
      </View>
    )
  }
}