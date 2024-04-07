import { StyleSheet, Text, View, StatusBar, ScrollView, Keyboard, Alert } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLORS } from '../../constants/colors'
//import { COLORS } from "../../constants/colors"
import Input from '../components/input'
import Button from '../components/button'
import Loader from '../components/loader'

const LoginScreen = ({navigation}) => {

    const [inputs, setInputs] = useState({
        email:"",
        password:""
    })
    const [loading , setLoading] = useState(false)
    const [errors, setErrors] = useState({
        email:"",
        password:""
    })

    const handleErrors = (errorMessage, input) =>{
        setErrors(prev =>({...prev, [input]:errorMessage}))
    }


    const logIn = ()=>{
        setLoading(true)
        setTimeout(async()=>{
            setLoading(false)
            try {
                let userData = await AsyncStorage.getItem("user")
                if(userData){
                  //navigation.navigate("LoginScreen")
                  userData = JSON.parse(userData)
                  
                  if(inputs.email === userData.email && inputs.password === userData.password){
                    // proceed to home screen
                    AsyncStorage.setItem("user", JSON.stringify({...userData, loggedIn: true}))
                    navigation.navigate("HomeScreen")
                  }else{
                    Alert.alert("Error", "Invalid login details")

                  }
                }

            } catch (error) {
                Alert.alert("Error", error.message)
            }
        },3000)
    }

    const validate = ()=>{
        Keyboard.dismiss();

        let valid =  true

        if(!inputs.email){
            handleErrors("Please input Email", "email")
            valid = false
        }else  if(!inputs.email.match(/\S+@\S+\.\S+/)){
            handleErrors("Please input valid Email", "email")
            valid = false
        }

        if(!inputs.password){
            handleErrors("Please input password", "password")
            valid = false
        }

        if(valid){
            logIn()
        }

    }

    console.log(inputs)

    

    const handleOnChange = (text, input) =>{
        setInputs((prev) =>({...prev, [input]:text}))
    }

  return (
    <View style={styles.main}>
        <Loader visible={loading}/>
      <ScrollView style={styles.container}>
        <Text style={styles.registerText}>Log In</Text>
        <Text style={styles.enterDetailsText}>Enter your details to log in</Text>
        <View style={{marginVertical:20}}>
            <Input 
                label="Email"
                iconName="email-outline"
                placeholder="Enter your email address"
                onChangeText ={(text)=>handleOnChange(text, "email")}
                onfocus={()=> handleErrors("", "email")}
                error={errors.email && errors.email}
            />
            <Input 
                label="Password"
                iconName="lock-outline"
                placeholder="Enter your password"
                // error="Input Email"
                password
                onChangeText ={(text)=>handleOnChange(text, "password")}
                onfocus={()=> handleErrors("", "password")}
                error={errors.password && errors.password}
            />
            <Button title={"Log In"} onPress={validate}/>
            <Text style={styles.bottomPromptText} onPress={()=>navigation.navigate("RegistrationScreen")}>
                Dont an account ? Register
            </Text>
        </View>
      </ScrollView>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    main:{
        paddingTop: StatusBar.currentHeight,
        backgroundColor: COLORS.white,
        flex: 1
    },
    container:{
        paddingTop: 50,
        paddingHorizontal: 20
    },
    registerText:{
        color:COLORS.black,
        fontSize: 40,
        fontWeight:"bold"
    },
    enterDetailsText:{
        color:COLORS.grey,
        fontSize: 18,
        marginVertical: 10
    },
    bottomPromptText:{
        color:COLORS.black,
        textAlign:"center",
        fontSize: 16,
        fontWeight:"bold"
    }
})