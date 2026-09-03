import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('./services/anecdote', () => ({
    default: {
        getAll: vi.fn(),
        createNew: vi.fn(),
        update: vi.fn(),
    }
}))

import anecdoteService from './services/anecdote'
import useAnecdoteStore, { useAnecdotes, useFilter, useAnecdotesActions } from './store'


beforeEach(() => {
    useAnecdoteStore.setState({ anecdotes: [], filter: '' })
    vi.clearAllMocks()
})


describe('useNoteActions', () => {
    it('initialize loads notes from service', async () => {

        const mockAnecdotes = [{ id: 1, content: 'Test', votes: 0 }]
        anecdoteService.getAll.mockResolvedValue(mockAnecdotes)


        const { result } = renderHook(() => useAnecdotesActions())

        await act(async () => {
            await result.current.initialize()
        })

       const { result: anecdotesResult } = renderHook(() => useAnecdotes())
        expect(anecdotesResult.current).toEqual(mockAnecdotes)
    })
}) // useNoteActions describe