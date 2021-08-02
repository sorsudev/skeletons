import React, { useEffect } from "react"
import { wrapper } from "../redux/store"
import initialize from '../utils/initialize';
import TagManager from 'react-gtm-module';

import "../styles/style.css"

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    //TagManager.initialize({ gtmId: 'GTM-' });
  }, []);
  return <Component {...pageProps} />
}

MyApp.getInitialProps = wrapper.getInitialAppProps(store => async({Component, ctx}) => {
  initialize(ctx, store);
  let pageProps = {}
  if(Component.getInitialProps){
    pageProps = await Component.getInitialProps(ctx)
  }
  return { pageProps }
})

export default wrapper.withRedux(MyApp);
