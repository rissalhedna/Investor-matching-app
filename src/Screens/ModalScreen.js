import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Logo from "../../assets/BoosterLogo.png";
import useAuth from "../Hooks/useAuth";
import { useState } from "react";
import { serverTimestamp, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigation } from "@react-navigation/native";

const ModalScreen = () => {
  const { user } = useAuth();
  const [logoURL, setLogoURL] = useState(null);
  const [businessname, setBusinessname] = useState(null);
  const [description, setDescription] = useState(null);
  const navigation = useNavigation();

  const incompleteForm = !logoURL || !businessname || !description;

  const updateProfile = () => {
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      businessname: businessname,
      logoURL: logoURL,
      description: description,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate("HomeScreen");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={Logo} />
      <Text style={styles.welcomeText}>Welcome, {user.displayName}!</Text>
      <Text
        style={[
          styles.welcomeText,
          { fontSize: 14, marginTop: 10, color: "grey" },
        ]}
      >
        Set up your profile below
      </Text>
      <Text style={styles.text}>
        <Text style={{ color: "red", fontWeight: "bold" }}>Step1:</Text> The
        profile pic
      </Text>
      <TextInput
        value={logoURL}
        onChangeText={(text) => setLogoURL(text)}
        placeholder="Enter a profile pic url"
      />
      <Text style={styles.text}>
        <Text style={{ color: "red", fontWeight: "bold" }}>Step2:</Text> The
        name
      </Text>
      <TextInput
        value={businessname}
        onChangeText={(text) => setBusinessname(text)}
        placeholder="Enter your name"
      />
      <Text style={styles.text}>
        <Text style={{ color: "red", fontWeight: "bold" }}>Step3:</Text> The
        description
      </Text>
      <TextInput
        value={description}
        onChangeText={(text) => setDescription(text)}
        placeholder="Enter your description"
      />
      <TouchableOpacity
        onPress={updateProfile}
        disabled={incompleteForm}
        style={[
          incompleteForm
            ? { backgroundColor: "grey" }
            : { backgroundColor: "black" },
          styles.button,
        ]}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Update profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "center", height: "100%" },
  logo: { width: 150, height: 50, resizeMode: "contain", marginVertical: 20 },
  text: {
    marginTop: 40,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
  },
  button: {
    padding: 20,
    width: "70%",
    borderRadius: 10,
    marginTop: "auto",
    marginBottom: 70,
  },
});

export default ModalScreen;
