import React from 'react';
import {View, StyleSheet, Dimensions, FlatList} from 'react-native';
import {Container, Left, Body, ListItem, Thumbnail, Text} from 'native-base';

var {width} = Dimensions.get("window")

const SearchedProduct = (props) => {
    const { productFiltered } = props;
    return(
        <Container style={{ width: width }}>
            {productFiltered.length > 0 ?  (
                productFiltered.map((item) => (
                    <ListItem
                        key={item._id.$oid}
                        avatar
                    >
                        <Left>
                            <Thumbnail 
                                source={{uri: item.image ? 
                                    item.image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
                                        }}
                            />
                        </Left>
                        <Body>
                            <Text>{item.name}</Text>
                            <Text note>{item.description}</Text>
                        </Body>
                    </ListItem>
                ))
            ) : (
                <View style={styles.center}>
                    <Text style={{ alignSelf:  'center' }}>
                        No products match the selected criteria
                    </Text>
                </View>
            )}
        </Container>
    );
};

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100
    }
})

export default SearchedProduct;