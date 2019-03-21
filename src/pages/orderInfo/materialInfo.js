import Taro,{Component} from '@tarojs/taro'
import { View, CoverView } from '@tarojs/components';
import { inject, observer } from '@tarojs/mobx';
import { AtList, AtListItem } from 'taro-ui';

@inject('orderStore')
@observer
class MaterialInfo extends Component{
    constructor(props){
        super(props)
        // this.state = {
        // }
    }

    componentDidMount(){
    }

    componentDidShow(){
        
        const {orderStore} = this.props
        this.orderStore = orderStore
        this.CRSEventCode = orderStore.getSelectedCRSEventCode()
        this.state = {
            suborders: this.orderStore.getSubItemsByCode(this.CRSEventCode),            
            coverViewStyle: {
                backgroundColor:'blue',
                height: '100rpx', 
                width:'750rpx',
                dispay: 'none'
            }
        }

        // console.log('materialInfo-suborders',this.state.suborders)
    }

    onListItemClicked = (e,v) => {
        // console.log('onListItemClicked-arguments',...arguments)
        // console.log('onListItemClicked-e,v',e,v)
        // this.setState({
        //     coverViewStyle:{
        //         ...this.state.coverViewStyle,
        //         display: 'block'
        //     }
        // })

        let materialCode = v.currentTarget.dataset.code

        const item = this.state.suborders.find(v=>v.MaterialCode === materialCode);

        // this.orderStore.

        this.orderStore.setSelectedMaterialItem(item)

        Taro.navigateTo({
            url: '/pages/orderInfo/materialItemInfo'
        })

        // Taro.showModal({
        //     title:'物料信息'+v.currentTarget.dataset.code,
        //     content: '物料明细',
        //     showCancel: false
        // })
    }

    render(){
        return <View>
            <AtList>
                {/* <AtListItem></AtListItem> */}
                {/* {console.log('this.state.suborders',this.state.suborders)} */}
                {this.state.suborders&&this.state.suborders.map(item=>{
                    return <AtListItem 
                        arrow='right'
                        title={'物料名称：'+item.MaterialName} 
                        note={'物料号：'+item.MaterialCode}
                        data-code={item.MaterialCode}
                        onClick={this.onListItemClicked}>
                    </AtListItem>
                })}
            </AtList>
            {/* <CoverView 
                style={this.state.coverViewStyle}
                visible={false}>

            </CoverView> */}
        </View>
    }
}

export default MaterialInfo