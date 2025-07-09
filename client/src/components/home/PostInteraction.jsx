import { useState } from 'react';
import { Box, styled } from '@mui/material';
import { FavoriteBorderOutlined, Favorite, ModeCommentOutlined } from "@mui/icons-material";

import Comment from '../../images/comment.svg';

const Container = styled(Box)`
    padding: 10px 0px 8px 16px;
    background: #FFFFFF;
    & > svg {
        font-size: 28px;
        padding-right: 16px;
        cursor: pointer;
    }
`

const PostInteraction = () => {
    const [liked, setLiked] = useState(false);

    const handleLike = () => setLiked(prev => !prev);

    return (
        <Container>
            {liked ? (
                <Favorite onClick={handleLike} sx={{ color: 'red' }} />
            ) : (
                <FavoriteBorderOutlined onClick={handleLike} />
            )}
            <ModeCommentOutlined />
        </Container>
    )
}

export default PostInteraction;