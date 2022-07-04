import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useRef } from "react";
import Swiper from "react-native-deck-swiper";
import { useState } from "react";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import {
  onSnapshot,
  collection,
  setDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import useAuth from "../Hooks/useAuth";
import { db } from "../../firebase";
const cards = [
  {
    id: 1,
    businessname: "YASSIR",
    description:
      "A travel company that provides transportation services all over North Africa",
    logoURL: "https://iconape.com/wp-content/png_logo_vector/yassir-logo.png",
    location: {
      name: "Algiers, Algeria",
      lat: "",
      lng: "",
      desc: "",
    },
  },
  {
    id: 2,
    businessname: "Qooxy",
    description:
      "A delivery agency that provides food delivery as well as grocery services",
    logoURL:
      "https://play-lh.googleusercontent.com/p0PwBn6Jp3J8zazVvxBKslyEGi9nCFRXNq0wwrijJ2tTNW_su6jUYX6uS39wJEVLg3D9",
    location: {
      name: "Setif, Algeria",
      lat: "",
      lng: "",
      desc: "",
    },
  },
  {
    id: 3,
    businessname: "SACOM",
    description:
      "A marketing agency that provides marketing and branding possibilities for all types of companies",
    logoURL:
      "https://scontent.fqsf1-2.fna.fbcdn.net/v/t1.6435-9/74466976_108640780586558_6745166728717664256_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=jgGIrLDq5I0AX8cuhvI&_nc_ht=scontent.fqsf1-2.fna&oh=00_AT_sQ9xgm5kPw8K6Ijz4uAb4ew99DEpQhFnPvg45WOwtCw&oe=62E46336",
    location: {
      name: "Setif, Algeria",
      lat: "",
      lng: "",
      desc: "",
    },
  },
  {
    id: 4,
    businessname: "Booster",
    description:
      "An agency that matches between investors and local Algerian businesses",
    logoURL:
      "https://www.seekpng.com/png/detail/459-4595227_free-handshake-logo-png-clip-art-hand-shake.png",
    location: {
      name: "",
      lat: "",
      lng: "",
      desc: "",
    },
  },
];
export default function Cards() {
  const swipeRef = useRef(null);
  const { user } = useAuth();

  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    let unsub;
    const fetchCards = async () => {
      const passes = await getDocs(
        collection(db, "users", user.uid, "passes")
      ).then((snapshot) =>
        snapshot.docs.map((doc) => {
          doc.id;
        })
      );

      const passedUserIds = passes.length > 0 ? passes : ["test"];
      //query the the users that have not yet been swiped left/right
      unsub = onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", [...passedUserIds])
        ),
        (snapshot) => {
          //filter the current user out of the users shown
          setProfiles(
            snapshot.docs
              .filter((doc) => doc.id !== user.uid)
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
          );
        }
      );
    };

    fetchCards();
    return unsub;
  }, []);

  const swipeLeft = (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    console.log(`You swiped left on ${userSwiped.businessname}`);
    setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);
  };
  const swipeRight = (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    console.log(`You swiped right on ${userSwiped.businessname}`);
  };

  // console.log(profiles);

  return (
    <SafeAreaView>
      <View>
        <Swiper
          ref={swipeRef}
          cards={profiles}
          renderCard={(card) => {
            return card ? (
              <View style={[styles.card, styles.cardShadow]}>
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    alignSelf: "center",
                    marginVertical: 20,
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  {card.businessname}
                </Text>
                <View
                  style={{
                    backgroundColor: "white",
                    height: "80%",
                    width: "90%",
                    alignItems: "center",
                    margintop: 100,
                    borderRadius: 20,
                  }}
                >
                  <Image
                    style={{
                      resizeMode: "contain",
                      width: 100,
                      height: 200,
                    }}
                    source={{ uri: card.logoURL }}
                  />
                  <Text
                    style={{
                      color: "black",
                      fontSize: 16,
                      textAlign: "center",
                      width: "70%",
                    }}
                  >
                    {card.description}
                  </Text>
                  <TouchableOpacity
                    style={[
                      {
                        padding: 10,
                        backgroundColor: "black",
                        borderRadius: 10,
                        marginTop: "auto",
                        marginBottom: 20,
                        width: "80%",
                        alignItems: "center",
                      },
                      styles.cardShadow,
                    ]}
                  >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      Learn more...
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View
                style={[
                  styles.card,
                  { alignItems: "center", justifyContent: "center" },
                ]}
              >
                <Text
                  style={{
                    color: "white",
                    marginVertical: 20,
                    fontSize: 18,
                    fontWeight: "500",
                  }}
                >
                  No more businesses to show!
                </Text>
                <Image
                  style={{ height: 100, width: 100, resizeMode: "contain" }}
                  source={{ uri: "https://links.papareact.com/6gb" }}
                />
              </View>
            );
          }}
          onSwiped={(cardIndex) => {
            // console.log(cardIndex);
          }}
          onSwipedLeft={(cardIndex) => {
            // console.log("Swipe left!");
            swipeLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            // console.log("Swipe right!");
            swipeRight(cardIndex);
          }}
          keyExtractor={(card) => card?.id}
          onSwipedAll={() => {}}
          cardIndex={0}
          backgroundColor={"#4FD0E9"}
          stackSize={5}
          stackSeparation={7}
          verticalSwipe={false}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          top: 600,
        }}
      >
        <TouchableOpacity
          style={styles.swipeIcon}
          onPress={() => swipeRef.current.swipeLeft()}
        >
          <Entypo name="cross" size={40} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.swipeIcon}
          onPress={() => swipeRef.current.swipeRight()}
        >
          <AntDesign name="heart" size={40} color={"white"} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "white",
    alignItems: "center",
    backgroundColor: "black",
    height: 450,
    width: "95%",
    alignSelf: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent",
  },
  cardShadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  swipeIcon: {
    padding: 15,
    backgroundColor: "black",
    borderRadius: 50,
    justifyContent: "center",
  },
});
