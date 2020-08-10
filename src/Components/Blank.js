import React, {useEffect} from 'react'

export const Blank = (props) => {

    useEffect(() => {
        props.history.push('/')
    }, [props])

    return(
        <div>
        </div>
    )
}