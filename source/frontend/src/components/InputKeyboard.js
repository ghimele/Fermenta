/**
 * To use simple-keyboard with React Hooks / Function components, check out:
 * https://simple-keyboard.com/react/demo/hooks
 */
import React, { Component } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import Form from 'react-bootstrap/Form';
import OutsideClickHandler from 'react-outside-click-handler';

class InputKeyboard extends Component {
  state = {
    layoutName: "default",
    input: "",
    keyboardDispaly: false
  };

  onChange = input => {
    this.setState({ input });
    console.log("Input changed", input);
    this.props.onChange(input);
  };

  onKeyPress = button => {
    console.log("Button pressed", button);

    if (button === "{bksp}") return;

    if (button.includes("{") && button.includes("}")) {
      this.handleLayoutChange(button);
    }
  };

  handleShift = () => {
    const layoutName = this.state.layoutName;

    this.setState({
      layoutName: layoutName === "default" ? "shift" : "default"
    });
  };

  handleNumbers = () => {
    const layoutName = this.state.layoutName;
    ;
    this.setState({
      layoutName: layoutName !== "numbers" ? "numbers" : "default"
    });
  };

  handleLayoutChange = (button) => {
    let currentLayout = this.keyboard.options.layoutName;
    let layoutName;

    switch (button) {
      case "{shift}":
      case "{shiftactivated}":
      case "{default}":
        layoutName = currentLayout === "default" ? "shift" : "default";
        break;

      case "{alt}":
      case "{altright}":
        layoutName = currentLayout === "alt" ? "default" : "alt";
        break;

      case "{smileys}":
        layoutName = currentLayout === "smileys" ? "default" : "smileys";
        break;

      default:
        break;
    }

    this.setState({ layoutName: layoutName });
  };

  onChangeInput = event => {
    const input = event.target.value;
    this.setState({ input });
    this.keyboard.setInput(input);
    this.props.onChange(event.target.value);
  };

  onFocusInput = event => {
    this.keyboard.setInput(this.state.input);
    this.setState({ keyboardDispaly: true });
  };

  onOutsideClick = event => {
    console.log("onOutsideClick");
    this.setState({ keyboardDispaly: false });
  };

  componentDidUpdate(prevProps){
    if(prevProps.value!== this.props.value){
      this.keyboard.setInput(this.props.value);
      this.setState({ input: this.props.value });
    }
  }

  componentDidMount(){
    this.setState({ input: this.props.value || "", layoutName: this.props.layoutName || "default" });
    //this.keyboard.setInput(this.props.value);
  }


  render() {
    // var value= this.state.input==="" ? this.props.value;
    return (
      <OutsideClickHandler onOutsideClick={this.onOutsideClick}>

        <Form.Control 
          type={this.props.type || "string"} 
          required={this.props.required || false} 
          as={this.props.as || "input"} 
          placeholder={this.props.placeholder || ""} 
          disabled={this.props.disabled || false}
          onFocus={this.onFocusInput} 
          value={this.state.input} 
          onChange={this.onChangeInput}/>
        <div className={`keyboardContainer ${!this.state.keyboardDispaly ? "hidden" : ""}`}>
          <Keyboard
            baseClass={this.props.baseClass}
            keyboardRef={r => (this.keyboard = r)}
            layoutName={this.state.layoutName}
            onChange={this.onChange}
            onKeyPress={this.onKeyPress}
            layout={{
              default: [
                "q w e r t y u i o p {bksp}",
                "a s d f g h j k l {enter}",
                "{shift} z x c v b n m , . {shift}",
                "[{alt} @] {space} [. {altright}]"
              ],
              shift: [
                "Q W E R T Y U I O P {bksp}",
                "A S D F G H J K L {enter}",
                "{shiftactivated} Z X C V B N M , . {shiftactivated}",
                "[{alt} @] {space} [. {altright}]"
              ],
              alt: [
                "1 2 3 4 5 6 7 8 9 0 {bksp}",
                `@ # $ & * ( ) ' " {enter}`,
                "{shift} % - + = / ; : ! ? {shift}",
                "[{default} @] {space} [. {altright}]"
              ],
              numbers: ["1 2 3", "4 5 6", "7 8 9", ". 0 {bksp}"],
              smileys: [
                "😀 😊 😅 😂 🙂 😉 😍 😛 😠 😎 {bksp}",
                `😏 😬 😭 😓 😱 😪 😬 😴 😯 {enter}`,
                "😐 😇 🤣 😘 😚 😆 😡 😥 😓 🙄 {shift}",
                "{default} {smileys} {space} {altright} {downkeyboard}"
              ]
            }}
            display={{
              "{alt}": ".?123",
              "{smileys}": "\uD83D\uDE03",
              "{shift}": "⇧",
              "{shiftactivated}": "⇧",
              "{enter}": "return",
              "{bksp}": "⌫",
              "{altright}": ".?123",
              "{downkeyboard}": "🞃",
              "{space}": " ",
              "{default}": "ABC",
              "{back}": "⇦"
            }}
          />
        </div>
      </OutsideClickHandler>
    );
  }
}

export default InputKeyboard