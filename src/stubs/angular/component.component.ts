import { CommonModule } from '@angular/common';

Component({
	selector: 'SelectorName',
	standalone: true,
	imports: [CommonModule],
	template: `<div>{{title}}</div>`,
	styleUrls: ` `
})
export class ComponentName {

	public title: string = 'Hello World ComponentName!';

	constructor() { }

}