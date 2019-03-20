import Taro,{Component} from '@tarojs/taro'
import { View } from '@tarojs/components';
import { inject, observer } from '@tarojs/mobx';
import { AtList, AtListItem } from 'taro-ui';

@inject('orderStore')
@observer
class MaterialInfo extends Component{
    constructor(props){
        super(props)
    }

    componentDidShow(){
        const {orderStore} = this.props
        this.orderStore = orderStore
        this.CRSEventCode = orderStore.getSelectedCRSEventCode()
        this.state = {
            suborders: this.orderStore.getSubItemsByCode(this.CRSEventCode)
        }

        console.log('materialInfo-suborders',this.state.suborders)
    }

    render(){
        return <View>
            <AtList>
                {/* <AtListItem></AtListItem> */}
                {this.$componentType.state.suborders.map(item=>{
                    return <AtListItem title={'物料名称：'+item.MaterialName} note={'物料号：'+item.MaterialCode}>
                    </AtListItem>
                })}
            </AtList>
        </View>
    }
}

export default MaterialInfo