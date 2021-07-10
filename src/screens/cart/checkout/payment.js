import React, { useState } from "react";
import { View, Button } from "react-native";
import {
  Text,
  Container,
  Header,
  Content,
  ListItem,
  Radio,
  Right,
  Left,
  Picker,
  Icon,
  Body,
  Title,
} from "native-base";
const methods = [
  { name: "Cash on Delivery", value: 1 },
  { name: "Bank Transfer", value: 2 },
  { name: "Card Payment", value: 3 },
];

const paymentCard = [
  { name: "Wallet", value: 1 },
  { name: "Visa", value: 2 },
  { name: "Mastercard", value: 3 },
  { name: "other card", value: 4 },
];
const Payment = (props) => {
  const order = props.route.params;
  const [selected, setSelected] = useState();
  const [card, setCard] = useState();

  return (
    <Container>
      <Header>
        <Body>
          <Title>Choose your payment method</Title>
        </Body>
      </Header>
      <Content>
        {methods.map((item, index) => {
          return (
            <ListItem key={item.name} onPress={() => setSelected(item.value)}>
              <Left>
                <Text>{item.name}</Text>
              </Left>
              <Right>
                <Radio selected={selected == item.value} />
              </Right>
            </ListItem>
          );
        })}
        {selected == 3 ? (
          <Picker
            mode="dropdown"
            iosIcon={<Icon name={"arrow-down"} />}
            headerStyle={{ backgroundColor: "orange" }}
            headerBackButtonTextStyle={{ color: "#fff" }}
            headerTitleStyle={{ color: "#fff" }}
            selectedValue={card}
            onValueChange={(x) => setCard(x)}
          >
            {paymentCard.map((c, index) => {
              return (
                <Picker.item key={c.value} value={c.name} label={c.name} />
              );
            })}
          </Picker>
        ) : null}
        <View style={{ marginTop: 60, alignSelf: "center" }}>
          <Button
            title={"confirm"}
            onPress={() =>
              props.navigation.navigate("Confirm", { order: order })
            }
          />
        </View>
      </Content>
    </Container>
  );
};

export default Payment;
