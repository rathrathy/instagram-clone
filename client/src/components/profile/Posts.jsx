import { useState, useEffect } from 'react';
import { Box, styled } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getAllPosts } from '../../services/api';
import Post from '../home/Post';

const PostsContainer = styled(Box)`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
    padding: 20px 0;
`;

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const { username } = useParams();

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await getAllPosts();
                if (response && response.status === 200) {
                    // Filter posts for the current user
                    const userPosts = response.data.filter(post => post.username === username);
                    setPosts(userPosts);
                }
            } catch (error) {
                console.error('Error fetching user posts:', error);
            }
        };

        if (username) {
            fetchUserPosts();
        }
    }, [username]);

    return (
        <PostsContainer>
            {posts.length > 0 ? (
                posts.map((post, index) => (
                    <Box key={post._id || index} style={{ aspectRatio: '1', overflow: 'hidden' }}>
                        <img 
                            src={post.image} 
                            alt={`post-${index}`}
                            style={{ 
                                width: '100%', 
                                height: '100%', 
                                objectFit: 'cover',
                                cursor: 'pointer'
                            }}
                        />
                    </Box>
                ))
            ) : (
                <Box style={{ 
                    gridColumn: '1 / -1', 
                    textAlign: 'center', 
                    padding: '40px',
                    color: '#8e8e8e'
                }}>
                    No posts yet
                </Box>
            )}
        </PostsContainer>
    );
};

export default Posts;