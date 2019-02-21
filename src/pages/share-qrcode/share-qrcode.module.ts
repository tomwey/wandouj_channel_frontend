import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShareQrcodePage } from './share-qrcode';

@NgModule({
  declarations: [
    ShareQrcodePage,
  ],
  imports: [
    IonicPageModule.forChild(ShareQrcodePage),
  ],
})
export class ShareQrcodePageModule {}
