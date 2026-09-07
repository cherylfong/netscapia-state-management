import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { getAnecdotes, createAnecdote, updateVotes } from '../requests'

export const useAnecdotes = () => {

    const queryClient = useQueryClient()

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes,
        refetchOnWindowFocus: false
    })

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
        addAnecdote: (content) => newAnecdoteMutation.mutate({
            content, votes: 0
        }),
        handleVote: (anecdote) => updateVoteMutation.mutate({
            ...anecdote, votes: anecdote.votes + 1
        })
    }
}