import classNames from "classnames";
import "./index.scss";

const Button = ({ label, className, disabled, icon, ...props }) => {
  const mode = classNames(
    className,
    "button",
    {
      edit: label === "Edit" || label === "Save",
      delete: label === "Delete",
      create: label === "Create",
    },
    disabled && "-disabled"
  );
  let button_icon = "";
  if (icon != "none") {
    button_icon =
      label === "Edit"
        ? "edit.png"
        : label === "Create"
        ? "create.png"
        : "trash.png";
  }
  return (
    <button className={mode} disabled={disabled} {...props}>
      {icon != "none" ? (
        <img
          className="button__icon"
          src={`/public/${button_icon}`}
          alt={icon}
        />
      ) : null}
      {label}
    </button>
  );
};
export default Button;
