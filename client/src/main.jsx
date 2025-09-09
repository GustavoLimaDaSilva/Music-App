import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";
import Home from './components/home';
import ContentLayoutRoot from './content-layout/content-layout-root'
import PlaylistContent from './components/playlistContent.jsx';
import SearchResults from './components/searchResults';
import AuthProvider from './authProvider.jsx';
import App from './App';
import { Playlists } from './components/playlists.jsx';
import Login from './components/login.jsx';
import PlayerProvider from './playerProvider.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
     
      {
        path: "Home",
        Component: Home,
        children: [   
          {
            path: "search",
            Component: SearchResults,
          },
        ],
      },
      {
            path: ":type/:id",
            Component: ContentLayoutRoot,
          },
      {
        path: "Playlists",
        Component: Playlists,
      },
      {
        path: "Playlists/:id",
        Component: ContentLayoutRoot
      }
    ]
  },
   {
        path: "Login",
        Component: Login
      }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <PlayerProvider>
      <RouterProvider router={router} />
    </PlayerProvider>
    </AuthProvider>
  </StrictMode>
);

