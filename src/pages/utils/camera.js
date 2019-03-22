import Taro, { Component, createCameraContext } from '@tarojs/taro'
// import {  } from '@tarojs/components'
import { Image, View, Input } from '@tarojs/components';
import { AtButton, AtGrid } from 'taro-ui'
import cameraStore from '../../store/cameraStore'

import 'taro-ui/dist/weapp/css/index.css'

class CameraX extends Component {
    constructor(props) {
        super(props)
        this.state = {
            windowHeight: '593px',
            thumbnail: ''
        }
    }
    cameraContext = null;
    componentDidMount() {
        this.cameraContext = createCameraContext();
        wx.getSystemInfo({
            success: (result) => {
                console.log('getsysteminfo-result', result)
                this.setState({
                    windowHeight: (result.windowHeight - 150) + 'px'
                }, () => {

                    console.log('this.cameraContext', this.cameraContext)
                })
            },
            fail: (err) => {
                console.log('CameraX-fail', err)
            },
            complete: () => { }
        });
    }
    onTakePhotoClicked = () => {
        if (!this.cameraContext) {
            this.cameraContext = createCameraContext()
        }
        const that = this

        this.cameraContext.takePhoto({
            success(result) {
                // console.log('takePhoto-success-this', this)
                // this.setState({
                //     thumbnail: result.tempImagePath
                // })

                that.setState({
                    thumbnail: result.tempImagePath
                })

                // cameraStore.setCurrentImageUrl(result.tempImagePath)
            },
            fail(err) {
                console.log('takePhoto-fail-err', err)
            },
            complete() {

            }
        })
    }
    setSetState = ({ thumbnail }) => {
        this.setState({
            thumbnail
        })
    }
    render() {
        return <View style={{ width: '100%', height: '1000rpx' }} >
            <camera
                device-position="back"
                flash="off"
                binderror="error"
                style={`width: 100%;height:${this.state.windowHeight}`}
                quality='high'>

            </camera>
            <View className='at-row'>
                <View className='at-col'>
                    <AtButton onClick={this.onTakePhotoClicked}>退出</AtButton>
                </View>
                <View className='at-col'>
                    <AtButton onClick={this.onTakePhotoClicked}>拍照</AtButton>
                </View>
                <View className='at-col'>
                    thumbnail:{this.state.thumbnail}
                    <Image src={this.state.thumbnail} style='width:33%; height: 100px;'></Image>
                    {/* <Input value={this.state.thumbnail}></Input> */}
                </View>
            </View>
        </View>
    }
}

export default CameraX