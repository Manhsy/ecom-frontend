import React from 'react';
import {StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import {ListItem, Badge, Text} from 'native-base'
const CategoryFilter = (props)=>{
    const {categories, categoryFilter, productCategory, active, setActive} = props;

    return (
        <ScrollView
            bounces = {true}
            horizontal = {true}
            style = {{backgroundColor: '#f2f2f2'}}>
            <ListItem style = {{margin: 0, padding: 0, borderRadius: 0}}>
                <TouchableOpacity
                    key = {1}
                    onPress = {()=>{
                        categoryFilter('all'), 
                        setActive(-1)}}>
                    <Badge 
                        style = {[styles.center, {margin: 5}, active == -1 ? styles.active: styles.inactive ]}>
                        <Text style = {{color: 'white'}}>All</Text>
                    </Badge>
                </TouchableOpacity>
               
                {categories.map((item)=>(
                    <TouchableOpacity
                        key = {item._id.$oid}
                        onPress = {()=>{
                            categoryFilter(item._id.$oid), 
                            setActive(categories.indexOf(item))}}>
                        <Badge style = {[styles.center, {margin: 5}, active == categories.indexOf(item) ? styles.active: styles.inactive ]}>
                            <Text style = {{color: 'white'}}>{item.name}</Text>
                        </Badge>
                    </TouchableOpacity>
                ))}
            </ListItem>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    active: {
        backgroundColor: '#03bafc'
    },
    inactive: {
        backgroundColor: '#a0e1eb'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default CategoryFilter