import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  Linking,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";

import AddressForSingalCard from "./AddressForSingalCard/AddressForSingalCard";
import GalleryForSingleView from "./GalleryForSingleView/GalleryForSingleView";
import HotelDetailsView from "./HotelDetailsView/HotelDetailsView";
import RevAndRatings from "./RevAndRatings/RevAndRatings";
// import SingleHotelLocation from "./LocationForSingleHotel/SingleHotelLocation";
import { useNavigation, useRoute } from "@react-navigation/native";
import PrevNavigation from "../../components/tabs/PrevNavigation";
import { BaseApiURL } from "../../components/SupportiveFunction/Variables";
import axios from "axios";
import SingleHotelMapView from "../../components/tabs/SingleHotelMapView";
import ShareButton from "../../components/tabs/ShareButton";

const SingleViewHotel = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [HotelData, setHotelData] = useState({
    HotelName: "The Kichen House",
    Descreaption:
      "At RVBM, we are not just an electrical company – we are creators of innovative solutions that light up your life and power your progress. With a legacy of excellence and a commitment to pushing boundaries, we have carved a unique space in the electrical industry as pioneers of cutting-edge technology and customer-centric services",
    location: "12 Gali behind mc macdonald sec 13 noida",
    Details: ["building", "wifi", "bed", "tree"],
    Facilities: [
      "Swimming Pool",
      "WIFI",
      "Restaurant",
      "Parking",
      "Meeting Room",
      "Elevator",
      "Fitness Center",
      "@4 Hours Open",
    ],
    id: "",
    pin: "",
    hotelPhone: "",
    address: "",
    country: "",
    stars: "",
    totalRooms: "",
    locationIframe: "ghfd",
    HotelStar: 2,
    city: "",
    state: "",
    OneNightCharge: 500,
    hotelLocation: "",
    PhoneContact: "+91 8059424475",
    EmailContact: "dharmendra@test.in",
    allRoomsOfThisHotel: [],
    hotelImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdoEJ2_rsGiXjeugDWSY0kLW18eRLcFdRcrSTat9PJSA&s",
  });
  const handleEmailPress = () => {
    Linking.openURL(`mailto:${HotelData.EmailContact}`);
  };
  const route = useRoute();
  const handlePhonePress = () => {
    Linking.openURL(`tel:${HotelData.PhoneContact}`);
  };
  useEffect(() => {
    FetData();
  }, []);
  const FetData = async () => {
    const data = await axios
      .post(`${BaseApiURL}/api/searchingHotel/${route.params?.hotelId}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setIsLoading(false);
          setHotelData((prev) => ({
            ...prev,
            id: res.data._id,
            pin: res.data.pin,
            hotelPhone: res.data.hotelPhone,
            address: res.data.address,
            country: res.data.country,
            stars: res.data.stars,
            totalRooms: res.data.totalRooms,
            city: res.data.city,
            state: res.data.state,
            hotelLocation: res.data.hotelLocation,
            HotelName: res.data.hotelName,
            Descreaption: res.data.description,
            OneNightCharge: res.data.charge,
            PhoneContact: res.data.hotelPhone,
            EmailContact: res.data.email,
            HotelStar: res.data?.hotelStar || 5,
            allRoomsOfThisHotel: res.data.allRoomsOfThisHotel,
          }));
        }
      })
      .catch((err) => {
        setIsLoading(true);
      });
  };
  const [revText, setRevText] = useState("");
  const [revList, setRevList] = useState(null);
  useEffect(() => {
    getAllRevHander();
  }, [revText]);
  const getAllRevHander = async () => {
    try {
      const hotelId = route.params?.hotelId;
      if (!hotelId) return;
      const res = await axios.post(`${BaseApiURL}/api/user/hotel/allRev`, {
        hotelId,
      });
      setRevList(res.data);
    } catch (error) {
      setRevText("");
    }
  };
  return (
    <View className={isLoading ? "bg-[#5e17eb]" : "bg-white"}>
      {isLoading ? (
        <View className="w-screen  h-screen m-auto ">
          <PrevNavigation navigation={navigation} text={"Loading"} />
          <View className="flex-row items-center justify-center">
            <Image
              className="w-[299px] h-[200px] m-auto "
              source={require("../../../assets/images/loading.gif")}
            />
          </View>
        </View>
      ) : (
        <View className="mb-44">
          <PrevNavigation
            className={"border-b-2 mt-0   border-black"}
            iconColor={"black"}
            text={HotelData.HotelName}
            styleForText={"text-sm text-black font-bold my-3"}
            navigation={navigation}
          />
          <ScrollView>
            <ShareButton navigation={navigation} />
            <ScrollView horizontal={true}>
              {HotelData.allRoomsOfThisHotel?.map((item, index) =>
                item?.imageUrls?.map((itm, idx) => (
                  <Image
                    key={`image-${index}-${idx}`}
                    source={{ uri: `${BaseApiURL}/uploads/${itm}` }}
                    className="w-screen rounded-2xl mr-4 h-[200px]"
                  />
                ))
              )}
            </ScrollView>
            <AddressForSingalCard HotelData={HotelData} />
            <RoomDetails noOFRoom={HotelData?.totalRooms || 20} />

            <HotelDetailsView title={"Details"} HotelData={HotelData} />
            <View className="mt-4  px-2">
              <Text className="text-[12px] font-semibold text-black   ">
                Contact
              </Text>
              <View className="flex-row gap-x-2 px-2">
                <TouchableOpacity onPress={handlePhonePress}>
                  <Text className="text-black text-[12px] mt-2">
                    {HotelData.PhoneContact}
                  </Text>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={handleEmailPress}>
                  <Text className="text-black text-[12px] mt-2">
                    {HotelData.EmailContact}
                  </Text>
                </TouchableOpacity> */}
              </View>
            </View>
            <View className="mt-4  px-2">
              <Text className="text-2xl font-semibold text-black border-t-2 border-white pt-2 ">
                {" "}
                Descriptioan{" "}
              </Text>
              <Text className="text-black pl-2  text-[12px] mt-2">
                {" "}
                {HotelData.Descreaption}{" "}
              </Text>
            </View>
            <HotelDetailsView title={"Facilities"} HotelData={HotelData} />
            <SingleHotelMapView map={HotelData.hotelLocation} />

            <RevAndRatings hotelId={HotelData.id} />
          </ScrollView>
        </View>
      )}
    </View>
  );
};
export default SingleViewHotel;
const RoomDetails = ({ noOFRoom }) => {
  return (
    <View className="bg-green-600/20 m-2 p-2 rounded">
      <Text>No Of Room Available: {noOFRoom} </Text>
    </View>
  );
};
