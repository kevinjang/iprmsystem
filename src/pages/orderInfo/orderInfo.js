import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components';
import { inject, observer } from '@tarojs/mobx'
import { AtList, AtListItem, AtAccordion, AtInput, AtModal, AtButton, AtActionSheet, AtActionSheetItem, AtFloatLayout, AtIcon } from 'taro-ui';
import 'taro-ui/dist/weapp/css/index.css'
import './orderInfo.styl'

import MaterialInfo from './materialInfo'
import { Provider } from '@tarojs/mobx/dist';

@inject('orderStore')
@observer
class OrderInfo extends Component {
    constructor(props) {
        super(props)
        const { orderStore } = this.props
        this.orderStore = orderStore
        this.item = this.orderStore.getItem(this.orderStore.getSelectedCRSEventCode());
        this.state = {
            basicInforOpen: true,
            auditOpinionOpen: false,
            loading: true,
            actionSheetIsOpened: false,
            floatLayoutOpened: false,
            // list - true, grid - false
            listOrGrid: true
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

    materialButtonClicked = () => {
        this.setState({
            floatLayoutOpened: true
        })
    }

    onAgreeClick = () => {
        Taro.showToast({
            title: this.item.CRSEventCode,
            icon: 'success',
            duration: 2000
        })
        this.setState({ actionSheetIsOpened: false })
    }

    render() {
        return <View>
            <View className='panel__title' >
                {this.item.CRSEventCode}
                <View style={{ float: 'right', marginRight: '50rpx' }}>
                    <AtButton type='secondary' size='small' style={{ marginRight: '25px' }} onClick={this.materialButtonClicked}>物料</AtButton>
                    <AtButton type='primary' size='small' style={{ marginLeft: '25px' }} onClick={this.processButtonClicked}>处理</AtButton>
                </View>
            </View>
            <View >
                <View style={{ float: 'right', paddingRight: '100rpx' }}>
                </View>
                <AtAccordion
                    title='投诉信息'
                    onClick={this.basicInforToggleOpen}
                    open={this.state.basicInforOpen}
                    icon={{ value: 'bullet-list', color: 'red', size: 15 }}>

                    <AtList hasBorder={false}>
                        <AtListItem title='投诉单号' note={this.item.CRSEventCode.toString()} >
                        </AtListItem>
                        <AtListItem title='客户名称' note={this.item.CustomerName.toString()} >
                        </AtListItem>
                        <AtListItem title='客户合同号' note={this.item.CusContractCode.toString()} >
                        </AtListItem>
                        <AtListItem title='客户负责人' note={this.item.CusSalesMan.toString()} >
                        </AtListItem>
                        <AtListItem
                            title='负责人电话'
                            note={this.item.PhoneNo.toString()}>
                        </AtListItem>
                        <AtListItem title='所属战区' note={this.item.TheatreCommand.toString()} >
                        </AtListItem>
                        <AtListItem title='所属省区' note={this.item.Province.toString()} >
                        </AtListItem>
                        <AtListItem title='办事处' note={this.item.Office.toString()} >
                        </AtListItem>
                        <AtListItem title='发现窜货的省' note={this.item.LocateProvince.toString()} >
                        </AtListItem>
                        <AtListItem title='发现窜货的市' note={this.item.LocateCity.toString()} >
                        </AtListItem>
                        <AtListItem title='发现窜货的县' note={this.item.LocateDistrict.toString()} >
                        </AtListItem>


                        <AtListItem title='投诉内容' note={this.item.ComplainContent.toString()} >
                        </AtListItem>
                        <AtListItem
                            title='提报时间'
                            note={this.item.SubmitTime.toString()}>
                        </AtListItem>
                        <AtListItem title='投诉状态' note={this.item.EventStatu.toString()} >
                        </AtListItem>
                        <AtListItem title='提报用户' note={this.item.UserAccountID.toString()} >
                        </AtListItem>
                        <AtListItem title='证据状态' note={this.item.ProofStatu.toString()} >
                        </AtListItem>
                        <AtListItem title='证据ID' note={this.item.ProofID.toString()} >
                        </AtListItem>
                        <AtListItem title='事业部' note={this.item.BUDept.toString()} >
                        </AtListItem>
                        <AtListItem title='数据生成时间' note={this.item.CreateTime.toString()} >
                        </AtListItem>
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
                        <Text style={{ color: 'green', fontSize: 'bold' }}>同意</Text>
                    </AtActionSheetItem>
                    <AtActionSheetItem>
                        <Text style={{ color: 'red', fontSize: 'bold' }}>退回</Text>
                    </AtActionSheetItem>
                    <AtActionSheetItem style={{ color: 'red' }}>
                        结束
                    </AtActionSheetItem>
                </AtActionSheet>
            </View>
            <View>
                <AtFloatLayout
                    isOpened={this.state.floatLayoutOpened} title='物料行项目信息'
                    onClose={() => { this.setState({ floatLayoutOpened: false }) }}>
                    <Provider store={this.orderStore}>
                        <MaterialInfo></MaterialInfo>
                    </Provider>
                </AtFloatLayout>
            </View>
        </View>
    }
}

export default OrderInfo