import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation'
import AddingScreen from '../screens/AddingScreen';
import MainScreen from '../screens/MainScreen';



const ScreensNavigator = createStackNavigator({


   Main: MainScreen,
   Adding: AddingScreen
    


});

export default createAppContainer(ScreensNavigator);