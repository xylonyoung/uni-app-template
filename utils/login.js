import store from '../store';

export default function login() {
  store.dispatch('user/login')
}

