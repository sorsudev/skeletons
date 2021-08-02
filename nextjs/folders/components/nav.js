import Link from 'next/link';
import { connect } from 'react-redux';
import actions from '../redux/actions/authActions';
import jwt from 'jsonwebtoken';

const Nav = (props) => {
  let wizardStep = props.seccion === 'mainDashboard' ? 'direccion' : 'bienvenido';

  function UserItem() {
    let tokenData = props.tokenData;
    if (props.tokenData) {
      return <Link href="/users/dashboard"><a href="/users/dashboard" className="nav-link">{tokenData.name}</a></Link>
    }

    return <Link href="/users/sign_in"><a href="/users/sign_in" className="nav-link">Iniciar sesión</a></Link>
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
            </li>
          </ul>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  )

};

const mapStateToProps = (state) => {
  let tokenData = null;
  try {
    tokenData = jwt.verify(state.authentication.token, process.env.NEXT_PUBLIC_TOKEN_SECRET).data;
  } catch (e) {
    tokenData = null;
  }
  return {
    isAuthenticated: !!state.authentication.token, 
    tokenData: tokenData
  }
}

export default connect(mapStateToProps, actions)(Nav);
