import { ActivityIndicator, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants/colors'

const Loader = ({visible=false}) => {

    const {height, width} = useWindowDimensions()

  return visible && (<View
        style={[styles.loaderContainer, {height, width}]}
    >
    <View style={styles.loader}>
        <ActivityIndicator size={"large"} color={COLORS.blue}/>
        <Text style={{fontSize: 16}}> Loading...</Text>
    </View>
  </View>)
}

export default Loader

const styles = StyleSheet.create({
    loaderContainer:{
        position: 'absolute',
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent:"center",
        alignItems:"center"
    },
    loader:{
        height: 70,
        width: '70%',
        backgroundColor: COLORS.white,
        flexDirection:"row",
        alignItems:"center",
        paddingHorizontal: 20,
        borderRadius: 10,
        justifyContent:"center",
        gap:20
    }
})