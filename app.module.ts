import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";

import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateConfigService } from "./translate-config.service";
import { MaterialModule } from "./material.module";
import { CommonModule } from "@angular/common";
import { Market } from "@ionic-native/market/ngx";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxIntlTelInputModule } from "ngx-intl-tel-input";
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { Network } from "@ionic-native/network/ngx";
import { SmsRetriever } from "@ionic-native/sms-retriever/ngx";
import { FirebaseCrashlytics } from "@ionic-native/firebase-crashlytics/ngx";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import {
  SecureStorage,
  SecureStorageObject,
} from "@ionic-native/secure-storage/ngx";
import { UniqueDeviceID } from "@ionic-native/unique-device-id/ngx";
import { HTTP } from "@ionic-native/http/ngx";
import { Sim } from "@ionic-native/sim/ngx";
import { Device } from "@ionic-native/device/ngx";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { AppAvailability } from "@ionic-native/app-availability/ngx";
import { SpeechRecognition } from "@ionic-native/speech-recognition/ngx";
import { Globalization } from "@ionic-native/globalization/ngx";
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";

import { Diagnostic } from "@ionic-native/diagnostic/ngx";
import { JoyrideModule } from "ngx-joyride";
import { CallNumber } from "@ionic-native/call-number/ngx";

import { LocalNotifications } from "@awesome-cordova-plugins/local-notifications/ngx";
import { SharedModule } from "./tktFrntAdminCommon/src/app/tktFrntCommon/src/app/shared.module";
import { commonAppMethods } from "./tktFrntAdminCommon/src/app/classes/commonAppMethods";
import { InterceptorService } from "./tktFrntAdminCommon/src/app/tktFrntCommon/src/app/services/interceptor.service";
import { common } from "./tktFrntAdminCommon/src/app/tktFrntCommon/src/app/common/commonFunctions";
import { AndroidPermissions } from "@awesome-cordova-plugins/android-permissions/ngx";
import { Keyboard } from "@ionic-native/keyboard/ngx";
import { SQLite, SQLiteObject } from "@awesome-cordova-plugins/sqlite/ngx";
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";

export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    "app/tktFrntAdminCommon/src/app/tktFrntCommon/src/assets/",
    ".json"
  );
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    JoyrideModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ScrollingModule,
    MaterialModule,
    SharedModule,
    NgxIntlTelInputModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: LanguageLoader,
        deps: [HttpClient],
      },
    }),
  ],

  providers: [
    Keyboard,
    AndroidPermissions,
    commonAppMethods,
    StatusBar,
    SQLite,
    Geolocation,
    SecureStorage,
    NativeStorage,
    HTTP,
    Camera,
    FCM,
    Globalization,
    AppAvailability,
    LocalNotifications,
    FCM,
    Market,
    UniqueDeviceID,
    TranslateConfigService,
    Diagnostic,
    JoyrideModule,
    FirebaseCrashlytics,
    Sim,
    SmsRetriever,
    Network,
    Device,
    common,
    SocialSharing,

    CallNumber,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
