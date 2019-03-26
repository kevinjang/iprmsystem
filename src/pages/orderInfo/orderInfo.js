import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components';
import { inject, observer } from '@tarojs/mobx'
import { AtList, AtListItem, AtAccordion, AtInput, AtModal, AtButton, AtActionSheet, AtActionSheetItem, AtFloatLayout, AtIcon, AtCard, AtSegmentedControl } from 'taro-ui';
import 'taro-ui/dist/weapp/css/index.css'
import './orderInfo.styl'

import MaterialInfo from './materialInfo'
import { Provider } from '@tarojs/mobx/dist';

import { CRS } from '../../models/CRSEventData'

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
            listOrGrid: true,
            auditOpinions: [],
            segs: [],
            columnsInfo: []
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

        this.setState({
            auditOpinions: [
                {
                    title: '第一审批人', content: '同意'
                },
                {
                    title: '第二审批人', content: '同意'
                },
                {
                    title: '第三审批人', content: '同意'
                }
            ],
            columnsInfo: CRS.CRSEventTitleColumnsInfo,
            segs: [this.item.CRSEventCode]
        })
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
            <View>
                <View style={{padding:'0 35px'}}>
                <AtSegmentedControl
                    values={this.state.segs}
                    fontSize={50}>

                </AtSegmentedControl></View>

                <View style={{ float: 'right',  marginTop: '10px' }}>
                    <AtButton type='secondary' size='small' style={"margin-right: 25px"} onClick={this.materialButtonClicked}>物料</AtButton>
                    <AtButton type='primary' size='small' style={"margin-right: 35px"} onClick={this.processButtonClicked}>处理</AtButton>
                </View>
            </View>
            <View >
                <View style={{ float: 'right', paddingRight: '100rpx' }}>
                </View>
                <AtAccordion
                    title='投诉信息'
                    style={'background-color:steelblue;color:white;'}
                    onClick={this.basicInforToggleOpen}
                    open={this.state.basicInforOpen}
                    icon={{ value: 'bullet-list', color: 'red', size: 15 }}>

                    <AtList hasBorder={false}>
                        {this.state.columnsInfo.map((item, index) => {
                            let note = item.note
                            return <AtListItem title={item.title} note={this.item[note].toString()} >
                            </AtListItem>
                        })}
                    </AtList>
                </AtAccordion>
                <AtAccordion
                    title='处理意见'
                    open={this.state.auditOpinionOpen}
                    icon={{ value: 'message', color: 'darkblue', size: 15 }}
                    onClick={this.auditOpinionToggleOpen}>

                    {this.state.auditOpinions.map((item, index) => {
                        return <View style={{ marginTop: '10px' }}>
                            <AtCard title={item.title} note={item.content} extra={(index + 1).toString()} isFull={false}>

                            </AtCard>
                        </View>
                    })}

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