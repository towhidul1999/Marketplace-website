import dynamic from 'next/dynamic';
const Header = dynamic(() => import('./Header/Header'), { ssr: false });
import Footer from "./Footer/Footer";

const PrimaryLayout = ({ children,isFooterAdd }) => {
  return (
    <>
      <Header />
      {children}
      {!isFooterAdd && <Footer />}
    </>
  );
};

export default PrimaryLayout;
