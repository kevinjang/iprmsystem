import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtAvatar, AtButton } from 'taro-ui';
import 'taro-ui/dist/weapp/css/index.css'

class Logs extends Component {
    constructor(props) {
        super(props)
        this.env_type = Taro.getEnv()


        this.state = {
            userName: '',
            userImgUrl: '',
            loginCode: '',
            showLoginModal: true
        }

        try {
            wx.getUserInfo({
                withCredentials: 'false',
                lang: 'zh_CN',
                timeout: 10000,
                success: (result) => {
                    this.setState({
                        userName: result.userInfo.nickName,
                        userImgUrl: result.userInfo.avatarUrl
                    })
                },
                fail: (err) => {
                },
                complete: () => { }
            });
        }
        catch (err) {
        }
    }

    onLoginConfirm = () =>{

    }
    render() {
        return <View>
            <AtAvatar
                text={this.state.userName}
                image={this.state.userImgUrl}
                size='large'
                circle={true}
                customStyle={{ marginTop: '80rpx', marginLeft: '315rpx' }}
            >
            </AtAvatar>
            <View style={{ width: '750rpx', textAlign: 'center', marginTop: '100rpx' }}>
                {this.state.userName}
            </View>
            
            <View style={{ width: '750rpx', textAlign: 'center', marginTop: '100rpx'}}>
                <AtButton 
                    openType='getUserInfo' 
                    type='primary' 
                    style={{ marginTop: '100rpx'}}
                    >登录</AtButton>
            </View>

            <View style={{ width: '750rpx', textAlign: 'center', marginTop: '100rpx' }}>
                <AtButton type='primary' style={{ marginTop: '100rpx' }}>认证</AtButton>
            </View>
            <View style={{ width: '750rpx', textAlign: 'center', marginTop: '50rpx' }}>
                <AtButton type="secondary" style={{ marginTop: '100rpx' }}>注销</AtButton>
            </View>
        </View>
    }
}

export default Logs