import React, { useState, useCallback } from "react"; //use call back to re-render our component when we make http request
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from "react-native";
import { Container, Header, Icon, Item, Input, Text } from "native-base";
import baseUrl from "../../API/baseUrl";
import { useFocusEffect } from "@react-navigation/native";
import ProductList from "./ProductList";
import SearchedProduct from "./SearchedProducts";
import Banner from "../../shared/banner";
import CategoryFilter from "./categoryFilter";
import baseURL from "../../API/baseUrl";
import axios from "axios";

var { height } = Dimensions.get("window");

const ProductContainer = (props) => {
  //array of products
  const [products, setProducts] = useState();
  //array of products that the user is searching for
  const [productFiltered, setProductFilter] = useState([]);
  //true or false the user is making a search
  const [focus, setFocus] = useState();
  //array of product categories
  const [categories, setCategories] = useState([]);
  const [productCategory, setProductCategory] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [loading, setLoading] = useState(true);

  //when the screen is focused, use call back will be called
  useFocusEffect(
    useCallback(() => {
      axios
        .get(`${baseURL}/products`)
        .then((res) => {
          setProducts(res.data);
          setInitialState(res.data);
          setProductFilter(res.data);
          setProductCategory(res.data);
          setLoading(false);
        })
        .catch((er) => console.log(er));

      setFocus(false);
      setActive(-1);

      axios
        .get(`${baseURL}/categories`)
        .then((res) => {
          setCategories(res.data);
        })
        .catch((error) => {
          console.log(error);
        });

      return () => {
        setProducts([]);
        setProductFilter([]);
        setFocus();
        setCategories([]);
        setActive();
        setInitialState([]);
      };
    }, [])
  );

  const searchProduct = (text) => {
    setProductFilter(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  const changeCategory = (category) => {
    {
      category == "all"
        ? [setProductCategory(initialState), setActive(true)]
        : [
            setProductCategory(
              products.filter((i) => i.category === category),
              setActive(true)
            ),
          ];
    }
  };
  return (
    <>
      {loading === false ? (
        <Container>
          <Header searchBar rounded>
            <Item>
              <Icon name="ios-search" />
              <Input
                placeholder="search"
                onFocus={openList}
                onChangeText={(text) => searchProduct(text)}
              />
              {focus == true ? (
                <Icon onPress={onBlur} name="ios-close" />
              ) : null}
            </Item>
          </Header>
          {focus == true ? (
            <SearchedProduct
              navigation={props.navigation}
              productsFiltered={productFiltered}
            />
          ) : (
            <ScrollView>
              <View style={{ marginTop: 0 }}>
                <View>
                  <Banner />
                </View>
                <View>
                  <CategoryFilter
                    categories={categories}
                    categoryFilter={changeCategory}
                    productCategory={productCategory}
                    active={active}
                    setActive={setActive}
                  />
                </View>

                {productCategory.length > 0 ? (
                  <View style={styles.listContainer}>
                    {productCategory.map((item) => {
                      return (
                        <ProductList
                          navigation={props.navigation}
                          key={item._id}
                          item={item}
                        />
                      );
                    })}
                  </View>
                ) : (
                  <View style={[styles.center, { height: height / 2 }]}>
                    <Text>No product found in this category</Text>
                  </View>
                )}
              </View>
            </ScrollView>
          )}
        </Container>
      ) : (
        <Container style={[styles.center, { backgroundColor: "#f2f2f2" }]}>
          <ActivityIndicator size="large" color="red" />
        </Container>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  listContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
    bottom: 5,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductContainer;
