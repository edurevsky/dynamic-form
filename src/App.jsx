import { useState } from 'react'
import './App.css'
import { TextArea } from './text-area'

function App() {

  const {
    name, changeName,
    surname, changeSurname,
    email, changeEmail,
    about, changeAbout,
    telephoneNumbers, addTelephoneNumber,
    removeTelephoneNumber, changeTelephoneNumber,
    notReachedMaxTelephoneNumbers, notReachedMinTelephoneNumbers,
    submit
  } = useForm()

  return (
    <div className='container'>
      <form onSubmit={submit}>
        <fieldset>
          <legend>Formulário</legend>
          <div className='complete-name'>
            <div className='form-field'>
              <label htmlFor='name'>Nome</label>
              <input type='text' id='name' onChange={changeName} value={name} required />
            </div>
            <div className='form-field'>
              <label htmlFor='surname'>Sobrenome</label>
              <input type='text' id='surname' onChange={changeSurname} value={surname} required />
            </div>
          </div>
          <div className='form-field'>
            <label htmlFor='email'>E-Mail</label>
            <input type='text' id='email' onChange={changeEmail} value={email} required />
          </div>
          <div className='telephone-numbers'>
            <label>Telefone(s)</label>
            {telephoneNumbers.map((telephoneNumber, index) => (
              <div className='telephone-number' key={index}>
                <label htmlFor={`telephone-${index}`}>Telefone {index + 1}</label>
                <div className='telephone-input'>
                  <input
                    type='text'
                    id={`telephone-${index}`}
                    onChange={(e) => changeTelephoneNumber(e, index)}
                    value={telephoneNumber}
                    required
                  />
                  <button
                    disabled={!notReachedMinTelephoneNumbers}
                    className='tel-btn remove'
                    onClick={(e) => removeTelephoneNumber(e, index)}
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
            {notReachedMaxTelephoneNumbers ? (
              <button
                className='tel-btn add'
                onClick={addTelephoneNumber}
              >
                Adicionar Telefone
              </button>
            ) : null}
          </div>
          <div className='about'>
            <label htmlFor='about-you'>Conte-nos sobre você</label>
            <TextArea
              value={about}
              onChange={changeAbout}
              id='about-you'
              cols='30'
              rows='10'
              minLength='30'
              maxLength='520'
              spellCheck='true'
              required
            />
          </div>
          <button
            className='submit-btn'
            type='submit'
          >
            Enviar
          </button>
        </fieldset>
      </form>
    </div>
  )
}

function useForm() {

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [telephoneNumbers, setTelephoneNumbers] = useState([''])
  const [about, setAbout] = useState('')

  const maxTelephoneNumbers = 3
  const minTelephoneNumbers = 1
  const notReachedMaxTelephoneNumbers = telephoneNumbers.length < maxTelephoneNumbers
  const notReachedMinTelephoneNumbers = telephoneNumbers.length > minTelephoneNumbers

  const changeName = (event) => setName(event.target.value)
  const changeSurname = (event) => setSurname(event.target.value)
  const changeEmail = (event) => setEmail(event.target.value)
  const changeAbout = (event) => setAbout(event.target.value)

  const changeTelephoneNumber = (event, index) => {
    event.preventDefault()
    setTelephoneNumbers(numbers => numbers.map((telephoneNumber, i) => {
      if (i === index) {
        telephoneNumber = event.target.value
      }
      return telephoneNumber
    }))
  }

  const addTelephoneNumber = (event) => {
    event.preventDefault()
    setTelephoneNumbers(numbers => [...numbers, ''])
  }

  const removeTelephoneNumber = (event, index) => {
    event.preventDefault()
    setTelephoneNumbers(numbers => numbers.filter((_, i) => i !== index))
  }

  const submit = (e) => {
    e.preventDefault()
    const data = {
      firstName: name,
      lastName: surname,
      telephones: telephoneNumbers.map((number) => {
        return { number: number }
      }),
      about: about
    }
    console.log(data)
  }

  return {
    name,
    changeName,
    surname,
    changeSurname,
    email,
    changeEmail,
    about,
    changeAbout,
    telephoneNumbers,
    addTelephoneNumber,
    removeTelephoneNumber,
    changeTelephoneNumber,
    notReachedMaxTelephoneNumbers,
    notReachedMinTelephoneNumbers,
    submit
  }
}

export default App
