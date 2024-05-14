import React from 'react'
import {NavLink} from 'react-router-dom'

export default function NavMenu({children, ...props}) {
    return (
        <div className=' text-4xl'>
                <NavLink to={`/${props.path}`} className={({isActive}) => isActive? "text-cyan-500" : "text-black" }  >
                    {children}          
                
                <div className='text-center text-xl cursor-pointer'>
                    {props.title}
                </div>
                </NavLink>
        </div>
    )
}
