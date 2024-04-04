import { StyleSheet, Text, View, StatusBar, ScrollView } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLORS } from '../../constants/colors'
//import { COLORS } from "../../constants/colors"
import Input from '../components/input'

const RegistrationScreen = () => {
    console.log("WOLAN")
  return (
    <View style={styles.main}>
      <ScrollView style={styles.container}>
        <Text style={styles.registerText}>Register</Text>
        <Text style={styles.enterDetailsText}>Enter your details to register</Text>
        <View style={{marginVertical:20}}>
            <Input 
                label="Email"
                iconName="email-outline"
                placeholder="Enter your email address"
                // error="Input Email"
            />
            <Input 
                label="Password"
                iconName="lock-outline"
                placeholder="Enter your password"
                // error="Input Email"
                password
            />
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
    }
})