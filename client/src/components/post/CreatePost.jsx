import { useState } from 'react';

import { Dialog, Typography, Box, styled, Button } from '@mui/material';

import { uploadFile } from '../../services/api';

// components
import SharePost from './SharePost';

const Header = styled(Box)`
    border-bottom: 1px solid rgb(219, 219, 219);
    align-items: center;
    height: 43px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    & > p {
        align-items: center;
        display: flex;
        text-align: center;
        justify-content: center;
        color: rdb(38, 38, 38);
        font-weight: 600;
        flex-direction: column;
    }
`;

const ImageWrapper = styled(Box)({
    width: 200,
    height: 85,
    overflow: 'hidden',
    '& > img': {
        width: 550,
        height: 300,
        margin: '-65px 0 0 -165px'
    }
});

const Wrapper = styled(Box)`
    align-self: center;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & > p {
        font-size: 22px;
        font-family: inherit;
        font-weight: 300;
    }
    & > label > p { 
        background: #0095F6;
        color: #fff;
        border-radius: 4px;
        font-size: 14px;
        margin-top: 20px;
        text-transform: none;
        width: fit-content;
        padding: 5px 10px;
    }
`

const OptionsWrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 20px;
    padding: 40px;
`;

const OptionButton = styled(Button)`
    width: 200px;
    height: 60px;
    font-size: 16px;
    font-weight: 600;
    text-transform: none;
    border-radius: 8px;
    background: #0095F6;
    color: white;
    
    &:hover {
        background: #0081d6;
    }
`;

const StoryButton = styled(Button)`
    width: 200px;
    height: 60px;
    font-size: 16px;
    font-weight: 600;
    text-transform: none;
    border-radius: 8px;
    background: #833AB4;
    color: white;
    
    &:hover {
        background: #6a2f8f;
    }
`;

const dialogStyle = {
    marginTop: '2%',
    height: '580px',
    width: '550px',
    borderRadius: 3,
    boxShadow: 'none',
    overflow: 'hidden'
}

const CreatePost = ({ open, setOpen }) => {

    const [image, setImage] = useState('');
    const [share, setShare] = useState(false);
    const [showOptions, setShowOptions] = useState(true);
    const [isStory, setIsStory] = useState(false);

    const uploadImage = 'https://havecamerawilltravel.com/wp-content/uploads/2021/10/Instagram-Post-from-Computer-or-Laptop-2.jpg';

    const closeDialog = () => {
        setOpen(false);
        setShowOptions(true);
        setIsStory(false);
        setShare(false);
        setImage('');
    }

    const onFileChange = async (e) => {
        const data = new FormData();
        data.append("name", e.target.files[0].name);
        data.append("file", e.target.files[0]);

        let response = await uploadFile(data);

        if (response) {
            setImage(response.data);
            setShare(true);
        }
    }

    const handlePostClick = () => {
        setShowOptions(false);
        setIsStory(false);
    }

    const handleStoryClick = () => {
        setShowOptions(false);
        setIsStory(true);
    }

    if (showOptions) {
        return (
            <Dialog
                open={open}
                onClose={() => closeDialog()}
                maxWidth={'md'}
                PaperProps={{ sx: dialogStyle }}
            >
                <Header>
                    <Typography>Create</Typography>
                </Header>
                <OptionsWrapper>
                    <OptionButton onClick={handlePostClick}>
                        Create Post
                    </OptionButton>
                    <StoryButton onClick={handleStoryClick}>
                        Create Story
                    </StoryButton>
                </OptionsWrapper>
            </Dialog>
        );
    }

    return (
        !share ? 
            <Dialog
                open={open}
                onClose={() => closeDialog()}
                maxWidth={'md'}
                PaperProps={{ sx: dialogStyle }}
            >
                <Header>
                    <Typography>{isStory ? 'Create new story' : 'Create new post'}</Typography>
                </Header>
                <Wrapper>
                    <ImageWrapper>
                        <img src={uploadImage} alt="image" />
                    </ImageWrapper>
                    <Typography>Drag photos and videos here</Typography>
                    <label htmlFor="imageInput">
                        <Typography>Select from computer</Typography>
                    </label>
                    <input
                        type='file'
                        id="imageInput"
                        style={{ display: 'none' }}
                        onChange={(e) => onFileChange(e)}
                    />
                </Wrapper>
            </Dialog>
        :
        <SharePost open={share} setOpen={setShare} image={image} closeDialog={closeDialog} isStory={isStory} />
    )
}

export default CreatePost;