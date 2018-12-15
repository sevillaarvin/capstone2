export default async ({ store, app, error }) => {
  const { $axios, $auth } = app
  if (!store.getters.userInfo) {
    try {
      await store.dispatch("setUserInfo")
    } catch (e) {
      // error(e)
      // console.log(e)
      // User might not be logged in
      return
    }
  }
}
