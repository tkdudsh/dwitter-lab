import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Skills from './pages/Skills.jsx'
import Work from './pages/Work.jsx'
import Testimonials from './pages/Testimonials.jsx'
import { store } from './app/store.js'
import { Provider } from 'react-redux'

//router 객체 생성
const router = createBrowserRouter([
  {
      path: "/",
      element: <App/>, //Layout 구성 컴포넌트 정의 : App.jsx는 미리 생성됨
      children: [
        {index: true, element: <Home />},
        {path: "/about", element: <About />},
        {path: "/skills", element: <Skills />},
        {path: "/work", element: <Work />},
        {path: "/testimonials", element: <Testimonials />}
      ],
    },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
