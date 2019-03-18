import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components';
import { inject, observer } from '@tarojs/mobx'
import { AtList, AtListItem, AtAccordion, AtInput, AtModal, AtButton, AtActionSheet, AtActionSheetItem } from 'taro-ui';
import 'taro-ui/dist/weapp/css/index.css'
import './orderInfo.styl'

@inject('orderStore')
@observer
class OrderInfo extends Component {
    constructor(props) {
        super(props)
        const { orderStore } = this.props
        this.orderStore = orderStore
        this.item = this.orderStore.getItem(this.orderStore.getSelectedOrderCode());
        this.state = {
            basicInforOpen: true,
            auditOpinionOpen: false,
            loading: true,
            actionSheetIsOpened: false
        }
    }
    componentWillMount() {
        wx.showLoading({
            title: '加载中...',
            mask: true,
            success: (result) => {

            },
            fail: () => { },
            complete: () => { }
        });
    }
    // orderStore;
    componentDidMount() {
        // console.log(123)

        setTimeout(() => {
            wx.hideLoading();
        }, 500)
    }

    basicInforToggleOpen = () => {
        this.setState({
            basicInforOpen: !this.state.basicInforOpen
        })
    }
    auditOpinionToggleOpen = () => {
        // console.log('xxx')
        this.setState({
            auditOpinionOpen: !this.state.auditOpinionOpen
        })
    }

    processButtonClicked = () => {
        this.setState({
            actionSheetIsOpened: true
        })
    }

    onAgreeClick = ()=>{
        Taro.showToast({
            title: this.item.orderCode,
            icon:'success',
            duration: 2000
        })
        this.setState({ actionSheetIsOpened: false })
    }

    render() {
        return <View>
            <View className='panel__title' >
                {this.item.orderCode}
                <View style={{ float: 'right', marginRight: '50rpx' }}>
                    <AtButton type='primary' size='small' onClick={this.processButtonClicked}>处理</AtButton>
                </View>
            </View>
            <View >
                <AtAccordion
                    title='报告信息'
                    onClick={this.basicInforToggleOpen}
                    open={this.state.basicInforOpen}
                    icon={{ value: 'bullet-list', color: 'red', size: 15 }}>

                    <AtList hasBorder={false}>
                        <AtListItem title='订单号' note={this.item.orderCode.toString()} >
                        </AtListItem>
                        <AtListItem title='交货单号' note={this.item.deliveryCode.toString()} >
                        </AtListItem>
                        <AtListItem title='客户名称' note={this.item.clientName.toString()} >
                        </AtListItem>
                        <AtListItem title='物料编码' note={this.item.materialCode.toString()} >
                        </AtListItem>
                        <AtListItem
                            title='物料描述'
                            // note={this.item.materialName.toString()} 
                            note={this.item.materialName.toString()}>
                        </AtListItem>
                        <AtListItem title='承运商' note={this.item.carrier.toString()} >
                        </AtListItem>
                        <AtListItem title='运输方式' note={this.item.transportation.toString()} >
                        </AtListItem>
                        <AtListItem title='收货地址' note={this.item.receivingAddress.toString()} >
                        </AtListItem>
                        <AtListItem title='发出库位' note={this.item.storage.toString()} >
                        </AtListItem>
                        <AtListItem title='计划瓶数' note={this.item.plannedBottle.toString()} >
                        </AtListItem>
                        <AtListItem title='计划箱数' note={this.item.plannedCarton.toString()} >
                        </AtListItem>
                        {/* <AtListItem title='订单号' note={this.item.orderCode.toString()} >
                    </AtListItem> */}
                    </AtList>
                </AtAccordion>
                <AtAccordion
                    title='处理意见'
                    open={this.state.auditOpinionOpen}
                    icon={{ value: 'message', color: 'darkblue', size: 15 }}
                    onClick={this.auditOpinionToggleOpen}>

                    <AtList hasBorder={false}>
                        <AtListItem title='第一审批人' note='同意' >
                        </AtListItem>
                    </AtList>
                </AtAccordion>
                <AtActionSheet
                    isOpened={this.state.actionSheetIsOpened}
                    onClose={() => { this.setState({ actionSheetIsOpened: false }) }}
                    cancelText='取消'>
                    <AtActionSheetItem onClick={this.onAgreeClick}>
                        <Text style={{color: 'green',fontSize:'bold'}}>同意</Text>
                    </AtActionSheetItem>
                    <AtActionSheetItem>
                    <Text style={{color: 'red',fontSize:'bold'}}>退回</Text>
                    </AtActionSheetItem>
                    <AtActionSheetItem style={{color:'red'}}>
                        结束
                    </AtActionSheetItem>
                </AtActionSheet>
            </View>
        </View>
    }
}

export default OrderInfo