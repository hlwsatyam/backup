import { View, Text,Image } from 'react-native'
import React, { useEffect } from 'react'
import loadingGIF from '../../../../assets/Splash/Infinite Loader.gif'
import logo from '../../../../assets/logo.png'
const SplashLoading = ({navigation}) => {
useEffect(()=>{
setTimeout(() => {
 navigation.navigate('auth')   
}, 1000);
},[])
  return (
    <View className="flex-1 justify-end bg-blue-600" >
        <View className='' >
         <Image  source={logo} className=" m-auto  w-[200px] h-[300px]  " />   
         <Image  source={loadingGIF} className=" m-auto  w-[200px] h-[300px]  " />   
        </View>
    </View>
  )
}

export default SplashLoading