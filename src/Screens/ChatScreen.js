import { SafeAreaView, Text, Image } from "react-native";
import Header from "../Components/Header";
import React from "react";
import ChatList from "../Components/ChatList";

const ChatScreen = () => {
  return (
    <SafeAreaView>
      <Header title={"Chat"} />
      <ChatList />
    </SafeAreaView>
  );
};

export default ChatScreen;
