import {Component} from 'react'
import {v4} from 'uuid'

import './index.css'

import PasswordItem from '../PasswordItem'

class PasswordManager extends Component {
  state = {
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    passwordsList: [],
    searchInput: '',
    showPassword: false,
  }

  onShowPassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  onClickDeleteBtn = id => {
    const {passwordsList} = this.state
    const filteredPasswordsList = passwordsList.filter(
      eachPasswordItem => eachPasswordItem.id !== id,
    )
    this.setState({passwordsList: filteredPasswordsList})
  }

  onChangeWebsiteInput = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.targe.value})
    console.log(event.target.value)
  }

  onClickAdd = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    const newPasswordItem = {
      id: v4(),
      website: websiteInput,
      username: usernameInput,
      password: passwordInput,
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPasswordItem],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  getFilteredPasswordsList = () => {
    const {passwordsList, searchInput} = this.state
    const filteredPasswordsList = passwordsList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return filteredPasswordsList
  }

  renderPasswordsList = () => {
    const {showPassword} = this.state
    const passwordsList = this.getFilteredPasswordsList()
    if (passwordsList.length === 0) {
      return (
        <div className="no-passwords-img-cont">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
            alt="no passwords"
            className="no-passwords-img"
          />
          <p className="passwords-head">No Passwords</p>
        </div>
      )
    }
    return (
      <ul className="saved-passwords-list">
        {passwordsList.map(eachPasswordItem => (
          <PasswordItem
            itemDetails={eachPasswordItem}
            key={eachPasswordItem.id}
            onClickDeleteBtn={this.onClickDeleteBtn}
            showPassword={showPassword}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {
      websiteInput,
      usernameInput,
      passwordInput,
      passwordsList,
      searchInput,
    } = this.state

    const passwordsListLength = passwordsList.length

    return (
      <div className="app-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="add-password-cont">
          <form className="add-new-password-cont">
            <h1 className="add-new-password-head">Add New Password</h1>
            <div className="add-new-password-input-cont">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="add-new-password-input-logo"
              />
              <input
                type="text"
                className="add-new-password-input"
                placeholder="Enter Website"
                onChange={this.onChangeWebsiteInput}
                value={websiteInput}
              />
            </div>
            <div className="add-new-password-input-cont">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="add-new-password-input-logo"
              />
              <input
                type="text"
                className="add-new-password-input"
                placeholder="Enter Username"
                onChange={this.onChangeUsername}
                value={usernameInput}
              />
            </div>
            <div className="add-new-password-input-cont">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="add-new-password-input-logo"
              />
              <input
                type="password"
                className="add-new-password-input"
                placeholder="Enter Password"
                onChange={this.onChangePassword}
                value={passwordInput}
              />
            </div>
            <div className="add-new-password-btn-cont">
              <button
                className="add-new-password-btn"
                type="submit"
                onClick={this.onClickAdd}
              >
                Add
              </button>
            </div>
          </form>
          <div className="add-password-img-cont">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              className="add-password-img"
              alt="password manager"
            />
          </div>
        </div>
        <div className="passwords-list-cont">
          <div className="passwords-head-and-search-cont">
            <div className="passwords-head-cont">
              <div>
                <div className="passwords-head-and-count-cont">
                  <div>
                    <h1 className="passwords-head">Your Passwords</h1>
                  </div>
                  <div>
                    <p className="passwords-count">{passwordsListLength}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="passwords-search-cont passwords-head-cont">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-logo"
              />
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
                value={searchInput}
              />
            </div>
          </div>
          <hr className="line" />
          <div className="show-passwords-cont">
            <input
              id="showPassword"
              type="checkbox"
              onChange={this.onShowPassword}
            />
            <label htmlFor="showPassword" className="show-password">
              Show Passwords
            </label>
          </div>
          {this.renderPasswordsList()}
        </div>
      </div>
    )
  }
}

export default PasswordManager
