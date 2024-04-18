import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import PrevNavigation from "../../components/tabs/PrevNavigation";
import TouchableButton from "../../components/tabs/TouchableButton";
import GoToAnyWhere from "../../components/SupportiveFunction/GoToAnyWhere";
import { Image } from "react-native";

const Auth = ({ navigation }) => {
  const GoToLoginPage = () => {
    navigation.navigate("loginWithPassword");
  };

  return (
    <ScrollView className="bg-blue-600 flex-1">
      <PrevNavigation navigation={navigation} className="mt-12 px-3" />
      <View>
        <Image
          source={require("../../../assets/images/Business Team.gif")}
          className="h-[300px] w-[300px] m-auto"
        />
      </View>
      <Text className="mt-[0%] mb-16 text-3xl  text-center text-white font-bold">
        Let’s you in
      </Text>
      <Icon.Button
        name="google"
        className="mx-3 bg-slate-700"
        backgroundColor={"transparent"}
        onPress={() => {}}
      >
        Login with Google
      </Icon.Button>
      <Icon.Button
        name="facebook"
        className="mx-3 mt-4 bg-slate-700"
        backgroundColor={"transparent"}
        onPress={this.loginWithFacebook}
      >
        Login with Facebook
      </Icon.Button>
      <View className="mt-10 flex-row gap-x-2 items-center justify-center">
        <Text className="w-[100px] h-[4px] bg-white  rounded-full"></Text>
        <Text className="text-white">Or</Text>
        <Text className="w-[100px] h-[4px] rounded-full bg-white "></Text>
      </View>
      <TouchableButton label="Signing With Password" onPress={GoToLoginPage} />
      <View className="flex-row gap-x-1 mt-12 items-center justify-center">
        <Text className="text-white font-semibold">
          Don`t Have an Account ?
        </Text>
        <TouchableOpacity
          onPress={() => GoToAnyWhere({ destination: "signUp", navigation })}
        >
          <Text className="text-green-300 font-bold">Sign up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Auth;
