import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import { Navigate } from "react-router";

import "./App.css";

import PostsList from "./components/PostsList";
import PostDetail from "./components/PostDetail";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="post/:postid" element={<PostDetail />} />
        <Route index element={<PostsList />} />
      </Route>
    </Routes>
  );
}

export default App;
