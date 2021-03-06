import React, { Component } from "react";
import styled from "styled-components";
import { Route } from "react-router-dom";
import axios from "axios";

import "./App.css";
import Authenticate from "../src/Authenticate/Authenticate";
import Sidebar from "./components/Sidebar/Sidebar";
import NoteList from "./components/NoteList/NoteList";
import AddNewNote from "./components/AddNewNote/AddNewNote";
import Note from "./components/Note/Note";
import EditNoteForm from "./components/EditNoteForm/EditNoteForm";
import Settings from "./components/Settings/Settings";

const AppContainer = styled.div`
	height: 100%;
	display: flex;
	background-color: #f2f1f2;
`;

// ========== END OF STYLES ==================

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			notes: [],
			id: "",
			title: "",
			tags: "",
			textBody: "",
			isStarred: false,
			searchQuery: null,
			themeColor: "",
		};
	}

	componentDidMount() {
		this.getNotes();
	}

	logOut = () => {
		window.localStorage.removeItem("username");
		window.location.reload();
	};

	searchNotes = data => {
		this.setState({ searchQuery: data });
		console.log("app searchQ", this.state.searchQuery);
	};

	getNotes = () => {
		axios
			.get("https://fe-notes.herokuapp.com/note/get/all")
			.then(res => {
				console.log("Server Response :", res);
				this.setState({ notes: res.data });
			})
			.catch(err => {
				console.log("Server Error: ", err);
			});
	};

	deleteNote = id => {
		axios
			.delete(`https://fe-notes.herokuapp.com/note/delete/${id}`)
			.then(res => {
				console.log("Delete Note ", res);
				this.getNotes();
			})
			.catch(err => console.log("Delete Server Error", err));
	};

	editNote = (data, id) => {
		axios
			.put(`https://fe-notes.herokuapp.com/note/edit/${id}`, data)
			.then(res => () => {
				console.log("PUT Server Response: ", res);
				this.setState({
					title: res.data.title,
					textBody: res.data.textBody,
					id: res,
				});
			})
			.catch(err => console.log("PUT Server Error: ", err));
	};

	toggleStar = () => {
		this.setState({ isStarred: true });
	};

	changeColor = data => {
		this.setState({ themeColor: data });
		console.log('App color', this.state.themeColor)
	};

	render(props) {
		console.log("App props", this.props);
		return (
			<>
				<AppContainer>
					<Sidebar
						{...props}
						getNotes={this.getNotes}
						logOut={this.logOut}
					/>
					<Route
						exact
						path="/notes"
						render={props => (
							<NoteList
								{...props}
								notes={this.state.notes}
								getNotes={this.getNotes}
								searchNotes={this.searchNotes}
								searchQuery={this.state.searchQuery}
								themeColor={this.state.themeColor}
								changeColor={this.changeColor}
							/>
						)}
					/>
					<Route exact path="/addnewnote" component={AddNewNote} />
					<Route
						exact
						path="/notes/:noteId"
						render={props => (
							<Note
								{...props}
								notes={this.state.notes}
								deleteNote={this.deleteNote}
							/>
						)}
					/>
					<Route
						{...props}
						path={`/notes/:noteId/edit`}
						render={props => (
							<EditNoteForm
								{...props}
								notes={this.state.notes}
								editNote={this.editNote}
								getNotes={this.getNotes}
							/>
						)}
					/>

					<Route
						{...props}
						exact
						path={`/settings`}
						render={props => (
							<Settings
								{...props}
								themeColor={this.state.themeColor}
								changeColor={this.changeColor}
							/>
						)}
					/>
				</AppContainer>
			</>
		);
	}
}

export default Authenticate(App);
