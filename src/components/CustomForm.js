import React, { Component } from 'react'
import CustomField from './CustomField';
import { validator } from '../services/formService';
import { Columns, Column } from 'bloomer';

/**
 * Custom form for bulma field components
 * @param {fields, onSubmit} props 
 * @todo not validating
 */
class CustomForm extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            formData: {},
            formErrors: {}
        }
    }

    componentDidMount(){
        let formData = {}
        let formErrors = {}
        this.props.fields.forEach(field => {
            formData[field.name] = field.value ? field.value : ''
            formErrors[field.name] = field.error ? field.error : ''
        })

        this.setState({
            formData: formData,
            formErrors: formErrors
        })
    }

    handleFormChange = (e) => {
        // console.log('> changing form data', e.target.name, e.target.value)
        let form = {...this.state.formData}
        form[e.target.name] = e.target.value
        this.setState({
          formData: form, 
        })
      }

    handleSubmit = (e) => {
        // console.log('> submitting')
        e.preventDefault()
        this.props.onSubmit(this.state.formData, this.state.formErrors)
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                {
                    this.props.fields.map((field, index) => {
                        return Array.isArray(field) ? 
                                <Columns>
                                    {field.map(innerfield => (
                                        <Column key={innerfield.name} isSize={`1/${field.length > 4 ? '4' : field.length}`}>
                                            <CustomField {...innerfield}
                                            value={this.state.formData[innerfield.name]} 
                                            error={this.state.formErrors[innerfield.name]} 
                                            onChange={this.handleFormChange}
                                            onBlur={() => console.log('> on blur')}
                                            />
                                        </Column>
                                    ))}

                                </Columns>
                                : 
                                <CustomField {...field} key={field.index}
                                    value={this.state.formData[field.name]} 
                                    error={this.state.formErrors[field.name]} 
                                    onChange={this.handleFormChange}
                                    onBlur={() => this.setState({formErrors: validator(field, this.state.formData, {...this.state.formErrors})})}
                                    />
                    })
                }
                
                {
                    this.props.children
                }
            </form>
        )
    }
}

export default CustomForm