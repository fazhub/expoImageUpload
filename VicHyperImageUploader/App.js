import * as React from 'react';
import { Button, Image, View, Alert, Text, Picker, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBM6gqCO9M2DJbnVKX2pgKR9g8NRJGRTnE",
  authDomain: "vichyperimagestore.firebaseapp.com",
  databaseURL: "https://vichyperimagestore.firebaseio.com",
  projectId: "vichyperimagestore",
  storageBucket: "vichyperimagestore.appspot.com",
  messagingSenderId: "742336376482",
  appId: "1:742336376482:web:6a93d1310a629d1b91f1fb"
}

if (!firebase.apps.length) firebase.initializeApp(config);

export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
    text: 'enter name here              ',
    material: 'Other'
  };
   

  onChooseImagePress = async () => {

    Alert.alert(this.state.material);
    //firebase.initializeApp(ApiKeys.FirebaseConfig);


    
    // let result = await ImagePicker.launchCameraAsync();
    //Alert.alert("launchCameraAsync");
    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      this.uploadImage(result.uri, this.state.text)
        .then(() => {
          Alert.alert("Sucess");
        })
        .catch(error => {
          Alert.alert(error);
        });
    }
  };

  onCameraPress = async () => {
    //firebase.initializeApp(ApiKeys.FirebaseConfig);
    
    let result = await ImagePicker.launchCameraAsync();
    //Alert.alert("launchCameraAsync");
    //let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      this.uploadImage(result.uri, this.state.text)
        .then(() => {
          Alert.alert("Sucess");
        })
        .catch(error => {
          Alert.alert(error);
        });
    }
  };

  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    console.log('LOG ');
    console.log(blob.hasOwnProperty('tag'));

    var ref = firebase
      .storage()
      .ref()
      .child(this.state.material + '/' + imageName);
    return ref.put(blob);
  };

  render() {
    let { image } = this.state;
    

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text
        title="Select material"
        />
        <Picker
          selectedValue={this.state.material}
          style={{ height: 50, width: 200 }}
          onValueChange={(itemValue, itemIndex) => this.setState({ material: itemValue })}>
          <Picker.Item label="Other" value="Other" />
          <Picker.Item label="Glass" value="Glass" />
          <Picker.Item label="Plastic" value="Plastic" />
          <Picker.Item label="Paper" value="Paper" />
          <Picker.Item label="Waste" value="Waste" />
        </Picker>

        <Text
        title="Name Image"
        />

        <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        label='ImageName'
        value={this.state.text}
        onChangeText={text => this.setState({ text })}
        />

        <Text
        title="                   "
        />
        <Text
        title="                   "
        />
        <Text
        title="                   "
        />


        <Button
          title="Pick an image from camera roll"
          onPress={this.onChooseImagePress}
        />
        <Text
        title="                   "
        />
        <Text
        title="                   "
        />
        <Text
        title="                   "
        />
        <Button
          title="Use Camera"
          onPress={this.onCameraPress}
        />
        


        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        if (!result.cancelled) {
      this.uploadImage(result.uri, 'test-image')
        .then(() => {
          Alert.alert('Success');
        })
        .catch(error => {
          Alert.alert(error);
        });
    }
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };


_takeImage = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        if (!result.cancelled) {
      this.uploadImage(result.uri, 'test-image')
        .then(() => {
          Alert.alert('Success');
        })
        .catch(error => {
          Alert.alert(error);
        });
    }
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
}