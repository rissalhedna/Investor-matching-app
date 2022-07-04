import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import ModalScreen from "../Screens/ModalScreen";
import HomeScreen from "../Screens/HomeScreen";
import ChatScreen from "../Screens/ChatScreen";
import LoginScreen from "../Screens/LoginScreen";
import useAuth from "../Hooks/useAuth";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { user } = useAuth();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Group>
            <Stack.Screen
              style={{ flex: 1 }}
              name="HomeScreen"
              component={HomeScreen}
            />
            <Stack.Screen
              style={{ flex: 1 }}
              name="ChatScreen"
              component={ChatScreen}
            />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen
              style={{ flex: 1 }}
              name="ModalScreen"
              component={ModalScreen}
            />
          </Stack.Group>
        </>
      ) : (
        <Stack.Screen
          style={{ flex: 1 }}
          name="LoginScreen"
          component={LoginScreen}
        />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
