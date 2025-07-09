import { useState, useEffect } from 'react';

import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { getAllUsers } from '../../services/api';
import { setUsers, getUsers } from '../../redux/features/userSlice';

import People from './People';

const Peoples = () => {

    const [captureClick, setCaptureClick] = useState(false);

    const dispatch = useDispatch();

    const users = useSelector(getUsers);
    
    // Generate 2 additional random profiles
    const additionalUsers = [
        {
            username: 'sophia_grace',
            name: 'Sophia Grace',
            followers: [],
            following: []
        },
        {
            username: 'marcus_lee',
            name: 'Marcus Lee',
            followers: [],
            following: []
        }
    ];
    
    useEffect(() => {
        const getData = async () => {
            let response = await getAllUsers();
            if (response && response.status === 200) {
                dispatch(setUsers(response.data.data));
            }
        }
        getData();
    }, [captureClick])

    return (
        <Box style={{ marginTop: 10 }}>
            {
                users.map(user => (
                    <People 
                        key={user.username}
                        user={user} 
                        setCaptureClick={setCaptureClick}
                    />
                ))
            }
            {
                additionalUsers.map(user => (
                    <People 
                        key={user.username}
                        user={user} 
                        setCaptureClick={setCaptureClick}
                    />
                ))
            }
        </Box>
    )
}

export default Peoples;