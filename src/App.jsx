import { useState, useCallback, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("")
  const [numbers, setNumbers] = useState(false)
  const [characters, setCharacters] = useState(false)
  const [copied, setCopied] = useState(false)
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numbers) str += "0123456789"
    if (characters) str += "!#$%&()*+,-./"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numbers, characters, setPassword])

  useEffect(() => {
    passwordGenerator();
  }, [length, numbers, characters, passwordGenerator])

  const refresher = useCallback(() => {
    passwordGenerator();
  }, [passwordGenerator])

  const copiedText = () => {
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1000);
  }

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    copiedText();
    window.navigator.clipboard.writeText(password)
  }, [password, copied])  

  return (
    <>
      <div className='bg-gray-700 rounded-lg shadow-md text-white my-8 mx-auto w-[500px] py-6 px-8'>
        <h1 className='text-white text-2xl text-center font-serif mb-2 py-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden max-w-auto mb-3'>
          <input type='text'
            placeholder='Password'
            value={password}
            className='outline-none w-full py-1 px-3 text-xl text-black'
            ref={passwordRef}
            readOnly />
          <button className='outline-none bg-yellow-500 text-white px-3 py-0.5 shrink-0 text-lg'
            onClick={copyPasswordToClipboard}>
            {copied ? 'Copied' : "Copy"}</button>
        </div>
        <div className='flex text-sm gap-x-2 py-2'>
          <div className='flex items-center gap-x-1'>
            <input type='range' min={6} max={50} value={length} onChange={(e) => { setLength(e.target.value) }} className='cursor-pointer' />
            <label className='outline-none px-3 py-0.5 text-base'>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" className='size-5' defaultChecked={numbers} onChange={() => setNumbers((prev) => !prev)} />
            <label htmlFor="numberInput" className='text-base'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" className='size-5' defaultChecked={characters} onChange={() => setCharacters((prev) => !prev)} />
            <label htmlFor="characterInput text-base" className='text-base'>Characters</label>
          </div>
        </div>
        <div>
          <button className='outline-none bg-white font-serif px-3 py-1 m-2 shrink-0 text-xl text-black rounded-md'
            onClick={refresher}>Generate</button>
        </div>
      </div>
    </>
  )
}

export default App
