import React, { createContext, useState, useEffect } from 'react';
import { addBillingTransport, getData } from '../transport';

export const BillingsContext = createContext();

export default props => {
    const [ data, setData ] = useState ({});
    const [ loading, setLoading ] = useState ( false );
    const [ errors, setErrors ] = useState ( {} );
    const addBilling = addBillingTransport ( setData, setLoading );
    useEffect ( () => {
        const get = getData ( setData, setLoading );
        get ();
    }, [] );
    return (
        <BillingsContext.Provider value={{ data, addBilling, loading, errors, setErrors }}>
            { props.children }
        </BillingsContext.Provider>
     );
}