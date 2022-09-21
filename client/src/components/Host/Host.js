import Input from '../UI/Input'
import Button from '../UI/Button'
import { useState, useContext } from 'react' //import useContext
import { AppContext } from '../context/AddressContext' // import Appcontext
import classes from './Host.module.css'

const Host = () => {
  const [formInput, setFormInput] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
    timeFormat: '',
    thumbnail: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ctx = useContext(AppContext) //initialize ctx

  let currentDate = new Date()
  const dd = String(currentDate.getDate()).padStart(2, '0')
  const mm = String(currentDate.getMonth() + 1).padStart(2, '0')
  const yyyy = currentDate.getFullYear()
  currentDate = yyyy + '-' + mm + '-' + dd

  const timeFormatHandler = (event) => {
    setFormInput((prevState) => {
      return {
        ...prevState,
        timeFormat: event.target.value,
      }
    })
  }

  const inputHandler = (label, inputValue) => {
    switch (label) {
      case 'Event Name':
        setFormInput((prevState) => {
          return { ...prevState, name: inputValue }
        })
        break
      case 'Description':
        setFormInput((prevState) => {
          return { ...prevState, description: inputValue }
        })
        break
      case 'Date':
        setFormInput((prevState) => {
          return { ...prevState, date: inputValue }
        })
        break

      case 'Time':
        setFormInput((prevState) => {
          return { ...prevState, time: inputValue }
        })
        break

      case 'Thumbnail':
        setFormInput((prevState) => {
          return { ...prevState, thumbnail: inputValue }
        })
        break
    }
  }


  const formSubmitHandler = async (event) => {
    event.preventDefault()
    setIsSubmitting(true);

    let time = formInput.time

    if (formInput.timeFormat === 'PM') {
      time = +formInput.time + 12
    }

    time = time.toString() + ':00'

    const nonFormatDate = formInput.date + ' ' + time
    let someDate = Number(new Date(nonFormatDate))

    //console.log(someDate);

    let imageId = formInput.thumbnail.split('/')[5]
    let imageUrl = `https://drive.google.com/uc?export=view&id=${imageId}`

    const indexId =  await ctx.sharedState.createIndex();

    await ctx.sharedState.createNewEvent(
      indexId,
      formInput.name,
      imageUrl,
      someDate,
      formInput.description
    )
    setIsSubmitting(false);
  }

  return (
    <div>
      <form className='Form1' onSubmit={formSubmitHandler}>
        <Input
          type='text'
          label='Event Name'
          placeholder='Enter your event name'
          inputChange={inputHandler}
        />
        <Input
          type='text'
          label='Description'
          placeholder='Tell us Something about the event'
          inputChange={inputHandler}
        />
        <Input
          type='date'
          label='Date'
          placeholder='Enter event date'
          min={currentDate}
          inputChange={inputHandler}
        />
        <Input
          type='number'
          label='Time'
          placeholder="What's the timing of event"
          min='1'
          max='12'
          inputChange={inputHandler}
        />
        <select
          class='select select-info w-full max-w-xs'
          onChange={timeFormatHandler}
        >
          <option disabled selected>
            AM/PM
          </option>
          <option>AM</option>
          <option>PM</option>
        </select>
        <Input
          type='text'
          label='Thumbnail'
          placeholder='Thumbnail of the event (Google Drive link)'
          inputChange={inputHandler}
        />
        <Button classes={`btn-primary btn-wide ${isSubmitting ? 'loading' : ''}`}>{isSubmitting ? "Submitting..." : "Submit Event"}</Button>
      </form>
    </div>
  )
}
export default Host
