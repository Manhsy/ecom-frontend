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

import baseURL from "../../API/baseUrl";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ListItem from "./ListItem";

var { height, width } = Dimensions.get("window");

const ListHeader = () => {
  return (
    <View elevation={1} style={styles.listHeader}>
      <View style={styles.header}></View>
      <View style={styles.header}>
        <Text style={styles.title}>Brand</Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.title}>Name</Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.title}>Category</Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.title}>Price</Text>
      </View>
    </View>
  );
};

const Products = (props) => {
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
      axios.get(`${baseURL}/products`).then((res) => {
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

  const searchProduct = (text) => {
    if (text === "") {
      setProductFilter(productList);
    } else {
      setProductFilter(
        productList.filter((i) =>
          i.name.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  return (
    <View>
      <View>
        <Header searchBar rounded>
          <Item style={{ padding: 5 }}>
            <Icon name="search" />
            <Input
              placeholder="Search"
              onChangeText={(text) => searchProduct(text)}
            />
          </Item>
        </Header>
      </View>

      {loading ? (
        <View>
          <ActivityIndicator size="large" color="red" style={styles.spinner} />
        </View>
      ) : (
        <FlatList
          data={productFilter}
          ListHeaderComponent={ListHeader}
          renderItem={({ item, index }) => (
            <ListItem {...item} navigation={props.navigation} index={index} />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  listHeader: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: "gainsboro",
  },
  header: {
    margin: 3,
    width: width / 6,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
  },
  spinner: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Products;
