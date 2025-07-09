import { useEffect, useState } from 'react';
import { Box, styled, Typography, Modal } from '@mui/material';
import { useSelector } from 'react-redux';
import { getUser } from '../../redux/features/userSlice';
import AddIcon from '@mui/icons-material/Add';
import { getAllStories } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const StoriesContainer = styled(Box)`
    display: flex;
    align-items: center;
    padding: 16px 0;
    overflow-x: auto;
    gap: 20px;
    margin-bottom: 24px;
    width: 600px; /* Width for 6 stories: (80px + 20px gap) * 6 = 600px */
    
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`;

const StoryItem = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    min-width: 80px;
`;

const StoryCircle = styled(Box)`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
    padding: 4px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ProfileImage = styled('img')`
    width: 72px;
    height: 72px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #fff;
`;

const Username = styled(Typography)`
    font-size: 12px;
    color: #262626;
    text-align: center;
    max-width: 66px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const PlusCircle = styled(Box)`
    position: absolute;
    bottom: 8px;
    right: 8px;
    background: #0095F6;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #fff;
`;

const UserStoryWrapper = styled(Box)`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 80px;
`;

const Stories = () => {
    const [stories, setStories] = useState([]);
    const [groupedStories, setGroupedStories] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [activeUser, setActiveUser] = useState(null);
    const user = useSelector(getUser);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStories = async () => {
            const response = await getAllStories();
            if (response && response.status === 200) {
                setStories(response.data);
                // Group stories by username
                const grouped = {};
                response.data.forEach(story => {
                    if (!grouped[story.username]) grouped[story.username] = [];
                    grouped[story.username].push(story);
                });
                setGroupedStories(grouped);
            }
        };
        fetchStories();
    }, []);

    // Get unique users with stories
    const usersWithStories = Object.keys(groupedStories);

    // Check if current user has a story
    const hasOwnStory = groupedStories[user?.username]?.length > 0;

    // Handle story click
    const handleStoryClick = (username) => {
        setActiveUser(username);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        console.log('Modal closed');
        setOpenModal(false);
        setActiveUser(null);
        setTimeout(() => {
            if (window.location.pathname !== '/') {
                navigate('/');
            } else {
                window.scrollTo(0, 0);
            }
        }, 100);
    };

    return (
        <>
        <StoriesContainer>
            {/* User's own story with plus sign if no story, or border if has story */}
            <UserStoryWrapper onClick={() => hasOwnStory ? handleStoryClick(user.username) : null} style={{ cursor: hasOwnStory ? 'pointer' : 'default' }}>
                <StoryCircle style={{ position: 'relative', border: hasOwnStory ? '2px solid #833AB4' : 'none' }}>
                    <ProfileImage 
                        src={user?.picture || 'https://picsum.photos/60/60?random=9999'} 
                        alt={user?.username || 'Your story'}
                    />
                    {!hasOwnStory && (
                        <PlusCircle>
                            <AddIcon style={{ color: '#fff', fontSize: 18 }} />
                        </PlusCircle>
                    )}
                </StoryCircle>
                <Username>{user?.username || 'You'}</Username>
            </UserStoryWrapper>
            {/* Other users' stories */}
            {usersWithStories.filter(username => username !== user?.username).map(username => (
                <StoryItem key={username} onClick={() => handleStoryClick(username)}>
                    <StoryCircle>
                        <ProfileImage 
                            src={groupedStories[username][0]?.userPicture || 'https://picsum.photos/60/60?random=8888'} 
                            alt={username}
                        />
                    </StoryCircle>
                    <Username>{username}</Username>
                </StoryItem>
            ))}
        </StoriesContainer>
        {/* Modal to show stories for selected user */}
        <Modal open={openModal} onClose={handleCloseModal}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', outline: 'none' }}>
                {activeUser && groupedStories[activeUser] && groupedStories[activeUser].map((story, idx) => (
                    <Box key={idx} sx={{ mb: 2, background: '#fff', p: 2, borderRadius: 2, boxShadow: 3 }}>
                        <img src={story.image} alt="story" style={{ maxWidth: 400, maxHeight: 600, borderRadius: 8 }} />
                        <Typography align="center" sx={{ mt: 1 }}>{activeUser}</Typography>
                    </Box>
                ))}
            </Box>
        </Modal>
        </>
    );
};

export default Stories; 