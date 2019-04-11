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
    }

    onListItemClicked = (e,v) => {
        let materialCode = v.currentTarget.dataset.code;
        const item = this.state.suborders.find(v=>v.MaterialCode === materialCode);
        this.orderStore.setSelectedMaterialItem(item)
        Taro.navigateTo({
            url: '/pages/orderInfo/materialItemInfo'
        })
    }
    render(){
        return <View>
            <AtList>
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
        </View>
    }
}

export default MaterialInfo