import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { BaseApiURL } from "../../../components/SupportiveFunction/Variables";

const HomeHotelList = ({ navigation }) => {
  const [HotelList, setHotelList] = useState(null);
  const [searchingParams, setSearchingParams] = useState({
    HotelName: "",
    city: "noida",
    state: "",
  });
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const res = await axios.post(
        `${BaseApiURL}/api/searchingHotel?HotelName=${searchingParams.HotelName}&city=${searchingParams.city}&state=${searchingParams.state}`
      );
      if (res.status == 200) {
        setHotelList(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View className=" ">
      {HotelList && (
        <FlatList
          data={HotelList}
          keyExtractor={(item, idx) => `${item?._id}-${idx}`}
          renderItem={({ item, idx }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("SingleHotelView", { hotelId: item._id })
              }
              className=" rounded-2xl mr-3 relative  w-[300px]"
              key={Date() + idx * 32}
            >
              <Image
                className=" w-full h-[200px]   rounded-2xl  object-cover"
                source={{
                  uri: `${BaseApiURL}/uploads/${item?.allRoomsOfthisHotel[0]?.imageUrls[0]}`,
                }}
              />

              <View className="absolute top-0 w-full h-full p-3">
                <View className="flex-row justify-end    ">
                  <View className="flex-row justify-end items-center rounded-full gap-x-2 px-2 bg-green-600">
                    <Text className="text-right text-white font-bold ">
                      {item?.stars || "Top"}
                    </Text>
                    <Icon name="star" color={"white"} />
                  </View>
                </View>
                <View className="mt-auto">
                  <Text className="text-white font-extrabold text-2xl ">
                    {item.hotelName}
                  </Text>
                </View>
                <View className="flex-row justify-between items-center  ">
                  <View>
                    <Text className="text-[10px] text-white font-bold  ">
                      {item.address}
                    </Text>
                    <Text className="font-bold text-white  ">
                      {" "}
                      <Text className="font-bold text-white text-xl">
                        ₹ {item.charge}
                      </Text>
                      /Night
                    </Text>
                  </View>
                  <View>
                    <Icon name="bookmark" size={20} color={"white"} />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        />
      )}
    </View>
  );
};
export default HomeHotelList;
