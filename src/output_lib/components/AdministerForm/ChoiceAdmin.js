// @flow

import React from "react";
import { ChoiceType } from "../../types";
import { List } from "immutable";
import { DragTypes } from "./DragTypes";
import { DragSource, DropTarget } from "react-dnd";

type Props = {
  choice: ChoiceType,
  sectionId: number | string,
  questionId: number | string,
  setChoiceLabel: Function,
  moveChoice: Function,
  reorderChoice: Function,
  deleteChoice: Function,
  metadataFields: List<string>,
  setMetadataFieldValue: Function,
  connectDropTarget: Function,
  connectDragPreview: Function,
  connectDragSource: Function,
  isOver: boolean,
  canDrop: boolean
};

const choiceSource = {
  beginDrag(props) {
    return {
      choiceId: props.choice.id
    };
  }
};

const choiceTarget = {
  canDrop(props, monitor) {
    return true;
  },

  drop(props, monitor) {
    let { reorderChoice, choice } = props;
    let { order } = choice;
    let item = monitor.getItem();
    reorderChoice(item.choiceId, order);
  }
};

function dropCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

function dragCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

function ChoiceAdmin(props: Props) {
  const {
    choice,
    sectionId,
    questionId,
    setChoiceLabel,
    deleteChoice,
    metadataFields,
    setMetadataFieldValue,
    connectDropTarget,
    connectDragPreview,
    connectDragSource,
    isOver,
    canDrop
  } = props;

  const metadataInputs = metadataFields.map((fieldName, i) => (
    <td key={i}>
      <input
        type="text"
        value={choice.metadata.get(fieldName) || ""}
        onInput={evt =>
          setMetadataFieldValue(choice.id, fieldName, evt.target.value)}
      />
    </td>
  ));

  let className = "admin-formchoice";
  if (isOver) {
    className += " -is-over";
  }
  if (!canDrop) {
    className += " -cannot-drop";
  }

  return connectDropTarget(
    connectDragPreview(
      <tr className={className}>
        <td>
          {connectDragSource(<i className="fa fa-bars grippy" />)}
        </td>
        <td>
          <label>
            <input
              type="text"
              value={choice.label}
              name="name"
              onChange={e =>
                setChoiceLabel(
                  sectionId,
                  questionId,
                  choice.id,
                  e.target.value
                )}
            />
          </label>
        </td>
        {metadataInputs}
        <td>
          <i
            onClick={e => deleteChoice(sectionId, questionId, choice.id)}
            className="fa fa-times-circle-o delete"
          />
        </td>
      </tr>
    )
  );
}

export default DropTarget(DragTypes.CHOICE, choiceTarget, dropCollect)(
  DragSource(DragTypes.CHOICE, choiceSource, dragCollect)(ChoiceAdmin)
);
