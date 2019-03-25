import Taro, { Component } from '@tarojs/taro'
import { View, Camera, Text } from '@tarojs/components';

import orderStore from '../../store/orderInfoStore'
import { AtList, AtListItem, AtButton, AtActionSheet, AtActionSheetItem } from 'taro-ui';
import 'taro-ui/dist/weapp/css/index.css'

class MaterialItemInfo extends Component {
    constructor(props) {
        super(props)
        this.materialItem = orderStore.getSelectedMaterialItem()

        this.state = {
            actionsheetOpened: false
        }
    }

    onPhotographClicked = () => {
        this.setState({
            actionsheetOpened: true
        })
    }

    onTakePhotoClicked = () => {
        Taro.navigateTo({
            url: '/pages/utils/camera'
        })
    }

    render() {
        return <View>
            <AtList>
                <AtListItem title='产品编码' note={this.materialItem.MaterialCode} />
                <AtListItem title='产品名称' note={this.materialItem.MaterialName} />
                <AtListItem title='终端编码' note={this.materialItem.TerminalMerchantName} />
                <AtListItem title='渠道类型' note={this.materialItem.ChannelType} />
                <AtListItem title='规格' note={this.materialItem.SpecificationName} />
                <AtListItem title='预估窜货数量（箱）' note={this.materialItem.EstimateAmount} />
                <AtListItem title='已收样品数量' note={this.materialItem.GetAmount} />
                <AtListItem title='终端进货价（箱）' note={this.materialItem.CostPrice} />
                <AtListItem title='产地' note={this.materialItem.PFactroy} />
                <AtListItem title='生产日期' note={this.materialItem.ProduceDate} />
                <AtListItem title='产品批次' note={this.materialItem.Batch} />
                <AtListItem title='箱码' note={this.materialItem.BoxCode} />
                <AtListItem title='瓶码' note={this.materialItem.BottleCode} />
                <AtListItem title='二维码' note={this.materialItem.QRCode} />
                <AtListItem title='其它可追溯码' note={this.materialItem.OtherCode} />
            </AtList>

            <View >
                <AtButton type='secondary' onClick={this.onPhotographClicked}>拍照</AtButton>
            </View>
            <AtActionSheet
                cancelText='取消'
                isOpened={this.state.actionsheetOpened}
                onClose={() => this.setState({ actionsheetOpened: false })}>
                <AtActionSheetItem onClick={this.onTakePhotoClicked}>
                    <Text>拍照</Text>
                </AtActionSheetItem>
                <AtActionSheetItem>
                    <Text>从手机相册选择</Text>
                </AtActionSheetItem>
            </AtActionSheet>

        </View>
    }
}

export default MaterialItemInfo