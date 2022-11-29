import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  background-color: red;
  height: 80px;
  font-size: 12px;
`;
const Col = styled.div`
  display: flex;
  align-items: center;
`;
const Logo = styled.svg`
  margin-right: 50px;
`;
const Pages = styled.ul`
  display: flex;
  align-items: center;
`;
const Page = styled.li`
margin-right: 20px;
`;

function Header() {
  return (
    <Nav>
      <Col>
      <Logo />
      <Pages>
        <Page>Home</Page>
        <Page>Tv Show</Page>
      </Pages>
      </Col>
      <button>Search</button>
      <Col>

      </Col>
    </Nav>
  );
}

export default Header;