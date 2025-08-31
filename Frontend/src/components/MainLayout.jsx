import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ProtectedRoute from './ProtectedRoute';

const MainLayout = () => {
  return (
    <ProtectedRoute>
      <Header />
      <main>
        <Outlet /> 
      </main>
      <Footer />
    </ProtectedRoute>
  );
};

export default MainLayout;