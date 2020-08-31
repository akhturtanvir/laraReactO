import React, { Component } from "react";
import ReactDOM from "react-dom";
import Axios from "axios";

class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            title: "",
            description: "",
            lists: []
        };
    }

    componentDidMount() {
        this.getAll();
    }

    getAll() {
        Axios.get(`http://127.0.0.1:8000/api/to-do-list`).then(res => {
            this.setState({
                lists: res.data
            });
            // console.log(res.data);
        });
    }

    sumbit(e, id) {
        e.preventDefault();
        if (this.state.id == 0) {
            Axios.post(`http://127.0.0.1:8000/api/to-do-list/`, {
                title: this.state.title,
                description: this.state.description
            }).then(res => {
                this.setState({
                    title: "",
                    description: ""
                });
                this.getAll();
            });
        } else {
            Axios.put(`http://127.0.0.1:8000/api/to-do-list/${id}`, {
                title: this.state.title,
                description: this.state.description
            }).then(res => {
                this.setState({
                    title: "",
                    description: ""
                });
                this.getAll();
            });
        }
    }

    getOne(list) {
        this.setState({
            id: list.id,
            title: list.title,
            description: list.description
        });
        // console.log(list);
    }

    delete(id) {
        Axios.delete(`http://127.0.0.1:8000/api/to-do-list/${id}`).then(res => {
            this.getAll();
        });
    }

    titlechange(e) {
        // console.log(e.target.value);
        this.setState({
            title: e.target.value
        });
    }

    descriptionchange(e) {
        // console.log(e.target.value);
        this.setState({
            description: e.target.value
        });
    }

    titleFormat(list) {
        if (list.is_active === "y") return <strike>{list.title}</strike>;
        return list.title;
    }

    desFormat(list) {
        if (list.is_active === "y") return <strike>{list.description}</strike>;
        return list.description;
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div>
                            <form
                                id="form"
                                onSubmit={e => this.sumbit(e, this.state.id)}
                            >
                                <div className="form-group">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        value={this.state.title}
                                        onChange={e => this.titlechange(e)}
                                        className="form-control"
                                        placeholder="Title of To Do List"
                                        autoComplete="off"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        value={this.state.description}
                                        onChange={e =>
                                            this.descriptionchange(e)
                                        }
                                        className="form-control"
                                        rows="3"
                                        placeholder="Write a Description for To Do List"
                                    ></textarea>
                                </div>
                                <div
                                    className="form-group"
                                    style={{ textAlign: "center" }}
                                >
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="card">
                            <div className="card-header">To Do List</div>
                            <div className="card-body">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">#Sl</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.lists.map((list, index) => (
                                            <tr key={list.id}>
                                                <th scope="row">{index + 1}</th>
                                                <td>
                                                    {this.titleFormat(list)}
                                                </td>
                                                <td>{this.desFormat(list)}</td>
                                                <td>
                                                    <button
                                                        href="#form"
                                                        className="btn btn-info btn-sm"
                                                        onClick={e =>
                                                            this.getOne(list)
                                                        }
                                                        disabled={
                                                            list.is_active ===
                                                            "y"
                                                                ? "disabled"
                                                                : ""
                                                        }
                                                    >
                                                        Edit
                                                    </button>
                                                    &nbsp;&nbsp;
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={e =>
                                                            this.delete(list.id)
                                                        }
                                                        disabled={
                                                            list.is_active ===
                                                            "y"
                                                                ? "disabled"
                                                                : ""
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Example;

if (document.getElementById("example")) {
    ReactDOM.render(<Example />, document.getElementById("example"));
}
