import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, Left, Right, ListItem, Thumbnail, Body } from "native-base";

const CartItem = (props) => {
  const data = props.item.item;

  const [quantity, setQuantity] = useState(props.item.quantity);

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
};
const styles = StyleSheet.create({
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
});
export default CartItem;
