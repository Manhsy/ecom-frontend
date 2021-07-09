import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Cart from '../screens/cart/cart'
import Checkout  from '../screens/cart/checkout'

const Stack = createStackNavigator();

function MyStack (){
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name = 'Cart'
                component = {Cart}
                options = {{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name = 'Checkout'
                component = {Checkout}
                options = {{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default function CartNavigator(){
    return <MyStack/>
}