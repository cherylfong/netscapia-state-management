import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, renderHook, screen, act } from '@testing-library/react'
import { createElement } from 'react'

vi.mock('./services/anecdote', () => ({
    default: {
        getAll: vi.fn(),
        createNew: vi.fn(),
        update: vi.fn(),
    }
}))

import anecdoteService from './services/anecdote'
import useAnecdoteStore, { useAnecdotes, useFilter, useAnecdotesActions } from './store'
import AnecdoteList from './components/AnecdoteList'


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

    it('the component that displays anecdotes from store is sorted by votes', () => {

        const mockAnecdotes = [{ id: 1, content: 'Test1', votes: 1 }, { id: 2, content: 'Test2', votes: 2 }, { id: 3, content: 'Test3', votes: 3 }]

        useAnecdoteStore.setState({ anecdotes: mockAnecdotes, filter: '' })
        render(createElement(AnecdoteList))

        const displayedContents = screen
            .getAllByText(/^Test[123]$/)
            .map(element => element.textContent)

        expect(displayedContents).toEqual(['Test3', 'Test2', 'Test1'])

        // to extra verify that the values diplayed 
        // are from the Zustand store through setState() and not via API calls
        expect(anecdoteService.getAll).not.toHaveBeenCalled()

    })
}) // useNoteActions describe