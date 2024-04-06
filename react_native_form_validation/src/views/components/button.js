import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { COLORS } from '../../constants/colors'


import React from 'react'

const Button = ({title, onPress = ()=>{}}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.mainButton} activeOpacity={0.7}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  mainButton:{
    height: 55,
    justifyContent:'center',
    alignItems:"center",
    // width:'100%',
    backgroundColor: COLORS.blue,
    marginVertical: 20
  },
  buttonText:{
    color:COLORS.white,
    fontWeight:"bold",
    fontSize:18
  }
})