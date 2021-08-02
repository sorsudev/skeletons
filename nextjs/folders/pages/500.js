import Layout from '../components/layout';

const Error = () => {
  return ( 
    <Layout title='Error'>
      <div class="page-wrap d-flex flex-row align-items-center">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-12 text-center">
              <span class="display-1 d-block">500</span>
              <div class="mb-4 lead">Opps! Internal Server Error!.</div>
              <Link href='/'><a href="/" class="btn btn-link">Back to Home</a></Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
   );
}
 
export default Error;
