import React, {Component} from 'react';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {Image, Button} from 'react-native';

import {Container, Content, Record, Play} from './styles';
import mic from '../../../assets/mic.png';

export default class Home extends Component {
  audioRecorderPlayer = new AudioRecorderPlayer();

  onStartRecord = async () => {
    const result = await this.audioRecorderPlayer.startRecorder();
    this.audioRecorderPlayer.addRecordBackListener(e => {
      this.setState({
        recordSecs: e.current_position,
        recordTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.current_position),
        ),
      });
      return;
    });
    console.log(result);
  };

  onStopRecord = async () => {
    const result = await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
    this.setState({
      recordSecs: 0,
    });
    console.log(result);
  };

  onStartPlay = async () => {
    console.log('onStartPlay');
    const msg = await this.audioRecorderPlayer.startPlayer();
    console.log(msg);
    this.audioRecorderPlayer.addPlayBackListener(e => {
      if (e.current_position === e.duration) {
        console.log('finished');
        this.audioRecorderPlayer.stopPlayer();
      }
      this.setState({
        currentPositionSec: e.current_position,
        currentDurationSec: e.duration,
        playTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.current_position),
        ),
        duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      });
      return;
    });
  };

  onPausePlay = async () => {
    await this.audioRecorderPlayer.pausePlayer();
  };

  onStopPlay = async () => {
    console.log('onStopPlay');
    this.audioRecorderPlayer.stopPlayer();
    this.audioRecorderPlayer.removePlayBackListener();
  };

  render() {
    return (
      <Container>
        <Content>
          <Record>
            <Image source={mic} style={{width: 100, height: 100}} />
          </Record>
          <Play>
            <Button title="Play" onPress={this.onStartRecord} />
            <Button title="Pouse" />
            <Button title="Parar" onPress={this.onStopRecord} />
          </Play>
        </Content>
      </Container>
    );
  }
}
