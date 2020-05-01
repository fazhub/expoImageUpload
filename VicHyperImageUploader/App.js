import * as React from 'react';
import { Button, Image, View, Alert, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAGkmZQ8kNRteFCWlRYIbXFfv_DPDtAOVw",
    authDomain: "uploadimages-9e431.firebaseapp.com",
    databaseURL: "https://uploadimages-9e431.firebaseio.com",
    projectId: "uploadimages-9e431",
    storageBucket: "uploadimages-9e431.appspot.com",
    messagingSenderId: "580148386923",
    appId: "1:580148386923:web:d3ccbd005ebe250deb652e"
}

if (!firebase.apps.length) firebase.initializeApp(config);

export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
  };

  onChooseImagePress = async () => {
    //firebase.initializeApp(ApiKeys.FirebaseConfig);
    
    // let result = await ImagePicker.launchCameraAsync();
    //Alert.alert("launchCameraAsync");
    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      this.uploadImage(result.uri, 'test-image')
        .then(() => {
          Alert.alert('Success');
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
      .child('images/' + imageName);
    return ref.put(blob);
  };

  render() {
    let { image } = this.state;
    

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
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
          onPress={this._takeImage}
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