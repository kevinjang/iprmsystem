import Taro, { Component } from '@tarojs/taro'
import { AtAccordion, AtList, AtListItem } from 'taro-ui'
import { View } from '@tarojs/components'
import 'taro-ui/dist/weapp/css/index.css'
import { inject, observer } from '@tarojs/mobx'

// const cloud = require('wx-server-sdk')

@inject('orderStore')
@observer
export default class Index extends Component {
  constructor() {
    super(...arguments)
    const { orderStore } = this.props
    this.state = {
      current: 0,
      processingAccordinItemOpen: false,
      processingItems: []
    }
    wx.cloud.init();
    this.db = wx.cloud.database();

    this.orderStore = orderStore
  }

  accordinIconSize = 15
  accoedinItemOpen = false

  onProcessingAccordinItemClicked = () => {
    this.setState({
      processingAccordinItemOpen: !this.state.processingAccordinItemOpen
    })
    let that = this;
    if (!this.state.processingAccordinItemOpen)
      this.db.collection('CRSEventTitle')
        .get().then(result => {
          // console.log('title', res);
          let orders = []
          orders = result.data;
          let subOrders = []

          subOrders = [];

          for (let index in orders) {
            const item = orders[index]
            that.orderStore.addTitleItem(item)
          }

          for (let index in subOrders) {
            const item = subOrders[index]
            that.orderStore.addDetailItem(item)
          }
          that.setState({
            processingItems: Array.from(that.orderStore.getItems())
          })
        })
  }

  componentDidMount() {
  }

  loadClickedItem = (e, v) => {
    const CRSEventCode = v.target.dataset.code;
    this.orderStore.setSelectedCRSEventCode(CRSEventCode)
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
              return <AtListItem
                title={(index + 1) + '.投诉单号：' + item.CRSEventCode}
                data-code={item.CRSEventCode}
                arrow="right"
                extraText="详细消息"
                onClick={this.loadClickedItem}>
              </AtListItem>
            })}
          </AtList>
        </AtAccordion>
        <AtAccordion open={this.accoedinItemOpen} title="已处理" icon={{ value: 'check', color: 'green', size: this.accordinIconSize }}></AtAccordion>
        <AtAccordion open={this.accoedinItemOpen} title="草稿箱" icon={{ value: 'list', color: 'darkcyan', size: this.accordinIconSize }}></AtAccordion>
      </View>
    )
  }
}