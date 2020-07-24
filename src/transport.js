import axios from 'axios';
const PORT = 1337;

const api = axios.create ({
    baseURL: `http://localhost:${PORT}`,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const addBillingTransport = ( setData, setLoading ) => async billing => {
    setLoading ( true );
    try {
        const response = await api.post ( '/save', billing );
        const { data, status } = response;
        if ( status === 200 && data.ok ) {
            setData ( data => ({
                data: [ billing, ...data.data ],
                countries: data.countries
            }));
        }
    }
    catch ( err ) {
        console.log ( err );
    }
    finally {
        setLoading ( false );
    }
}

export const getData = ( setData, setLoading ) => async () => {
    setLoading ( true );
    try {
        const response = await api.get ( '/billing_info' );
        const { data, status } = response;
        if ( status === 200 ) {
            setData ({
                data: [ data.data ],
                countries: data.countries
            });
        }
    }
    catch ( err ) {
        console.log ( err );
    }
    finally {
        setLoading ( false );
    }
}