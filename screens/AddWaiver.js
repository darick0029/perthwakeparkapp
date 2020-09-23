import React, { Component } from 'react';
import { StyleSheet, ScrollView, Image } from 'react-native';
import { View, Text, Button, Container, Form, Item, Input, Content, Label } from 'native-base';
import DateTimePickerModal from "react-native-modal-datetime-picker";
//This will fix the font error for android when using native base
import * as Font from 'expo-font';

export class AddWaiver extends Component {

    constructor() {
        super();
        this.state = {
            visibility: false,
            DateDisplay: '',
        }
    }

    handleConfirm = (date) => {
        this.setState({ DateDisplay: date.toDateString() });
        this.setState({ visibility: false });
    }

    onPressCancel = () => {
        this.setState({ visibility: false });
    }

    onPressButton = () => {
        this.setState({ visibility: true });
    }

    render() {

        // console.log( props );
        // console.log( props.route.params.userID );
        return (

            <ScrollView>

                <View style={styles.formContainter} >

                    <View style={styles.rfContainer} >

                        <View style={styles.logo} >
                            <Image source={require('../assets/pwp-logo.png')} />
                        </View>

                        <View style={styles.waiverTextWrap}>
                            <Text style={styles.waiverText}>
                                All riders must complete a Waiver after watching the safety video before
                                using the Park. Riders under the age of 18 must have a Waiver signed by a parent or legal guardian.
                            </Text>

                            <Text style={styles.waiverDetails} >
                                THESE ARE THE DETAILS OF THE PERSON SIGNING THE WAIVER.  A MINOR IS ADDED BELOW.
                            </Text>
                        </View>


                        <Form styles={styles.registrationForm} >

                            <View style={styles.twoColWrap} >

                                <Item
                                    style={styles.twoColLeft}
                                    stackedLabel
                                >
                                    <Label>First Name</Label>
                                    <Input
                                        placeholder=""
                                    />
                                </Item>

                                <Item
                                    style={styles.twoColRight}
                                    stackedLabel
                                >
                                    <Label>Last Name</Label>
                                    <Input
                                        placeholder=""
                                    />
                                </Item>

                            </View>


                            <View>
                                <Item
                                    stackedLabel
                                >
                                    <Label>Date of birth</Label>
                                    <Input
                                        showSoftInputOnFocus={false}
                                        value={this.state.DateDisplay}
                                        onFocus={this.onPressButton}
                                    />
                                </Item>
                                <Text style={{ marginTop: 15, marginBottom: 20, lineHeight: 26 }}>You must be 18 years old to sign this waiver. A parent or guardian can do this for you by creating an account themselves and adding you as minor.</Text>
                                <DateTimePickerModal
                                    //maximumDate={new Date(1990, 10, 20)}
                                    isVisible={this.state.visibility}
                                    onConfirm={this.handleConfirm}
                                    onCancel={this.onPressCancel}
                                    mode="date"
                                />

                                <Item
                                    style={ styles.formMargin }
                                    stackedLabel
                                >
                                    <Label>Phone</Label>
                                    <Input
                                        keyboardType='phone-pad'
                                    />
                                </Item> 

                                <Item
                                    style={ styles.formMargin }
                                    stackedLabel
                                >
                                    <Label>Postal / ZIP </Label>
                                    <Input
                                        keyboardType='number-pad'
                                    />
                                </Item>                                

                            </View>

                        </Form>

                    </View>

                </View>
            </ScrollView>

        );
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
        marginTop: 30,
        marginBottom: 25
    },
    linkColor: {
        color: '#04cbfa',
    },
    waiverTextWrap: {
        backgroundColor: '#04cbfa',
        padding: 20,
        marginBottom: 35,
    },
    waiverText: {
        fontWeight: '700',
        color: '#fff',
        fontSize: 20,
        lineHeight: 34,
        marginBottom: 20,
    },
    waiverDetails: {
        color: '#fff',
    },
    twoColWrap: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 20,
    },
    twoColLeft: {
        width: '49%'
    },
    twoColRight: {
        width: '49%',
        marginLeft: 'auto'
    },
    formMargin: {
        marginBottom: 20,
    }
});

export default AddWaiver;