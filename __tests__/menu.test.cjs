const {render} = require('cli-testing-library');
const { default: exp } = require('constants');
const {resolve} = require('path')
const fs = require('fs')



test('Open tool', async () => {
    const path = resolve(__dirname, "../cmd/make-js-component.mjs")
    const {clear, findByText, queryByText, userEvent, stdoutArr, debug} = await render('node', [
      path
    ])
    //console.log(path)
    const instance = await findByText('component')
    expect(instance).toBeInTheConsole()
})

test('Component a name', async () => {
    const path = resolve(__dirname, "../cmd/make-js-component.mjs")
    const {clear, findByText, queryByText, userEvent, stdoutArr, debug} = await render('node', [
      path
    ])
    //console.log(path)
    userEvent.keyboard('componentName[Enter]');
    expect(await findByText('src/components')).toBeInTheConsole()
})

test('Default folder and pick React', async () => {
  const path = resolve(__dirname, "../cmd/make-js-component.mjs")
  const {clear, findByText, queryByText, userEvent, stdoutArr, debug} = await render('node', [
    path
  ])
  //console.log(path)
  userEvent.keyboard('componentName[Enter]');
  expect(await findByText('src/components')).toBeInTheConsole()
  userEvent.keyboard('[Enter]');
  userEvent.keyboard('[ArrowDown]')
  userEvent.keyboard('[ArrowDown]')
  expect(await findByText('❯ React')).toBeInTheConsole()

})

test('Create React Component', async () => {
  const path = resolve(__dirname, "../cmd/make-js-component.mjs")
  const {clear, findByText, queryByText, userEvent, stdoutArr, debug} = await render('node', [
    path
  ])
  
  userEvent.keyboard('componentName[Enter]');
  expect(await findByText('src/components')).toBeInTheConsole()
  userEvent.keyboard('[Enter]');
  userEvent.keyboard('[ArrowDown]')
  userEvent.keyboard('[ArrowDown]')
  expect(await findByText('❯ React')).toBeInTheConsole()
  userEvent.keyboard('[Enter]');
  expect(await findByText('Typescript?')).toBeInTheConsole()
  userEvent.keyboard('Y[Enter]');
  expect(await findByText('❯ No')).toBeInTheConsole()
  userEvent.keyboard('[Enter]');
  expect(await findByText('✅ CREATE Component: src\components\componentName.tsx')).toBeInTheConsole()
  const componentExsists = fs.existsSync(resolve(__dirname, '../src/components/componentName.tsx'));
  expect(componentExsists).toBe(true)

})
