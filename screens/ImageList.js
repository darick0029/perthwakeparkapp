import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, View, Text } from 'native-base';

const ImageList = ({ props, route, navigation })=> {

    // console.log( route );
    // console.log( navigation );

    const { name, age } = route.params;

    return(
        <View style={ styles.buttonWrapView } >
            <Text>Image List Here!</Text>

            <Button
                onPress = {
                    ()=> {
                        navigation.setOptions({ title: 'Updated!' })
                    }
                }
                style={ styles.buttonLink }
            >
                <Text>Update Title</Text>
            </Button>

            <Button
                onPress = {
                    ()=> {
                        navigation.goBack()
                    }
                }
                style={ styles.buttonLink }
            >
                <Text>Go Back { name }</Text>
            </Button>

        </View>
    );
}

const styles = StyleSheet.create({
    buttonWrapView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',    
        flexDirection: 'column',    
    },
    buttonLink: {     
        marginTop: 15, 
        alignSelf: 'center'  
    }
 });

export default ImageList;


/* 
    Note: Passing Parameters to route will be usable for me to assign the user id after registration for PWP App. 
    I might be able to use it as a params to the add waiver video directly or maybe i can use it in State to hold the data.
*/