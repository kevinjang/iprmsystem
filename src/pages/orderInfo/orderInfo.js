import Taro, {Component} from '@tarojs/taro'
import { View } from '@tarojs/components';
import {inject, observer} from '@tarojs/mobx'
import { AtList, AtListItem } from 'taro-ui';
import 'taro-ui/dist/weapp/css/index.css'
import './orderInfo.styl'

@inject('orderStore')
@observer
class OrderInfo extends Component{
    constructor(props){
        super(props)
        const {orderStore} = this.props
        this.orderStore = orderStore
        // console.log('orderStore',orderStore)
        this.orders = this.orderStore.getItems();
        this.item = this.orderStore.getItem(this.orderStore.getSelectedOrderCode());
    }
    // orderStore;
    componentDidMount(){
    }
    render(){
        return <View>
            <View className="panel__title">{this.item.orderCode}</View>
            {/* {this.orderStore.getSelectedOrderCode()} */}
            {/* {console.log('this.orders',Array.from(this.orders))} */}
            {console.log('orderInfo-item',this.item)}
            <AtList>
                {/* {this.orders.map(item=>{
                    console.log('item', item)
                    return <AtListItem title={item.orderCode} note={item.deliveryCode}>

                    </AtListItem>
                })} */}
                <AtListItem title={this.item.orderCode}></AtListItem>
                <AtListItem title={this.item.deliveryCode}></AtListItem>
                <AtListItem title={this.item.id}></AtListItem>
            </AtList>
        </View>
    }
}

export default OrderInfo