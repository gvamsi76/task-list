import { Controller } from "react-hook-form";
import { Form, InputGroup } from "react-bootstrap";

const InputCtrl = ({
  control,
  showError,
  placeholder,
  name,
  required,
  disabled,
  id,
  type,
  startAdornment,
  endAdornment,
  startAdornmentIcon,
  endAdornmentIcon,
  label,
  defaultValue,
  max,
  min,
  componentName,
  rules: customRoles,
  maxLength,
  minLength,
  className = "mb-3",
}) => {
  const rules = {
    required: required,
    pattern: {
      value: /^(?!\s*$).+/,
      message: "Field is invalid",
    },
    ...customRoles,
  };

  const addMinLength = (val) => {
    rules["minLength"] = {
      value: val,
      message: `Should be min ${val} char long`,
    };
  };

  const addMaxLength = (val) => {
    rules["maxLength"] = {
      value: val,
      message: `Should be max ${val} char long`,
    };
  };

  const addPattern = (value, messasge) => {
    rules["pattern"] = {
      value: value,
      message: messasge,
    };
  };

  if (maxLength) {
    addMaxLength(maxLength);
  }
  if (minLength) {
    addMinLength(minLength);
  }

  if (componentName) {
    if (componentName === "Number") {
      const numberPattern = /^[0-9]*\.?[0-9]+$/; // Allow positive real numbers including 0
      addPattern(numberPattern, "Please enter a valid number.");
    } else if (componentName === "Email") {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      addPattern(
        emailPattern,
        `Invalid email address sorry only letter (a-z) and number 0-9 and full stop are allowed`
      );
    } else if (componentName === "PhoneNumber") {
      const phonePattern = /^[0-9]\d*$/;
      addPattern(phonePattern, `Input valid telephone number`);
    }
  }

  return (
    <Controller
      rules={rules}
      name={name}
      control={control}
      render={({ field }) => (
        <>
          {startAdornment || endAdornment ? (
            <>
              <Form.Label htmlFor={id}>
                {label} {required && <span className="text-danger">*</span>}
              </Form.Label>
              <InputGroup className={`${className}`}>
                {startAdornment ? (
                  <InputGroup.Text id={`${id}-addon1`}>
                    {startAdornment}
                  </InputGroup.Text>
                ) : null}
                <Form.Control
                  {...field}
                  id={id}
                  disabled={disabled}
                  type={type}
                  placeholder={placeholder}
                  isInvalid={showError && showError(name) ? true : false}
                  defaultValue={defaultValue}
                  max={max}
                  min={min}
                  step="any"
                />
                {endAdornment ? (
                  <InputGroup.Text id={`${id}-addon1`}>
                    {endAdornment}
                  </InputGroup.Text>
                ) : null}
                {showError && showError(name) ? (
                  <Form.Control.Feedback type="invalid" className="d-block">
                    {showError(name)}
                  </Form.Control.Feedback>
                ) : null}
              </InputGroup>
            </>
          ) : (
            <>
              <Form.Group className={`${className}`}>
                <Form.Label
                  htmlFor={id}
                  className={`${label === "" ? "d-none" : ""}`}
                >
                  {label} {required && <span className="text-danger">*</span>}
                </Form.Label>
                <Form.Control
                  {...field}
                  id={id}
                  disabled={disabled}
                  type={type}
                  placeholder={placeholder}
                  isInvalid={showError && showError(name) ? true : false}
                  defaultValue={defaultValue}
                  max={max}
                  min={min}
                  step="any"
                  className="custom-field"
                />
                {showError && showError(name) ? (
                  <Form.Control.Feedback type="invalid" className="d-block">
                    {showError(name)}
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>
            </>
          )}
        </>
      )}
    ></Controller>
  );
};

export default InputCtrl;
