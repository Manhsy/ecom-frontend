import React, { useState, useCallback } from "react";
import { View, Text, FlatList } from "react-native";
import axios from "axios";
import baseURL from "../../API/baseUrl";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OrderCard from "../../shared/orderCards";

const Orders = (props) => {
  const [orderList, setOrderList] = useState();
  const [token, setToken] = useState();

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("jwt")
        .then((res) => setToken(res))
        .catch((err) => console.log(err));

      getOrders();
      return () => {
        setOrderList();
      };
    }, [])
  );

  const getOrders = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`${baseURL}/orders`, config)
      .then((res) => {
        console.log(res.data);
        setOrderList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View>
      <FlatList
        data={orderList}
        renderItem={({ item }) => (
          <OrderCard navigation={props.navigation} {...item} />
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default Orders;
