import { StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import Button from '../components/button'

const Homescreen = ({navigation}) => {

  const [userDetails, setUserDetails ] = useState()

  const getuSerData = async()=>{
    const userData = await AsyncStorage.getItem("user")
    if(userData) setUserDetails(JSON.parse(userData))
  }

  const logOut = ()=>{
    AsyncStorage.setItem("user", JSON.stringify({...userDetails, loggedIn: false}))
    navigation.navigate("LoginScreen")
  }

  useEffect(()=>{
      getuSerData()
  },[])

  return (
    <View style={styles.homeContainer}>
      <Text style={{fontSize:20, fontWeight:"bold", alignSelf:"center"}} >Welcome {`${userDetails?.fullName}`}</Text>
      <Button title={"Log Out"} onPress={logOut}/>
    </View>
  )
}

export default Homescreen

const styles = StyleSheet.create({
  homeContainer:{
    flex: 1,
    justifyContent:"center",
    paddingHorizontal:40
  }
})