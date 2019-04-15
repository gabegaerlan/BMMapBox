Date: 4/12/19

This file will cover in detail what steps need to be taken in order to use MapBox for React Native.

The React Native project was created using the React Native CLI version specified below:
react-native-cli: 2.0.1

The project itself is called 'BMMapBox' and is the React Native Project version specified below:
react-native: 0.59.4



1. 	Initialize the project, install npm, and install MapBox using npm:

	$ react-native init BMMapBox
	$
	$ cd BMMapBox
	$
	$ install npm
	$
	$ npm install @mapbox/react-native-mapbox-gl/





2. Configure platform specific settings:


*** iOS ***

I.    	Open the 'BMMapBox.xcodeproj' file in Xcode. This file is located in the project folder in the 'iOS' subfolder. Click on the project folder in the top left of the Xcode window.

II.   	In the 'General' tab of the project folder, find and click the dropdown for 'Embedded Binaries'. Add a new binary by clicking on the '+' and select 'Add Other'. Go to the parent folder for the 

	project and then go to:		node_modules --> @mapbox --> react-native-mapbox-gl --> ios		then select and open 'Mapbox.framework'. Check the 'Copy items if needed option' and click 	
	Finish.

III. 	Right click on the 'Libraries' sub folder in Xcode and select the option 'Add Files to'. Go to the parent folder for the project and then go to		

	node_modules --> @mapbox --> react-native-mapbox-gl --> iOS		then select 'RCTMGL.xcodeproj' and click add.

IV.	In the 'Build Phases' tab of the XCode project folder, click on the dropdown for 'Link Binary With Libraries'. Click on the '+' and in the search box of the window that appears, search for

	'libRCTMGL.a' and click 'Add'.

V.	Go to the 'Build Settings' tab of the Xcode project folder and type 'FRAMEWORK SEARCH PATHS' in the search bar. Double click on the path that appears and press the '+' to add this path:

	$(PROJECT_DIR)/../node_modules/@mapbox/react-native-mapbox-gl/ios
	
	Make sure the 'non-recursive' option is selected.

VI.	In the 'Build Phases' tab, click the '+' to add a new run script phase. Click on the dropdown for the newly created run script section and add the following line inside of the shell:

	"${BUILT_PRODUCTS_DIR}/${FRAMEWORKS_FOLDER_PATH}/Mapbox.framework/strip-frameworks.sh"


*** Android ***

I.	Open Android Studio and click 'Import Project (Gradle, Eclipse ADT, etc.)' to import the 'BMMapBox' project folder. Let Android Studio attempt to sync the project and update to the newest version 
	
	of Gradle when prompted. Install any build tools if necessary.

II.	Open an android device emulator and run

	$ react-native run-android

	to see if the default app works so far. If the build succeeds but a 

	'/bin/sh: adb: not found'

	can be found in the process of building, then the 'platform-tools' path needs to be added to $PATH. Do this by running this command:

	$ export PATH="/Users/<your user>/Library/Android/sdk/platform-tools":$PATH

III.	Open the 'BMMapBox' project folder in a code editor. Open the 'build.gradle' file in the 'android' folder of the project. Add this line in the repositories section of the code:

	maven { url "https://jitpack.io" }

IV.	In the 'build.gradle' file located in the 'app' folder, add this line to the dependencies:

	implementation project(':mapbox-react-native-mapbox-gl')

V.	In the same 'build.gradle' file, check to make sure that 'buildToolsVersion', 'compileSdkVersion', and 'targetSdkVersion' all have values greater than "26".


VI.	In the 'settings.gradle' file of the project, copy and paste these lines at the end of the file:

	include ':mapbox-react-native-mapbox-gl'
	project(':mapbox-react-native-mapbox-gl').projectDir = new File(rootProject.projectDir, '../node_modules/@mapbox/react-native-mapbox-gl/android/rctmgl')

VII.	In the 'MainApplication.java' file, add this import statement:

	import com.mapbox.rctmgl.RCTMGLPackage;

	Modify the return statement of the 'getPackages' function to include this line:

	new RCTMGLPackage()

IX.	Navigate to	node_modules --> @mapbox --> react-native-mapbox-gl --> android --> rctmgl	and open the 'build.gradle' file. Replace the contents of that file with this:

apply plugin: 'com.android.library'

android {
    compileSdkVersion 28
    buildToolsVersion '28.0.3'

    defaultConfig {
        minSdkVersion 16
        targetSdkVersion 28
        versionCode 1
        versionName "1.0"
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])

    // React Native
    compileOnly "com.facebook.react:react-native:+"

    // Mapbox SDK
    implementation 'com.mapbox.mapboxsdk:mapbox-android-services:2.2.9'

    // Fix issues
    implementation 'com.android.support:support-vector-drawable:28.0.0'
    implementation 'com.android.support:support-annotations:28.0.0'
    implementation 'com.android.support:appcompat-v7:28.0.0'
    implementation 'com.squareup.okhttp3:okhttp:3.12.1'

    implementation 'com.mapbox.mapboxsdk:mapbox-android-sdk:5.5.1@aar'

    // Mapbox plugins
    implementation 'com.mapbox.mapboxsdk:mapbox-android-plugin-localization:0.1.0'
    implementation 'com.mapbox.mapboxsdk:mapbox-android-plugin-locationlayer:0.3.0'
}

	Make sure that the value for 'buildToolsVersion' corresponds properly to the value located in the 'app/build.gradle' file.

X.	In the android emulator being used to test the app, click on the three dots, go to 'settings', go to 'advanced' and change the OpenGL renderer from Autodetect to SwiftShader.





3.	Some example code to use for App.js:

import React, {Component} from 'react';
import {View} from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

ACCESS_TOKEN = 'pk.eyJ1IjoibW9iaXVzLTgiLCJhIjoiY2p1Ym5rbmJzMGZleTRkbGx3dDlqcWZndCJ9.l4ai8KgBPtO2qyxWZPscWA';

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

	The app should now function properly with MapBox. Test it by running

	$ react-native run-ios

	$ react-native run-android
