import { Box, styled, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import Peoples from './Peoples';
import { getUser } from '../../redux/features/userSlice';
import { emptyprofilePicture } from '../../constants/data';

const Container = styled(Box)`
    align-self: flex-start;
    margin: 30px 0 30px 0;
    width: 100%;
    max-width: 250px;
    height: calc(100vh - 120px);
    overflow-y: auto;
    
    &::-webkit-scrollbar {
        width: 6px;
    }
    
    &::-webkit-scrollbar-track {
        background: transparent;
    }
    
    &::-webkit-scrollbar-thumb {
        background: #dbdbdb;
        border-radius: 3px;
    }
    
    &::-webkit-scrollbar-thumb:hover {
        background: #b3b3b3;
    }
`

const ProfileSection = styled(Box)`
    display: flex;
    align-items: center;
    padding: 16px 0;
    margin-bottom: 24px;
    border-bottom: 1px solid #dbdbdb;
`;

const ProfileImage = styled('img')`
    width: 56px;
    height: 56px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 12px;
`;

const ProfileInfo = styled(Box)`
    flex: 1;
    margin-left: 8px;
`;

const Username = styled(Typography)`
    font-size: 14px;
    font-weight: 600;
    color: #262626;
    margin-bottom: 2px;
`;

const Name = styled(Typography)`
    font-size: 16px;
    color: #8e8e8e;
`;

const SwitchButton = styled(Typography)`
    font-size: 12px;
    color: #00376b;
    font-weight: 700;
    cursor: pointer;
`;

const LogoutButton = styled(Typography)`
    font-size: 12px;
    color: #d32f2f;
    font-weight: 700;
    cursor: pointer;
    margin-left: 12px;
`;

const Text = styled(Typography)`
    color: #8e8e8e;
    font-size: 16px;
    margin-bottom: 16px;
    margin-left: 8px;
`

const Suggestions = () => {
    const user = useSelector(getUser);

    // Generate random profile picture
    const getRandomProfilePic = () => {
        const randomId = Math.floor(Math.random() * 1000);
        return `https://picsum.photos/56/56?random=${randomId}`;
    };

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/login'; // Redirect to login page
    };

    return (
        <Container>
            <ProfileSection>
                <ProfileImage 
                    src={getRandomProfilePic()} 
                    alt="profile" 
                />
                <ProfileInfo>
                    <Username>{user?.username}</Username>
                    <Name>{user?.name}</Name>
                </ProfileInfo>
                <SwitchButton>Switch</SwitchButton>
                <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            </ProfileSection>
            
            <Text>Suggestions For You</Text>
            <Peoples />
        </Container>
    )
}

export default Suggestions;