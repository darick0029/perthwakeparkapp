import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Button } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';

const HomeScreen = ( props ) => {

    //console.log( props );

    return(

        <View style={styles.buttonWrapView} >

            <Button
                onPress = {
                    () => {
                        props.navigation.navigate('Registration');
                    }
                }
                style={ styles.buttonLink }
            >
                <Text>Registration</Text>
            </Button>

            <Button
                onPress = {
                    ()=> {
                        props.navigation.navigate( 'ImageList', {
                            name: 'Darick',
                            age: 37,
                            ImageListTitle: 'List Image'
                        });
                    }
                }
                style={ styles.buttonLink }
            >
                <Text>Image List</Text>
            </Button>

            <Button
                onPress = {
                    ()=> {
                        props.navigation.navigate('StateExample');
                    }
                }
                style={ styles.buttonLink }
            >
                <Text>State Examples</Text>
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

export default HomeScreen;