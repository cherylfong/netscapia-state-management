import { useEffect, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { getAnecdotes, createAnecdote, updateVotes } from '../requests'

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
            setIsPendingTimeout(false)
            return undefined
        }

        const timeoutId = setTimeout(() => {
            setIsPendingTimeout(true)
        }, 3000)

        return () => clearTimeout(timeoutId)
    }, [result.isPending])

    const newAnecdoteMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
        }
    })

    const updateVoteMutation = useMutation({
        mutationFn: updateVotes,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
        }
    })

    return {
        anecdotes: result.data,
        isPending: result.isPending,
        isPendingTimeout,
        isError: result.isError,
        addAnecdote: (content) => newAnecdoteMutation.mutate({
            content, votes: 0
        }),
        handleVote: (anecdote) => updateVoteMutation.mutate({
            ...anecdote, votes: anecdote.votes + 1
        })
    }
}