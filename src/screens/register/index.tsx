import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useUser} from '../../entities/user';
import {ScreenName, useNavigation} from '../../shared/lib/use-navigation.ts';

export function RegisterScreen(): React.JSX.Element {
  const {updateUserData, userData} = useUser();
  const {navigate} = useNavigation();

  const [avatarUri, setAvatarUri] = useState('');
  const [username, setUsername] = useState('');

  const handleImageSelection = () => {
    launchImageLibrary({selectionLimit: 1, mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('Image selection cancelled');
      } else if (response.errorCode) {
        console.log('ImagePicker Error:', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedUri = response.assets[0].uri;
        if (selectedUri) setAvatarUri(selectedUri);
      }
    });
  };

  const canProceed = Boolean(username || avatarUri);

  const resetForm = () => {
    setAvatarUri('');
    setUsername('');
  };

  const completeRegistration = async () => {
    if (!userData) return;
    await updateUserData({
      ...userData,
      nickname: username,
      avatar: avatarUri,
      isOnboarded: true,
    });
    navigate(ScreenName.Reward);
  };

  return (
    <ImageBackground
      source={require('../../shared/assets/images/mainmenubg.jpeg')}
      style={styles.background}>
      <SafeAreaView style={styles.container}>
        <View style={styles.formSection}>
          <TouchableOpacity
            style={styles.imageButton}
            activeOpacity={0.8}
            onPress={handleImageSelection}>
            <Image
              style={avatarUri ? styles.avatarImage : styles.placeholderImage}
              source={
                avatarUri
                  ? {uri: avatarUri}
                  : require('../../shared/assets/images/imageplaceholder.png')
              }
            />
          </TouchableOpacity>

          <View style={styles.inputSection}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholderTextColor="#f2f2f2"
              style={styles.inputField}
              placeholder="Enter your username"
            />
            <TouchableOpacity style={styles.resetButton} onPress={resetForm}>
              <Text style={styles.buttonLabel}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={completeRegistration}>
          <Text style={styles.buttonLabel}>
            {canProceed ? 'Complete' : 'Skip'} Registration
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    padding: 20,
    paddingBottom: 24,
    paddingTop: 28,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  formSection: {
    gap: 23,
  },
  imageButton: {
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  placeholderImage: {
    width: 200,
    height: 200,
    borderRadius: 500,
  },
  avatarImage: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 500,
  },
  inputSection: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#00A8E8',
  },
  label: {
    fontFamily:'Montserrat-Regular',
    fontSize: 24,
    color: 'white',
  },
  inputField: {
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 18,
    backgroundColor: '#00A8E8',
    color: 'white',
    borderWidth: 2,
    borderColor: 'white',
    height: 50,
    fontSize: 24,
    lineHeight: 30.34,
  },
  resetButton: {
    width: 200,
    height: 50,
    marginRight: 'auto',
    marginTop: 10,
    marginLeft: 'auto',
    backgroundColor: 'rgb(245,132,121)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },
  submitButton: {
    backgroundColor: '#FF6F61',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    height: 79,
  },
  buttonLabel: {
    fontFamily:'Montserrat-Bold',
    fontSize: 24,
    lineHeight: 30.34,
    color: 'white',
  },
});
