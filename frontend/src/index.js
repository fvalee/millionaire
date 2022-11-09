import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/App.css';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Game from "./components/game";
import Administrator from "./components/administrator";
import QuestionEditor from "./components/questionEditor";
import GameEditor from "./components/gameEditor";

const router = createBrowserRouter([
    {
        name: "home",
        path: "/",
        element: <App />
    },
    {
        name: "game",
        path: "/:id",
        element: <Game />
    },
    {
        name: "administrator",
        path: "/administrator",
        element: <Administrator />
    },
    {
        name: "administrator",
        path: "/administrator/edit/questions",
        element: <QuestionEditor />
    },
    {
        name: "administrator",
        path: "/administrator/edit/game",
        element: <GameEditor />
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
