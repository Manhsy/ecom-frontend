import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableHighLight,
  TouchableOpacity,
  Dimensions,
  Button,
  Modal,
} from "react-native";
import baseURL from "../../API/baseUrl";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
import EasyButton from "../../shared/StyledComponents/EasyButton";

var { width } = Dimensions.get("window");

const ListItem = (props) => {
  const [category, setCategory] = useState();
  const [modalVisible, setModalVisibility] = useState(false);

  useEffect(() => {
    axios
      .get(`${baseURL}/categories/${props.category}`)
      .then((response) => setCategory(response.data.name))
      .catch((err) => console.log(err));
    return () => {
      setCategory();
    };
  }, []);

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisibility(false)}
      >
        <View style={styles.centerView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              underlayColor="#E8E8E8"
              onPress={() => setModalVisibility(false)}
              style={{
                alignItems: "center",
                position: "absolute",
                top: 5,
                right: 10,
              }}
            >
              <Icon name="close" size={20} />
            </TouchableOpacity>
            <EasyButton
              medium
              secondary
              onPress={() => [
                props.navigation.navigate("ProductForm", { item: props }),
                setModalVisibility(false),
              ]}
            >
              <Text style={styles.textStyle}>Edit</Text>
            </EasyButton>
            <EasyButton
              medium
              danger
              onPress={() => [
                props.delete(props._id),
                setModalVisibility(false),
              ]}
            >
              <Text style={styles.textStyle}>Delete</Text>
            </EasyButton>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("ProductDetail", { item: props });
        }}
        onLongPress={() => setModalVisibility(true)}
        style={[
          styles.container,
          {
            backgroundColor: props.index % 2 === 0 ? "white" : "gainsboro",
          },
        ]}
      >
        <Image
          style={styles.image}
          resizeMode={"contain"}
          source={{
            uri: props.image
              ? props.image
              : "https://i.ytimg.com/vi/BIQapBNiQdI/mqdefault.jpg",
          }}
        />
        <Text style={styles.item}>{props.brand}</Text>
        <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">
          {props.name}
        </Text>
        <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">
          {category}
        </Text>
        <Text style={styles.item}>${props.price}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 5,
    width: width,
  },
  image: {
    borderRadius: 50,
    width: width / 6,
    height: 20,
    margin: 2,
  },
  item: {
    flexWrap: "wrap",
    margin: 3,
    width: width / 6,
  },
  centerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ListItem;
