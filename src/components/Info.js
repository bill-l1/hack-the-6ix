import React from 'react'
import { makeStyles, styled } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import { Card, CardContent } from '@material-ui/core'
import FindInPageIcon from '@material-ui/icons/FindInPage'
import NoteIcon from '@material-ui/icons/Note'
import SecurityIcon from '@material-ui/icons/Security'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import HomeIcon from '@material-ui/icons/Home'
import DriveEtaIcon from '@material-ui/icons/DriveEta'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'

const useStyles = makeStyles({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflowY: 'auto',
    },
    flexDisplay: {
        display: 'flex',
        alignItems: 'center',
        '& p:last-child': {
            paddingLeft: '100px'
        }
    },
    infoDiv: {
        display: 'flex',
        gridColumnStart: '2',
        gridColumnEnd: '9',
        gridRowStart: '7',
        gridRowEnd: '10',
    },
    process: {
        gridRowStart:'2',
        gridRowEnd: '3', 
        gridColumnStart:'5',
        gridColumnEnd: '9',
    },
    steps: {
        display: 'flex',
        gridRowStart:'3',
        gridRowEnd:'6',
        gridColumnStart:'5',
        gridColumnEnd:'9',
    },
    title: {
        gridRowStart:'2',
        gridRowEnd: '3', 
        gridColumnStart:'2',
        gridColumnEnd: '6',
    },
    intro: {
        gridRowStart:'3',
        gridRowEnd:'4',
        gridColumnStart:'2',
        gridColumnEnd:'4',
    },
    grid: {
        display: 'grid',
        width: '85vw',
        height: '85vh',
        backgroundColor: '#fff',
        gridTemplateColumns: 'auto 12.5% 21.875% 3.125% 12.5% 12.5% 12.5% 12.5% auto',
        gridTemplateRows: '2.5% 7.5% 12.5% 6.25% 12.5% 8.5% 10% 12.5% 25% auto',
        gridGap: '1',
        outline: 'none',
    },
});

const StepsCards = styled(Card)({
    borderRadius: '5px',
    margin: '0 5px',
    width: '30%',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    textAlign: 'center',
});

const InfoCards = styled(Card)({
    borderRadius: '5px',
    margin: '0 10px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    width: '100%',
    '& h3': {
        textAlign: 'center'
    }
});

const Info = ({open, onClose, selectedCardIds}) => {
    const classes = useStyles()

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            className={classes.modal}>
            <div className={classes.grid}>
                <div className={classes.title}>
                    <h3>About Property & Casualty Insurance</h3>
                </div>
                <div className={classes.intro}> 
                    <p>Property insurance helps cover stuff you own like your home or your car.

                    Casualty insurance means that the policy includes liability coverage to help protect you if you're found legally responsible for an accident that causes injuries to another person or damage to another person's belongings.
                    
                    </p>
                    <p>Keep in mind the coverage is limited and not all incidents are covered by a policy. However, with the appropriate policy, you can be protected from potential risks and have peace of mind.
                    </p>
                </div>
                <div className={classes.process}>
                    <h3>Steps to Insurance</h3>
                </div>
                <div className={classes.steps}>
                    <StepsCards>
                        <CardContent>
                            <FindInPageIcon /><h4>Choose your coverage based on your specific needs.</h4>
                        </CardContent>
                    </StepsCards>
                    <StepsCards>
                        <CardContent>
                            <NoteIcon/><h4>Apply for a policy and carefully go over it.</h4>
                        </CardContent>
                    </StepsCards>
                    <StepsCards>
                        <CardContent>
                            <SecurityIcon/><h4>Stay protected by always updating your Bunkr profile.</h4>
                        </CardContent>
                    </StepsCards>
                    <StepsCards>
                        <CardContent>
                            <FileCopyIcon/><h4>File claims when needed, Bunkr helps by organizing your documents.</h4>
                        </CardContent>
                    </StepsCards>
                </div>
                <div className={classes.infoDiv}>
                <InfoCards>
                    <CardContent>
                        <h3><HomeIcon/>Home Insurance</h3>
                        <p>Homeowners insurance is a form of property insurance that covers losses and damages to an individual's residence, along with furnishings and other assets in the home. Homeowners insurance also provides liability coverage against accidents on the property.
                        </p>
                        <p>Other coverages and types of home insurance include: Water Damage Coverage, Cottage, Condo, Renter, Travel, Tenant, and more.
                        </p>
                    </CardContent>
                </InfoCards>
                <InfoCards>
                    <CardContent>
                        <h3><DriveEtaIcon/>Auto Insurance</h3>
                        <p>Auto insurance is a contract between you and the insurance company that protects you against financial loss in the event of an accident or theft.</p>
                        <p>Other coverages and types of auto insurance, other than standard liability insurance, include: Collision, Comprehensive, Glass Coverage, Uninsured Motorist Coverage, and more.
                        </p>
                    </CardContent>
                </InfoCards>
                <InfoCards>
                    <CardContent>
                        <h3><MonetizationOnIcon/>Other Insurance Policies</h3>
                        <p>In addition to home insurance and auto insurance, the two most common types of P&C insurance, there are numerous other insurance types that fall under the P&C umbrella. </p>
                        <p>Whether it's for a business, a farm, or even a ship, there are numerous types and coverages available depending on different insurance providers.
                        </p>
                    </CardContent>
                </InfoCards>
                </div>
            </div>
        </Modal>
    )
}

export default Info