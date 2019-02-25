import { NgModule } from '@angular/core';
import { Num2strPipe } from './num2str/num2str';
import { FormatWanPipe } from './format-wan/format-wan';
@NgModule({
	declarations: [
    Num2strPipe,
    FormatWanPipe],
	imports: [],
	exports: [Num2strPipe,
    FormatWanPipe]
})
export class PipesModule {}
