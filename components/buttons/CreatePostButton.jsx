import * as C from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import theme from "../../styles/theme";

//TODO: add logic to render if session

const useStyles = C.makeStyles((theme) => ({
  createPostBtn: {
    position: "absolute",
    top: "-110%",
    right: "5%",
  },
}));
const CreatePostButton = () => {
  const classes = useStyles();
  return (
    <C.Fab
      className={classes.createPostBtn}
      size="medium"
      aria-label="create post"
    >
      <AddCircleIcon />
    </C.Fab>
  );
};

export default CreatePostButton;
