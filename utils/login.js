import store from '../store';

function login() {
  store.dispatch('user/login')
}
export default login();
