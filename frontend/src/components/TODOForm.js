import React from "react";


class TODOForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {'project': props.project[0].id, 'text': '', 'user': 0}
    }


    handleChange(event){
        this.setState(
            {
            [event.target.name]: event.target.value
            }
        )
        // console.log(event.target.name, event.target.value)
    }

    handleSubmit(event){
        this.props.createTODO(this.state.project, this.state.text, this.state.user)
        event.preventDefault()
    }


    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="project">project</label>
                    <select name="project" placeholder="project" onChange={(event) => this.handleChange(event)}>
                            {this.props.project.map((item)=><option value={item.id}>{item.name}</option>)} </select>
                </div>
                <div>
                    <label htmlFor="text">text</label>
                    <input type="text" name="text" placeholder="text"
                           value={this.state.text} onChange={(event) => this.handleChange(event)}/>
                </div>
                <div>
                    <label htmlFor="user">user</label>
                    <input type="number" name="user" placeholder="user"
                           value={this.state.user} onChange={(event) => this.handleChange(event)}/>
                </div>
                <input type="submit" value="Save"/>
            </form>
        );
    }
}

export default TODOForm
