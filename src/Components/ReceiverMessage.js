import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ReceiverMessage = ({ message }) => {
  return (
    <View style={styles.body}>
      <Text style={{ color: "black", fontWeight: "500", fontSize: 16 }}>
        {message.message}
      </Text>
    </View>
  );
};

export default ReceiverMessage;

const styles = StyleSheet.create({
  body: {
    marginRight: "auto",
    backgroundColor: "lightgreen",
    marginVertical: 2,
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    marginLeft: 5,
  },
});
