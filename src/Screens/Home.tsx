import { Header } from "../Components/Header";
import { Loading } from "../Components/Loading";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

type Alert = {
  id: string;
  user_id: {
    cpf: string;
    email: string;
    name: string;
  };
  created_at: string;
}

export function Home(){
  const [data, setData] = useState<Alert[]>([]);

  async function handleAction(){
    await axios.get("https://backend-seguranca.herokuapp.com/api/alert").then((response) => {
    setData(response.data);

    data.map(result => {
      console.log(result.user_id.name);
    })
  })
  }

  useEffect(() => {
    handleAction();
  }, [])

  return(
    <>
      <Header />
      <Container>
        <Button onClick={handleAction}>APERTE</Button>
        <Row style={{marginTop: 50}}>

        
          <Col style={{marginRight: 10, borderRadius: 2}}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  
                </tr>
              </tbody>
            </Table>
          </Col>


          <Col style={{borderRadius: 2}}>
          <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        
      </Container>
    </>
  )
}