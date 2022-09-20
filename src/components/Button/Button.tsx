import './Button.scss'

type ButtonProps = {
  buttonType: string,
  text: string,
  iconUrl: string,
  iconName: string,
  handleClickedButton: () => void;
}

const Button = (props: ButtonProps) => {
  return (
    <button
      type="button"
      className={`button ${props.buttonType}`}
      onClick={props.handleClickedButton}
    >
      {
        props.text &&
        (
          <p className="text">{ props.text }</p>
        )
      }
      {
        props.iconUrl &&
        (
          <img
            className="icon"
            src={props.iconUrl}
            alt={props.iconName}
          />
        )
      }
    </button>
  )
}

export default Button;
