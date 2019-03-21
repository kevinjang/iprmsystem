import Taro, {Component} from '@tarojs/taro'
import { View, Camera } from '@tarojs/components';

class CameraX extends Component{
    render(){
        return <View style={{width:'100%',height:'100%', backgroundColor:'lightblue'}}>
            <Camera  devicePosition='back' flash='off'  style="width: 100%; height: 100%;"></Camera>
        </View>
    }
}

export default CameraX