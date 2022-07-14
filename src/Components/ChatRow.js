import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../Hooks/useAuth";
import getMatchedUserInfo from "../../lib/getMatchedUserInfo";
import MessagesScreen from "../Screens/MessagesScreen";

const ChatRow = ({ matchDetails }) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
  }, [matchDetails, user]);
  console.log(matchedUserInfo);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("MessagesScreen", { matchDetails })}
      style={[
        {
          flexDirection: "row",
          backgroundColor: "white",
          borderRadius: 10,
          width: "90%",
          alignSelf: "center",
          padding: 10,
          alignItems: "center",
        },
        styles.cardShadow,
      ]}
    >
      <Image
        source={{ uri: matchedUserInfo?.logoURL }}
        style={{
          width: 60,
          height: 40,
          marginRight: 10,
          resizeMode: "contain",
          borderRightWidth: 0.2,
          borderColor: "lightgrey",
        }}
      />
      <View>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {matchedUserInfo?.businessname}
        </Text>
        <Text style={{ fontSize: 12, marginTop: 5 }}>Say Hi!</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
export default ChatRow;
