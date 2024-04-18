import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
const HotelDetailsView = ({ HotelData, title }) => {
  return (
    <View className="mt-5 mx-2 bg-emerald-400/40 rounded-lg p-2">
      <Text className="text-xl px-2 font-bold text-black "> {title}</Text>
      <View className="flex-row justify-around my-2">
        {HotelData.Details.map((item, idx) => (
          <View key={Date() + idx * 32}>
            <Icon name={item} size={40} color={"green"} />
            <Text className="text-sm text-black font-bold text-center">
              {item}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};
export default HotelDetailsView;
