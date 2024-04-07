import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Homescreen from './src/views/screens/Homescreen';
import LoginScreen from './src/views/screens/LoginScreen';
import RegistrationScreen from './src/views/screens/RegistrationScreen';
import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from "./src/views/components/loader";


const Stack = createNativeStackNavigator();

export default function App() {

  const [initialRouteName, setInitialRouteName] = useState("")
  const authUser = async ()=>{
    try {
      let userData = await AsyncStorage.getItem("user")
      if(userData){
        userData = JSON.stringify(userData)
        if(userData?.loggedIn){
          setInitialRouteName("HomeScreen")
        }else{
          setInitialRouteName("LoginScreen")
        }
      }else{
        setInitialRouteName("RegistrationScreen")

      }
    } catch (error) {
      setInitialRouteName("RegistrationScreen")
    }
  }


  useEffect(()=>{
    setTimeout(authUser, 1500)
  },[])

  return (

      <NavigationContainer>
            {initialRouteName === ""
              ? <Loader visible={true}/>
              :(
                <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName={initialRouteName}>
                  <Stack.Screen name="RegistrationScreen" component={RegistrationScreen}/>
                  <Stack.Screen name="LoginScreen" component={LoginScreen} />
                  <Stack.Screen  name="HomeScreen" component={Homescreen}/>
                </Stack.Navigator>
              )
            }
      </NavigationContainer>


  );
}

