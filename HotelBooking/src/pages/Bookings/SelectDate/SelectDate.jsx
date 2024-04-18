import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import PrevNavigation from "../../../components/tabs/PrevNavigation";
import ShowingCalender from "./ShowingCalender";
import HeadingTitle from "../../../components/tabs/HeadingTitle";
import TouchableButton from "../../../components/tabs/TouchableButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { BaseApiURL } from "../../../components/SupportiveFunction/Variables";
const SelectDate = () => {
  const navigation = useNavigation();
  const hotelId = useRoute().params.hotelId;
  const [oneNightCharge, setOneNightCharge] = useState("");
  const [dates, setDates] = useState(null);
  const [totalSelectedDate, setTotalSelectedDate] = React.useState(1);
  const [Count, setCount] = React.useState(1);
  const [isAvaillabe, setIsAvailable] = useState(false);
  const [price, setPrice] = useState(100);
  const setPerson = (val) => {
    setCount(val);
    setPrice(totalSelectedDate * val * oneNightCharge);
  };
  useEffect(() => {
    FetData();
  }, []);
  const FetData = async () => {
    try {
      const data = await axios
        .post(`${BaseApiURL}/api/searchingHotel/${hotelId}`)
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
            setOneNightCharge(res.data.charge);
            setIsAvailable(res.data?.isAvailable || true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const selectedDate = (dates) => {
    setTotalSelectedDate(Number(Object.keys(dates).length));
    setDates(dates);
    setPrice(Number(Object.keys(dates).length) * Count * oneNightCharge);
  };
  const handleBookNow = async () => {
    if (isAvaillabe) {
      navigation.navigate("NameofReservation", {
        hotelId,dates,
        totalPerson: Count,
        price: price,
      });
    }
  };
  return (
    <View className="flex-1 pt-2 px-2 bg-blue-700 ">
      <PrevNavigation navigation={navigation} text={"Select Date"} />
      <ShowingCalender selectedDate={selectedDate} />
      <GuesCount setPerson={setPerson} selectedDates={selectedDate} />
      <Text className="text-white my-5 text-center font-extrabold text-xl ">
        {" "}
        Total:Rs{price}{" "}
      </Text>
      <TouchableButton
        onPress={isAvaillabe ? handleBookNow : null}
        label={isAvaillabe ? "Continue" : "Not Available"}
      />
    </View>
  );
};
export default SelectDate;
const GuesCount = ({ setPerson }) => {
  const [Count, setCount] = React.useState(1);
  useEffect(() => {
    if (Count < 0) setCount(1);
    else setPerson(Count);
  }, [Count]);
  return (
    <View className="mt-4">
      <HeadingTitle
        title={"Guest"}
        backgroundClass={"bg-transparent my-4 "}
        mainClass={"text-sm font-bold text-white"}
      />
      <View className="flex-row py-2  bg-slate-700 justify-center   ">
        <Text
          onPress={() => setCount(Count - 1)}
          className="text-xl bg-slate-400 text-white rounded-xl text-center w-[60px] leading-[60px] "
        >
          {" "}
          -{" "}
        </Text>
        <Text className="  text-white rounded-xl text-2xl text-center w-[60px] leading-[60px] ">
          {" "}
          {Count}{" "}
        </Text>
        <Text
          onPress={() => setCount(Count + 1)}
          className="text-xl bg-slate-400 text-white rounded-xl text-center w-[60px] leading-[60px] "
        >
          {" "}
          +{" "}
        </Text>
      </View>
    </View>
  );
};
