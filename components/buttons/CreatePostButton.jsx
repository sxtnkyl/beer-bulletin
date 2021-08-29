import * as C from "@material-ui/core";
import PostAddOutlinedIcon from "@material-ui/icons/PostAddOutlined";
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
    zIndex: 3,
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
      <PostAddOutlinedIcon />
    </C.Fab>
  );
};

export default CreatePostButton;
