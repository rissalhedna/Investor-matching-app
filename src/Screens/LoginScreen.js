import {
  SafeAreaView,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import Logo from "../../assets/BoosterLogo.png";
import useAuth from "../Hooks/useAuth";

const LoginScreen = () => {
  const { user, signInWithGoogle } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <ImageBackground
        style={{ flex: 1, width: 300, top: -30 }}
        resizeMode="contain"
        source={Logo}
      >
        <TouchableOpacity
          onPress={signInWithGoogle}
          style={{
            backgroundColor: "black",
            alignItems: "center",
            padding: 15,
            borderRadius: 5,
            marginTop: "auto",
            marginBottom: 100,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
            Sign In & get Boosting
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default LoginScreen;
