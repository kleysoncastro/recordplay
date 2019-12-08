import React, {Component} from 'react';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {Image, Button, Text} from 'react-native';

import {Container, Content, Record, Play, Recored, Space} from './styles';
import mic from '../../../assets/mic.png';

export default class Home extends Component {
  state = {recordSecs: 0, playTime: 0};

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
    const {recordTime, playTime} = this.state;
    return (
      <Container>
        <Content>
          <Record>
            <Image source={mic} style={{width: 100, height: 100}} />
          </Record>

          <Text>{recordTime ? recordTime : '000:000'}</Text>
          <Space />
          <Recored>
            <Button title="Record" onPress={this.onStartRecord} />
            <Space />
            <Button title="Stop" onPress={this.onStopRecord} />
          </Recored>
          <Space />
          <Text>{playTime ? playTime : '000:000'}</Text>
          <Space />

          <Play>
            <Button title="Play" onPress={this.onStartPlay} />
            <Button title="Pouse" onPress={this.onPausePlay} />
            <Button title="Parar" onPress={this.onStopPlay} />
          </Play>
        </Content>
      </Container>
    );
  }
}
