import { Route, Routes } from "react-router-dom";
import { Home } from "../screens/Home";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { useAuth } from "../context/AuthContext";
import { Login } from "../screens/Login";
import { Pontos } from "../screens/Pontos";
import { Panico } from "../screens/Panico";


export function Router() {
    const { user } = useAuth();

    return (
        <Routes>
            {user?.user &&
                <Route path="/" element={<DefaultLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/pontos" element={<Pontos />} />
                    <Route path="/panico" element={<Panico />} />
                </Route>
            }

            {
                !user?.user && <Route path="/" element={<Login />} />
            }
        </Routes>
    )
}