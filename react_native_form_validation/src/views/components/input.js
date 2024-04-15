import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../constants/colors'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
const Input = ({label, iconName, error, password, onfocus = ()=>{}, ...props}) => {
  
    const [isFocussed, setIsFocussed] = useState(false)
    const [hidePassword, setHidePassword] = useState(password)

    return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputBox, {borderColor: error ?"red":isFocussed ? COLORS.darkBlue : COLORS.light}]}>
        <Icon name={iconName} style={styles.icon}/>
        <TextInput
            {...props}
            style={styles.textInput}
            autoCorrect={false}
            onFocus={()=>{
                onfocus()
                setIsFocussed(true)
            }}
            onBlur={()=>{
                setIsFocussed(false)
            }}
            secureTextEntry={hidePassword}
        />

        {password &&(
            <Icon 
            name={`${hidePassword ?"eye-outline":"eye-off-outline"}`}
            style={{fontSize:22, color:COLORS.darkBlue}}
            onPress={()=>setHidePassword(!hidePassword)}
            />
        )}

      </View>
      {error && <Text style={{color:COLORS.red, fontSize: 12, marginTop: 7}}>{error}</Text>}

    </View>
  )
}

export default Input

const styles = StyleSheet.create({
    inputContainer:{
        marginBottom: 20
    },
    label:{
        marginVertical: 5,
        fontSize: 14,
        color: COLORS.grey
    },
    inputBox:{
        height: 55,
        backgroundColor: COLORS.light,
        flexDirection:"row",
        paddingHorizontal: 15,
        borderWidth: 0.5,
        alignItems:"center"
    },
    icon:{
        fontSize: 22,
        color:COLORS.darkBlue,
        marginRight: 10
    },
    textInput:{
        color:COLORS.darkBlue,
        flex: 1
    }
})