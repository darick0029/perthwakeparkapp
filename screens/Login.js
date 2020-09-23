import React, { useState, Component } from 'react';
import { StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { View, Text, Container, Form, Item, Label, Input, Button } from 'native-base';
import axios from 'axios';



export class Login extends Component {

    constructor() {
        super();
        this.state = {
            userName: '',
            userPassword: '',
            validationToken: '',
            userID: '',
            loading: false,
            loginMessage:'',
        }
    }

    validate_fields = ()=> {
        if( this.state.userName == '' ) {
            alert('Please insert your user name');
            return false;
        } 
        else if( this.state.userPassword == '' ) {
            alert('Please insert your password');
            return false;
        }         
        else {
            return true;
        }                   
    }    

    clearFields = ()=> {
        this.setState({ userName: '' }); 
        this.setState({ userPassword: '' });          
    }

    api_login = ()=> {

        if( this.validate_fields() ) {

            this.setState({ loading: true });

            // Request Authentication Token
            axios
            .post('https://stage.perthwakepark.com.au/wp-json/jwt-auth/v1/token', {
                username: this.state.userName,
                password: this.state.userPassword,
            })
            .then( res => {
                this.setState({ userID: res.data.data.id }); 
                
                if( res.data.success == true ) {
                    //this.setState({ loginMessage: res.data.message }); 
                    this.clearFields();
                    this.props.navigation.navigate('WaiverVideo', {
                        userID: this.state.userID
                    });                      
                }  
                else {
                    if( res.data.code === 'incorrect_password') {
                        alert('Incorrect Password!');  
                        this.setState({ userPassword: '' });
                    }
                    else if( res.data.code === 'invalid_email' ) {
                        alert('Username does not exist');
                        this.clearFields();
                    }   
                    else {
                        return true;
                    }            
                }  
                this.setState({ loading: false });
             
            })
            .catch( err => console.log( err ));
        }
  
    }

    render() {

        return(   

            <ScrollView>
                <Container style={ styles.formContainter } >
    
                    <View style={ styles.logo } >
                        <Image source={ require('../assets/pwp-logo.png') } />
                    </View>          
    
                    <View style={styles.rfContainer}>
                        <Form styles={ styles.registrationForm } >             
                            <Item stackedLabel>
                                <Label>Username</Label>
                                <Input
                                    value = { this.state.userName }
                                    onChangeText = {
                                        stateValue => {
                                            this.setState({ userName: stateValue });
                                        }
                                    }
                                />
                            </Item>               
                            <Item stackedLabel>
                                <Label>Password</Label>
                                <Input 
                                    value = { this.state.userPassword }
                                    onChangeText = {
                                        stateValue => {
                                            this.setState({ userPassword: stateValue})
                                        }
                                    }
                                    secureTextEntry= { true }                      
                                />
                            </Item>
    
                            <Button 
                                id='submit'
                                onPress = {
                                    (e) => {
                                        e.preventDefault();
                                        this.api_login();
                                    }
                                }
                                style={ styles.formButton } 
                            >
                                <Text>Login</Text>
                            </Button>                
                        </Form>
                        
                    </View>

                    <View>
                            { this.state.loading ?  <ActivityIndicator size = "large" style={{ marginTop: 50 }} /> : <View><Text style={styles.loading}>{ /*this.state.loginMessage*/ }</Text></View> }
                    </View>
    
                </Container>
            </ScrollView>  
        
        );
    }
}


// const Login = ( props, route )=> {

// }



const styles = StyleSheet.create({
    formContainter: {
        display: 'flex',
        paddingRight: 15,
        paddingBottom: 100,
        justifyContent: 'center',
    },
    rfContainer: {
        width: '100%',
        maxWidth: '85%',
        alignSelf: 'center'
    },
    formButton: {
        width: 300,
        marginTop: 25,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    logo: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        marginBottom: 15
    },
    linkColor: {
        color: '#04cbfa',
    },
    loading: {
        marginTop: 20,
        alignSelf: "center",
    }
});


export default Login;