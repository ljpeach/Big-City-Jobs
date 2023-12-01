import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { useEffect } from 'react';
export default function HomePage() {
    // const { data } = useQuery(QUERY_USER);
    useEffect(() => {
        // console.log(data);
    }, [])
    return (
        <div>This is Home. Logged in: {Auth.loggedIn().toString()}</div>
    );
}