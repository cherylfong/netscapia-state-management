const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error('Failed to get anecdotes')
  }
  return await response.json()
}

export const createAnecdote = async (newAnecdote) => {

if(newAnecdote.content.length < 5){
    throw new Error('Failed to create note, content needs to be atleast 5 characters long')
}

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAnecdote)
  }
 
  const response = await fetch(baseUrl, options)
 
  if (!response.ok) {
    throw new Error('Failed to create note')
  }
 
  return await response.json()
}