import React from "react";


class ProjectForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {'name': '', 'repo_url': '', 'users': 0}
    }


    handleChange(event){
        this.setState(
            {
            [event.target.name]: event.target.value
            }
        )
        console.log(event.target.name, event.target.value)
    }

    handleSubmit(event){
        // console.log(this.state.name, this.state.repo_url, this.state.users)
        this.props.createProject(this.state.name, this.state.repo_url, this.state.users)
        event.preventDefault()
    }


    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="name">name</label>
                    <input type="text" name="name" placeholder="name"
                           value={this.state.name} onChange={(event) => this.handleChange(event)}/>
                </div>
                <div>
                    <label htmlFor="repo_url">repo_url</label>
                    <input type="text" name="repo_url" placeholder="repo_url"
                           value={this.state.repo_url} onChange={(event) => this.handleChange(event)}/>
                </div>
                <div>
                    <label htmlFor="users">users</label>
                    <input type="number" name="users" placeholder="users"
                           value={this.state.users} onChange={(event) => this.handleChange(event)}/>
                </div>
                <input type="submit" value="Save"/>
            </form>
        );
    }
}

export default ProjectForm

