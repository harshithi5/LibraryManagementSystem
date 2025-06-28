import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Left from './Left';
import Right from './Right';
import Home from './Home';
import Search from './Search';
import Shelf from './Shelf';
import History from './History';
import Queryresult from './Queryresult';
import ProtectedRoute from './ProtectedRoute';

function Dashboard() {
  return ( 
    <div className="flex">
      <div className="h-screen w-80">
        <Left />
      </div>

      <div className="h-screen flex-1">
        <Routes>
          <Route path="/" element={<Right><Home /></Right>} />
          <Route path="/search" element={<Right><Search /></Right>} />
          <Route path="/shelf" element={<Right><Shelf /></Right>} />
          <Route path="/history" element={<Right><History /></Right>} />
          <Route path="/queryresult" element={<Right><Queryresult /></Right>} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
