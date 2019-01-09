export default async ({ app, error, redirect, store }) => {
  if (store.getters["admin/isAdmin"]) {
    redirect("/")
    return
  }

  const { $axios, $auth } = app
  if (!store.getters.userInfo) {
    try {
      await store.dispatch("setUserInfo")
    } catch (e) {
      // error(e)
      // User might not be logged in
      // console.log("middleware/user", e)
      return
    }
  }
}
