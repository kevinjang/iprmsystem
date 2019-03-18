import {observable} from 'mobx'

const orderStore = observable({
    selectedOrderCode:'',
    orderInfo:[],
    addItem(item){
        // console.log('orderInfoStore-item',item)
        const index = this.orderInfo.findIndex(v=>v.orderCode === item.orderCode);
        // console.log('addItem',item)
        if(index>-1){
            return;
        }
        else{
            this.orderInfo.push(item)
        }
    },
    getItem(orderCode){
        const item = this.orderInfo.find(v=>v.orderCode === orderCode)
        return item;
    },
    getItems(){
        // console.log('orderInfo',this.orderInfo)
        // for(let item in this.orderInfo){
        //     console.log('orderStore-item',item)
        // }
        return this.orderInfo
    },
    setSelectedOrderCode(orderCode){
        this.selectedOrderCode = orderCode;
    },
    getSelectedOrderCode(){
        return this.selectedOrderCode;
    }
});

export default orderStore