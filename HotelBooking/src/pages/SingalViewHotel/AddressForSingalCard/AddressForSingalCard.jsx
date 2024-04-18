import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

import { useNavigation } from "@react-navigation/native";
const AddressForSingalCard = ({ HotelData }) => {
  const navigation = useNavigation();
  const handleBookingPress = async () => {
    const hotelId = HotelData.id;
    navigation.navigate("SelectDate", { hotelId });
  };
  return (
    <View className="my-2 px-2 ">
      <View className="flex-row items-center justify-between">
        <Text className="text-black font-bold my-2 text-2xl">
          {HotelData.HotelName}
        </Text>
        <TouchableOpacity
          onPress={handleBookingPress}
          className="bg-black py-2 px-3 rounded"
        >
          <Text className="text-white"> Book Now</Text>
        </TouchableOpacity>
      </View>
      <Text className="text-black border-black">
        <Text>
          <Icon size={23} name="map-marker" />{' '}
        </Text>
        <Text>{HotelData.address}</Text>
      </Text>
      <Text className="text-black mt-2 pb-3  ">
        <Icon size={23} name="map-marker" /> {HotelData.city},{HotelData.state},
        {HotelData.country}
      </Text>
    </View>
  );
};
export default AddressForSingalCard;