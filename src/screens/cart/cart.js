import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Button,
  touchableOpacity,
} from "react-native";
import {
  Container,
  Text,
  Left,
  Right,
  H1,
  ListItem,
  Thumbnail,
  Body,
} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/cartActions";

var { height, width } = Dimensions.get("window");

const Cart = (props) => {
  var totalPrice = 0;

  props.cartItems.forEach((cart) => {
    return (totalPrice += cart.product.price);
  });

  return (
    <Container>
      {props.cartItems.length > 0 ? (
        <Container>
          <H1 style={{ alignSelf: "center" }}>Cart</H1>
          {props.cartItems.map((data) => {
            return (
              <ListItem style={styles.listItem} key={Math.random()} avatar>
                <Left>
                  <Thumbnail
                    source={{
                      uri: data.product.image
                        ? data.product.image
                        : "https://i.insider.com/5b1702bd1ae66244008b4c94?width=750&format=jpeg&auto=webp",
                    }}
                  />
                </Left>
                <Body style={styles.body}>
                  <Left>
                    <Text>{data.product.name}</Text>
                  </Left>
                  <Right>
                    <Text>${data.product.price}</Text>
                  </Right>
                </Body>
              </ListItem>
            );
          })}
          <View style={styles.bottomContainer}>
            <Left>
              <Text style={styles.price}>${totalPrice.toFixed(2)}</Text>
            </Left>
            <Right>
              <Button title="Clear" onPress={() => props.clearCart()} />
            </Right>
            <Right>
              <Button
                title="Checkout"
                onPress={() => {
                  props.navigation.navigate("Checkout");
                }}
              />
            </Right>
          </View>
        </Container>
      ) : (
        <Container style={styles.emptyContainer}>
          <Text>There are currently no item in cart</Text>
        </Container>
      )}
    </Container>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
  };
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    alignItems: "center",
    justifyContent: "center",
  },
  listItem: {
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
  },
  body: {
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  bottomContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
    elevation: 20,
  },
  price: {
    fontSize: 18,
    margin: 20,
    color: "red",
  },
  checkout: {},
});

//connect(state, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
