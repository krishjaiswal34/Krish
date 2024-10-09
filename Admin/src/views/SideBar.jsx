import React from 'react'
import { SideBarOption } from '../components/SideBarOption'

const SideBar = () => {
  return (
    <div className='min-h-[100vh] border-r-2 w-1/5 py-6 flex flex-col gap-5'>

<SideBarOption text={"Add product"}/>
<SideBarOption text={"Listed products"}/>
<SideBarOption text={"Orders"}/>


    </div>
  )
}

export default SideBar