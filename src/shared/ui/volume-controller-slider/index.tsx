import {Text, TouchableHighlight, View} from 'react-native';
import {Slider as VolumeSlider} from '@miblanchard/react-native-slider';

import {styles} from './styles.ts';
import {FC} from 'react';

interface Props {
  value: number;
  maximumValue: number;
  minimumValue: number;
  step: number;
  setVolumeLevel: (value: number) => void;
  lowerVolume: () => void;
  raiseVolume: () => void;
}

export const VolumeControlSlider: FC<Props> = ({
  value,
  maximumValue,
  minimumValue,
  step,
  setVolumeLevel,
  lowerVolume,
  raiseVolume,
}) => {
  const handleVolumeChange = ([newValue]: number[]) => {
    setVolumeLevel(newValue);
  };

  return (
    <View style={styles.scroller}>
      <TouchableHighlight
        underlayColor="#171322"
        onPress={lowerVolume}
        style={[styles.button, styles.leftButton]}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableHighlight>

      <VolumeSlider
        disabled
        onValueChange={handleVolumeChange}
        containerStyle={styles.containerStyle}
        trackStyle={styles.trackStyle}
        minimumTrackStyle={styles.minimumTrackStyle}
        thumbStyle={styles.thumbStyle}
        value={value}
        maximumValue={maximumValue}
        minimumValue={minimumValue}
        step={step}
      />

      <TouchableHighlight
        underlayColor="#171322"
        onPress={raiseVolume}
        style={styles.button}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableHighlight>
    </View>
  );
};
