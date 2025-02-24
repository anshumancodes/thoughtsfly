import { useAuth0 } from "@auth0/auth0-react"

const LogoutModal = () => {
    const {logout}=useAuth0()
  return (
    <div>
        <div className=" fixed w-[160px] rounded-md">
            <button className="text-black border-gray-600 border  px-14 py-2 rounded-[32px] font-bold" onClick={()=>logout()}>logout</button>

      
      </div>
        
      
    </div>
   
  )
}

export default LogoutModal