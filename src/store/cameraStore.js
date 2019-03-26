import { observable } from 'mobx'

const cameraStore = observable({
    currentImageUrl: '',
    currentImageUrls: [],
    setCurrentImageUrl(url) {
        this.currentImageUrl = url
        this.addOneImageUrlIntoCurrentImageUrls(url)
    },
    getCurrentImageUrl() {
        return this.currentImageUrl;
    },
    setCurrentImageUrls(urls){
        this.currentImageUrls = urls
    },
    getCurrentImageUrls(){
        return this.currentImageUrls
    },
    addOneImageUrlIntoCurrentImageUrls(url) {
        const index = this.currentImageUrls.findIndex(v => v === url)

        if (index > -1) {

        } else {
            this.currentImageUrls.push(url);
        }
    },
    getAllImageUrls() {
        return this.currentImageUrls
    }
})

export default cameraStore