import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { UserRole } from '../types';
import { 
  Beer, 
  ShoppingBag, 
  Calendar, 
  Menu as MenuIcon, 
  X, 
  ShieldCheck, 
  Users, 
  BarChart3, 
  QrCode, 
  Sparkles,
  ChevronDown,
  Compass,
  ArrowRight,
  UserCheck
} from 'lucide-react';

interface NavbarProps {
  currentTab?: string;
  onNavigate?: (tab: string) => void;
  onOpenCart?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onNavigate, onOpenCart }) => {
  const { cart, currentUser, switchRole, serverAlerts, currentRoute, setCurrentRoute, setIsCartOpen } = useStore();
  const activeTab = currentTab || currentRoute;
  const handleNav = (tab: string) => {
    if (onNavigate) onNavigate(tab);
    else setCurrentRoute(tab);
  };
  const handleOpenCart = onOpenCart || (() => setIsCartOpen(true));

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Primary desktop bar links
  const primaryNavLinks = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu & Taps' },
    { id: 'order', label: 'Order Online' },
    { id: 'reservations', label: 'Reservations' },
    { id: 'events', label: 'Events' },
    { id: 'loyalty', label: 'The Mango Club' }
  ];

  // Secondary "Explore" dropdown links for desktop
  const secondaryNavLinks = [
    { id: 'table-qr', label: 'Table QR Ordering' },
    { id: 'promotions', label: 'Offers & Happy Hours' },
    { id: 'gallery', label: 'Venue Photo Gallery' },
    { id: 'story', label: 'Brewing Heritage' },
    { id: 'contact', label: 'Contact & Location' },
    { id: 'account', label: 'Customer Account' }
  ];

  // Complete list for mobile drawer
  const allNavLinks = [
    { id: 'home', label: 'Taproom Home', section: 'Discovery' },
    { id: 'menu', label: 'Menu & 6 Craft Taps', section: 'Discovery' },
    { id: 'order', label: 'Online Takeaway & Delivery', section: 'Discovery' },
    { id: 'reservations', label: 'Direct Table Bookings', section: 'Discovery' },
    { id: 'table-qr', label: 'In-Venue Table QR', section: 'Discovery' },
    { id: 'events', label: 'Corporate Outings & Functions', section: 'Experiences' },
    { id: 'loyalty', label: 'The Mango Club VIP Society', section: 'Experiences' },
    { id: 'promotions', label: 'Happy Hours & Deals', section: 'Experiences' },
    { id: 'gallery', label: 'Atmospheric Photo Gallery', section: 'Experiences' },
    { id: 'story', label: 'Brewing Heritage & Values', section: 'Experiences' },
    { id: 'contact', label: 'Location & Valet Access', section: 'Experiences' },
    { id: 'account', label: 'Patron Account & Orders', section: 'Experiences' }
  ];

  const portals: { role: UserRole; label: string; icon: any; route: string }[] = [
    { role: 'CUSTOMER', label: 'Customer Portal', icon: Sparkles, route: 'account' },
    { role: 'STAFF', label: 'Staff Operations', icon: Users, route: 'staff-portal' },
    { role: 'MANAGEMENT', label: 'Executive Management', icon: BarChart3, route: 'mgmt-portal' },
    { role: 'MAINTENANCE', label: 'Maintenance Command', icon: ShieldCheck, route: 'maint-portal' }
  ];

  const handleRoleSelect = (p: typeof portals[0]) => {
    switchRole(p.role);
    setRoleDropdownOpen(false);
    handleNav(p.route);
  };

  const activePortalInfo = portals.find(p => p.role === currentUser.role) || portals[0];

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: '76px',
          display: 'flex',
          alignItems: 'center',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          background: isScrolled ? 'rgba(17, 17, 17, 0.95)' : 'rgba(17, 17, 17, 0.8)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: isScrolled ? '1px solid var(--hairline)' : '1px solid rgba(232, 220, 197, 0.08)',
          boxShadow: isScrolled ? '0 8px 30px rgba(0,0,0,0.6)' : 'none'
        }}
        role="navigation"
        aria-label="Main Navigation"
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          {/* Brand Wordmark & Crest */}
          <a
            href="#/"
            onClick={(e) => {
              e.preventDefault();
              handleNav('home');
            }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textAlign: 'left',
              padding: 0,
              textDecoration: 'none'
            }}
            aria-label="Brooks and Bonds Brewery Home"
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, var(--burgundy-bright) 0%, var(--burgundy) 100%)',
                border: '1px solid var(--hairline-strong)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--warm-cream)',
                boxShadow: '0 4px 14px rgba(121, 45, 67, 0.45)'
              }}
            >
              <Beer size={20} color="var(--champagne)" />
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '17px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: 'var(--warm-cream)',
                  lineHeight: 1.1
                }}
              >
                BROOKS &amp; BONDS
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9.5px',
                  letterSpacing: '0.22em',
                  color: 'var(--gold)',
                  textTransform: 'uppercase'
                }}
              >
                BREWERY · KORAMANGALA
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '16px'
            }}
            className="desktop-links"
          >
            {primaryNavLinks.map((link) => {
              const active = activeTab === link.id;
              return (
                <a
                  key={link.id}
                  href={`#/${link.id === 'home' ? '' : link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav(link.id);
                  }}
                  aria-current={active ? 'page' : undefined}
                  style={{
                    color: active ? 'var(--gold)' : 'var(--champagne)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '12.5px',
                    fontWeight: active ? 600 : 400,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    padding: '8px 4px',
                    position: 'relative',
                    transition: 'color 0.2s ease'
                  }}
                >
                  {link.label}
                  {active && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '4px',
                        right: '4px',
                        height: '2px',
                        background: 'linear-gradient(90deg, var(--gold), var(--burgundy-bright))',
                        borderRadius: '2px'
                      }}
                    />
                  )}
                </a>
              );
            })}

            {/* Desktop "Explore" Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: secondaryNavLinks.some(s => s.id === activeTab) ? 'var(--gold)' : 'var(--champagne)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '12.5px',
                  fontWeight: secondaryNavLinks.some(s => s.id === activeTab) ? 600 : 400,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  padding: '8px 4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                aria-haspopup="true"
                aria-expanded={moreDropdownOpen}
              >
                <span>Explore</span>
                <ChevronDown size={12} />
              </button>

              {moreDropdownOpen && (
                <div
                  className="glass-panel-elevated"
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    left: 0,
                    width: '210px',
                    padding: '8px',
                    zIndex: 1100,
                    boxShadow: '0 16px 40px rgba(0,0,0,0.85)'
                  }}
                >
                  {secondaryNavLinks.map((s) => {
                    const isSubActive = activeTab === s.id;
                    return (
                      <a
                        key={s.id}
                        href={`#/${s.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNav(s.id);
                          setMoreDropdownOpen(false);
                        }}
                        style={{
                          display: 'block',
                          padding: '9px 12px',
                          color: isSubActive ? 'var(--gold)' : 'var(--champagne)',
                          textDecoration: 'none',
                          fontSize: '12px',
                          borderRadius: '6px',
                          background: isSubActive ? 'rgba(84, 26, 43, 0.4)' : 'transparent',
                          transition: 'background 0.2s ease'
                        }}
                      >
                        {s.label}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right Actions: Portal Switcher, Cart, Action Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Global Role Switcher Pill */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="badge badge-gold"
                style={{
                  cursor: 'pointer',
                  padding: '7px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  border: '1px solid rgba(185, 154, 98, 0.45)',
                  background: 'rgba(25, 23, 25, 0.9)'
                }}
                aria-haspopup="true"
                aria-expanded={roleDropdownOpen}
                aria-label="Active Portal Role"
              >
                <activePortalInfo.icon size={13} color="var(--gold)" />
                <span style={{ fontSize: '11px', fontWeight: 600 }}>{currentUser.role}</span>
                {currentUser.role === 'STAFF' && serverAlerts.length > 0 && (
                  <span
                    style={{
                      background: 'var(--danger)',
                      color: '#fff',
                      borderRadius: '999px',
                      padding: '1px 5px',
                      fontSize: '9px',
                      fontWeight: 700
                    }}
                  >
                    {serverAlerts.length}
                  </span>
                )}
                <ChevronDown size={11} />
              </button>

              {roleDropdownOpen && (
                <div
                  className="glass-panel-elevated"
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    width: '240px',
                    padding: '8px',
                    zIndex: 1100,
                    boxShadow: '0 16px 40px rgba(0,0,0,0.85)'
                  }}
                >
                  <div
                    style={{
                      padding: '6px 10px',
                      fontSize: '10px',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-dim)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em'
                    }}
                  >
                    Demonstration Portals
                  </div>
                  {portals.map((p) => {
                    const isCurrent = currentUser.role === p.role;
                    const IconComp = p.icon;
                    return (
                      <button
                        key={p.role}
                        onClick={() => handleRoleSelect(p)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '10px 12px',
                          background: isCurrent ? 'rgba(84, 26, 43, 0.4)' : 'transparent',
                          border: isCurrent ? '1px solid var(--burgundy-border)' : '1px solid transparent',
                          borderRadius: '8px',
                          color: isCurrent ? 'var(--warm-cream)' : 'var(--champagne)',
                          cursor: 'pointer',
                          textAlign: 'left',
                          fontSize: '12.5px',
                          marginBottom: '3px'
                        }}
                      >
                        <IconComp size={16} color={isCurrent ? 'var(--gold)' : 'var(--text-muted)'} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600 }}>{p.label}</div>
                          <div style={{ fontSize: '10px', color: 'var(--text-dim)' }}>
                            Role: {p.role}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Cart Icon */}
            <button
              onClick={handleOpenCart}
              style={{
                position: 'relative',
                background: 'rgba(25, 23, 25, 0.8)',
                border: '1px solid var(--hairline)',
                borderRadius: '50%',
                width: '42px',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--champagne)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              aria-label={`View cart with ${cartItemCount} items`}
            >
              <ShoppingBag size={18} />
              {cartItemCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    background: 'linear-gradient(135deg, var(--burgundy-bright), var(--burgundy))',
                    color: 'var(--warm-cream)',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 700,
                    border: '1px solid var(--hairline)'
                  }}
                >
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Primary Action Button */}
            <a
              href="#/reservations"
              onClick={(e) => {
                e.preventDefault();
                handleNav('reservations');
              }}
              className="btn btn-burgundy desktop-only-btn"
              style={{ padding: '8px 18px', fontSize: '12px' }}
            >
              <Calendar size={14} />
              <span>Reserve Table</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-nav-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-hamburger-btn"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--warm-cream)',
                cursor: 'pointer',
                padding: '8px',
                display: 'flex',
                alignItems: 'center'
              }}
              aria-label="Open mobile navigation"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            background: 'rgba(17, 17, 17, 0.98)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            padding: '96px 24px 32px',
            overflowY: 'auto'
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Drawer"
        >
          {/* Portals in Mobile */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--gold)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>
              PORTALS &amp; ACCESS
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {portals.map((p) => (
                <button
                  key={p.role}
                  onClick={() => {
                    handleRoleSelect(p);
                    setMobileMenuOpen(false);
                  }}
                  className="btn btn-outline"
                  style={{
                    fontSize: '11px',
                    padding: '8px 10px',
                    textAlign: 'left',
                    borderColor: currentUser.role === p.role ? 'var(--gold)' : 'var(--hairline)'
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '32px' }}>
            {allNavLinks.map((link) => (
              <a
                key={link.id}
                href={`#/${link.id === 'home' ? '' : link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(link.id);
                  setMobileMenuOpen(false);
                }}
                style={{
                  color: activeTab === link.id ? 'var(--gold)' : 'var(--warm-cream)',
                  fontFamily: 'var(--font-display)',
                  fontSize: '18px',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  textDecoration: 'none',
                  textAlign: 'left',
                  padding: '10px 0',
                  borderBottom: '1px solid var(--hairline)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>{link.label}</span>
                {activeTab === link.id && <ArrowRight size={14} color="var(--gold)" />}
              </a>
            ))}
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a
              href="#/reservations"
              onClick={(e) => {
                e.preventDefault();
                handleNav('reservations');
                setMobileMenuOpen(false);
              }}
              className="btn btn-burgundy"
              style={{ width: '100%', padding: '14px' }}
            >
              <Calendar size={18} />
              <span>Reserve a Table</span>
            </a>
            <a
              href="#/table-qr"
              onClick={(e) => {
                e.preventDefault();
                handleNav('table-qr');
                setMobileMenuOpen(false);
              }}
              className="btn btn-outline"
              style={{ width: '100%', padding: '14px' }}
            >
              <QrCode size={18} />
              <span>In-Venue Table QR Ordering</span>
            </a>
          </div>
        </div>
      )}

      {/* Responsive Inline CSS rules */}
      <style>{`
        @media (min-width: 1024px) {
          .desktop-links {
            display: flex !important;
          }
          .mobile-hamburger-btn {
            display: none !important;
          }
        }
        @media (max-width: 1023px) {
          .desktop-links {
            display: none !important;
          }
          .desktop-only-btn {
            display: none !important;
          }
          .mobile-hamburger-btn {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
};
