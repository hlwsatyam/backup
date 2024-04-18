import { View, Text, Image, Alert } from "react-native";
import React, { useEffect } from "react";
import SmallCardHotel from "../../components/tabs/SmallCardHotel";
import PrevNavigation from "../../components/tabs/PrevNavigation";
import { useRoute } from "@react-navigation/native";
import FetchHotels from "../../components/SupportiveFunction/FetchHotels";
import { FlatList } from "react-native";

const SearchView = ({ navigation }) => {
  const [hotels, setHotels] = React.useState([]);
  const route = useRoute();
  const searchingText =
    route.params?.searchingText || "Go Back To Search Hotels";
  useEffect(() => {
    fetings();
  }, []);
  const fetings = async () => {
    try {
      const data = await FetchHotels(searchingText);
      setHotels(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View className="flex-1 pt-2 bg-[#5e17eb]">
      <PrevNavigation
        text={searchingText ? searchingText : "Your Result"}
        styleForText={"text-sm text-white font-semibold"}
        navigation={navigation}
      />
      <View className="">
        {hotels.length == 0 ? (
          <View className="w-full flex-row items-center justify-center h-full m-auto ">
            <View>
              <Image
                className="w-[299px] h-[200px] m-auto "
                source={require("../../../assets/images/loading.gif")}
              />
              <Text className="Text-3xl text-center font-extrabold text-white ">
                Pease Wait !
              </Text>
            </View>
          </View>
        ) : (
          <FlatList
            data={hotels}
            keyExtractor={(item) => item._id}
            renderItem={(item) => (
              <SmallCardHotel navigation={navigation} item={item.item} />
            )}
          />
        )}
      </View>
    </View>
  );
};
export default SearchView;
