import Taro, {Component} from '@tarojs/taro'
import { View } from '@tarojs/components';
import {inject, observer} from '@tarojs/mobx'

@inject('orderStore')
@observer
class OrderInfo extends Component{
    constructor(props){
        super(props)
        const {orderStore} = this.props
        this.orderStore = orderStore
        console.log('orderStore',orderStore)

    }
    // orderStore;
    componentDidMount(){
    }
    render(){
        return <View>
            {this.orderStore.getSelectedOrderCode()}
        </View>
    }
}

export default OrderInfo