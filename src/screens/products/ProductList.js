import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native'
import ProductCard from './ProductCard'

var {width} = Dimensions.get('window');

const ProductList = (props)=>{
    const {item} = props;
    return (
        <TouchableOpacity 
            style = {{width: '50%'}}
            onPress = {()=>{
                props.navigation.navigate('ProductDetail', {item: item})
            }}
        >
            <View style = {{width: width/2}}>
                <ProductCard 
                    {...item}/>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

})
export default ProductList;
