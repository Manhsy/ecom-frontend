import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, Dimensions, View, ScrollView} from 'react-native';
import Swiper from 'react-native-swiper'

var {width} = Dimensions.get('window');

const Banner = ()=>{
    const [bannerData, setBannerData] = useState([]);

    useEffect(()=>{
        setBannerData([
            'https://i0.wp.com/greenpointers.com/app/uploads/2021/05/IMG_3350.jpg?fit=939%2C1025&ssl=1',
            'https://www.simplyrecipes.com/thmb/y5a75hwpNyls6R006MdnYVSzRF0=/605x340/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2009__12__Jaden-Oysters-Grilled-c3754267407d4574a7a8887868a0f158.jpg',
            'https://i.ytimg.com/vi/D2aZkpam2Ms/maxresdefault.jpg'
        ])
        return ()=>{setBannerData([])}
    },[] )

    return (
            <View style = {styles.container}>
                <View style = {styles.swiper}>
                    <Swiper  
                        style = {{height: width/2}}
                        showButtons = {false}
                        autoplay={true}
                        autoplayTimeout={2}>
                        {bannerData.map(item => (
                            <Image 
                                key = {item} 
                                style = {styles.image} 
                                source = {{uri: item}}
                            />
                        ))}
                    </Swiper>
                    <View style = {{height: 20}}></View>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#DCDCDC',
    },
    swiper: {
        width: width,
        alignItems: 'center',
        marginTop: 10
    },
    image: {
        height: width /2, 
        width: width - 40,
        borderRadius: 10, 
        marginHorizontal: 20
    }
})

export default Banner;