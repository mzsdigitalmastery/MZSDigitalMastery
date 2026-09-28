import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HeroSection } from './components/home/HeroSection';
import { CategoryGrid } from './components/home/CategoryGrid';
import { FeaturedSection } from './components/home/FeaturedSection';
import { HubHighlights } from './components/home/HubHighlights';
import { CommunitySection } from './components/home/CommunitySection';
import { RequestCtaSection } from './components/home/RequestCtaSection';
import { ResourcesHubPage } from './pages/ResourcesHubPage';
import { CategoryHubPage } from './pages/CategoryHubPage';
import { RequestPage } from './pages/RequestPage';
import { CommunityPage } from './pages/CommunityPage';
import { AdminPage } from './pages/AdminPage';
import { LegalPage } from './pages/LegalPage';
import { ResourceModal } from './components/modals/ResourceModal';
import { SearchModal } from './components/modals/SearchModal';
import { AuthModal } from './components/modals/AuthModal';
import { getResources, getResourceBySlug, testFirestoreConnection } from './firebase/firestore';
import { Resource } from './types';
import { CATEGORIES_CONFIG } from './config/site';

function MainApp() {
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname || '/');
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeResource, setActiveResource] = useState<Resource | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [searchPreQuery, setSearchPreQuery] = useState('');

  const { savedResourceIds } = useAuth();

  // Load resources from Firestore
  const loadResourcesData = useCallback(async () => {
    setLoading(true);
    try {
      await testFirestoreConnection();
      const list = await getResources();
      setResources(list);
    } catch (err) {
      console.error('Failed to load resources:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadResourcesData();
  }, [loadResourcesData]);

  // Synchronize browser history and popstate
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/';
      setCurrentPath(path);

      // Check if path is a resource slug
      if (path.startsWith('/resources/')) {
        const slug = path.replace('/resources/', '');
        if (slug) {
          const found = resources.find((r) => r.slug === slug);
          if (found) {
            setActiveResource(found);
          } else {
            getResourceBySlug(slug).then((res) => {
              if (res) setActiveResource(res);
            });
          }
        }
      } else {
        setActiveResource(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [resources]);

  // Initial check for deep linked resource slug
  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith('/resources/') && path !== '/resources') {
      const slug = path.replace('/resources/', '');
      if (slug) {
        getResourceBySlug(slug).then((res) => {
          if (res) setActiveResource(res);
        });
      }
    }
  }, []);

  const navigateTo = (path: string, options?: { replace?: boolean }) => {
    if (path !== currentPath) {
      if (options?.replace) {
        window.history.replaceState({}, '', path);
      } else {
        window.history.pushState({}, '', path);
      }
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectResource = (resource: Resource) => {
    setActiveResource(resource);
    window.history.pushState({}, '', `/resources/${resource.slug}`);
  };

  const handleCloseResourceModal = () => {
    setActiveResource(null);
    if (window.location.pathname.startsWith('/resources/')) {
      window.history.pushState({}, '', '/resources');
      setCurrentPath('/resources');
    }
  };

  const handleHeroSearch = (query: string) => {
    setSearchPreQuery(query);
    navigateTo('/resources');
  };

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    resources.forEach((r) => {
      counts[r.category] = (counts[r.category] || 0) + 1;
    });
    return counts;
  }, [resources]);

  // Determine which page component to render
  const renderCurrentView = () => {
    // 1. Saved Resources Bookmark Page
    if (currentPath === '/resources' && window.location.search.includes('saved=true')) {
      return (
        <ResourcesHubPage
          resources={resources}
          loading={loading}
          onSelectResource={handleSelectResource}
          onNavigate={navigateTo}
          savedOnly={true}
          savedResourceIds={savedResourceIds}
        />
      );
    }

    // 2. Main Resource Directory Hub
    if (currentPath === '/resources' || currentPath.startsWith('/resources/')) {
      return (
        <ResourcesHubPage
          resources={resources}
          loading={loading}
          onSelectResource={handleSelectResource}
          onNavigate={navigateTo}
          initialSearch={searchPreQuery}
        />
      );
    }

    // 3. Category Hubs: Learn, Tools, AI, Create, Knowledge, Guides, Store
    const matchingCategory = CATEGORIES_CONFIG.find((c) => `/${c.slug}` === currentPath);
    if (matchingCategory) {
      return (
        <CategoryHubPage
          categoryMeta={matchingCategory}
          resources={resources}
          loading={loading}
          onSelectResource={handleSelectResource}
          onNavigate={navigateTo}
        />
      );
    }

    // Special category sub-routes
    if (currentPath === '/templates') {
      const cat = CATEGORIES_CONFIG.find((c) => c.slug === 'templates')!;
      return (
        <CategoryHubPage
          categoryMeta={cat}
          resources={resources}
          loading={loading}
          onSelectResource={handleSelectResource}
          onNavigate={navigateTo}
        />
      );
    }
    if (currentPath === '/graphics' || currentPath === '/video') {
      const cat = CATEGORIES_CONFIG.find((c) => c.slug === 'graphics')!;
      return (
        <CategoryHubPage
          categoryMeta={cat}
          resources={resources}
          loading={loading}
          onSelectResource={handleSelectResource}
          onNavigate={navigateTo}
        />
      );
    }

    // 4. Resource Request
    if (currentPath === '/request') {
      return <RequestPage onNavigate={navigateTo} />;
    }

    // 5. Community Hub
    if (currentPath === '/community') {
      return <CommunityPage onNavigate={navigateTo} />;
    }

    // 6. Admin Command Center
    if (currentPath === '/admin') {
      return (
        <AdminPage
          onNavigate={navigateTo}
          onRefreshGlobalResources={loadResourcesData}
        />
      );
    }

    // 7. Legal and Information Pages
    if (currentPath === '/privacy') {
      return <LegalPage type="privacy" onNavigate={navigateTo} />;
    }
    if (currentPath === '/terms') {
      return <LegalPage type="terms" onNavigate={navigateTo} />;
    }
    if (currentPath === '/copyright') {
      return <LegalPage type="copyright" onNavigate={navigateTo} />;
    }
    if (currentPath === '/licenses') {
      return <LegalPage type="licenses" onNavigate={navigateTo} />;
    }
    if (currentPath === '/about') {
      return <LegalPage type="about" onNavigate={navigateTo} />;
    }
    if (currentPath === '/contact') {
      return <LegalPage type="contact" onNavigate={navigateTo} />;
    }

    // 8. Default: Homepage
    return (
      <main>
        <HeroSection
          onSearch={handleHeroSearch}
          onExploreResources={() => navigateTo('/resources')}
          onStartLearning={() => navigateTo('/learn')}
        />

        <CategoryGrid
          onSelectCategory={(title, path) => navigateTo(path)}
          resourceCounts={categoryCounts}
        />

        <FeaturedSection
          resources={resources}
          onSelectResource={handleSelectResource}
          onViewAll={() => navigateTo('/resources')}
        />

        <HubHighlights
          resources={resources}
          onSelectResource={handleSelectResource}
          onNavigate={navigateTo}
        />

        <RequestCtaSection onRequestClick={() => navigateTo('/request')} />

        <CommunitySection />
      </main>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7FB] text-[#172033]">
      {/* Universal Navigation */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigateTo}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1">{renderCurrentView()}</div>

      {/* Resource Detail Modal */}
      <ResourceModal
        resource={activeResource}
        onClose={handleCloseResourceModal}
        onSelectResource={handleSelectResource}
        allResources={resources}
      />

      {/* Global Quick Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        resources={resources}
        onSelectResource={handleSelectResource}
        onViewAllResults={(query) => {
          setSearchPreQuery(query);
          navigateTo('/resources');
        }}
      />

      {/* Authentication & Admin Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      {/* Universal Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
