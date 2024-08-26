import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GlobalStyles } from '@mui/material';
import path from "./router/routes";

function App() {
  return (
    <>
      <GlobalStyles styles={{
        body: {
          fontFamily: 'Arial, sans-serif',
          backgroundColor: 'white',
          margin: 0,
          padding: 0,
          overflowX: 'hidden',
        },
        '::-webkit-scrollbar': {
          width: '5px',
        },
        '::-webkit-scrollbar-track': {
          background: '#f1f1f1',
        },
        '::-webkit-scrollbar-thumb': {
          background: '#888',
          borderRadius: '10px',
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: '#555',
        },
      }} />
      <Router>
        <Routes>
          {path.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.page />}
            />
          ))}
        </Routes>
      </Router>
    </>
  );
}

export default App;
