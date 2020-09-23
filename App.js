import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, View, Text } from 'native-base';
import { Video } from 'expo-av';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreens';
import ImageList from './screens/ImageList';
import StateExample from './screens/StateExamples';
import Registration from './screens/Registration';
import Login from './screens/Login';
import AddWaiver from './screens/AddWaiver';


const Stack = createStackNavigator(); 

const App = () => {
  return(
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Registration">

                <Stack.Screen
                  name = "Registration"
                  component = { Registration }
                  options = {{ title: "" }}
                />
                <Stack.Screen 
                  name = 'Login'
                  component = { Login }
                  options = {{ title: '' }}
                />                  
                <Stack.Screen 
                  name = 'WaiverVideo'
                  component = { WaiverVideo }
                  options = {{ title: '' }} 
                />  
                <Stack.Screen 
                  name = 'AddWaiver'
                  component = { AddWaiver }
                  options = {{ title: '' }} 
                />                   
 
                { 
                  //Below this are my learning and testing purposes navigations
                }
                <Stack.Screen 
                    name = 'HomeScreen'
                    component = { HomeScreen } 
                    options = {{ title: "Home Screen" }}
                />                 
                <Stack.Screen 
                  name = 'StateExample'
                  component = { StateExample }
                  options = {{ title: 'State Examples' }}
                /> 
                <Stack.Screen 
                    name = 'ImageList'
                    component = { ImageList } 
                    options = { 
                      ({ route }) => ({ title: route.params.ImageListTitle, headerStyle: { backgroundColor: 'gold' }, headerTintColor: 'white', headerTitleStyle: { fontWeight: 'bold' } })
                    }
                />   
                              
          </Stack.Navigator>
      </NavigationContainer>
  );
}

const WaiverVideo = ( props )=> {
  
  const [userID, stateUserName ] = useState( props.route.params.userID );

  return (
      <View style={ styles.videoContainer } >

          <Video
              source={{ uri: 'https://stage.perthwakepark.com.au/wp-content/uploads/2020/08/waiver-video.mp4' }}
              rate={1.0}
              volume={10.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay
              //isLooping
              style={{                 aspectRatio: 1.5,
                width: "100%" }}
          />

          <Button
                full
                onPress={
                  () => {
                    props.navigation.replace('AddWaiver', {
                      userID: userID,
                    });
                  }
                }
                style={ styles.formButton }
          >
              <Text>Add Waiver</Text>
          </Button>

      </View>

  )

}


const styles = StyleSheet.create({
  videoContainer: {
      display: 'flex',
  },
  formButton: {
      width: 300,
      marginTop: 25,
      alignSelf: 'center',
      justifyContent: 'center',
      borderRadius: 5,
  }
});

export default App;