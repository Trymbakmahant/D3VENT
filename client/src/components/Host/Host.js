import Input from '../UI/Input'
import Button from '../UI/Button'

const Host = () => {
  let currentDate = new Date()
  const dd = String(currentDate.getDate()).padStart(2, '0')
  const mm = String(currentDate.getMonth() + 1).padStart(2, '0')
  const yyyy = currentDate.getFullYear()

  currentDate = yyyy + '-' + mm + '-' + dd

  const formSubmitHandler = () => {}

  return (
    <div>
      <form className='Form1' onSubmit={formSubmitHandler}>
        <Input
          type='text'
          label='Event Name'
          placeholder='Enter your event name'
        />
        <Input
          type='text'
          label='Ticket price'
          placeholder='Enter ticket price(in wei)'
        />
        <Input
          type='text'
          label='Capacity'
          placeholder='How many people can join'
        />
        <Input
          type='date'
          label='Date'
          placeholder='Enter event date'
          min={currentDate}
        />
        <Input
          type='number'
          label='Time'
          placeholder="What's the timing of event"
          min='1'
          max='12'
        />
        <select class='select select-info w-full max-w-xs'>
          <option disabled selected>
            AM/PM
          </option>
          <option>AM</option>
          <option>PM</option>
        </select>
        <Input
          type='text'
          label='Thumbnail'
          placeholder='A link to the thumbnail of event'
        />
        <Button classes='btn-primary'>Submit Event</Button>
      </form>
    </div>
  )
}

export default Host
