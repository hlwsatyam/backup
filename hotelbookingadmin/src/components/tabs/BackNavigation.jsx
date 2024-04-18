import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const BackNavigation = ({
  styleForFullComp,
  navigation,
  title,
  styleForTitle,
}) => {
  return (
    <View
      className={
        styleForFullComp
          ? styleForFullComp
          : "flex-row shadow px-2 bg-orange-600 py-2 items-center gap-x-5"
      }
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome5 name="arrow-left" size={30} color="green" />
      </TouchableOpacity>
      <Text className={styleForTitle ? styleForTitle : "text-xl font-bold  "}>
        {title}
      </Text>
    </View>
  );
};
export default BackNavigation;
