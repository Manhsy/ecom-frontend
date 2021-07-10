import React, { useEffect, useState } from "react";
import { Text, View, Button } from "react-native";
import { Item, Picker } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import FormContainer from "../../../shared/form/formContainer";
import Input from "../../../shared/form/input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { connect } from "react-redux";

const countries = require("../../../../assets/countries.json");

const Checkout = (props) => {
  const [orderItems, setOrderItems] = useState([]);
  const [address, setAddress] = useState();
  const [address2, setAddress2] = useState();

  const [city, setCity] = useState();
  const [zip, setZip] = useState();
  const [country, setCountry] = useState("USA");
  const [phone, setPhone] = useState();

  // useEffect(() => {
  //   setOrderItems(props.cartItems);
  //   return () => {
  //     setOrderItems();
  //   };
  // }, []);

  const checkout = () => {
    let order = {
      city,
      country,
      dateOrdered: Date.now(),
      orderItems,
      phone,
      shippingAddress: address,
      shippingAddress2: address2,
      zip,
    };
    props.navigation.navigate("Payment", { order: order });
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={"Shipping Address"}>
        <Input
          placeholder={"Phone"}
          name={"phone"}
          value={phone}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={"Shipping Address"}
          name={"ShippingAddress"}
          value={address}
          onChangeText={(text) => setPhone(setAddress)}
        />
        <Input
          placeholder={"Shipping Address2"}
          name={"ShippingAddress2"}
          value={address2}
          onChangeText={(text) => setPhone(setAddress2)}
        />
        <Input
          placeholder={"City"}
          name={"City"}
          value={city}
          onChangeText={(text) => setPhone(setCity)}
        />
        <Input
          placeholder={"zip"}
          name={"zip"}
          value={zip}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(setZip)}
        />
      </FormContainer>
      <Item picker>
        <Picker
          note
          mode="dropdown"
          iosIcon={<Icon name="arrow-down" color={"#007aff"} />}
          selectedValue={country}
          placeholder="Select your country"
          placeholderStyle={{ color: "#007aff" }}
          placeholderIconColor="#007aff"
          onValueChange={(e) => setCountry(e)}
        >
          {countries.map((c) => {
            return <Picker.Item key={c.code} label={c.name} value={c.name} />;
          })}
        </Picker>
      </Item>
      <View style={{ width: "80%", alignItems: "center" }}>
        <Button title="Confirm" onPress={() => checkout()} />
      </View>
    </KeyboardAwareScrollView>
  );
};
const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

export default connect(mapStateToProps, null)(Checkout);
