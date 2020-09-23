import React, { useState, Component } from 'react';
import { StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { View, Text, Container, Form, Item, Label, Input, Card, Textarea, Button, Root } from 'native-base';
//This will fix the font error for android when using native base
import * as Font from 'expo-font';
import axios from 'axios';



export class Registration extends Component {

    constructor() {

        super();
        this.state = {
            userFirstName:   '',
            userLastName:   '',
            userEmail:  '',
            userPassword: '',
            confirmPassword: '',
            validationToken: '',
            userID: '',
            loading: true,
            regLoading: false,
        }
    }

    async componentDidMount() {

        await Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf"),
          });
          this.setState({ loading: false });  

        // Request Authentication Token
        axios
        .post('https://stage.perthwakepark.com.au/wp-json/jwt-auth/v1/token', {
            username:'',
            password: ''
        })
        .then( res => {
            this.setState({ validationToken: res.data.data.token  })             
        })
        .catch( err => console.log( err ));          
          
                
    }    

    validate_fields = ()=> {
        if( this.state.userFirstName == '' ) {
            alert('Please insert your first name');
            return false;
        } 
        else if( this.state.userLastName == '' ) {
            alert('Please insert your last name');
            return false;
        }         
        else if( this.state.userEmail == '' ) {
            alert('Please insert your email');
            return false;
        } 
        else if( this.state.userPassword == '' ) {
            alert('Please insert your password');
            return false;
        } 
        else {
            this.setState({ regLoading: true });
            return true;
        }                   
    }

    wp_rest_api_call = ()=> {
        if( this.validate_fields() ) {

            //Start Axios send data to Wordpress Rest API
            var data = new FormData();
            data.append('first_name', this.state.userFirstName );
            data.append('last_name', this.state.userLastName );
            data.append('email', this.state.userEmail );
            data.append('name', this.state.userFirstName + ' ' +this.state.userLastName);
            data.append('username', this.state.userEmail );
            data.append('password', this.state.userPassword );
            data.append('roles', 'wpc_client');
    
            var config = {
            method: 'post',
            url: 'https://stage.perthwakepark.com.au/wp-json/wp/v2/users/',
            headers: { 
                'Authorization': 'Bearer ' + this.state.validationToken,
            },
            data : data
            };
    
            axios(config)
            .then( res => {
                console.log( res.data.id)
                this.setState({ userID: res.data.id })
                console.log( res.message )

                // TODO: Clear the fields
                this.setState({ userFirstName: '' });
                this.setState({ userLastName: '' });
                this.setState({ userEmail: '' });
                this.setState({ userPassword: '' });
                this.setState({ confirmPassword: '' });

                // After clearing the fields Redirect to Waiver Video
                this.setState({ regLoading: false });
                this.props.navigation.navigate('WaiverVideo', {
                    userID: this.state.userID
                });
            })
            .catch( error => {
                this.setState({ regLoading: false });
                this.setState({ userEmail: '' });
                alert('Email already exists!');
            })
            //End Axios send data to Wordpress Rest API           
        }
    }

    render() { 
        if (this.state.loading) {
            return <ActivityIndicator />;
          }        
        return (
            <ScrollView>
                <Container style={ styles.formContainter } >
                <View style={styles.logo} >
                    <Image source={require('../assets/pwp-logo.png')} />
                </View>

                <View style={styles.rfContainer}>

                    <Form styles={styles.registrationForm} >

                        <Item stackedLabel>
                            <Label>First Name</Label>
                            <Input
                                value = { this.state.userFirstName }
                                onChangeText={
                                    (stateValue) => {
                                        this.setState({ userFirstName: stateValue })
                                    }
                                }
                                placeholder='' 
                            />
                        </Item>

                        <Item stackedLabel>
                            <Label>Last Name</Label>
                            <Input
                                value = { this.state.userLastName }
                                onChangeText={
                                    (stateValue) => {
                                        this.setState({ userLastName: stateValue })
                                    }
                                }
                                placeholder=''
                            />
                        </Item>

                        <Item stackedLabel>
                            <Label>Email</Label>
                            <Input
                                value = { this.state.userEmail }
                                onChangeText={
                                    (stateValue) => {
                                        this.setState({ userEmail: stateValue })
                                    }
                                }
                                placeholder='eg. johndoe@youremail.com'
                            />
                        </Item>

                        <Item stackedLabel>
                            <Label>Password</Label>
                            <Input
                                value = { this.state.userPassword }
                                onChangeText={
                                    (stateValue) => {
                                        this.setState({ userPassword: stateValue })
                                    }
                                }
                                placeholder=''
                                secureTextEntry={true}
                            />
                        </Item>

                        <Item stackedLabel>
                            <Label>Confirm Password</Label>
                            <Input
                                value = { this.state.confirmPassword }
                                onChangeText={
                                    (stateValue) => {
                                        this.setState({ confirmPassword: stateValue })
                                    }
                                }
                                placeholder=''
                                secureTextEntry={true}
                            />
                        </Item>                        

                        <View>
                            {this.state.regLoading ? <ActivityIndicator size="large" style={{ marginTop: 50 }} /> : <View><Text style={styles.loading}>{this.state.loginMessage}</Text></View>}
                        </View>                        

                        <Button
                            id='submit'
                            onPress={
                                (e) => {
                                    e.preventDefault();

                                    console.log( this.state.userFirstName );
                                    console.log( this.state.userLastName );
                                    console.log( this.state.userEmail );
                                    console.log( this.state.userPassword );
                                    console.log( this.state.confirmPassword );

                                    console.log( this.state.validationToken );


                                    if( this.state.userPassword === this.state.confirmPassword) {
                                        console.log('match');
                                    } else {
                                        alert('Password not match! Make sure Confirm Password is the same with Password');
                                        this.setState({ confirmPassword: '' });
                                        return false;
                                    }                                    

                                    this.wp_rest_api_call();

                                }
                            }
                            style={styles.formButton}
                        >
                            <Text>Register</Text>
                        </Button>

                    </Form>

                    <Text
                        style={styles.haveAccountLink} 
                        onPress={() => this.props.navigation.navigate('Login')}>
                        Already Have an Account? <Text style={styles.linkColor} >Click Here</Text>
                    </Text>

                </View>
                </Container>
            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    formContainter: {
        display: 'flex',
        paddingRight: 15,
        paddingBottom: 50,
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
    haveAccountLink: {
        marginTop: 50,
        textAlign: 'center'
    }
});


export default Registration;