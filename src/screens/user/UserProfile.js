import React, { useContext, useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import { Container } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../../API/baseUrl";
import axios from "axios";
import AuthGlobal from "../../context/store/AuthGlobal";
import { logoutUser } from "../../context/actions/authActions";

const UserProfile = (props) => {
  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    async function fetchData() {
      if (
        context.stateUser.isAuthenticated === false ||
        context.stateUser.isAuthenticated === null
      ) {
        props.navigation.navigate("Login");
      }
      const token = await AsyncStorage.getItem("jwt");
      const response = await axios.get(
        `${baseURL}/users/${context.stateUser.user.userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserProfile(response.data);
    }
    fetchData();
    return () => {
      setUserProfile();
    };
  }, [context.stateUser.isAuthenticated]);

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
        <View style={{ marginTop: 80 }}>
          <Button
            title="Sign out"
            onPress={() => {
              AsyncStorage.removeItem("jwt");
              logoutUser(context.dispatch);
            }}
          />
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
});

export default UserProfile;
