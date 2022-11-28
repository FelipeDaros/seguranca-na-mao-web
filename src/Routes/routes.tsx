import { Routes as MainRoutes, Route } from "react-router-dom"
import { Cadastro } from "../Screens/Cadastro"
import { Home } from "../Screens/Home"
import { Ponto } from "../Screens/Ponto"
import { Relatorio } from "../Screens/Relatorio"


export default function IndexRoutes(){
  return(
    <MainRoutes>
      <Route path="/home" element={<Home />}/>
      <Route path="/relatorio" element={<Relatorio />}/>
      <Route path="/cadastro" element={<Cadastro />}/>
      <Route path="/ponto" element={<Ponto />}/>
    </MainRoutes>
  )
}