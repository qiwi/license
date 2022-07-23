import {suite, Test} from 'uvu'

export {expect} from 'earljs'

export const describe = (name: string, cb: (it: Test) => void) => {
  const test = suite(name)
  cb(test)
  test.run()
}
