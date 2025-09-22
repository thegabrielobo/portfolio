import React, { LazyExoticComponent, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

export type Pages = {
  [key: string]: {
    component: LazyExoticComponent<() => JSX.Element>;
    path: string;
  };
};

export const pages: Pages = {
  home: {
    component: React.lazy(() => import('./pages/Home')),
    path: '/',
  },
    project: {
        component: React.lazy(() => import('./pages/Project')),
        path: '/project/:projectIndex',
    },
};

const Routing = () => {
  const pagesKeys = Object.keys(pages || {});
  return (
    <Routes>
      {pagesKeys.map((pageKey) => {
        const { path, component: Component } = pages[pageKey];
        return (
          <Route
            key={path}
            path={path}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Component />
              </Suspense>
            }
          />
        );
      })}
    </Routes>
  );
};

export default Routing;
