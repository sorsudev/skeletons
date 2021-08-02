import Layout from '../components/layout';
import Link from 'next/link';

const NotFound = ({specialCondition}) => {
  return ( 
    <Layout title="Pagina no encontrada">
      <div className="page-wrap d-flex flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 text-center">
              <span className="display-1 d-block">404</span>
              <div className="mb-4 lead">The page you are looking for was not found.</div>
              <Link href='/'><a href="/" className="btn btn-link">Back to Home</a></Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
   );
}
 
export default NotFound;
