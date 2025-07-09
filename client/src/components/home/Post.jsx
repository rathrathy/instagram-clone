import { styled, Box } from '@mui/material';

// component
import PostHeader from "./PostHeader";
import PostInteraction from './PostInteraction';
import PostInformation from './PostInformation';
import PostCommentsSection from './PostCommentsSection';

const Component = styled(Box)`
    margin: 12px auto;
    border: 1px solid #dbdbdb;
    width: 614px;
    background: #FFFFFF;
`;

const Picture = styled('img')({
    width: '100%'
})

const Post = ({ post }) => {
    // Use real post data if available, otherwise use default
    const postImage = post?.image || 'https://wallpaperaccess.com/full/211836.jpg';
    const postCaption = post?.caption || 'Words are Words';
    const postUsername = post?.username || 'username';
    const postUserPicture = post?.userPicture || '';

    return (
        <Component>
            <PostHeader username={postUsername} userPicture={postUserPicture} />
            <Picture src={postImage} alt="picture" />
            <PostInteraction />
            <PostInformation caption={postCaption} username={postUsername} />
            <PostCommentsSection />
        </Component>
    )
}

export default Post;