import { useEffect, useState, useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { getAnecdotes, createAnecdote, updateVotes } from '../requests'

import NotificationContext from '../components/NotificationContext'

export const useAnecdotes = () => {
    const [isPendingTimeout, setIsPendingTimeout] = useState(false)

    const queryClient = useQueryClient()

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes,
        refetchOnWindowFocus: false
    })

    // if isPending is more than 3000 miliseconds then set IsPendingTimeout to true
    useEffect(() => {
        if (!result.isPending) {
            return undefined
        }

        const resetTimeoutId = setTimeout(() => {
            setIsPendingTimeout(false)
        }, 0)
        const timeoutId = setTimeout(() => {
            setIsPendingTimeout(true)
        }, 3000)

        return () => {
            clearTimeout(resetTimeoutId)
            clearTimeout(timeoutId)
        }
    }, [result.isPending])

    const newAnecdoteMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
            setNotification(
                `anecdote '${newAnecdote.content}' created`,
            )
        }
    })

    const { setNotification } = useContext(NotificationContext)

    const updateVoteMutation = useMutation({
        mutationFn: updateVotes,
        onSuccess: (updatedAnecdote) => {
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
            setNotification(
                `anecdote '${updatedAnecdote.content}' voted`,
            )
        }
    })

    return {
        anecdotes: result.data,
        isPending: result.isPending,
        isPendingTimeout: result.isPending && isPendingTimeout,
        isError: result.isError,
        addAnecdote: (content) => newAnecdoteMutation.mutate({
            content, votes: 0
        }, {
            onError: (error) => {
                console.error('Failed to add anecdote: ', error)
                setNotification(`${error.message}`)
            }
        }),
        handleVote: (anecdote) => updateVoteMutation.mutate({
            ...anecdote, votes: anecdote.votes + 1
        }, {
            onError: (error) => {
                console.error('Failed to update votes: ', error)
                setNotification(`'Failed to update votes: ${error.message}`)
            }
        })
    }
}