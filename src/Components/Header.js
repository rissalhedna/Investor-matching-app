import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Ionicons, Foundation } from "@expo/vector-icons";

const Header = ({ title, callEnabled = false }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginRight: "auto",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={34} color="#FF5864" />
        </TouchableOpacity>
        <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: "bold" }}>
          {title}
        </Text>
      </View>
      {callEnabled && (
        <TouchableOpacity
          style={{
            backgroundColor: "red",
            padding: 10,
            borderRadius: 50,
            width: 40,
            alignItems: "center",
          }}
        >
          <Foundation name="telephone" size={20} color={"white"} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
