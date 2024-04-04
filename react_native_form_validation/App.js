import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Homescreen from './src/views/screens/Homescreen';
import LoginScreen from './src/views/screens/LoginScreen';
import RegistrationScreen from './src/views/screens/RegistrationScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name="RegistrationScreen" component={RegistrationScreen}/>
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen  name="HomeScreen" component={Homescreen}/>
            </Stack.Navigator>
      </NavigationContainer>


  );
}

