import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Button, Form, Input, Item } from 'native-base';


const StateExample = ()=> {

    // Counter State
    const [ counter, setCounter ] = useState(0);

    return(

        <View style={ styles.counterWrap }>
            <Text style={{ marginTop: 25, marginBottom: 25, fontSize: 20, fontWeight: 'bold' }}>
                Counter State Example
            </Text>
            <Button 
                onPress = {
                    () => {
                        setCounter( counter + 1);
                        console.log('Increase');
                    }
                }
                style={ styles.CounterButtons }
            >
                <Text style={{ width: 300, textAlign: 'center' }} >Increase</Text>
            </Button>
            <Button
                onPress = {
                    () => {
                        if( counter > 0 ) {
                            setCounter( counter - 1);
                            console.log('Decrease');
                        } else {
                            alert( 'Cannot be less than 0' );
                        }
                    }
                }            
                style={ styles.CounterButtons }
            >
                <Text style={{ width: 300, textAlign: 'center' }}>Decrease</Text>
            </Button>  
            <Text>
                Current Count: { counter }
            </Text>   

            <Text style={{ marginTop: 35, marginBottom: 25, fontSize: 20, fontWeight: 'bold' }}>
                Color State Changer
            </Text>     

            <Button
                onPress = {
                    () => {
                        
                    }
                }
                style={ styles.CounterButtons }
            >
                <Text>Add Color</Text>
            </Button>       

        </View>



    );

}


const styles = StyleSheet.create({ 
    counterWrap: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        flexDirection: 'column'
    },
    CounterButtons: {
        alignSelf: 'center',
        marginBottom: 15,
    }
});

export default StateExample;