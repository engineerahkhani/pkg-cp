import React from 'react'
import Number from '../Number'

export default CPPersianNumber = (props)=>{
    if(props.noCama){
        return new Number(props.number).toPersian().show()
    }
    return new Number(props.number).addCommas().toPersian().show()
}