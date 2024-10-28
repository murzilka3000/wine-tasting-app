// frontend/src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WineList from './components/WineList';
import AddWineForm from './components/AddWineForm';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <h1>Virtual Wine Taster</h1>
        <Routes>
          <Route path="/" element={<WineList />} />
          <Route path="/add-wine" element={<AddWineForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;