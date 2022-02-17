import './index.css'

const PasswordItem = props => {
  const {itemDetails, onClickDeleteBtn, showPassword} = props
  const {username, website, password, id} = itemDetails

  const onDelete = () => {
    onClickDeleteBtn(id)
  }

  const renderPassword = () => {
    if (showPassword === true) {
      return <p className="saved-password-details">{password}</p>
    }
    return (
      <img
        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
        alt="stars"
        className="stars-img"
      />
    )
  }

  return (
    <li className="saved-password-cont">
      <div>
        <p className="saved-password-logo">S</p>
      </div>
      <div>
        <p className="saved-password-details">{website}</p>
        <p className="saved-password-details">{username}</p>
        {renderPassword()}
      </div>
      <div>
        <button
          className="delete-btn"
          type="button"
          testid="delete"
          onClick={onDelete}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="delete-img"
          />
        </button>
      </div>
    </li>
  )
}

export default PasswordItem
