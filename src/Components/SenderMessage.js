import { StyleSheet, Text, View } from "react-native";
import React from "react";

const SenderMessage = ({ message }) => {
  return (
    <View style={styles.body}>
      <Text style={{ color: "black", fontWeight: "500", fontSize: 16 }}>
        {message.message}
      </Text>
    </View>
  );
};

export default SenderMessage;

const styles = StyleSheet.create({
  body: {
    marginLeft: "auto",
    backgroundColor: "lightblue",
    marginVertical: 2,
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    marginRight: 5,
  },
});
