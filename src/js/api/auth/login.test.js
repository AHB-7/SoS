// login.test.js

import { login } from "./login.js" // The path to your login function
jest.mock("../../storage/index.js", () => ({
      save: jest.fn(),
}))

globalThis.fetch = jest.fn() // Mock fetch globally

// Helper function to mock fetch responses
function mockFetch(status, data) {
      globalThis.fetch.mockImplementationOnce(() =>
            Promise.resolve({
                  ok: status === 200,
                  statusText: status === 200 ? "OK" : "Bad Request",
                  json: () => Promise.resolve(data),
            })
      )
}

describe("login", () => {
      beforeEach(() => {
            fetch.mockClear()
            require("../../storage/index.js").save.mockClear()
      })

      it("should save profile and token when login is successful", async () => {
            const mockProfile = { accessToken: "abc123", name: "John Doe" }
            mockFetch(200, mockProfile)

            const profile = await login("test@example.com", "password")

            expect(fetch).toHaveBeenCalledTimes(1)
            expect(fetch).toHaveBeenCalledWith(
                  expect.stringContaining(`/social/auth/login`),
                  expect.any(Object)
            )
            expect(require("../../storage/index.js").save).toHaveBeenCalledWith(
                  "token",
                  "abc123"
            )
            expect(require("../../storage/index.js").save).toHaveBeenCalledWith(
                  "profile",
                  { name: "John Doe" }
            )
            expect(profile).toEqual({ name: "John Doe" })
      })

      it("should throw an error when login is unsuccessful", async () => {
            mockFetch(400, {})

            await expect(login("test@example.com", "password")).rejects.toThrow(
                  "Bad Request"
            )

            expect(fetch).toHaveBeenCalledTimes(1)
            expect(
                  require("../../storage/index.js").save
            ).not.toHaveBeenCalled()
      })
})
