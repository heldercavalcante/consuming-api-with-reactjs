import { Container, Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar'

function NavBar() {
  return (
    <div className='nav-bar'>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/products">Products</Nav.Link>
            <Nav.Link href="/users">Users</Nav.Link>
            <Nav.Link href="/categories">Categories</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavBar;