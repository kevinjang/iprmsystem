import { observable } from 'mobx'

const orderStore = observable({
    selectedCRSEventCode: '',
    orderInfo: [],
    subOrderInfo: [],
    selectedMaterialItem:{},
    addTitleItem(item) {
        const index = this.orderInfo.findIndex(v => v.CRSEventCode === item.CRSEventCode);
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
        for(let index in fullsuborders){
            const item = this.subOrderInfo[index]
            if(item.CRSEventCode === CRSEventCode){
                suborders.push(item)
            }
        }

        return suborders;
    },
    setSelectedCRSEventCode(CRSEventCode) {
        this.selectedCRSEventCode = CRSEventCode;
    },
    getSelectedCRSEventCode() {
        return this.selectedCRSEventCode;
    },
    setSelectedMaterialItem(item){
        this.selectedMaterialItem = item
    },
    getSelectedMaterialItem(){
        return this.selectedMaterialItem;
    }
});

export default orderStore