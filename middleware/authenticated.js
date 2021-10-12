export default function ({ store, redirect }) {
  // If the user is not authenticated
  //console.log('dari auth', store.state.auth.loggedIn)
  if (!store.state.authenticated) {
    return redirect('/')
  }
}