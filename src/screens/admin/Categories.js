import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TextInput,
  StyleSheet,
} from "react-native";
import baseURL from "../../API/baseUrl";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EasyButton from "../../shared/StyledComponents/EasyButton";

var { width } = Dimensions.get("window");

const Item = (props) => {
  return (
    <View style={styles.item}>
      <Text>{props.item.name}</Text>
      <EasyButton
        medium
        danger
        onPress={() => props.deleteCategory(props.item._id)}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Delete</Text>
      </EasyButton>
    </View>
  );
};

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    AsyncStorage.getItem("jwt")
      .then((res) => setToken(res))
      .catch((err) => console.log(err));

    axios
      .get(`${baseURL}/categories`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      setCategories([]);
      setToken();
    };
  }, []);

  const deleteCategory = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`${baseURL}/categories/${id}`, config)
      .then((res) => {
        const newCategories = categories.filter((item) => item._id !== id);
        setCategories(newCategories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addCategory = () => {
    const category = {
      name: categoryName,
    };
    console.log(category);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`${baseURL}/categories`, category, config)
      .then((res) => {
        setCategories([...categories, res.data]);
      })
      .catch((err) => {
        console.log(err);
      });

    setCategoryName("");
  };

  return (
    <View style={{ position: "relative", height: "100%" }}>
      <View style={{ marginBottom: 60 }}>
        <FlatList
          keyExtractor={(item) => item.id}
          data={categories}
          renderItem={({ item, index }) => (
            <Item item={item} index={index} deleteCategory={deleteCategory} />
          )}
        />
      </View>
      <View style={styles.bottomBar}>
        <View>
          <Text>Add Category</Text>
        </View>
        <View style={{ width: width / 2.5 }}>
          <TextInput
            value={categoryName}
            style={styles.input}
            onChangeText={(text) => setCategoryName(text)}
          />
        </View>
        <View>
          <EasyButton medium primary onPress={() => addCategory()}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Submit</Text>
          </EasyButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: "white",
    width: width,
    height: 60,
    padding: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  input: { height: 40, borderColor: "grey", borderWidth: 1 },
  item: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
    padding: 5,
    margin: 5,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 5,
  },
});

export default Categories;
