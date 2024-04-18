import { View, Text, Image } from "react-native";
import React from "react";
import PrevNavigation from "../../components/tabs/PrevNavigation";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import successfullyPayment from "../../../assets/images/Successfully Done.gif";
const PaymentSuccess = () => {
    const navigation =useNavigation()
  return (
    <View className="flex-1 px-2 pt-4 bg-yellow-600 ">
      <PrevNavigation navigation={useNavigation()} text={"Back To Home"} />
        <Text  className="text-center mt-12 text-white font-bold " > Hotel Booking Conformed!</Text>
      <Image
        source={successfullyPayment}
        className="w-[300px]   mx-auto h-[300px]"
      />
      <TouchableOpacity onPress={()=> navigation.navigate('Booking')} className="py-3 bg-green-500  rounded-2xl m-3 ">
        <Text className="text-center text-white font-bold " > Check Status </Text>
      </TouchableOpacity>
    </View>
  );
};5
export default PaymentSuccess;
