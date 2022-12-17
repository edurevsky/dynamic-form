import { useState } from 'react'

function TextArea({ minLength, maxLength, ...props }) {

  const { chars, keyUp } = useTextArea()

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <textarea
        style={{
          outlineColor: chars > minLength ? '#00d38a' : '#9a3a00'
        }}
        onKeyUp={keyUp}
        {...props}
      />
      <small
        style={{
          textAlign: 'end',
          color: chars > minLength ? '#00d38a' : '#9a3a00'
        }}
      >
        {chars} / {maxLength}
      </small>
    </div>
  )
}

function useTextArea() {

  const [chars, setChars] = useState(0)

  const keyUp = (event) => setChars(event.target.value.length)

  return { chars, keyUp }
}

export { TextArea }
