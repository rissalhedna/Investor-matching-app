import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import getMatchedUserInfo from "../../lib/getMatchedUserInfo";
import useAuth from "../Hooks/useAuth";
import { useRoute } from "@react-navigation/native";
import SenderMessage from "../Components/SenderMessage";
import ReceiverMessage from "../Components/ReceiverMessage";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";

const MessagesScreen = () => {
  const { user } = useAuth();
  const { params } = useRoute();
  const [input, setInput] = useState();
  const { matchDetails } = params;

  const sendMessage = () => {
    addDoc(collection(db, "matches", matchDetails.id, "messages"), {
      displayName: user.displayName,
      timestamp: serverTimestamp(),
      userId: user.uid,
      photoURL: matchDetails.users[user.uid].logoURL,
      message: input,
    });
    setInput("");
  };

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches", matchDetails.id, "messages"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    [matchDetails, db]
  );

  const [messages, setMessages] = useState();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        title={getMatchedUserInfo(matchDetails?.users, user.uid).businessname}
        callEnabled={true}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            inverted={-1}
            style={{ flex: 1 }}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item: message }) =>
              message.userId === user.uid ? (
                <SenderMessage key={message.id} message={message} />
              ) : (
                <ReceiverMessage key={message.id} message={message} />
              )
            }
          />
        </TouchableWithoutFeedback>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 10,
            // backgroundColor: "white",
          }}
        >
          <TextInput
            style={{
              padding: 20,
              fontSize: 18,
              width: "85%",
            }}
            placeholder="Send Message..."
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
          />
          <Button onPress={sendMessage} title="Send" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({});
