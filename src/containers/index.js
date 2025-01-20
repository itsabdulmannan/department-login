import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthLayout from "../components/layouts/auth-layout";
import MainLayout from "components/layouts/main-layout";
const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" Component={MainLayout} />
                <Route path="/auth/*" Component={AuthLayout} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;