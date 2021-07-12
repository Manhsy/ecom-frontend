import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Button,
} from "react-native";
import { Header, Item, Input } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFocusEffect } from "@react-navigation/native";

import baseUrl from "../../API/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

var { height, width } = Dimensions.get("window");

const Products = () => {
  const [productList, setProductList] = useState();
  const [productFilter, setProductFilter] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();

  useFocusEffect(
    useCallback(() => {
      //get token
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((error) => console.log(error));

      //get products from mongo
      baseUrl.get("products").then((res) => {
        setProductFilter(res.data);
        setProductList(res.data);
        setLoading(false);
      });

      return () => {
        setProductList();
        setProductFilter();
        setLoading(true);
      };
    }, [])
  );
  return (
    <View>
      <View>
        <Header searchBar rounded>
          <Item style={{ padding: 5 }}>
            <Icon name="search" />
            <Input
              placeholder="Search"
              //onChange
            />
          </Item>
        </Header>
      </View>

      {loading ? (
        <View>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <FlatList
          data={productFilter}
          renderItem={({ item, index }) => <Text>{item.name}</Text>}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

export default Products;
