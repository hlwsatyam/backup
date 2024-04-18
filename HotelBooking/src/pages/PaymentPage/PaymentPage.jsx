import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import PrevNavigation from "../../components/tabs/PrevNavigation";
import InputTab from "../../components/tabs/InputTab";
import TouchableButton from "../../components/tabs/TouchableButton";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
 
import axios from "axios";
import { BaseApiURL } from "../../components/SupportiveFunction/Variables";
const PaymentPage = () => {
  const { hotelId, dates, totalPerson, price, personList, userId } =
    useRoute().params;
  const [guestDetails, setGuestList] = useState(personList ?? []);

  const navigation = useNavigation();

  async function handleAddPerson() {
    if (!hotelId || !dates || !userId) return;
    try {
      await axios
        .post(`${BaseApiURL}/api/hotelBooking`, {
          hotelId,
          dates,
          totalPerson,
          price,
          personList,
          userId,
        })
        .then((res) => {
          if (res.status == 200) {
            navigation.navigate("PaymentSuccess");
          } else {
            console.log('elsss')
            navigation.navigate("ServerError");
          }
        });
    } catch (error) {
        console.log(error)
      navigation.navigate("ServerError");
    }
  }
  return (
    <View className="flex-1 px-2 pt-4 bg-blue-600 ">
      <PrevNavigation navigation={useNavigation()} text={"Payment"} />

      <View>
        <Text className="text-center text-white font-extrabold text-xl">
          Checkout
        </Text>
        <BookingDate dates={dates} />
      </View>
      <TouchableButton onPress={handleAddPerson} label={"Pay Now"} />
      <Text className="text-white border-t-2 pt-4 border-white font-bold mt-2 text-center">
        Reserved Person: {totalPerson}
      </Text>
      {guestDetails?.map((item, idx) => (
        <View className="bg-yellow-400 rounded-xl px-2 py-3 my-3" key={idx}>
          <Text className="font-extralight mb-2">{`Guest : ${idx + 1} `}</Text>
          <Text className="font-semibold ">
            {item?.name ? item.name : `Guest${idx + 1}'s Name`}
          </Text>

          <Text className="font-semibold my-1">
            {item?.phoneNumber
              ? item.phoneNumber
              : `Guest'Number${idx + 1}'s Phone Number`}
          </Text>
        </View>
      ))}
    </View>
  );
};
export default PaymentPage;

 export  function BookingDate({ dates }) {
  console.log(dates);
  return (
    <View className="my-3 border py-2 px-1 border-white rounded">
      <Text className="text-yellow-500 font-bold">Selected Date</Text>
      {Object?.entries(dates)?.map(([key, value]) => (
        <Text key={key} className="font-extralight text-white text-sm">{key}</Text>
      ))}
    </View>
  );
}
