import React from "react";
import 'components/Appointment/styles.scss';
import Button from "components/Button";
/**
 * 
 * @param {*} props 
 * @returns a confirmation alert. 
 * After clicking the delete button, users need to confirm to delete it
 */
export default function Confirm(props) {
    function cancel(){
        props.onConfirm();
      }
    return (
        <main className="appointment__card appointment__card--confirm">
            <h1 className="text--semi-bold">{props.message}</h1>
            <section className="appointment__actions">
                <Button danger onClick={props.onCancel}>Cancel</Button>
                <Button danger onClick={event => cancel()}>Confirm</Button>
            </section>
        </main>
    );
}