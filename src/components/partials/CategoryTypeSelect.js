import React, { Component } from 'react';
import { getCategorieTypes } from '../../services/RestService';
export class CategoryTypeSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryTypes: []
        }
    }

    componentDidMount() {
        getCategorieTypes().then(res => {
            console.log(res.data);
            this.setState({
                categoryTypes: res.data
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        const categories = this.state.categoryTypes.map(category => {
            let id = category.categoryTypeId;
            return (<option value={id} key={id}>{category.category}</option>);
        });

        return (
            <select id={this.props.nameId}
                defaultValue={""}
                onChange={this.props.handleChange}
                required
                className="form-control">
                <option value="" disabled>Choose</option>
                <>
                    {categories ? categories : <option>WTF</option>}
                </>
            </select>
        );
    }
}
