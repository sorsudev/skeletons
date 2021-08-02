import Head from '../components/head';
import Nav from '../components/nav';
import Footer from '../components/footer'

const Layout = ({ children, title, seccion }) => (
  <>
    <Head title={title} />
    <Nav seccion={seccion} />
    { children}
    <Footer />
  </>
)

export default Layout;
