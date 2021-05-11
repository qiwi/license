// import {generate} from '../../../target/es6'


describe('bundles have proper exports', () => {
  // https://github.com/kulshekhar/ts-jest/issues/1174
  // SyntaxError: Cannot use 'import.meta' outside a module
  // it('es6 exposes `generate()`', () => {
  //   expect(generate).toEqual(expect.any(Function))
  // })

  it('es5 exposes `generate()`', () => {
    expect(require('../../../target/es5').generate).toEqual(expect.any(Function))
  })
})
