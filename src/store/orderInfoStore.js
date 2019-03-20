import { observable } from 'mobx'

const orderStore = observable({
    selectedCRSEventCode: '',
    orderInfo: [],
    subOrderInfo: [],
    addTitleItem(item) {
        // console.log('orderInfoStore-item',item)
        const index = this.orderInfo.findIndex(v => v.CRSEventCode === item.CRSEventCode);
        // console.log('addItem',item)
        if (index > -1) {
            return;
        }
        else {
            this.orderInfo.push(item)
        }
    },
    addDetailItem(item) {
        const index = this.subOrderInfo.findIndex(v => v.CRSEventCode === item.CRSEventCode && v.EventLineID === item.EventLineID);
        if (index > -1) {
            return;
        } else {
            this.subOrderInfo.push(item)
        }
    },
    getItem(CRSEventCode) {
        const item = this.orderInfo.find(v => v.CRSEventCode === CRSEventCode)
        return item;
    },
    getItems() {
        return this.orderInfo
    },
    getSubItemsByCode(CRSEventCode) {
        let suborders = []
        let fullsuborders = Array.from(this.subOrderInfo);
        console.log(' this.fullsuborders', fullsuborders)
        for(let index in fullsuborders){
            const item = this.subOrderInfo[index]
            if(item.CRSEventCode === CRSEventCode){
                suborders.push(item)
            }
        }

        console.log('getSubItemsByCode-suborders',suborders)
        return suborders;
    },
    setSelectedCRSEventCode(CRSEventCode) {
        this.selectedCRSEventCode = CRSEventCode;
    },
    getSelectedCRSEventCode() {
        return this.selectedCRSEventCode;
    }
});

export default orderStore