import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

//screens
import Checkout from "../screens/cart/checkout/checkout";
import Confirm from "../screens/cart/checkout/confirm";
import Payment from "../screens/cart/checkout/payment";

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Shipping" component={Checkout} />
      <Tab.Screen name="Payment" component={Payment} />
      <Tab.Screen name="Confirm" component={Confirm} />
    </Tab.Navigator>
  );
}

export default function CheckoutNavigator() {
  return <MyTabs />;
}
