import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator, ScrollView, Dimensions} from 'react-native';
import {Container, Header, Icon, Item, Input, Text} from 'native-base';

import ProductList from './ProductList';
import SearchedProduct from './SearchedProducts';
import Banner from '../../shared/banner'
import CategoryFilter from './categoryFilter'

const data = require('../../../assets/products.json')
const productCategories = require('../../../assets/categories.json')
var {height} = Dimensions.get('window')

const ProductContainer = ()=>{
    //array of products
    const [products, setProducts] = useState([]);
    //array of products that the user is searching for 
    const [productFiltered, setProductFilter] = useState([]);
    //true or false the user is making a search
    const [focus, setFocus] = useState();
    //array of product categories
    const [categories, setCategories] = useState([]);
    const [productCategory, setProductCategory] = useState([]);
    const [active, setActive] = useState();
    const [initialState, setInitialState] = useState([]);

    useEffect(()=>{
        setProducts(data);
        setProductFilter(data);
        setFocus(false);
        setCategories(productCategories);
        setProductCategory(data);
        setActive(-1);
        setInitialState(data)

        return ()=>{
            setProducts([]);
            setProductFilter([]);
            setFocus();
            setCategories([]);
            setActive();
            setInitialState([]);
        }
    }, [])

    const searchProduct = (text) =>{
        setProductFilter(
            products.filter((i)=> i.name.toLowerCase().includes(text.toLowerCase()))
        )
    }

    const openList = () =>{
        setFocus(true)
    }

    const onBlur =()=>{
        setFocus(false)
    }

    const changeCategory = (category) =>{
        {
            category == 'all' ? [setProductCategory(initialState), setActive(true)] : [
                setProductCategory(
                    products.filter((i)=> i.category.$oid === category),
                    setActive(true)
                )
            ]
        }
    }
    return(
        <Container>
            <Header searchBar rounded>
                <Item>
                    <Icon name = "ios-search" />
                    <Input 
                        placeholder = "search"
                        onFocus = {openList}
                        onChangeText = {(text)=>searchProduct(text)}
                    />
                    {focus == true? (<Icon onPress = {onBlur} name = 'ios-close'/>): null}
                </Item>
            </Header>
            {focus == true ? (
                <SearchedProduct
                    productFiltered= {productFiltered}
                />
            ):(
                <ScrollView>
                    <View style= {{marginTop: 0}}>
                        <View><Banner/></View>
                        <View>
                            <CategoryFilter
                                categories = {categories}
                                categoryFilter = {changeCategory}
                                productCategory = {productCategory}
                                active = {active}
                                setActive = {setActive}
                            />
                        </View>
                        {productCategory.length > 0 ? (
                            <View style= {styles.listContainer}>
                                {productCategory.map((item)=>{
                                    return (
                                        <ProductList 
                                            key = {item._id.$oid} 
                                            item = {item}
                                        />
                                    )
                                })}
                            </View>
                        ):(
                            <View style = {[styles.center, {height:height /2}]}>
                                <Text>No product found in this category</Text>
                            </View>
                        )}
                    </View>
                </ScrollView>
            )}
        </Container>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
      },
      listContainer: {
        height: height,
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
      },
      center: {
          justifyContent: 'center',
          alignItems: 'center'
      }
})

export default ProductContainer;
