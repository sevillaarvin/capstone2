export default async ({ store, app, error }) => {
  const { $axios, $auth } = app
  if (!store.getters.userDetails) {
    try {
      await store.dispatch("setUserInfo")
    } catch (e) {
      error(e)
    }
  }
}
