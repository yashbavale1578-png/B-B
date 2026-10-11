import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AmbientCanvas } from './components/AmbientCanvas';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { CartDrawer } from './components/CartDrawer';

// Customer Pages
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { OrderPage } from './pages/OrderPage';
import { ReservationsPage } from './pages/ReservationsPage';
import { TableQRPage } from './pages/TableQRPage';
import { EventsPage } from './pages/EventsPage';
import { LoyaltyPage } from './pages/LoyaltyPage';
import { GalleryPage } from './pages/GalleryPage';
import { StoryPage } from './pages/StoryPage';
import { PromotionsPage } from './pages/PromotionsPage';
import { ContactPage } from './pages/ContactPage';
import { CustomerAccountPage } from './pages/CustomerAccountPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Portal Pages
import { StaffPortalPage } from './pages/StaffPortalPage';
import { ManagementPortalPage } from './pages/ManagementPortalPage';
import { MaintenancePortalPage } from './pages/MaintenancePortalPage';

const AppContent: React.FC = () => {
  const { currentRoute, isRouteValid } = useStore();

  // Render appropriate dedicated page component based on route
  const renderView = () => {
    if (!isRouteValid) {
      return <NotFoundPage requestedRoute={currentRoute} />;
    }

    switch (currentRoute) {
      case 'home':
        return <HomePage />;
      case 'menu':
        return <MenuPage />;
      case 'order':
        return <OrderPage />;
      case 'reservations':
        return <ReservationsPage />;
      case 'table-qr':
        return <TableQRPage />;
      case 'events':
        return <EventsPage />;
      case 'loyalty':
        return <LoyaltyPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'story':
        return <StoryPage />;
      case 'promotions':
        return <PromotionsPage />;
      case 'contact':
        return <ContactPage />;
      case 'account':
        return <CustomerAccountPage />;
      case 'staff-portal':
        return <StaffPortalPage />;
      case 'mgmt-portal':
        return <ManagementPortalPage />;
      case 'maint-portal':
        return <MaintenancePortalPage />;
      default:
        return <NotFoundPage requestedRoute={currentRoute} />;
    }
  };

  return (
    <div className="app-container" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* ThreeUI Ambient Fluid Canvas */}
      <AmbientCanvas />

      {/* Persistent Toast Notifications */}
      <ToastContainer />

      {/* Sliding Slide-over Cart Drawer */}
      <CartDrawer />

      {/* Sticky Glassmorphic Navbar with Portal Switching */}
      <Navbar />

      {/* Main Page Content with Smooth Enter Fade */}
      <main 
        id="main-content"
        key={currentRoute}
        className="page-enter-animation"
        style={{ 
          flex: 1, 
          position: 'relative', 
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {renderView()}
      </main>

      {/* Editorial Footer */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
};

export default App;
