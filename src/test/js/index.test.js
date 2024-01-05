import {describe, expect} from '../ts/test-utils'

describe('bundles have proper exports', (it) => {
  it('es5 exposes `generate()`', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    expect(require('@qiwi/license').generate).toEqual(expect.a(Function))
  })
})
