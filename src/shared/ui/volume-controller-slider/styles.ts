import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 0,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 57,
    height: 57,
    backgroundColor: '#01506e',
    borderRadius: 39,
  },
  leftButton: {
    left: 0,
    zIndex: 1,
  },
  buttonText: {
    lineHeight: 40,
    fontSize: 40,
    color: 'white',
  },

  scroller: {
    paddingLeft: 30,
    paddingRight: 30,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
  },

  containerStyle: {
    width: '100%',
    alignSelf: 'center',
    minHeight: 43,
    height: 43,
    backgroundColor: 'rgba(23, 19, 34, 1)',
    borderRadius: 39,
  },
  minimumTrackStyle: {
    maxHeight: 35,
    height: 35,
    borderRadius: 39,
    backgroundColor: '#FF6F61',
  },
  trackStyle: {
    backgroundColor: 'transparent',
  },
  thumbStyle: {backgroundColor: 'transparent'},
});
