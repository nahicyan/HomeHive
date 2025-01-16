import Site from "./pages/Site";
import "./App.css";
import Layout from "./components/Layout/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import Properties from "./pages/Properties/Properties";
import { QueryClient, QueryClientProvider } from 'react-query';
import {ToastContainer} from 'react-toastify'
import {ReactQueryDevtools} from "react-query/devtools"
import "react-toastify/dist/ReactToastify.css";
function App() {
  const queryClient = new QueryClient(); 
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>} />
      <Routes>
        <Route element={<Layout />}>
            <Route path="/" element={<Site />} />
            <Route path="/properties" element={<Properties/>}/>
          </Route>
      </Routes>
    </BrowserRouter>
    <ToastContainer/>
    <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  );
}

export default App;
