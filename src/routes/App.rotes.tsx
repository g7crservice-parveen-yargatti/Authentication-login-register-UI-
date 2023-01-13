import { FC, Suspense } from "react"
import { Navigate, RouteObject, useRoutes } from "react-router-dom"
import About from "../about"
import MainLayout from "../MainLayout"
import Pagenotfound from "../pagenotfound"
import SignIn from "../signIn"
import ThirdPartyapi from "../thirt-party-api"
import ProtectedRoutes from "./ProtectedRotes"


const FallBackDesign: FC = (): JSX.Element => {
    return <span>Loading component...please wait</span>
}
const AppRoutes: FC = (): JSX.Element => {
   console.log("called");
   
    const mainRoutes: RouteObject = {
        path: '/',
        element: <MainLayout/>,
        children: [
           
           
            { path: 'Signin', element: <SignIn /> },
            { path: '', element: <SignIn /> },
            { path: 'about', element: <About/> },
         
         
        ]
    }
  
    const  MoviesRoutes: RouteObject = {
        path: 'pages',
        element: <ProtectedRoutes layout={MainLayout} />,
        children: [
           
            { path: 'movies', element: <ThirdPartyapi /> },
           
           
        ]
    }
    const router = useRoutes([mainRoutes,MoviesRoutes])
    return (
      
        <Suspense fallback={<FallBackDesign />}>
            {router}
        </Suspense >
       
    )
}

export default AppRoutes