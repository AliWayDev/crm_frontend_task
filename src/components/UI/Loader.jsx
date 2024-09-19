import React from 'react'
import './styles/index.css'

export const Loader = () => {
    return (
        <div className="w-full flex justify-center">
            <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}
