import Taro, { Component, createCameraContext } from '@tarojs/taro'
// import {  } from '@tarojs/components'
import { Image, View, Input } from '@tarojs/components';
import { AtButton, AtGrid, AtIcon } from 'taro-ui'
import cameraStore from '../../store/cameraStore'
// import MyPreviewImage from './myPreviewImage'

import 'taro-ui/dist/weapp/css/index.css'

class CameraX extends Component {
    constructor(props) {
        super(props)
        this.state = {
            windowHeight: '593px',
            thumbnail: '',
            picUrls: []
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
                let pics = [];
                that.state.picUrls.map((url, index) => {
                    pics.push(url)
                });
                pics.push(result.tempImagePath)
                pics = pics.reverse()

                cameraStore.setCurrentImageUrls(pics)
                that.setState({
                    thumbnail: result.tempImagePath,
                    picUrls: pics
                })

            },
            fail(err) {
                console.log('takePhoto-fail-err', err)
            },
            complete() {

            }
        })
    }
    onPreviewImage = () => {
        // wx.previewImage({
        //     urls: this.state.picUrls,
        //     success(result) {
        //         console.log('previewimage-result', result)
        //     },
        //     fail(err) {
        //         console.error(err)
        //     },
        //     complete() {

        //     }
        // })

        Taro.navigateTo({
            url: '/pages/utils/myPreviewImage'
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
            <View className='at-row' style={'margin-top: 10px'}>
                <View className='at-col'>
                    <AtButton
                        // size='small'
                        onClick={() => Taro.navigateBack()}
                        circle={true}>退出</AtButton>
                </View>
                <View className='at-col'>
                    <AtButton
                        type='primary'
                        // size='small'
                        onClick={this.onTakePhotoClicked}
                        circle={true}>拍照</AtButton>
                </View>
            </View>
            <View className='at-row'>
                {
                    this.state.picUrls.map((url,index)=>{
                        if(index<3){
                            return <Image
                                src={url}
                                style='width:33%; height: 100px;'></Image>
                        }
                    })
                }
                {this.state.picUrls.length > 0 && <AtIcon 
                    value='add'
                    onClick={()=>this.onPreviewImage()}></AtIcon>}
            </View>
        </View>
    }
}

export default CameraX