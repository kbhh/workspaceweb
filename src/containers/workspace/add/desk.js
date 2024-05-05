import React, { useState, useEffect } from 'react'

import { Section } from 'bloomer';
import { RoundContainer } from '../../../components/StyledComponents';
import { useLocation } from '../../../providers/LocationProvider';
import { useHistory } from '../../../providers/HistoryProvider';
import { useWorkspace } from '../../../providers/WorkspaceProvider';
import { toast } from 'bulma-toast';

export default props => {

    const { locationState, fetchAvailableDesks } = useLocation()
    const {workspaceState, changeForm} = useWorkspace()
    const [loading] = useState(locationState.loading || workspaceState.loading)
    const {history} = useHistory()

    const { selectedLocation, desks } = locationState
    
    const selectDesk = type => {
        if(desks[type].length){
            changeForm('deskType', type)
            history.push('/dashboard/workspace/add/package')
        } else {
            toast({
                message: "The selected location doesn't have available desks <br /> <a href='/dashboard/workspace/add'>Select Location</a>",
                type: "is-warning",
                dismissible: true,
                pauseOnHover: true
              });
        }
    }

    // if not selected location show error and goBack
    if(!selectedLocation)
        history.goBack()

    useEffect(() => {
        try{
            fetchAvailableDesks(selectedLocation.id)
        } catch(e){
            console.error(e)
        }
    }, [])

    let desksDescription = [
        {
            name: 'Private Office',
            description: `
                Private enclosed offices are in prime office space, with big
                bright windows, carpeting, and
                attractive furnishing.
                Offices come in varying sizes,
                from 2 desks to 4 desks, 6 desks,
                8 desks, and 10 desk suites
            `,
            key: 'enclosed',
            visible: desks.enclosed
        },
        {
            name: 'Dedicated Desk',
            description: `
            Dedicated desks are fixed for
            exclusive use by the member
            and are located in open
            coworking areas with nearby
            phone booths for private
            conversations, with lockable drawers
            `,
            key: 'dedicated',
            visible: desks.dedicated
        },
        {
            name: 'Day Pass',
            description: `
            Day passes give
            member access to non-
            dedicated workspaces,
            lounges, café, and other areas. Day Pass come in single day
            pass, 10 and 20 day passes,
            and special student weekend
            pass.
            `,
            key: 'hot',
            visible: desks.hot
        }
    ]
    return (
        <div>
            {/* <Helmet title={title} /> */}
            <h2>What kind of workspace do you need?</h2>
                {
                    loading ?
                    <span>Loading...</span>
                    :
                    <Section style={{paddingTop: 0}}>
                    {
                        desksDescription.map(desk => (
                            desk.visible ? 
                            <RoundContainer background="#fff" cursor="pointer" key={desk.key} onClick={() => selectDesk(desk.key)}>
                                <h2 style={{fontSize: '18px'}}>{desk.name}</h2>
                                <p style={{color: '#999'}}>{desk.description}</p>
                            </RoundContainer>
                            :null
                        ))
                    }
                </Section>
                }
        </div>
    )
}

