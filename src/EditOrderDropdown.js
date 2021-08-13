import React from 'react';
import { Dropdown } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
export default function EditOrderDropdown() {
  const axios = require('axios').default;
  // downcase and remove spaces
  function FomartString(string) {
    let newstring = string.toLowerCase().replace(/\s+/g, '')
    return newstring
  }

  function SetorderStatusBody(orderstatus) {
    const ordermessages = {
      pending: 'Your order is pending, please wait for it to be approved.',
      inprogress: 'Rider just left with your order. Please prepare those empty bottles',
      cancelled: 'Your order was cancelled',
      rejected: 'Your order was rejected, but they dont restrict you from reordering again from another vendor',
      completed: 'Your order was succefully completed.Thank you for being a valuable customer'
    }
    return ordermessages[orderstatus]

  }

  function SendNotification(value) {

    let orderstatus = FomartString(value.value)
    let ordermessage = SetorderStatusBody(orderstatus)

    console.log(orderstatus, 'order status types')
    const body = {
      to: "ExponentPushToken[ly7JOnCeLIcjtYwldI1Vcd]",
      title: `Powwater`,
      body: ordermessage,
      data: { type: 'Profile', username: 'Hillary Kiptoo', id: '102' },
    };
    try {
      axios
        .post("https://exp.host/--/api/v2/push/send", body)
        .then((response) => {
          console.log(response)
          if (response.status === 200) {
            alert("send notification successfully")
          }
        })
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <Dropdown
        placeholder="Edit order"
        className="my-className"
        options={['In Progress', 'Cancelled', 'Completed', 'Rejected', 'Pending']}
        value="Pending"
        onChange={(value) => SendNotification(value)}
        onSelect={(value) => console.log('selected!', value)} // always fires once a selection happens even if there is no change
        onClose={(closedBySelection) => console.log('closedBySelection?:', closedBySelection)}
        onOpen={() => console.log('open!')}
      />
    </div>
  )
}
