import Taro, { Component } from '@tarojs/taro'
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
      processingItems: []
    }

    this.orderStore = orderStore

    // console.log('index-orderStore',this.orderStore)
    
    const orders = [
      {
        orderCode: "2180778", id: 'x1',
        deliveryCode:'83447622',clientName: '客户1', materialCode:'1703140616',materialName: '奔富Bin138干红葡萄酒 750ml*6',
        carrier: '凌通物流', transportation: '汽运', 
        receivingAddress: '绍兴柯桥金柯桥大道354号', storage: '北京华润仓', plannedBottle: '1200',
        plannedCarton: '200.000'
      },
      {
        orderCode: "2186226", id: 'x2',
        deliveryCode:'83447619',clientName: '客户2', materialCode:'1701152516',materialName: '梦坡梦想典藏礼盒干红 750ml*1*6',
        carrier: '凌通物流', transportation: '汽运', 
        receivingAddress: '绍兴柯桥金柯桥大道354号', storage: '北京华润仓', plannedBottle: '1200',
        plannedCarton: '200.000'
      },
      {
        orderCode: "2212745", id: 'x3',
        deliveryCode:'83448256',clientName: '客户3', materialCode:'1703153016',materialName: '奔富bin407干红葡萄酒（礼盒版） 750ml*6',
        carrier: '凌通物流', transportation: '汽运',
        receivingAddress: '大连市保税区海青仓储一号路南84-07', storage: '北京华润仓', plannedBottle: '2400',
        plannedCarton: '400.000'
      },
      {
        orderCode: "2221711", id: 'x4',
        deliveryCode:'83447117',clientName: '客户4', materialCode:'1701152516',materialName: '梦坡梦想典藏礼盒干红 750ml*1*6',
        carrier: '凌通物流', transportation: '汽运', 
        receivingAddress: '东营市东营区北二路富贵园', storage: '北京华润仓', plannedBottle: '3600',
        plannedCarton: '600.000'
      },
      {
        orderCode: "2223891", id: 'x5',
        deliveryCode:'83447598',clientName: '客户5', materialCode:'1703110516',materialName: '#麦格根黑牌红葡萄酒 750ml*6',
        carrier: '凌通物流', transportation: '汽运',
        receivingAddress: '湖北省武汉市江岸区黄浦大街发展大道花北小区36栋', storage: '北京华润仓', plannedBottle: '2400',
        plannedCarton: '400.000'
      }
    ]

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