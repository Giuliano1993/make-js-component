import { TestBed } from "@angular/core/testing";
import { ComponentName } from "./component.component";

describe("ComponentName", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ComponentName],
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(ComponentName);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});

	it(`should have the 'ComponentName' title`, () => {
		const fixture = TestBed.createComponent(ComponentName);
		const app = fixture.componentInstance;
		expect(app.title).toEqual("ComponentName");
	});

	it("should render title", () => {
		const fixture = TestBed.createComponent(ComponentName);
		fixture.detectChanges();
		const compiled = fixture.nativeElement as HTMLElement;
		expect(compiled.querySelector("h2")?.textContent).toContain("Hello, ComponentName");
	});
});
