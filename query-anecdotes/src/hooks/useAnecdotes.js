import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { getAnecdotes } from '../requests'

export const useAnecdotes = () => {
 const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false
  })


  return {
    anecdotes: result.data,
    isPending: result.isPending,
  }
}