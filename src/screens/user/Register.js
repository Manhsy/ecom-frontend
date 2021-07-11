import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import FormContainer from "../../shared/form/formContainer";
import Input from "../../shared/form/input";
import Error from "../../shared/error";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import baseUrl from "../../../assets/common/baseUrl";
import Toast from "react-native-toast-message";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const register = () => {
    if (email === "" || name === "" || phone === "" || password === "") {
      setError("Please fill out all the required areas");
    } else {
      let user = {
        name: name,
        email: email,
        password: password,
        phone: phone,
        idAdmin: false,
      };

      baseUrl
        .post("/api/v1/users/register", user)
        .then((res) => {
          if (res.status == 200) {
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "Registration success",
              text2: "Please login into you account",
            });
            setTimeout(() => {
              props.navigation.navigate("Login");
            }, 500);
          }
        })
        .catch((error) => {
          console.log(error.message);
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Something went wrong",
            text2: "Please try again",
          });
        });
    }
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={"Register"}>
        <Input
          placeholder={"Email"}
          name={"Email"}
          id={"Email"}
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase())}
        />
        <Input
          placeholder={"Name"}
          name={"Name"}
          id={"Name"}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder={"Phone"}
          name={"phone"}
          id={"phone"}
          value={phone}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={"Password"}
          name={"password"}
          id={"password"}
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <View>
          {error ? <Error message={error} /> : null}
          <Button title="Register" onPress={() => register()} />
        </View>
        <View style={styles.buttonGroup}>
          <Button
            title="Login"
            onPress={() => props.navigation.navigate("Login")}
          />
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    alignItems: "center",
    margin: 10,
  },
});

export default Register;
