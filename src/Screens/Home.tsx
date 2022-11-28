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


type Location = {
  id: string;
  latitude: string;
  longitude: string;
  date: string;
  user_id: {
    id: string;
    name: string;
  }
}

export function Home(){
  const [data, setData] = useState<Alert[]>([]);
  const [location, setLocation] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);

  async function alertAction(){
    setLoading(true)
    await axios.get("https://backend-seguranca.herokuapp.com/api/alert").then((response) => {
    setData(response.data);
  }).finally(() => setLoading(false));
  }

  async function locationAction(){
    setLoading(true)
    try {
      await axios.get("https://backend-seguranca.herokuapp.com/api/location").then((response) => {
        setLocation(response.data);
      }).finally(() => setLoading(false));
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    alertAction();
    locationAction();
  }, [])

  return(
    <>
      <Header />
      {!loading ? 
      <Container>
        <Row style={{marginTop: 50}}>
          <Col style={{marginRight: 10, borderRadius: 2}}>
            <h3>Alerta Vigia</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {
                    data.map(alerta => {
                      return(
                        <>
                          <td>{alerta.user_id.name}</td>
                          <td key={alerta.created_at}>{alerta.created_at}</td>
                        </>
                      )
                    })
                  }
                </tr>
              </tbody>
            </Table>
          </Col>


          <Col style={{marginRight: 10, borderRadius: 2}}>
            <h3>Localização</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Data</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                  <th>LINK</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                {
                  location.map(location => {
                    return(
                      <>
                        <td>{location.user_id.name}</td>
                        <td key={location.date}>{location.date}</td>
                        <td>{location.latitude}</td>
                        <td>{location.longitude}</td>
                        <td>LINK</td>
                      </>
                      )
                    })
                  }
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      :
      <Loading />
      }
    </>
  )
}