import React from "react";
import styled from "styled-components";

const SettingsFormContainer = styled.div`
	margin-left: 260px;
	padding: 40px;
	color: #414141;
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;

	h2 {
		width: 100%;
	}

	.test {
		color: red;
	}
`;

class Settings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			themeColor: "#24b8bd",
		};
    }
    
    changeColor = (event) => {
        this.setState({themeColor: event.target.value})
        setTimeout( () => {this.props.changeColor(this.state.themeColor)}, 200)
        console.log("themeColor :", this.state.themeColor);
    }

	handleChange = event => {
		this.setState({
			themeColor: event.target.value,
		});
		
	};

	render() {
		console.log("Settings props :", this.props);
		return (
			<SettingsFormContainer>
				<h2>User Settings</h2>
				<form>
					<label for="themeColor">Choose your theme color</label>
					<input
						type="color"
						name="themeColor"
						value={this.state.themeColor}
						onChange={this.handleChange}
					/>
				</form>
			</SettingsFormContainer>
		);
	}
}

export default Settings;
