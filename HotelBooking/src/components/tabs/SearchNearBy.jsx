import { View, Text, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
const SearchNearBy = () => {
  return (
    <TouchableOpacity className="my-3 bg-green-500 p-2 rounded-lg">
      <Text className="text-center text-white font-bold ">Near By Search</Text> 
    </TouchableOpacity>
  );
};
export default SearchNearBy;