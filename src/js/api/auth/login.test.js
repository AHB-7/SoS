import { login } from "./login"
import * as mocks from "../../../mockFunctions"

describe("login function", () => {
      beforeEach(() => {
            global.fetch = mocks.createMockFetch({
                  accessToken: mocks.accessToken,
                  name: mocks.userData.name,
            })
            global.localStorage = mocks.localStorageMock
      })

      afterEach(() => {
            global.fetch.mockClear()
            mocks.localStorageMock.clear()
      })

      it("should store the access token in localStorage upon successful login", async () => {
            await login(mocks.userData.email, mocks.userData.password)
            expect(mocks.localStorageMock.getItem("token")).toBe(
                  '"somthigblalabla"'
            )
      })

      it("should return the user name with successful login", async () => {
            const result = await login(
                  mocks.userData.email,
                  mocks.userData.password
            )
            expect(result.name).toBe(mocks.userData.name)
      })
})
