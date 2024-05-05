import React from 'react'
import { Columns, Column } from 'bloomer';
const styles = {
    billItem: {
        flex: 1
    },
    billItemTitle: {
        color: '#555',
        fontWeight: '700'
    },
    billItemContent: {
        textAlign: 'right'
    },
    totalContainer: {
        marginTop: 30,
        borderColor: '#555',
        borderTopWidth: 1,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
    },
}
const Bill = (props) => (
    <div style={{width: '100%', borderTopWidth: 1, padding: 10, background: '#fff', marginBottom: '10px'}}>
        {
            props.items.map((item, index) => (
                <Columns key={index} style={styles.billItemContainer} isMobile>
                    <Column isSize='1/2' style={styles.billItem}>
                        <span style={styles.billItemTitle}>{item.key}</span>            
                    </Column>
                    <Column isSize='1/2' style={styles.billItem}>
                        <span style={styles.billItemContent}>{item.value}</span>
                    </Column>
                </Columns>
            ))
        }
        <Columns isMobile style={styles.billItemContainer}>
            <Column isSize='1/2' style={styles.billItem}>
                <span style={styles.billItemTitle}>Sub-total</span>            
            </Column>
            <Column isSize='1/2' style={styles.billItem}>
                <span style={styles.billItemContent}>{props.subtotal} Birr</span>
            </Column>
        </Columns>
        <Columns isMobile style={styles.billItemContainer}>
            <Column isSize='1/2'  style={styles.billItem}>
                <span style={styles.billItemTitle}>VAT(15%)</span>            
            </Column>
            <Column isSize='1/2'  style={styles.billItem}>
                <span style={styles.billItemContent}>{(props.subtotal * 0.15).toFixed(2)} Birr</span>
            </Column>
        </Columns>
        <Columns isMobile style={{...styles.billItemContainer, ...styles.totalContainer}}>
            <Column isSize='1/2' style={styles.billItem}>
                <span style={{...styles.billItemTitle, fontSize: 20}}>Total</span>            
            </Column>
            <Column  isSize='1/2' style={styles.billItem}>
                <span style={{...styles.billItemContent, fontSize: 20}}> {(props.subtotal * 1.15).toFixed(2)} Birr</span>
            </Column>
        </Columns>
    </div>
)

export default Bill