import React from 'react'
import { Container, Row, Col} from 'react-bootstrap'

export default function FormContainer({children}) {
    return (
        <div className='paj-contact-form'>
            {children}
        </div>
    )
}
