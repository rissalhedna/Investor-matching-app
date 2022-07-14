import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const MatchScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  // const params = {
  //   currentUser: "Rissal",
  //   userSwiped: "Assem",
  // };
  const { currentUser, userSwiped } = params;
  return (
    <View
      style={{
        height: "100%",
        backgroundColor: "black",
        opacity: 0.89,
        paddingTop: 20,
        justifyContent: "center",
      }}
    >
      <View
        style={{
          justifyContent: "center",
          paddingHorizontal: 10,
          paddingTop: 20,
        }}
      >
        <Text
          style={{
            color: "white",
            alignSelf: "center",
            fontSize: 26,
            fontWeight: "bold",
          }}
        >
          Boosted profile!
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 50,
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 55,
            height: 110,
            width: 110,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{
              width: 70,
              height: 70,
              resizeMode: "contain",
            }}
            source={{
              uri: currentUser.logoURL,
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 55,
            height: 110,
            width: 110,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{
              width: 70,
              height: 70,
              resizeMode: "contain",
            }}
            source={{
              uri: userSwiped.logoURL,
            }}
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ChatScreen");
        }}
        style={{
          marginTop: 80,
          backgroundColor: "white",
          width: "80%",
          alignSelf: "center",
          padding: 20,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: "black",
            alignSelf: "center",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Send a message
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchScreen;

const styles = StyleSheet.create({});
