import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Item, Picker } from "native-base";
import FormContainer from "../../shared/form/formContainer";
import Input from "../../shared/form/input";
import EasyButton from "../../shared/StyledComponents/EasyButton";
import Error from "../../shared/error";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../../API/baseUrl";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";

const ProductForm = (props) => {
  const [pickerValue, setPickerValue] = useState();
  const [brand, setBrand] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [mainImage, setMainImage] = useState();
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState();
  const [error, setError] = useState();
  const [countInStock, setCountInStock] = useState();
  const [rating, setRating] = useState(0);
  const [isFeatured, setIsFeatured] = useState(false);
  const [richDescription, setRichDescription] = useState();
  const [numReviews, setNumReviews] = useState(5);
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (!props.route.params) {
      console.log("props.route.params.item");
      setItem(null);
    } else {
      setItem(props.route.params.item);
      setBrand(props.route.params.item.brand);
      setName(props.route.params.item.name);
      setPrice(props.route.params.item.price.toString());
      setDescription(props.route.params.item.description);
      setMainImage(props.route.params.item.image);
      setImage(props.route.params.item.image);
      setCategory(props.route.params.item.category);
      setCountInStock(props.route.params.item.countInStock.toString());
    }

    AsyncStorage.getItem("jwt")
      .then((res) => setToken(res))
      .catch((err) => console.log(err));

    axios
      .get(`${baseURL}/categories`)
      .then((response) => setCategories(response.data))
      .catch((err) => alert("Error to load categories"));

    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status != "granted") {
          alert("Sorry, we need camera roll permissions");
        }
      }
    })();

    return () => {
      setCategories;
    };
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setMainImage(result.uri);
      setImage(result.uri);
    }
  };

  const addProduct = () => {
    if (
      name === "" ||
      brand === "" ||
      price === "" ||
      description === "" ||
      category === "" ||
      countInStock === ""
    ) {
      setError("Please fill in the form correctly");
    }

    let formData = new FormData();

    const newImageUri = "file:///" + image.split("file:/").join("");

    formData.append("image", {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split("/").pop(),
    });

    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("countInStock", countInStock);
    formData.append("richDescription", richDescription);
    formData.append("rating", rating);
    formData.append("numReviews", numReviews);
    formData.append("isFeatured", isFeatured);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    if (item !== null) {
      axios
        .put(`${baseURL}/products/${item._id}`, formData, config)
        .then(() => {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Product has been updated",
            text2: "",
          });
          setTimeout(() => {
            props.navigation.navigate("Products");
          }, 500);
        })
        .catch((err) => {
          console.log(err);
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Item cannot be updated",
            text2: "Please try again",
          });
        });
    } else {
      axios
        .post(`${baseURL}/products/`, formData, config)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "New Product Created",
              text2: "",
            });
            setTimeout(() => {
              props.navigation.navigate("Products");
            }, 500);
          }
        })
        .catch((err) => {
          console.log(err);
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "New Product Created Cannot be Created",
            text2: "Please try again",
          });
        });
    }
  };

  const editItem = () => {
    axios
      .put(`${baseURL}/products/${item._id}`)
      .then(() => {
        Toast.show({
          topOffset: 60,
          type: "success",
          text1: "Product has been updated",
          text2: "",
        });
        setTimeout(() => {
          props.navigation.navigate("Products");
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Item cannot be updated",
          text2: "Please try again",
        });
      });
  };

  return (
    <FormContainer title="Add Product">
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: mainImage }} />
        <TouchableOpacity
          style={styles.imagePicker}
          onPress={() => pickImage()}
        >
          <Icon name="camera" style={{ color: "white" }} size={17} />
        </TouchableOpacity>
      </View>
      <View style={styles.label}>
        <TouchableOpacity>
          <Text>Brand</Text>
        </TouchableOpacity>
      </View>
      <Input
        placeholder="Brand"
        name="Brand"
        id="Brand"
        value={brand}
        onChangeText={(text) => setBrand(text)}
      />
      <View style={styles.label}>
        <TouchableOpacity>
          <Text>Name</Text>
        </TouchableOpacity>
      </View>
      <Input
        placeholder="Name"
        name="Name"
        id="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <View style={styles.label}>
        <TouchableOpacity>
          <Text>Price</Text>
        </TouchableOpacity>
      </View>
      <Input
        placeholder="Price"
        name="Price"
        id="Price"
        value={price}
        keyboardType={"numeric"}
        onChangeText={(text) => setPrice(text)}
      />
      <View style={styles.label}>
        <TouchableOpacity>
          <Text>Stock</Text>
        </TouchableOpacity>
      </View>
      <Input
        placeholder="Stock"
        name="Stock"
        id="Stock"
        value={countInStock}
        keyboardType={"numeric"}
        onChangeText={(text) => setCountInStock(text)}
      />
      <View style={styles.label}>
        <TouchableOpacity>
          <Text>Description</Text>
        </TouchableOpacity>
      </View>
      <Input
        placeholder="Description"
        name="Description"
        id="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />

      <Item picker>
        <Picker
          style={{ width: undefined }}
          mode="dropdown"
          iosIcon={<Icon color="#007aff" name="arrow-down" />}
          placeholder="Select your category"
          selectedValue={pickerValue}
          placeholderStyle={{ color: "#007aff" }}
          placeholderIconColor="#007aff"
          onValueChange={(e) => {
            setPickerValue(e);
            setCategory(e);
          }}
        >
          {categories.map((c) => {
            return <Picker.Item key={c.id} label={c.name} value={c.id} />;
          })}
        </Picker>
      </Item>
      {error ? <Error message={error} /> : null}

      <View style={styles.buttonContainer}>
        <EasyButton large primary onPress={() => addProduct()}>
          <Text style={styles.buttonText}>Confirm</Text>
        </EasyButton>
      </View>
    </FormContainer>
  );
};
const styles = StyleSheet.create({
  label: {
    width: "75%",
    marginTop: 10,
  },
  buttonContainer: {
    width: "40%",
    marginBottom: 80,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderStyle: "solid",
    borderWidth: 8,
    padding: 0,
    justifyContent: "center",
    borderRadius: 100,
    borderColor: "#E0E0E0",
    elevation: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  imagePicker: {
    position: "absolute",
    right: 5,
    bottom: 5,
    backgroundColor: "grey",
    padding: 8,
    borderRadius: 100,
    elevation: 20,
  },
});
export default ProductForm;
