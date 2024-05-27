import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import './app.css';
import { Home } from './home';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/page-2" element={<div>1</div>} />
      </Routes>
      {/* END: routes */}
    </StyledApp>
  );
}

export default App;
