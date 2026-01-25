import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'component-name',
  styleUrl: 'component-name.css',
  shadow: true,
})
export class ComponentName {
  @Prop() name: string = 'ComponentName';

  render() {
    return (
      <div>
        <h1>Hello {this.name}</h1>
      </div>
    );
  }
}