import Footer from "./Footer/Footer";
import dynamic from 'next/dynamic';
const Header = dynamic(() => import('./Header/Header'), { ssr: false });

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
