import React, { useState, useEffect } from 'react'

import CustomForm from '../../../components/CustomForm';
import { Columns, Column, Field, Control, Button, Label, Select, Container, Input } from 'bloomer';
import Bill from '../../../components/Bill'
import CustomField from '../../../components/CustomField';
import { toast } from 'bulma-toast'
import PaymentChoice from '../../../components/PaymentChoice';

import { useWorkspace } from '../../../providers/WorkspaceProvider'
import { useLocation } from '../../../providers/LocationProvider'
import { useHistory } from '../../../providers/HistoryProvider'

const maxUnit = (unit, pricings) => {
    if(unit === 'day')
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
    return pricings.map(pricing => pricing.duration)
}

const deskTypeDescription = {
    hot: 'Day Pass',
    enclosed: 'Private Office',
    dedicated: 'Dedicated Desk'
}

const sortPricing = (pricing1, pricing2) => {
    if (pricing1.duration < pricing2.duration)
        return -1;
    if (pricing1.duration > pricing2.duration)
        return 1;
    return 0;
}

const getUnitPickerItems = (pricings) => {
    let units = []
    let newPricings = []
    pricings.forEach(pricing => {
        if(!units.includes(pricing.unit)){
            units.push(pricing.unit)
            newPricings.push(pricing)
        }
    })
   
    return newPricings
}

