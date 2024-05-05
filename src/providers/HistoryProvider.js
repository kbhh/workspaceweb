import React, { useContext, createContext, useState, useMemo } from 'react'

export const HistoryContext = createContext()

export const HistoryProvider = (props) => {
    const [history, setHistory] = useState(props.history)
    const value = useMemo(() => [history, setHistory], [history])
    return <HistoryContext.Provider value={value} {...props} />
}

export const useHistory = () => {
    const context = useContext(HistoryContext)
    if (!context) {
        throw new Error(`useHistory must be used within a HistoryProvider`)
    }
    const [history, setHistory] = context

    return {
        history,
        setHistory
    }
}