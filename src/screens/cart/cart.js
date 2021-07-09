import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {connect} from 'react-redux';

const Cart = (props)=>{

    return(
        <View style = {{flex: 1}}>
            {props.cartItems.map(x=>{
                return(
                    <Text>{x.product.name}</Text>
                )
            })}
        </View>
    )
}

const mapStateToProps = (state)=>{
    const {cartItems} = state;
    return {
        cartItems: cartItems
    }
}

const styles = StyleSheet.create({

})

//first params adds function props
export default connect(mapStateToProps, null)(Cart);