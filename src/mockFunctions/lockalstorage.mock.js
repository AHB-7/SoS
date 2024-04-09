export const localStorageMock = (function () {
      let store = {}
      return {
            setItem: jest.fn((key, value) => {
                  store[key] = String(value)
            }),
            getItem: jest.fn((key) => {
                  return store[key] || null
            }),
            clear: jest.fn(() => {
                  store = {}
            }),
            removeItem: jest.fn((key) => {
                  delete store[key]
            }),
            // Direct access for testing purposes
            _getStore: () => store,
      }
})()
