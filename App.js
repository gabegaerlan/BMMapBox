import React, {Component} from 'react';
import {View} from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

ACCESS_TOKEN = // YOUR TOKEN HERE

MapboxGL.setAccessToken(ACCESS_TOKEN);

const montereyBayCoordinates = [
    -121.796796, 36.652451
];

export default class App extends Component<{}> {
  render () {
    return (
      <View style={{flex: 1}}>
          <MapboxGL.MapView
          ref={(c) => this._map = c}
          style={{flex: 1}}
          zoomLevel={10}
          centerCoordinate={montereyBayCoordinates}>
        </MapboxGL.MapView>
      </View>
      );
  }
}
