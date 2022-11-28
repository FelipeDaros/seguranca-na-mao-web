import React from "react"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export function Header(){
  return(
      <>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Nav className="me-auto">
              <Nav.Link href="/home">Página Inicial</Nav.Link>
              <Nav.Link href="/relatorio">Relatórios</Nav.Link>
              <Nav.Link href="/cadastro">Cadastros</Nav.Link>
              <Nav.Link href="/ponto">Pontos</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </>
  )
}