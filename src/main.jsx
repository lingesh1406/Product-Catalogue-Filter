import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
// import App from './App.jsx';
// import MainProject1 from './project/main';
// import Context from './project/context/context';
import ProductFilterResponsive from './ibm-project/ibm';


createRoot(document.getElementById('root')).render(
  <>

  {/* <Context>
    <MainProject1 />
  </Context> */}

  <ProductFilterResponsive/>
</>
)
