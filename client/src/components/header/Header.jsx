import { useState } from 'react';

import { AppBar, Toolbar, styled, Box, Typography } from '@mui/material';
import { Home, AddBoxOutlined, ExploreOutlined, FavoriteBorderOutlined, ChatBubbleOutlineOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { instagramLogo, emptyprofilePicture } from '../../constants/data';
import { routePath } from '../../constants/route';
import { getUser } from '../../redux/features/userSlice';

// components
import Search from './Search';
import CreatePost from '../post/CreatePost';

const StyledSidebar = styled(Box)`
    position: fixed;
    left: 0;
    top: 0;
    width: 200px;
    height: 100vh;
    background: #FFFFFF;
    border-right: 1px solid #dbdbdb;
    padding: 20px 12px;
    z-index: 1000;
`;

const LogoContainer = styled(Box)`
    padding: 25px 12px 16px 12px;
    margin-bottom: 19px;
`;

const Logo = styled('img')`
    height: 35px;
`;

const MenuItem = styled(Box)`
    display: flex;
    align-items: center;
    padding: 12px;
    margin: 4px 0;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:hover {
        background-color: #fafafa;
    }
    
    & > svg {
        font-size: 24px;
        margin-right: 16px;
        color: #262626;
    }
`;

const MenuText = styled(Typography)`
    font-size: 16px;
    font-weight: 400;
    color: #262626;
`;

const ProfileSection = styled(Box)`
    position: absolute;
    bottom: 20px;
    left: 12px;
    right: 12px;
`;

const Header = () => {

    const [open, setOpen] = useState(false);

    const user = useSelector(getUser);

    const navigate = useNavigate();
    
    return (
        <>
            <StyledSidebar>
                <LogoContainer>
                    <Logo 
                        src={instagramLogo} 
                        alt="logo" 
                        onClick={() => navigate(routePath.home)}
                        style={{ cursor: 'pointer' }}
                    />
                </LogoContainer>
                
                <MenuItem onClick={() => navigate(routePath.home)}>
                    <Home />
                    <MenuText>Home</MenuText>
                </MenuItem>
                
                <MenuItem>
                    <ChatBubbleOutlineOutlined />
                    <MenuText>Messages</MenuText>
                </MenuItem>
                
                <MenuItem onClick={() => setOpen(true)}>
                    <AddBoxOutlined />
                    <MenuText>Create</MenuText>
                </MenuItem>
                
                <MenuItem onClick={() => navigate(routePath.explore)}>
                    <ExploreOutlined />
                    <MenuText>Explore</MenuText>
                </MenuItem>
                
                <MenuItem>
                    <FavoriteBorderOutlined />
                    <MenuText>Notifications</MenuText>
                </MenuItem>
                
                <ProfileSection>
                    <MenuItem onClick={() => navigate(`${routePath.profile}/${user.username}`)}>
                        <img 
                            src={emptyprofilePicture} 
                            alt="display picture" 
                            style={{ 
                                width: '24px', 
                                height: '24px', 
                                borderRadius: '50%',
                                marginRight: '16px'
                            }}
                        />
                        <MenuText>Profile</MenuText>
                    </MenuItem>
                </ProfileSection>
            </StyledSidebar>
            <CreatePost 
                open={open}
                setOpen={setOpen}
            />
        </>
    )
}

export default Header;