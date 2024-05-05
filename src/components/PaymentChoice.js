import React, { Component } from 'react'
import { Modal, ModalBackground, ModalContent, ModalClose, Container, Column, Columns, Subtitle, Button, Section, Input, Title } from 'bloomer';
import { RoundContainer } from './StyledComponents'

class PaymentChoice extends Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: false
        }
    }


    upload = (event) => {
        console.log('> file', event.target.files)
        // this.props.upload(this.props.container, event.target.files, files => {
        //     this.props.onSuccess('bank', files)
        // })
        // this.props.dispatch({
        //     type: UPLOAD_FILE
        // })
        // LModel.upload(this.props.container, event.target.files)
        //     .then(response => {
        //         this.props.dispatch({
        //             type: UPLOAD_FILE_SUCCESS,
        //             payload: {
        //                 data: response.data
        //             }
        //         })
        //         console.log('> done', response.data)
        //         this.props.onSuccess('bank', response.data)
        //     })
        //     .catch(error => {
        //         this.props.dispatch({
        //             type: UPLOAD_FILE_ERROR,
        //             error: error
        //         })
        //     })
    }


    render(){
        return(
            <Modal isActive={this.props.visible}>
                <ModalBackground onClick={this.props.close}/>
                <ModalContent style={{overflow: 'hidden'}}>
                    <Container isFluid style={{background: '#e6e6e6', minHeight: '500px', paddingTop: '50px', overflow: 'scroll'}}>
                            <Title>Pay Via</Title>
                            <Section isMarginless isPaddingless>
                                <RoundContainer background="#fff">
                                    <Subtitle>Bank</Subtitle>
                                    <p style={{padding: '3px'}}>You can pay through banks by depositing the payable amount to one of the banks listed below and upload the bank deposit voucher using your app under ‘My Bookings’ section.
Birhan Bank: Acc. No: 100064756374
Dashen bank: Acc. No: 1753788938574
Press ‘Pay Later’ to save your booking until you do the deposit. Then select ‘Pay Now’ to complete your payment.</p>
                                    <Columns isMobile>
                                        <Column isSize='1/2' hasTextAlign="left" isMarginless isPaddingless>
                                        <Button isLoading={this.props.loading} isColor="primary">
                                            Pay Now
                                            <Input type='file' onChange={this.upload} style={{opacity: 0, position: 'absolute', top: 0, left: 0, minWidth: '100%'}}/>
                                        </Button>
                                        </Column>
                                        <Column hasTextAlign="right" isSize='1/2' isMarginless isPaddingless>
                                        <Button isColor="primary" onClick={() => this.props.onSuccess('bank-later', null)}>Pay Later</Button>
                                        </Column>
                                    </Columns>
                                </RoundContainer>
                            </Section>
                            <Section isMarginless isPaddingless>
                                <RoundContainer background="#fff">
                                    <Subtitle>Yene Pay</Subtitle>
                                    <p style={{padding: '3px'}}>YenePay is an online payment platform that you can make payments easily from anywhere in Ethiopia. If you have
                                         a ‘YenePay’ account, please select ‘Pay Now’ button to pay for your booking.</p>
                                    <Columns isMobile>
                                        <Column isSize='1/2' hasTextAlign="left" isMarginless isPaddingless>
                                        <Button isColor="primary" onClick={() => console.log('payment not available')}>Pay Now</Button>
                                        </Column>
                                        <Column hasTextAlign="right" isSize='1/2' isMarginless isPaddingless>
                                        <Button isColor="primary" onClick={() => this.props.onSuccess('yenepay-later', null)}>Pay Later</Button>
                                        </Column>
                                    </Columns>
                                </RoundContainer>
                            </Section>
                    </Container>
                </ModalContent>
                <ModalClose onClick={this.props.close}/>
            </Modal>
        )
    }
}

export default PaymentChoice
