import Taro, { Component } from '@tarojs/taro'
import  { getCRSEventTitle } from '../../utils/requestWithFly'
import { AtTabBar, AtCard, AtButton, AtIcon, AtDrawer, AtAccordion, AtBadge, AtList, AtListItem, AtInput } from 'taro-ui'
import { View } from '@tarojs/components'
import 'taro-ui/dist/weapp/css/index.css'
import {inject, observer} from '@tarojs/mobx'
// import { observer } from '@tarojs/mobx/dist';

@inject('orderStore')
@observer
export default class Index extends Component {
  constructor() {
    super(...arguments)
    const {orderStore} = this.props
    this.state = {
      current: 0,
      showDrawer: false,
      menus: ['待处理', '已处理', '草稿'],
      processingAccordinItemOpen: false,
      processingItems: [],
      pageSize: 20,
      currentPage: 1
    }

    this.orderStore = orderStore

    // console.log('index-orderStore',this.orderStore)
    
    const orders = []

    getCRSEventTitle({
      pageSize: this.state.pageSize,
      currentPage: this.state.currentPage
    }).then(result=>{
      console.log('getCRSEventTitle-result', result);
    })
    .catch(error=>{
      console.log('getCRSEventTitle-error', error);
    })

    for(let index in orders){
      // console.log('index-orders',item)
      const item = orders[index]
      this.orderStore.addItem(item)
    }

    this.setState({
      processingItems: Array.from(this.orderStore.getItems())
    })
  }

  accordinIconSize = 15
  accoedinItemOpen = false

  handleClick = (value) => {
    this.setState({
      current: value
    })

    // console.log(value)
  }

  toggleDrawer = () => {
    const visi = this.state.showDrawer;
    this.setState({
      showDrawer: !visi
    })
  }

  onDrawerItemClick = (index) => {
    // console.log(this.state.menus[index])
  }

  onProcessingAccordinItemClicked = () => {
    // const {orderStore} = this.props
    // console.log('this.props',...(this.props))
    // this.setState({
    //   processingItems: orderStore.getItems()
    // })

    let curr = !this.state.processingAccordinItemOpen
    this.setState({
      processingAccordinItemOpen: curr
    })
  }

  componentDidMount() {
    
  }

  // compo

  loadClickedItem = (e) => {
    const orderCode = e._relatedInfo.anchorTargetText.split('：')[1]
    this.orderStore.setSelectedOrderCode(orderCode)

    Taro.navigateTo({
      url: '/pages/orderInfo/orderInfo'
    })
  }

  render() {
    return (
      <View>
        <AtAccordion
          open={this.state.processingAccordinItemOpen}
          title="待处理" icon={{ value: 'bell', color: 'red', size: this.accordinIconSize }}
          onClick={this.onProcessingAccordinItemClicked}>
          <AtList hasBorder={true}>
            {this.state.processingItems.map((item, index) => {
              return <View>
                <AtListItem
                  title={(index + 1) + '.订单号：' + item.orderCode}
                  arrow="right"
                  extraText="详细消息"
                  onClick={this.loadClickedItem}>
                </AtListItem>
              </View>
            })}
          </AtList>
        </AtAccordion>
        <AtAccordion open={this.accoedinItemOpen} title="已处理" icon={{ value: 'check', color: 'green', size: this.accordinIconSize }}></AtAccordion>
        <AtAccordion open={this.accoedinItemOpen} title="草稿箱" icon={{ value: 'list', color: 'darkcyan', size: this.accordinIconSize }}></AtAccordion>
      </View>
    )
  }
}