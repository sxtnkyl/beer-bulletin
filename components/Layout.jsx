import BottomNav from "./bottomNav";
//https://nextjs.org/docs/basic-features/layouts

const Layout = ({ children }) => {
  return (
    <>
      {children}
      <BottomNav />
    </>
  );
};

export default Layout;

//Future use for conditional layouts (mobile vs desktop)

// Page.getLayout = (page) => (
//   <Layout>
//     <NestedLayout>{page}</NestedLayout>
//   </Layout>
// )
