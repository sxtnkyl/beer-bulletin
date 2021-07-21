import * as C from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import theme from "../../styles/theme";

const useStyles = C.makeStyles((theme) => ({
  createPostBtn: {
    position: "absolute",
    top: "-110%",
    right: "5%",
    background: "blue",
  },
}));
const CreatePostButton = () => {
  const classes = useStyles();
  return (
    <C.IconButton className={classes.createPostBtn} aria-label="create post">
      <AddCircleIcon />
    </C.IconButton>
  );
};

export default CreatePostButton;
