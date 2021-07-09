import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet, ScrollView, Button, Text } from 'react-native'
import {Left, Right, Container, H1} from 'native-base'

const SingleProduct = (props)=>{
    const [item, setItem] = useState(props.route.params.item);
    const [availability, setAvailability] = useState('');

    return(
        <Container style = {styles.container}>
            <ScrollView style = {{marginBottom: 80, padding: 5}}>
                <View>
                    <Image
                        source = {{
                            uri: item.image ? item.image : 'https://assets.foxdcg.com/dpp-uploaded/images/bobs-burgers/BB_101L.jpg'
                        }}
                        resizeMode= 'contain'
                        style = {styles.image}
                    />
                </View>
            </ScrollView>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: '100%'
    },
    imageContainer:{
        backgroundColor: 'white',
        padding: 0,
        margin: 0
    },
    image: {
        width: '100%',
        height: 250
    }
})

export default SingleProduct;
