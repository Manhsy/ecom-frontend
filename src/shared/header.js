import React from 'react';
import { StyleSheet, Image, SafeAreaView , View} from 'react-native';

const header = ()=>{
    return(
        <SafeAreaView style = {styles.header}>
            <Image
                source = {require('../../assets/header.jpeg')}
                resizeMode = 'contain'
                style = {{height: 90}}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        // marginTop: 50
    }
})

export default header;