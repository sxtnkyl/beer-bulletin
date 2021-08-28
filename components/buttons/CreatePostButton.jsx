import * as C from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import theme from "../../styles/theme";

//TODO: add logic to render if session

const useStyles = C.makeStyles((theme) => ({
  createPostBtn: {
    position: "absolute",
    bottom: "10%",
    marginLeft: "auto",
    marginRight: "auto",
    left: 0,
    right: 0,
  },
}));
const CreatePostButton = (props) => {
  const classes = useStyles();
  return (
    <C.Fab
      className={classes.createPostBtn}
      size="large"
      aria-label="create post"
      onClick={props.onClick}
    >
      {/* <AddCircleIcon /> */}
      New Post
    </C.Fab>
  );
};

export default CreatePostButton;
