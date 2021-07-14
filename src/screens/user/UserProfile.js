import React, { useContext, useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import { Container } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../../API/baseUrl";
import axios from "axios";
import AuthGlobal from "../../context/store/AuthGlobal";
import { logoutUser } from "../../context/actions/authActions";
import OrderCard from "../../shared/orderCards";

const UserProfile = (props) => {
  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();
  const [orders, setOrders] = useState();

  useFocusEffect(
    useCallback(() => {
      if (
        context.stateUser.isAuthenticated === false ||
        context.stateUser.isAuthenticated === null
      ) {
        props.navigation.navigate("Login");
      }

      AsyncStorage.getItem("jwt")
        .then((res) => {
          axios
            .get(`${baseURL}/users/${context.stateUser.user.userId}`, {
              headers: { Authorization: `Bearer ${res}` },
            })
            .then((user) => {
              setUserProfile(user.data);
            });
        })
        .catch((error) => console.log(error));

      AsyncStorage.getItem("jwt")
        .then((res) => {
          axios
            .get(`${baseURL}/orders`, {
              headers: { Authorization: `Bearer ${res}` },
            })
            .then((res) => {
              setOrders(res.data);

              const userOrders = orders.filter(
                (order) => order.user._id === context.stateUser.user.userId
              );
              setOrders(userOrders);
            })
            .catch((err) => console.log(err));
        })
        .catch((error) => console.log(error));

      return () => {
        setUserProfile();
        setOrders();
      };
    }, [context.stateUser.isAuthenticated])
  );

  return (
    <Container style={styles.container}>
      <ScrollView contentContainerStyle={styles.subContainer}>
        <Text style={{ fontSize: 30 }}>
          Name: {userProfile ? userProfile.name : ""}
        </Text>
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 30 }}>
            Email: {userProfile ? userProfile.email : ""}
          </Text>
          <Text style={{ fontSize: 30 }}>
            Phone: {userProfile ? userProfile.phone : ""}
          </Text>
        </View>
        <View style={{ marginBottom: 10 }}>
          <Button
            title="Sign out"
            onPress={() => {
              AsyncStorage.removeItem("jwt");
              logoutUser(context.dispatch);
            }}
          />
          <View style={styles.order}>
            <Text style={{ fontSize: 20, alignSelf: "center" }}>My Orders</Text>
            <View>
              {orders ? (
                orders.map((o) => {
                  return <OrderCard key={o._id} {...o} screen="user" />;
                })
              ) : (
                <View>
                  <Text>You have no orders</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  subContainer: {
    alignItems: "center",
    marginTop: 60,
  },
  order: {
    marginTop: 20,
    alignItems: "center",
    marginBottom: 10,
  },
});

export default UserProfile;
