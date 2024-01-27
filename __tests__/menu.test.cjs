const {render} = require('cli-testing-library');
const { default: exp } = require('constants');
const {resolve} = require('path')



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
