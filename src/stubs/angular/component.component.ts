import { CommonModule } from "@angular/common";

Component({
	selector: "SelectorName",
	standalone: true,
	imports: [CommonModule],

	template: `
		<h2>Hello, {{ title }}</h2>
		<p>Congratulations! Your component has been created. 🎉</p>
	`,

	styleUrls: ` `,
});
export class ComponentName {
	public title: string = "ComponentName";

	constructor() {}
}
