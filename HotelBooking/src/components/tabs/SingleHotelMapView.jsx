import { View } from "react-native";
import React from "react";

import { WebView } from "react-native-webview";

const SingleHotelMapView = ({ map }) => {
  return (
    <View className="w-full   my-3 h-[200px]">
      <WebView
        style={{ width: "100$" }}
        source={{
          html: "<iframe src={map} ></iframe>",
        }}
      />
    </View>
  );
};
export default SingleHotelMapView;
// https://maps.app.goo.gl/aUYBE26uJVsFpdkw8
