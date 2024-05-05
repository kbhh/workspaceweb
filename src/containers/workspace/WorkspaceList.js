import React, { useEffect } from 'react'
// import DashboardLayout from '../../components/Dashboard/DashboardLayout'
import moment from 'moment'
import { Columns, Column } from 'bloomer';
import { API_BASE_URL } from '../../constants/apiConstants';
import { useWorkspace } from '../../providers/WorkspaceProvider';

const categoryDescription = {
  'hot desk': 'Day Pass',
  'enclosed': 'Private Office',
  'dedicated': 'Dedicated Desk'
}

export default props => {
  const { workspaceState, fetchWorkspace } = useWorkspace()

  useEffect(() => {
    fetchWorkspace()
  }, [])
  
  return (
      <div style={{marginTop: '70px'}}>
                <h2>Workspace bookings</h2>

          {
            workspaceState.loading ? 
            <span>Loading...</span>
            :
            <Columns isMultiline style={{marginTop: '10px'}}>
           {
                workspaceState.workspaces.data.map(workspace => (
                  <Column isSize='1/2'>
                      <section style={{padding: '5px', paddingTop: '0', background: '#fff'}}>
                      {
                        workspace.paymentAttached ?
                        <img src={`${API_BASE_URL}Containers/workspace/download/${workspace.paymentAttached}`} alt='workspace'/> : null
                      }
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                          <div style={{flex: 3, textAlign: 'start'}}><span style={{fontWeight: 'bold', color: '#2691cf'}}>{`${workspace.service && workspace.service.tag ? workspace.service.tag : ''} ${workspace.service ? categoryDescription[workspace.service.category] : ''}`}</span></div>
                          <div><span style={{color: workspace.status === 'approved' ? 'green' : '#ff6a00'}}>{workspace.status}</span></div>
                        </div>
                        {/* alsdkf */}
                        <div style={{textAlign: 'left'}}>
                          <span style={{fontSize: '12px', fontStyle: 'italic', color: '#999'}}>{`From ${moment(workspace.startDate).format('MMMM DD, YYYY')} to ${moment(workspace.endDate).format('MMMM DD, YYYY')}`}</span>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', color: '#222'}}>
                        <span style={{flex: 1, color: '#999'}}>{workspace.pricing.history.unitPrice} Birr / {workspace.pricing.history.unit}</span>
                        <span style={{flex: 1, color: '#999'}}>{workspace.usage} % used</span>
                        {
                          workspace.paymentType.includes('later') ?
                          <a href='#!' style={{flex: 1}}>Finish Payment</a> :null
                        }
                        </div>
                      </section>
                  </Column>
                ))
              }
            </Columns>
          }
      </div>
  )
}
