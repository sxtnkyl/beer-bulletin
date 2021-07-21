import * as C from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const CreatePostButton = () => {
  return (
    <C.IconButton aria-label="delete">
      <AddCircleIcon />
    </C.IconButton>
  );
};

export default CreatePostButton;