export default props => {
    
    const [pricings, setPricings] = useState([])
    const [pricing, setPricing] = useState(null)
    const [maxUnits, setMaxUnits] = useState([])
    const [units, setUnits] = useState([])
    const [total, setTotal] = useState(0)
    const [service, setService] = useState(null)
    const [paymentChoicVisible, togglePaymentChoice] = useState(false)

    const { locationState } = useLocation()
    const { selectedLocation, desks } = locationState
    const { workspaceState, changeForm, addWorkspace } = useWorkspace()
    const { history } = useHistory()
    const { form } = workspaceState
    const { loading } = workspaceState

    if(workspaceState.workspaceAdd.status === 'success'){
        toast({
            message: "The selected location doesn't have available desks <br /> <a href='abc'>Select Location</dashboard/workspace/add>",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true
          });
          setTimeout(() => {
              history.push('/dashboard/workspace/list')
          }, 500);
    }

    if (!selectedLocation || !form.deskType)
        history.goBack()

    useEffect(() => {
        let services = desks[form.deskType]
        console.log('service', services[0])
        selectService(services[0].id)
        setService(services[0])
    }, [])

    const selectService = id => {
        console.log('selecting service', id)
        changeForm('serviceId', id)
        onServiceChange(id)
    }

    const setNumberOfDesks = ndesks => changeForm('numberOfDesks', ndesks)
    const selectDate = nDate => changeForm('startDate', nDate)
    const selectUnit = nUnit => {
        changeForm('unit', nUnit)
        onUnitChange(nUnit)
    }
    const selectPricing = nPricingId => {
        console.log('selectPricing', nPricingId)
        changeForm('pricingId', nPricingId)
        onPricingChange(nPricingId)
    }
    const changeDuration = nDuration => changeForm('duration', nDuration)
    const changePassType = nPassType => changeForm('passType', nPassType)

    const onServiceChange = (serviceId) => {
        console.log('onServiceChange', serviceId, service)
        desks[form.deskType].map(fService => {
            if(serviceId === fService.id){
                console.log('match found', fService.pricings, pricings, fService)
                setService(fService)
                setPricings(fService.pricings)
                // setPricing(fService.pricings[0])
                selectPricing(fService.pricings[0].id)
                let pickerItems = getUnitPickerItems(pricings)
                selectUnit(pickerItems.length ? pickerItems[0].unit : '')
                setUnits(pickerItems)
            }
            return fService;
        })
        
    }

    const onPricingChange = (pricingId) => {
        console.log('onPricingChange', pricingId, service)
        service && service.pricings.map(fPricing => {
            if(pricingId === fPricing.id){
                console.log('match found pricing', fPricing, pricingId, fPricing.id)
                setPricing(fPricing)
            }
            return fPricing;
        })
        getTotal()
    }

    const onUnitChange = (nUnit) => {
        setMaxUnits(maxUnit(nUnit, pricings))
        getTotal()
    }

    const sortPricings = (pricings) => {
        return pricings.sort(sortPricing)
    }

    const preBook = (paymentType, image) => {
        // setState({paymentChoicVisible: false})
        togglePaymentChoice(false)
        console.log(paymentType, image)
        // let form = {...form}
        let workspaceSubscription = {
            pricingId: form.pricingId,
            serviceId: form.serviceId,
            type: form.deskType,
            startDate: form.startDate,
            paymentType: paymentType,
            numberOfDesks: form.numberOfDesks,
            passType: form.passType
        }
        switch(paymentType){
            case 'bank':
                workspaceSubscription['paymentMethod'] = 'bank'
                workspaceSubscription['paymentAttached'] = image.files[0].name
                break;
            case 'bank-later':
            case 'yene-later':
                workspaceSubscription['paymentMethod'] = paymentType
                break;
            default:
                workspaceSubscription['paymentMethod'] = 'bank-later'
        }
        addWorkspace(workspaceSubscription)
    }

    const handleSubmit = () => {
        if(form.deskType === 'hot' && form.numberOfDesks && form.startDate){
            togglePaymentChoice(true)
        } else if (form.startDate){
            togglePaymentChoice(true)
        } else {
            toast({
                message: "Invalid form input, try again",
                type: "is-danger",
                dismissible: true,
                pauseOnHover: true
              });
        }
    }

    const getTotal = () => {
        // console.log('> in get total')
        let tempPricings = pricings.filter(pricing => pricing.unit === form.unit)
        let tempPricing = pricing
        let deskType = form.deskType

        if (deskType === 'hot') {
            console.log('> pricing ', tempPricing, )
            // setState({total: 50})
            // setState({total: })
            setTotal(
                tempPricing ? form.passType === 'full' ? tempPricing.unitPrice * tempPricing.duration * form.numberOfDesks : tempPricing.extra.unitPrice * tempPricing.duration * form.numberOfDesks : 0
            )
        } else {
            tempPricings = sortPricings(tempPricings)
            if(form.duration === 1){
                console.log('> is one')
                tempPricing = tempPricings[0].duration === 1 ? tempPricings[0] : tempPricings[1]
                // setState({pricing: pricing, total: pricing.duration * pricing.unitPrice * service.capacity})
                setPricing(tempPricing)
                setTotal(tempPricing.duration * tempPricing.unitPrice * service.capacity)
                return;
            }
            let current = tempPricings[0]
            let prevPricing = current
            tempPricings.forEach(element => {
                prevPricing = current
                current = element

                if(current.duration >= form.duration && prevPricing.duration <= form.duration) {
                    tempPricing = current
                }
            });
            console.log('> is not one')
            if(tempPricing && tempPricing.duration === 1){
                // setState({pricing: pricing, total: pricing.duration * pricing.unitPrice * form.duration * service.capacity})
                setPricing(tempPricing)
                setTotal(tempPricing.duration * tempPricing.unitPrice * form.duration * service.capacity)
            } else {
                // setState({pricing: pricing, total: pricing.duration * pricing.unitPrice * service.capacity})                
                setPricing(tempPricing)
                if (tempPricing) setTotal(tempPricing.duration * tempPricing.unitPrice * service.capacity)
            }
            // console.log('> result', sortPricings(result), pricings, pricing)
        }
    }

    const getBillProps = () => ({
        subtotal: total,
        items: [
            {
                key: 'Workspace type',
                value: deskTypeDescription[form.deskType]
            },
            {
                key: 'Location',
                value: selectedLocation.name
            },
            {
                key: 'Number of Desks',
                value: `${form.deskType === 'hot' ? 
                            form.numberOfDesks : service.capacity
                        } Desk${form.deskType === 'hot' ? 
                            form.numberOfDesks > 1 ? 's' : '' : service.capacity > 1 ? 's' : ''
                        }`
            },
            {
                key: 'Duration',
                value: `${form.deskType === 'hot' ? 
                            pricing.duration:  form.duration
                        } ${form.deskType === 'hot' ? 
                            'day' : form.unit}${form.deskType === 'hot' ? 
                            pricing.duration > 1 ? 's': '' : form.duration>1? 's': ''}`
            },
            // {
            //     key: 'Advance',
            //     value: `${pricing.advanceDuration} ${pricing.unit}s`
            // }
        ]
    })

    const getPricings = (serviceId, services) => {
        services = services ? services.filter(service => service.id === serviceId) : []
        // console.log('services', services)
        return services.length ? services[0].pricings : []
    }

    // const getPricing = (form, pricingId) => {
    //     let pricings = getPricings(form.serviceId, desks[form.deskType])
    //     pricings = pricings.filter(pricing => pricing.id === pricingId)
    //     return pricings.length ? pricings[0] : null
    // }
        
    return (
        <div>
            {/* <Helmet title={title} /> */}
            <Container isFluid isMarginless hasTextAlign="left" style={{padding: '10px'}}>
                <Columns>
                    <Column isSize='1/2'>
                        <CustomForm hasLabels={true} fields={[]} onSubmit={handleSubmit}>
                            
                            {form.deskType === 'hot' ? 
                                <CustomField 
                                    error='' 
                                    onChange={event => setNumberOfDesks(event.target.value)}
                                    type='number'
                                    onBlur={() => console.log('> on blur')}
                                    label="Number of desks"
                                    required={true}
                                    />
                            : 
                                <Field>
                                <Label>Number of desks</Label>
                                <Control>
                                    <Select name="serviceId" onChange={event => selectService(event.target.value)} >
                                        {form.deskType ? desks[form.deskType].map(desk => (
                                            <option key={desk.id} value={desk.id}>{`${desk.capacity} desk${desk.capacity > 1 ? 's':''}`}</option>
                                        )) : null}
                                    </Select>
                                </Control>
                            </Field>}
                            <Columns isMobile>
                                <Column isSize='1/2'>
                                    <Field>
                                        <Label>{form.deskType === 'hot' ? 'Number of days: ' : 'Duration'}</Label>
                                        <Control>
                                            {
                                                form.deskType === 'hot' ?
                                                <Select name="pricingId" onChange={event => selectPricing(event.target.value)}>
                                                    {
                                                        pricings.map(pricing => (
                                                            <option key={pricing.id} label={`${pricing.duration}`} value={pricing.id} />
                                                        ))
                                                    }
                                                </Select>
                                                :
                                                <Select name="duration" onChange={event => changeDuration(event.target.value)}>
                                                    {maxUnits.map(item => (
                                                        <option key={item} label={item + ''} value={item + ''} />
                                                    ))}
                                                </Select>
                                            }
                                        </Control>
                                    </Field>
                                </Column>
                                <Column isSize='1/2'>
                                    <Field>
                                        <Label style={{color: form.deskType === 'hot' ? '#000' : '#e6e6e6'}}> {form.deskType === 'hot' ? 'Pass Type: ' : 'unit'}</Label>
                                        <Control>
                                            {
                                                form.deskType === 'hot' ?
                                                <Select name="passType" onChange={event => changePassType(event.target.value)}>
                                                    {
                                                        pricing && pricing.workingHour ?
                                                            <option label={`${pricing.workingHour.name ? pricing.workingHour.name : 'Full'} (${pricing.workingHour.start}-${pricing.workingHour.end})`} value="full" />
                                                        :null
                                                    }
                                                    {
                                                        pricing && pricing.extra ?
                                                            <option label={`${pricing.extra.name ? pricing.extra.name : 'Restricted'} (${pricing.extra.start}-${pricing.extra.end})`} value="restricted" />
                                                        :null
                                                    }
                                                </Select>
                                                :
                                                <Select name="unit" onChange={event => selectUnit(event.target.value)}>
                                                    {
                                                        getUnitPickerItems(getPricings(form.serviceId, desks[form.deskType]), props).map(pricing => {
                                                            return <option label={pricing.unit} key={pricing.unit} value={pricing.unit} />
                                                        })
                                                    }   
                                                    </Select>
                                            }
                                        </Control>
                                    </Field>
                                </Column>
                            </Columns>
                            <Columns>
                                <Column isSize='full' isFullWidth isClearfix>
                                    <Field>
                                        <Label>Start date</Label>
                                        <Control>
                                            <Input required type="date" onChange={event => selectDate(event.target.value)}/>
                                        </Control>
                                    </Field>
                                </Column>
                            </Columns>
                            <Columns>
                            <Column isSize="1/2">
                                <Field>
                                <Control>
                                    <Button style={{width: '100%', fontWeight: 700}} isLoading={loading} disabled={form.deskType === 'hot' ? !form.numberOfDesks || !form.startDate : !form.startDate} type="submit" isColor="primary">
                                        Checkout
                                    </Button>
                                </Control>
                            </Field>
                            </Column>
                            <Column isSize="1/2" hasTextAlign="left">
                                {/* Are you already member? <Link className="has-text-black" to="/auth/login" >Login</Link> */}
                            </Column>
                            </Columns>
                        </CustomForm>            
                    </Column>
                    <Column isSize='1/2'>
                        {
                            service && pricing ?
                            <Bill {...getBillProps()} /> : null
                        }
                    </Column>
                </Columns>
            </Container>
            <PaymentChoice close={() => togglePaymentChoice(false)} visible={paymentChoicVisible} onSuccess={preBook} container='workspaceSubscription' />
        </div>
    )
}
