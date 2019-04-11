import Taro, { Component } from '@tarojs/taro'
import { View, Camera } from '@tarojs/components'
import {AtButton} from 'taro-ui'
import { inject, observer } from '@tarojs/mobx'
import orderStore from '../../store/orderInfoStore';

@inject('orderStore')
@observer
class UploadProof extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount(){
        wx.setNavigationBarTitle({
            title: orderStore.getSelectedCRSEventCode()
        });
    }

    onScanCode = () =>{
        wx.scanCode({
            onlyFromCamera: true,
            scanType: ['qrCode','barCode','datamatrix','pdf417'],
            success: (result)=>{
                Taro.showToast({
                    title: result.result
                })
            }
        });
    }

    render() {
        return <View>
            <Camera style={{height: '250rpx', width: '750px'}}></Camera>
            <AtButton type='primary' onClick={this.onScanCode}>扫码</AtButton>
        </View>
    }
}

export default UploadProof