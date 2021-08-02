import Router from 'next/router';
import actions from '../redux/actions';
import { getCookie } from '../utils/cookie';

const InitialProcess = function(ctx, store) {

  if(ctx.isServer) {
    if(ctx.req.headers.cookie) {
      store.dispatch(actions.reauthenticate(getCookie('token', ctx.req)));
    }
  } else {
    let token = store.getState().authentication.token;
    if (token === null)
      store.dispatch(actions.reauthenticate(getCookie('token', ctx.req)));

    token = store.getState().authentication.token;

    if(token && (ctx.pathname === '/sign_in' || ctx.pathname === '/sign_up')) {
      setTimeout(function() {
        Router.push('/');
      }, 0);
    }

    return token;
  }

}

export default InitialProcess;