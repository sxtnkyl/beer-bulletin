import * as C from "@material-ui/core";

const PageContainer = ({ children }) => {
  //add styling for single page
  return <C.Container>{children}</C.Container>;
};

export default PageContainer;
