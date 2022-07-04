import {
  View,
  Text,
  SafeAreaView,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../Hooks/useAuth";

import Cards from "../Components/Cards";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Logo from "../../assets/BoosterLogo.png";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { logout, user } = useAuth();

  useLayoutEffect(() => {
    onSnapshot(doc(db, "users", user.uid), (snapshot) => {
      if (!snapshot.exists()) {
        navigation.navigate("ModalScreen");
      }
    });
  });

  return (
    <SafeAreaView>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={logout} style={{ left: 5, top: 10 }}>
          <Image
            style={styles.profilePicture}
            source={{ uri: user.photoURL }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ModalScreen");
          }}
          style={{ width: 160, top: 10 }}
        >
          <Image source={Logo} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity style={{ top: 10, right: 5 }}>
          <Ionicons name="chatbubbles-sharp" size={30} />
        </TouchableOpacity>
      </View>
      {/* End of header */}

      {/* Cards */}
      <Cards />
      {/* End of cards */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profilePicture: {
    resizeMode: "contain",
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  logo: {
    resizeMode: "contain",
    width: 150,
    height: 50,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default HomeScreen;
