import { Route, Routes } from "react-router-dom";
import {useEffect, lazy , Suspense} from 'react'
import Summarize from "./pages/Summarize";
import SummarizeApp from "./components/SummarizeApp";
import Layout from './components/layout/Layout.jsx';
import CustomToast from "./components/CustomToast.jsx";
import PageTransition from "./components/common/PageTransition.jsx";

const Home = lazy(()=>import('./pages/Home'))
const CreatePost = lazy(()=>import('./pages/CreatePost'));
const CommingSoon = lazy(()=>import('./components/common/CommingSoon'));


const App = () => {
  
  useEffect(()=>{
    CustomToast();
  },[])


  return (
    <Suspense fallback={<PageTransition/>}>
    <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/summarize" element={<CommingSoon />} />
          <Route path="/pdf-analyzer" element={<CommingSoon />} />
        </Routes>
    </Layout>
    </Suspense>

  );
};

export default App;
