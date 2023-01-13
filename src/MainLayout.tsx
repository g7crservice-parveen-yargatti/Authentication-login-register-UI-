
import { Outlet } from 'react-router-dom'
import About from './about'
import HeaderNavBar from './navbar'

function MainLayout() {
    // const [display,setDisplay]=useState(false)
    // const handleShowTrue=(e:any)=>{
    //      setDisplay(e)
    // }
  return (
   <div>
    
   <HeaderNavBar />
    <Outlet />
    {/* {display &&<About/>} */}
    </div>
  )
}

export default MainLayout