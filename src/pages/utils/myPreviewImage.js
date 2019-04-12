import Taro, { Component } from '@tarojs/taro'
import { Image, View, CoverView, Swiper, SwiperItem } from '@tarojs/components'
import cameraStore from '../../store/cameraStore'
import './myPreviewImage.styl'

export default class MyPreviewImage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            urls: [],
            windowHeight: 543,
            currentSwiperItem: 0
        }
    }

    componentDidMount() {
        if (cameraStore) {
            const newUrls = cameraStore.getCurrentImageUrls()
            if (newUrls.length > 0) {
                this.setState({
                    urls: newUrls
                })
            }
        }

        const that = this
        Taro.getSystemInfo({
            success(result){
                that.setState({
                    windowHeight: result.windowHeight - 50
                })
            },
            fail(err){
            }
        })
    }

    render() {
        return <View style={{height: this.state.windowHeight+'px'}}>
            <Swiper style={{height: (this.state.windowHeight - 50)+'px'}}
                indicatorDots={true}
                indicatorColor={'white'}
                current={this.state.currentSwiperItem}
                circular={true}
                onChange={(e)=>{ 
                    this.setState({
                        currentSwiperItem: e.currentTarget.current
                    })
                 }}>
                {this.state.urls.map((url,index)=>{
                    return <SwiperItem>
                        <Image src={url} style={{width: '100%', height: (this.state.windowHeight-50)+'px'}}>

                        </Image>
                    </SwiperItem>
                })}

            </Swiper>
            <CoverView className='selectionCoverView'>
            </CoverView>
            <View style={{height: '50px',backgroundColor: 'cyan', width: '100%'}}>

            </View>
        </View>
    }
}