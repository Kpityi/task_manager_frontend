import Button from "../../UI/Button";
import "./index.scss";
import classNames from "classnames";

const TaskCard = ({
  title,
  priority,
  status,
  description,
  date,
  onDelete,
  onEdit,
}) => {
  const taskPriority = classNames("task-card", {
    high: priority === "high",
    mid: priority === "mid",
    low: priority === "low",
  });
  date = date.split("T")[0];

  return (
    <div className="task-card">
      <div className="task-card__title">
        <div className="task-card__priority">
          <div className={taskPriority}></div>
        </div>
        <div className="task-card__title-text">{title}</div>
      </div>
      <hr className="task-card__separator" />
      <div className="task-card__description-header">
        <p className="task-card__description-title">Description:</p>
        <p className="task-card__status-text">Status: {status}</p>
      </div>
      <div className="task-card__descriprion">
        <div className="task-card__description-text">
          <p>{description}</p>
        </div>
      </div>
      <div className="task-card__date">
        <p>Created: {date}</p>
      </div>
      <hr className="task-card__separator" />
      <div className="task-card__buttons">
        <Button className="task-card__button" label="Edit" onClick={onEdit} />
        <Button
          className="task-card__button"
          label="Delete"
          onClick={onDelete}
        />
      </div>
    </div>
  );
};
export default TaskCard;
