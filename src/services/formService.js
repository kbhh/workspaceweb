
/**
 * Validate form field value against given validation rules
 * @param {objecgt} field field with properties like (name, confirm)
 * @param {array} formData form data objects array
 * @param {array} errors form errors objects array
 */
export const validator = (field, formData, errors) => {
    console.log('> validating field', field, formData[field.name])
    if(formData[field.name]){
      if (field.confirm){
        errors[field.name] = formData[field.name] === formData[field.confirm] ? '' : field.confirm + 's do not match'
      } else {
        errors[field.name] = ''
      }
    } else {
      errors[field.name] = 'This field is required'
    }
    // console.log(errors)
    return errors
  }
  

/**
 * check if form is valid
 * @param {object} obj form object
 */
export const isFormValid = (obj) => {
    let valid = true
    Object.keys(obj).forEach(name => {
      if(!obj[name]){
        valid = false
      }
    })

    return valid
  }