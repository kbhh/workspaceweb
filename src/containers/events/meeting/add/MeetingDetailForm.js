import React, {useState} from 'react'
import moment from 'moment'
import { Column, Columns, Field, Label, Control, Select, Button } from 'bloomer';
import CustomForm from '../../../../components/CustomForm';
import CustomField from '../../../../components/CustomField';
import { Subtitle } from 'bloomer/lib/elements/Subtitle';
import { useMeeting } from '../../../../providers/MeetingProvider';
import Bill from '../../../../components/Bill';

export default props => {

    const [pricing, setPricing] = useState()
    const [errors, setErrors] = useState()
    const {meetingState} = useMeeting()
    const {selectedMeetingRoom} = meetingState

    const changePricing = (id) => {
        const filtered = selectedMeetingRoom.pricings.filter(_pricing => _pricing.id === id)
        setPricing(filtered.length ? filtered[0] : {})
    }
    const handleSubmit = () => {
        console.log('submitting')
    }

    const getStartTimeIntervals = (workingHour) => {
        let timeItervals = []
        let startHour = moment(workingHour.start, 'HH:mm').hour()
        let startMinute = moment(workingHour.start, 'HH:mm').minute()
        let endHour = moment(workingHour.end, 'HH:mm').hour()
        
        for(let i = startHour; i < endHour; i++){
            timeItervals.push(`${i}:${startMinute}`)
        }

        return timeItervals
    }

    return (
        <div style={{padding: '10px', marginTop: '70px', textAlign: 'left'}}>
            <Subtitle>Book Meeting room detail</Subtitle>
        
            <CustomForm hasLabels={true} fields={[]} onSubmit={handleSubmit}>
                <Columns>
                    <Column isSize='1/2'>
                        <Field>
                            <Label>Number of Attendants</Label>
                            <Control>
                            <CustomField
                                error=''
                                onChange={event => console.log(event.target.value)}
                                onBlur={() => console.log('> on blur')}
                                placeholder="Number of Attendants"
                                type="number"
                                required={true}
                                />
                            </Control>
                        </Field>
                        <Field>
                            <Label>Start Date</Label>
                            <Control>
                            <CustomField
                                error=''
                                onChange={event => console.log(event.target.value)}
                                onBlur={() => console.log('> on blur')}
                                placeholder="Start Date"
                                type="date"
                                required={true}
                                />
                            </Control>
                        </Field>
                        <Field>
                            <Label>Select Meeting time</Label>
                            <Control>
                                <Select name='pricing' required onChange={e => changePricing(e.target.value)}>
                                    <option unselectable>---- Select Meeting Time ----</option>
                                    {
                                        selectedMeetingRoom && selectedMeetingRoom.pricings ? 
                                        selectedMeetingRoom.pricings.map(pricing => (
                                            <option key={pricing.id} value={pricing.id} label={pricing.name} />
                                        )) : <option disabled label="The meeting room you selected is not available" />
                                    }
                                </Select>
                                <span>{pricing && pricing.workingHour ? pricing.workingHour.map((element, index) => {
                                    return `(${element.start} - ${element.end}) ${index !== pricing.workingHour.length - 1 ? '/ ' : ''}`
                                }) : ''}</span>
                            </Control>
                        </Field>
                        {
                            pricing && pricing.duration === 1 ?
                                <div style={{display: 'flex', flexDirection: 'row'}}>
                                    <Field style={{marginRight: '5px'}}>
                                        <Label>Start time</Label>
                                        <Control>
                                            <Select name="starttime" required>
                                                <option unselectable>---- Select Start Time</option>
                                                {
                                                    pricing && pricing.workingHour[0] ? 
                                                    getStartTimeIntervals(pricing.workingHour[0]).map(interval => (
                                                        <option key={interval} value={interval} label={interval}/>
                                                    ))
                                                    :
                                                    <open disabled label="No Working hour available" />
                                                }
                                            </Select>
                                        </Control>
                                    </Field>
                                    <Field>
                                        <Label>Duration</Label>
                                        <Control>
                                            <Select name='duration' required>
                                                <option unselectable>---- Select Duration</option>
                                                {
                                                    [1, 2, 3].map(duration => (
                                                        <option key={duration} value={duration} label={`${duration} hour${duration > 1 ? 's' : ''}`} />
                                                    ))
                                                }
                                            </Select>
                                        </Control>
                                    </Field>
                                </div>
                            :
                            <Field>
                                <Label>Start Time</Label>
                                <Control>
                                    <Select name='start-time' required>
                                        <option unselectable>---- Select Start Time ----</option>
                                        {
                                            pricing && pricing.workingHour ?
                                                pricing.workingHour.map(workingHour => (
                                                    <option key={workingHour.start} label={workingHour.start} value={workingHour.start} />
                                                ))
                                            :
                                            <option label='No working hour available' disabled />
                                        }
                                    </Select>
                                </Control>
                            </Field>
                        }
                    </Column>
                    <Column isSize='1/2'>
                        <Bill subtotal={0} items={[]} />
                        <Field>
                            <Control>
                                <Button isColor='primary' isFullWidth type='submit'>Checkout</Button>
                            </Control>
                        </Field>
                    </Column>
                </Columns>
            </CustomForm>
                
        </div>
    )
}