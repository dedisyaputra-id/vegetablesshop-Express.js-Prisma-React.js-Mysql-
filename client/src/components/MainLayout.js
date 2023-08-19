import NavigationBar from "./navbar";

const MainLayout = ({ children }) => {
  return (
    <>
      <NavigationBar />
      {children}
    </>
  );
};

export default MainLayout;
