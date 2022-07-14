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
import generateId from "../../lib/generateId";
import {
  onSnapshot,
  collection,
  setDoc,
  doc,
  getDocs,
  query,
  where,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import useAuth from "../Hooks/useAuth";
import { db } from "../../firebase";
import { useNavigation } from "@react-navigation/native";

export default function Cards() {
  const swipeRef = useRef(null);
  const { user } = useAuth();
  const navigation = useNavigation();
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    let unsub;
    const fetchCards = async () => {
      //We have to await the docs or it would not work
      const passes = await getDocs(
        collection(db, "users", user.uid, "passes")
      ).then((snapshot) =>
        snapshot.docs.map((doc) => {
          doc.id;
        })
      );

      //We have to await the docs or it would not work
      const swipes = await getDocs(
        collection(db, "users", user.uid, "swipes")
      ).then((snapshot) =>
        snapshot.docs.map((doc) => {
          doc.id;
        })
      );

      const passedUserIds = passes.length > 0 ? passes : ["test"];
      const swipedUserIds = swipes.length > 0 ? swipes : ["test"];

      //query the the users that have not yet been swiped left/right
      unsub = onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", [...passedUserIds, ...swipedUserIds])
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

  const swipeLeft = async (cardIndex) => {
    if (!profiles[cardIndex]) return;
    const userSwiped = profiles[cardIndex];

    setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);
  };
  const swipeRight = async (cardIndex) => {
    if (!profiles[cardIndex]) return;
    const userSwiped = profiles[cardIndex];
    const currentUser = await (await getDoc(doc(db, "users", user.uid))).data();
    setDoc(doc(db, "users", user.uid, "swipes", userSwiped.id), userSwiped);
    getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then(
      //check if user swiped the curent user
      (snapshot) => {
        if (snapshot.exists()) {
          console.log("it's a match!");

          //Create a match
          setDoc(doc(db, "matches", generateId(user.uid, userSwiped.id)), {
            users: {
              [user.uid]: currentUser,
              [userSwiped.id]: userSwiped,
            },
            usersMatched: [user.uid, userSwiped.id],
            timestamp: serverTimestamp(),
          });

          navigation.navigate("MatchScreen", { currentUser, userSwiped });
        } else {
          //didnt get swiped on yet
          //or go passed
          console.log("not a match yet");
        }
      }
    );
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
