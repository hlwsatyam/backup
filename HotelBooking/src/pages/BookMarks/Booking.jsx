import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import React, { memo, useEffect, useState } from "react";
import PrevNavigationwithRightIcon from "../../components/tabs/PrevNavigationwithRightIcon";
import BookmarkView from "./BookmarkView";
import BookingView from "./BookingView";
import SmallCardHotel from "../../components/tabs/SmallCardHotel";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { BaseApiURL } from "../../components/SupportiveFunction/Variables";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import { BookingDate } from "../PaymentPage/PaymentPage";
import TouchableButton from "../../components/tabs/TouchableButton";
const 
Booking = ({ navigation }) => {
  const [hotelList, setHotelList] = useState(null);
  const [isBookMarkPress, setIsBookMarkPress] = React.useState(false);
  const [isCancelledPress, setIsCancelledPress] = useState("");
  useEffect(() => {
    fetchBookingData();
  }, [isCancelledPress]);
  const fetchBookingData = async () => {
    try {
      const userId = await AsyncStorage.getItem("guestToken");
      await axios
        .post(`${BaseApiURL}/api/fromUserSide/getBookedList`, {
          userId,
        })
        .then((response) => {
          setHotelList(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const [status, setStatus] = useState("Booking");
  const setSelectedStatus = (item) => {
    setStatus(item);
  };
  const callback = () => {
    setIsCancelledPress(Date());
  };
  return (
    <View className="flex-1 bg-emerald-400  ">
      <PrevNavigationwithRightIcon
        navigation={navigation}
        isBookMarkPress={isBookMarkPress}
        setIsBookMarkPress={setIsBookMarkPress}
        text={"Your Recently Booking"}
        styleForText={"py-2 text-white font-bold text-xl"}
      />
      <BackNameSelect setSelectedStatus={setSelectedStatus} />
      {isBookMarkPress ? (
        <BookmarkView navigation={navigation} />
      ) : (
        <BookingView navigation={navigation} />
      )}
      <ScrollView>
        <View className="px-2">
          {hotelList?.map((item, idx) =>
            status == "Booking" && !item.isCanceled ? (
              <StatusCard callback={callback} item={item} key={idx} />
            ) : status == "Cancelled" && item.isCanceled ? (
              <StatusCard callback={callback} item={item} key={idx} />
            ) : null
          )}
        </View>
      </ScrollView>
    </View>
  );
};
export default Booking;

const BackNameSelect = ({ setSelectedStatus }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [list, setList] = useState({
    Ist: "Booking",
    "2nd": "Cancelled",
    "3rd": "Refund",
  });
  const pressHandler = (idx, item) => {
    setActiveIndex(idx);
    setSelectedStatus(item);
  };
  return (
    <View className="flex-row my-6   mx-3 items-center justify-between">
      {Object.values(list).map((itm, idx) => (
        <Text
          key={idx}
          onPress={() => pressHandler(idx, itm)}
          className={
            idx === activeIndex
              ? "bg-yellow-400 py-2 text-center w-[30%] border-white text-black font-semibold text-[10px] px-3  rounded-full"
              : "border text-center py-2  w-[30%] text-black font-semibold text-[10px] px-3 border-yellow-400  rounded-full"
          }
        >
          {itm}
        </Text>
      ))}
    </View>
  );
};

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
      await axios.post(`${BaseApiURL}/api/user/cancelHotel`, {
        hotelId: item._id,
      });
      callback();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View className="w-full p-2 rounded-xl my-2 border-white border   bg-red-700">
      <Text className="text-white font-bold">{item.hotelId.hotelName}</Text>
      <Text className="text-white text-[12px] ">
        {item.hotelId.city} , {item.hotelId.state}{" "}
      </Text>
      <Text className="text-white text-[10px] ">{item.hotelId.address} </Text>
      <Text className="text-white text-[10px] ">
        No Of Person: {item.personList.length}{" "}
      </Text>
      <Text className="text-white text-[10px] ">
        Paid Amount: {item.price}{" "}
      </Text>
      <BookingDate dates={item.dates} />
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
