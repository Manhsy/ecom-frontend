import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator, FlatList, ScrollView} from 'react-native';
import {Container, Header, Icon, Item, Input, Text} from 'native-base';

import ProductList from './ProductList';
import SearchedProduct from './SearchedProducts';
import Banner from '../../shared/banner'

const data = require('../../../assets/products.json')

const ProductContainer = ()=>{
    const [products, setProducts] = useState([]);
    const [productFiltered, setProductFilter] = useState([]);
    const [focus, setFocus] = useState();

    useEffect(()=>{
        setProducts(data);
        setProductFilter(data)
        setFocus(false)

        return ()=>{
            setProducts([]);
            setProductFilter([]);
            setFocus();
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
                    <View style= {{marginTop: 0, backgroundColor: '#DCDCDC'}}>
                        <View><Banner/></View>
                        <View>
                            <FlatList
                                numColumns = {2}
                                data = {products}
                                renderItem = {({item})=> 
                                    <ProductList 
                                        key = {item.id} 
                                        item = {item}
                                    />}
                                keyExtractor = {item => item.name}
                            />
                        </View>
                    </View>
                </ScrollView>
            )}
        </Container>
        
    )
}

const styles = StyleSheet.create({})

export default ProductContainer;
