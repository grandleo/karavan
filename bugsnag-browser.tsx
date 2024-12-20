// bugsnag.client.ts (или bugsnag.client.js с переименованием в .ts/.tsx)

// Импорты
import Bugsnag from '@bugsnag/js'
import BugsnagPluginReact from '@bugsnag/plugin-react'
import React from 'react'

const bugsnagClient = Bugsnag.start({
    apiKey: process.env.NEXT_PUBLIC_BUGSNAG_API_KEY || '',
    plugins: [new BugsnagPluginReact()],
})

// Получаем плагин React
const plugin = bugsnagClient.getPlugin('react')

if (!plugin) {
    throw new Error('Bugsnag React plugin не инициализировался')
}

// Возвращаемый createErrorBoundary — это React-компонент. Нам нужно его явно типизировать.
// По умолчанию он поддерживает проп `FallbackComponent`, которая будет отображена при ошибке.
// Мы можем задать тип для `FallbackComponent`: это должен быть компонент React,
// принимающий пропы с полем error.
type FallbackProps = { error: Error }
type ErrorBoundaryProps = { FallbackComponent: React.ComponentType<FallbackProps>; children?: React.ReactNode }

// Приводим тип возвращаемого значения к React-компоненту
export const BugsnagErrorBoundary = plugin.createErrorBoundary(React) as React.ComponentType<ErrorBoundaryProps>

export default bugsnagClient