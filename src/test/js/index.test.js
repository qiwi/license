import {describe, expect} from '../ts/test-utils'

describe('bundles have proper exports', (it) => {
  it('es5 exposes `generate()`', () => {
    expect(require('../../../target/es5').generate).toEqual(expect.a(Function))
  })
})
