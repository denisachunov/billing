import React, { useState, useContext } from 'react';
import { Button, Modal, Form, Input } from 'semantic-ui-react';
import { BillingsContext } from '../context/BillingsContext';
import Country from './Country';
import validation from '../utils/validation';

export default () => {

    const { addBilling, errors, setErrors, data } = useContext ( BillingsContext );

    const [ name, setName ] = useState ('');
    const [ company, setCompany ] = useState ('');
    const [ country, setCountry ] = useState ('');
    const [ vat, setVat ] = useState ( '' );
    const [ state, setState ] = useState ('');
    const [ zip, setZip ] = useState ( '' );
    const [ address, setAddress ] = useState ('');
    const [ open, setOpen ] = useState ( false );

    const changeHandler = func => ({ target }) => {
        func ( target.value );
        setErrors ( [] );
    }

    const addBillingForm = (
        <Form className="content">
            <Form.Field
                control={Input}
                label='Customer Full Name'
                placeholder='e.g. John Smith'
                value={name} 
                onChange={changeHandler ( setName )}
                error={ errors.name }
            />
            <Form.Field
                control={Input}
                label='Company Name'
                placeholder='e.g. AppFollow' 
                value={company} 
                onChange={changeHandler ( setCompany )}
                error={ errors.company }
            />
            <Country { ...{ country, setCountry, vat, setVat, state, setState }} />
            <Form.Field
                control={Input}
                label='Zip Code'
                placeholder='e.g. 55111' 
                value={zip} 
                onChange={changeHandler ( setZip )} 
                error={ errors.zip }
                type="number"
            />
            <Form.Field
                control={Input}
                label='Address'
                placeholder='e.g. 2450 Iroquois Ave.' 
                value={address} 
                onChange={changeHandler ( setAddress )}
                error={ errors.address }
            />
        </Form>
    );

    const handleAddBilling = event => {
        const approve = event.target.innerHTML === 'OK';
        const clearFields = () => {
            setName ('');
            setCompany ('');
            setCountry ('');
            setVat ('');
            setZip ('');
            setState ('');
            setAddress ('');
            setOpen ( false );
        }
        const billing = { name, company, country, vat, state, zip, address, countries: data.countries };
        if ( approve && validation ( billing, setErrors )) {
            addBilling ( billing );
            clearFields();
        }
        else if ( !approve ) {
            clearFields();
        }
    }

    return (
        <Modal
            open={open}
            trigger={<Button onClick={() => setOpen ( true )}>Add Billing</Button>}
            header='Add Billing'
            content={addBillingForm}
            actions={['Cancel', { key: 'done', content: 'OK', positive: true }]}
            size="small"
            onActionClick={handleAddBilling}
            className="appflow-billings"
        />
    );
}