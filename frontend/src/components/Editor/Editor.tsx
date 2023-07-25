import ReactQuill from "react-quill";

import { formats, modules } from "../../utils/index";
import { Recipe } from "../../interfaces/RecipeInterface";
import { Col, Form } from "react-bootstrap";

import "./editor.css";

type EditorProps = {
  recipe: Recipe;
  onChange: any;
};

const Editor = ({ recipe, onChange }: EditorProps) => {
  return (
    <Col md={12} id='editor'>
      <Form.Label htmlFor='instructions'>Instructions</Form.Label>

      <ReactQuill
        value={recipe.instructions}
        onChange={onChange}
        theme='snow'
        modules={modules}
        formats={formats}
        placeholder='Write something amazing...'
      />
    </Col>
  );
};

export default Editor;
