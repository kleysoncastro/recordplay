import styled from 'styled-components/native';

import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  margin: 5px 5px;
`;

export const Content = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

export const Record = styled(RectButton)`
  height: 100px;
  margin-bottom: 30px;
`;

export const Play = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-self: stretch;
  margin: 0 50px;
  margin-top: 100px;
`;

export const Recored = styled.View`
  justify-content: space-between;
  align-self: stretch;
  margin: 0 45px;
`;

export const Space = styled.View`
  height: 10px;
`;
