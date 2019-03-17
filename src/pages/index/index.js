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

    // console.log('index-orderStore',orderStore)
    
    const orders = [
      {
        orderCode: "2180778", id: 'x1',
        deliveryCode:'83447622'
      },
      {
        orderCode: "2186226", id: 'x2',
        deliveryCode:'83447619'
      },
      {
        orderCode: "2212745", id: 'x3',
        deliveryCode:'83448256'
      },
      {
        orderCode: "2221711", id: 'x4',
        deliveryCode:'83447117'
      },
      {
        orderCode: "2223891", id: 'x5',
        deliveryCode:'83447598'
      }
    ]

    for(let index in orders){
      // console.log('index-orders',item)
      const item = orders[index]
      this.orderStore.addItem({
        orderCode: item.orderCode,
        deliveryCode:item.deliveryCode,
        id: item.id
      })
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
    // console.log('orderStore',orderStore)
    const orderCode = e._relatedInfo.anchorTargetText.split('：')[1]
    this.orderStore.setSelectedOrderCode(orderCode)

    Taro.navigateTo({
      url: '/pages/orderInfo/orderInfo'
    })
    // console.log(orderCode)
  }

  render() {
    return (
      <View>
        {/* <AtDrawer
          show={this.state.showDrawer}
          left
          mask
          onClose={this.toggleDrawer}
          items={this.state.menus}
          onItemClick={this.onDrawerItemClick}
        >
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
        </View> */}
        <AtAccordion
          open={this.state.processingAccordinItemOpen}
          title="待处理" icon={{ value: 'bell', color: 'red', size: this.accordinIconSize }}
          onClick={this.onProcessingAccordinItemClicked}>
          <AtList hasBorder={true}>
            {/* <AtListItem title={"第一行标题"} arrow="right" >

            </AtListItem> */}

            {this.state.processingItems.map((item, index) => {
              return <View>
                <AtListItem
                  title={(index + 1) + '.订单号：' + item.orderCode}
                  arrow="right"
                  // note={item.id}
                  extraText="详细消息"
                  onClick={this.loadClickedItem}>
                </AtListItem>
                {/* <AtInput value={item.title}></AtInput> */}
              </View>
            })}
          </AtList>
        </AtAccordion>
        <AtAccordion open={this.accoedinItemOpen} title="已处理" icon={{ value: 'check', color: 'green', size: this.accordinIconSize }}></AtAccordion>
        <AtAccordion open={this.accoedinItemOpen} title="草稿箱" icon={{ value: 'list', color: 'darkcyan', size: this.accordinIconSize }}></AtAccordion>
        {/* <View className='view-content-self'>
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
        </View> */}
      </View>
    )
  }
}