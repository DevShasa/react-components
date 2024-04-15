import { StyleSheet, Text, View, StatusBar, ScrollView, Keyboard, Alert } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLORS } from '../../constants/colors'
//import { COLORS } from "../../constants/colors"
import Input from '../components/input'
import Button from '../components/button'
import Loader from '../components/loader'

const RegistrationScreen = ({navigation}) => {

    const [inputs, setInputs] = useState({
        email:"",
        fullName:"",
        phone:"",
        password:""
    })
    const [loading , setLoading] = useState(false)
    const [errors, setErrors] = useState({
        email:"",
        fullName:"",
        phone:"",
        password:""
    })

    const handleErrors = (errorMessage, input) =>{
        setErrors(prev =>({...prev, [input]:errorMessage}))
    }


    const register = ()=>{
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
            try {
                AsyncStorage.setItem("user", JSON.stringify(inputs))
                navigation.navigate("LoginScreen")
            } catch (error) {
                Alert.alert("Error", "Something went wrong")
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

        if(!inputs.fullName){
            handleErrors("Please input full name", "fullName")
            valid = false
        }


        if(!inputs.phone){
            handleErrors("Please input phone number", "phone")
            valid = false
        }


        if(!inputs.password){
            handleErrors("Please input password", "password")
            valid = false
        }else if(inputs.password.length < 5){
            handleErrors("Password length must be more than 5", 'password')
            valid = false
        }

        if(valid){
            register()
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
        <Text style={styles.registerText}>Register</Text>
        <Text style={styles.enterDetailsText}>Enter your details to register</Text>
        <View style={{marginVertical:20}}>
            <Input 
                label="Email"
                iconName="email-outline"
                placeholder="Enter your email address"
                onChangeText ={(text)=>handleOnChange(text, "email")}
                onfocus={()=> handleErrors("", "email")} // clear error when input is focussed 
                error={errors.email && errors.email}
            />
            <Input
                label="Name"
                iconName="account-outline"
                placeholder="Enter your Full name"
                // error="Input Email"
                onChangeText ={(text)=>handleOnChange(text, "fullName")}
                onfocus={()=> handleErrors("", "fullName")} // clear error when input is focussed 
                error={errors.fullName && errors.fullName}
            />
            <Input 
                label="Phone Number"
                iconName="phone-outline"
                placeholder="Enter your phone number"
                keyboardType="numeric" 
                onChangeText ={(text)=>handleOnChange(text, "phone")}
                // error="Input Email"
                onfocus={()=> handleErrors("", "phone")} // clear error when input is focussed 
                error={errors.phone && errors.phone}
            />
            <Input 
                label="Password"
                iconName="lock-outline"
                placeholder="Enter your password"
                // error="Input Email"
                password
                onChangeText ={(text)=>handleOnChange(text, "password")}
                onfocus={()=> handleErrors("", "password")} // clear error when input is focussed 
                error={errors.password && errors.password}
            />
            <Button title={"Register"} onPress={validate}/>
            <Text style={styles.bottomPromptText} onPress={()=>navigation.navigate("LoginScreen")}>
                Already have an account ? Login
            </Text>
        </View>
      </ScrollView>
    </View>
  )
}

export default RegistrationScreen

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