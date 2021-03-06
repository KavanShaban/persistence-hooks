import React from 'react'
import {
  useStateAndLocalStorage,
  useStateAndSessionStorage,
  useStateAndCookie,
} from './'
import {render} from 'react-dom'


function Counter({title, subtitle, setCount, count}) {
  return <div>
    <h3 children={title} />
    <p children={subtitle} />
    <button
      children='decrement'
      onClick={() => setCount(lastCount => lastCount - 1)}
    />
    <span
      children={`count: ${count}`}
    />
    <button
      children='increment'
      onClick={() => setCount(lastCount => lastCount + 1)}
    />
  </div>
}


function LocalStorageCounter() {
  const [count, setCount] = useStateAndLocalStorage(0, 'localStorageKeyForCounter')
  return <Counter
    title='with `localStorage`'
    subtitle='(will persist through closing and reopening this window)'
    { ...{count, setCount}}
  />
}

function SessionStorageCounter() {
  const [count, setCount] = useStateAndSessionStorage(0, 'sessionStorageKeyForCounter')
  return <Counter
    title='with `sessionStorage`'
    subtitle='(will persist through current session––try refreshing window)'
    { ...{count, setCount}}
  />
}

function CookieCounter() {
  const [count, setCount] = useStateAndCookie(0, 'cookieKeyForCounter', {
    days: 1 / 24 / 60 / 60 * 10,
  })
  return <Counter
    title='with `cookie`'
    subtitle='(will persist for 10 seconds after last change)'
    { ...{count, setCount}}
  />
}

render(
  <div style={{display: 'flex', width: '100vw', height: '100vh', justifyContent: 'center', alignItems: 'center'}}>
    <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
      <LocalStorageCounter />
      <SessionStorageCounter/>
      <CookieCounter/>
    </div>
  </div>,
  window.root,
)