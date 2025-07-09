import { useState, useEffect } from 'react';
import { Box, styled } from '@mui/material';

const Container = styled(Box)`
    margin: 60px 0 0 244px;
    width: 935px;
    padding: 20px;
    display: flex;
    justify-content: center;
`;

const GridContainer = styled(Box)`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4px;
    max-width: 800px;
    width: 100%;
`;

const ImageContainer = styled(Box)`
    aspect-ratio: 1;
    overflow: hidden;
    cursor: pointer;
    transition: opacity 0.2s;
    
    &:hover {
        opacity: 0.8;
    }
`;

const Image = styled('img')`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const Explore = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        // Generate random stock images from Unsplash
        const generateImages = () => {
            const imageUrls = [];
            for (let i = 0; i < 30; i++) {
                const randomId = Math.floor(Math.random() * 1000);
                imageUrls.push(`https://picsum.photos/300/300?random=${randomId}`);
            }
            setImages(imageUrls);
        };

        generateImages();
    }, []);

    return (
        <Container>
            <GridContainer>
                {images.map((imageUrl, index) => (
                    <ImageContainer key={index}>
                        <Image src={imageUrl} alt={`explore-${index}`} />
                    </ImageContainer>
                ))}
            </GridContainer>
        </Container>
    );
};

export default Explore; 