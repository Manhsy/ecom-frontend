import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image, Button} from 'react-native'

var {width} = Dimensions.get('window');

const ProductCard = (props)=>{
    const {name, price, image, countInStock} = props;

    return(
        <View style = {styles.container}>
            <Image 
                style = {styles.image}
                resizeMode = 'contain'
                source= {{uri: image.length>0? image: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F13%2F2015%2F04%2F05%2Ffeatured.jpg&q=85'}}
            />
            <View style = {styles.card}/>
            <Text style = {styles.title}>
                {name.length > 15? name.substring(0, 15 -3)+ '...': name}
            </Text>
            <Text style = {styles.price}>
                ${price}
            </Text>
            {countInStock > 0? (
                <View style = {{marginBottom: 60}}>
                    <Button title = {'Add'} color = {'green'} />
                </View>
            ): <Text style = {{marginTop: 20}}>Currently Unavailable</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: width / 2 - 20,
        height: width /  1.7,
        padding: 10,
        borderRadius: 10,
        marginTop: 55,
        marginBottom: 5,
        marginLeft: 10,
        alignItems: 'center',
        elevation: 8,
        backgroundColor: 'white'
    },
    image:{
        width: width/2 - 20 - 10,
        height: width/2 - 20 - 30,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: -45
    },
    card: {
        marginBottom: 10,
        width: width /2 -20-10,
        backgroundColor: 'transparent',
        height: width / 2 - 20 - 90
    },
    title:{
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center',
    },
    price: {
        fontSize: 20,
        color: 'orange', 
        marginTop: 10
    }
})
export default ProductCard;