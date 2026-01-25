const { render } = require('cli-testing-library');
const { default: exp } = require('constants');
const { resolve } = require('path');
const fs = require('fs');
const path = require('path');

test('Open tool', async () => {
  const path = resolve(__dirname, '../cmd/make-js-component.mjs');
  const { clear, findByText, queryByText, userEvent, stdoutArr, debug } =
    await render('node', [path]);
  //console.log(path)
  const instance = await findByText('component');
  expect(instance).toBeInTheConsole();
});

test('Component a name', async () => {
  const path = resolve(__dirname, '../cmd/make-js-component.mjs');
  const { clear, findByText, queryByText, userEvent, stdoutArr, debug } =
    await render('node', [path]);
  //console.log(path)
  userEvent.keyboard('componentName[Enter]');
  expect(await findByText('src/components')).toBeInTheConsole();
});

test('Default folder and pick React', async () => {
  const path = resolve(__dirname, '../cmd/make-js-component.mjs');
  const { clear, findByText, queryByText, userEvent, stdoutArr, debug } =
    await render('node', [path]);
  //console.log(path)
  userEvent.keyboard('componentName[Enter]');
  expect(await findByText('src/components')).toBeInTheConsole();
  userEvent.keyboard('[Enter]');
  expect(
    await findByText('Pick a framework to create the component for'),
  ).toBeInTheConsole();
});

test('Default folder and pick Preact', async () => {
  const path = resolve(__dirname, '../cmd/make-js-component.mjs');
  const { clear, findByText, queryByText, userEvent, stdoutArr, debug } =
    await render('node', [path]);
  //console.log(path)
  userEvent.keyboard('componentName[Enter]');
  expect(await findByText('src/components')).toBeInTheConsole();
  userEvent.keyboard('[Enter]');
  expect(
    await findByText('Pick a framework to create the component for'),
  ).toBeInTheConsole();
});

test('Default folder and pick Solid', async () => {
  const path = resolve(__dirname, '../cmd/make-js-component.mjs');
  const { clear, findByText, queryByText, userEvent, stdoutArr, debug } =
    await render('node', [path]);
  //console.log(path)
  userEvent.keyboard('componentName[Enter]');
  expect(await findByText('src/components')).toBeInTheConsole();
  userEvent.keyboard('[Enter]');
  expect(
    await findByText('Pick a framework to create the component for'),
  ).toBeInTheConsole();
});

test('Default folder and pick Alpine', async () => {
  const path = resolve(__dirname, '../cmd/make-js-component.mjs');
  const { clear, findByText, queryByText, userEvent, stdoutArr, debug } =
    await render('node', [path]);
  //console.log(path)
  userEvent.keyboard('componentName[Enter]');
  expect(await findByText('src/components')).toBeInTheConsole();
  userEvent.keyboard('[Enter]');
  expect(
    await findByText('Pick a framework to create the component for'),
  ).toBeInTheConsole();
});

test('Default folder and pick Stencil', async () => {
  const path = resolve(__dirname, '../cmd/make-js-component.mjs');
  const { clear, findByText, queryByText, userEvent, stdoutArr, debug } =
    await render('node', [path]);
  //console.log(path)
  userEvent.keyboard('componentName[Enter]');
  expect(await findByText('src/components')).toBeInTheConsole();
  userEvent.keyboard('[Enter]');
  expect(
    await findByText('Pick a framework to create the component for'),
  ).toBeInTheConsole();
});

test('Default folder and pick Mitosis', async () => {
  const path = resolve(__dirname, '../cmd/make-js-component.mjs');
  const { clear, findByText, queryByText, userEvent, stdoutArr, debug } =
    await render('node', [path]);
  //console.log(path)
  userEvent.keyboard('componentName[Enter]');
  expect(await findByText('src/components')).toBeInTheConsole();
  userEvent.keyboard('[Enter]');
  expect(
    await findByText('Pick a framework to create the component for'),
  ).toBeInTheConsole();
});

test('Invalid component name shows error', async () => {
  const path = resolve(__dirname, '../cmd/make-js-component.mjs');
  const { clear, findByText, userEvent } = await render('node', [path]);
  userEvent.keyboard('invalid-name!@#[Enter]');
  expect(
    await findByText('Component name can only contain alphanumeric characters'),
  ).toBeInTheConsole();
});

test('Help includes all frameworks', async () => {
  const path = resolve(__dirname, '../cmd/make-js-component.mjs');
  const { clear, findByText, queryByText, userEvent, stdoutArr, debug } =
    await render('node', [path, '--help']);
  expect(
    await findByText(
      'vue|angular|react|preact|solid|svelte|qwik|astro|alpine|stencil|mitosis',
    ),
  ).toBeInTheConsole();
});

const flagFrameworksData = [
  { name: 'vue', nextPrompt: 'Do you use Nuxt?' },
  { name: 'angular', nextPrompt: 'Do you want to create another component?' },
  { name: 'react', nextPrompt: 'Do you want to use Typescript?' },
  { name: 'preact', nextPrompt: 'Do you want to use Typescript?' },
  { name: 'solid', nextPrompt: 'Do you want to use Typescript?' },
  { name: 'svelte', nextPrompt: 'Do you want to use Typescript?' },
  { name: 'qwik', nextPrompt: 'Choose wich type of component to create' },
  { name: 'astro', nextPrompt: 'Do you want to create another component?' },
  { name: 'alpine', nextPrompt: 'Do you want to use Typescript?' },
  { name: 'stencil', nextPrompt: 'Do you want to use Shadow DOM?' },
  { name: 'mitosis', nextPrompt: 'Do you want to use Typescript?' },
];

test.each(flagFrameworksData)(
  'Use --framework $name flag and check next prompt',
  async ({ name, nextPrompt }) => {
    const path = resolve(__dirname, '../cmd/make-js-component.mjs');
    const { clear, findByText, queryByText, userEvent, stdoutArr, debug } =
      await render('node', [
        path,
        '--framework',
        name,
        '--name',
        'test',
        '--folder',
        'src/components',
      ]);
    expect(await findByText(nextPrompt)).toBeInTheConsole();
  },
);
