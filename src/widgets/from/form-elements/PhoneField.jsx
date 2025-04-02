import { useState } from 'react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

const PhoneField = () => {
    const [phone, setPhone] = useState('');
  return (
    <div>
      <PhoneInput
        defaultCountry="ua"
        value={phone}
        onChange={(phone) => setPhone(phone)}
        className='mt-1 block w-full p-2 border rounded-md dark:text-black'
      />
    </div>
  )
}

export default PhoneField
