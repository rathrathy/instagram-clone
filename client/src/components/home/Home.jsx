import { Box, styled } from '@mui/material';

// components
import Posts from "./Posts";
import Suggestions from './Suggestions';
import Stories from './Stories';

const Container = styled(Box)`
    margin: 60px 0 0 200px;
    width: calc(100vw - 200px);
    height: calc(100vh - 60px);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 40px 20px 0 20px;
    gap: 32px;
    overflow-x: visible;
    overflow-y: visible;
    position: relative;
    box-sizing: border-box;
`

const MainContent = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 614px;
    width: 100%;
    margin-top: -80px;
    margin-left: -150px;
`;

const SuggestionsWrapper = styled(Box)`
    position: absolute;
    right: 50px;
    top: -40px;
    width: 250px;
`;

const Home = () => {
    return (
        <>
            <Container>
                <MainContent>
                    <Stories />
                    <Posts />
                </MainContent>
                <SuggestionsWrapper>
                    <Suggestions />
                </SuggestionsWrapper>
            </Container>
        </>
    )
}

export default Home;