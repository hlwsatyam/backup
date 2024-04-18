import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import FooterList from "../HomePage/Footer";
import axios from "axios";
import { baseApiURL } from "../../components/Variable";
import asyncStorage from "@react-native-async-storage/async-storage";
import TouchableButton from "../../components/tabs/TouchableButton";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
const BookingStatus = ({ navigation }) => {
  const [hotelList, setHotelList] = useState();
  const [status, setStatus] = useState("Booking");
  useEffect(() => {
    fetchMyHotel();
  }, [status]);
  const fetchMyHotel = async () => {
    try {
      const token = await asyncStorage.getItem("token");
      const response = await axios.post(`${baseApiURL}/api/Owner/myBooking`, {
        token,
      });
      if (response.status == 200) {
        setHotelList(response.data);
      } else {
        Toast.show({
          type: ALERT_TYPE.INFO,
          title: "Notification",
          textBody: res.data.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View className="flex-1 px-2 pt-10 bg-yellow-600">
      <View className="flex-row border-b-[0.2px] pb-3 justify-center gap-x-5">
        <TouchableOpacity
          onPress={() => setStatus("Booking")}
          className="bg-white px-2 py-1 rounded"
        >
          <Text> Booked </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setStatus("Cancelled")}
          className="bg-white px-2 py-1 rounded"
        >
          <Text> Cancelled </Text>
        </TouchableOpacity>
      </View>
      {
        <ScrollView>
          <View className="px-2">
            {hotelList?.map((item, idx) => (
              <StatusCard item={item} key={idx} />
            ))}
          </View>
        </ScrollView>
      }
      <FooterList
        navigation={navigation}
        className="flex-row bg-amber-300 py-4 rounded-2xl mt-auto justify-around "
      />
    </View>
  );
};
export default BookingStatus;
const StatusCard = ({ item, callback }) => {
  const handleBookingCancel = () => {
    // Display an alert for confirmation
    Alert.alert(
      "Confirmation",
      "Are you sure you want to cancel your booking?",
      [
        {
          text: "No",
          onPress: () => console.log("Booking not cancelled"),
          style: "cancel",
        },
        { text: "Yes", onPress: () => cancelBooking() },
      ]
    );
  };
  const cancelBooking = async () => {
    try {
      await axios.post(`${baseApiURL}/api/user/cancelHotel`, {
        hotelId: item._id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="w-full p-2 rounded-xl my-2 border-white border   bg-red-700">
      <Text className="text-white font-bold">{item?.hotelId?.hotelName}</Text>

      <Text className="text-white text-[10px] ">
        No Of Person: {item.personList.length}{" "}
      </Text>
      <Text className="text-white text-[10px] ">
        Paid Amount: {item.price}{" "}
      </Text>
      <BookingDate dates={item.dates} />
      <View className="my-3 border py-2 px-1 border-white rounded">
        <Text className="text-yellow-500 font-bold">Guest Details</Text>
        <Text className="font-extralight text-white text-sm">
          Name: {item.userId.name}
        </Text>
        <Text className="font-extralight text-white text-sm">
          Email: {item.userId.email}
        </Text>
        <Text className="font-extralight text-white text-sm">
          Number: {item.userId.phone}
        </Text>
        <Text className="text-yellow-500 my-2 pt-3 border-teal-200 border-t-2 font-bold">
          Reservation Person List
        </Text>
        {item.personList?.map((itm, idx) => {
          return (
            <Text
              key={idx * idx * idx}
              className="font-extralight text-white text-sm"
            >
              Guest Name: {itm.name}
            </Text>
          );
        })}
      </View>
      {item.isCanceled ? (
        <Text className="text-white font-extralight text-sm">
          This Booking is Canceled
        </Text>
      ) : (
        <TouchableButton onPress={handleBookingCancel} label={"Cancle"} />
      )}
    </View>
  );
};
export function BookingDate({ dates }) {
  console.log(dates);
  return (
    <View className="my-3 border py-2 px-1 border-white rounded">
      <Text className="text-yellow-500 font-bold">Selected Date</Text>
      {Object?.entries(dates)?.map(([key, value]) => (
        <Text key={key} className="font-extralight text-white text-sm">
          {key}
        </Text>
      ))}
    </View>
  );
}
