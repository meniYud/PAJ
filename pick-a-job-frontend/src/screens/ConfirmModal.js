import React from 'react'

const ConfirmModal = (props) => {
    const dataToPass = props.dataToPass;
    const onConfirm = (e) => {
        e.stopPropagation()
        if(props.onConfirm){
            props.onConfirm(dataToPass)
        }
    }
    const onDecline = (e) => {
        e.stopPropagation()
        if(props.onDecline){
            props.onDecline(dataToPass)
        }
    }
    

    return (
        <div className="modal" tabindex="-1" role="dialog" style={{display: 'inherit'}}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Attention</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <p>{props?.message ? props?.message : "Are you sure?"}</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={onConfirm}>OK</button>
                    <button type="button" className="btn btn-secondary" onClick={onDecline} data-dismiss="modal">Cancel</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal;