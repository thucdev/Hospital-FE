import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IntlProvider } from 'react-intl'

import '@formatjs/intl-pluralrules/polyfill'
import '@formatjs/intl-pluralrules/locale-data/en'
import '@formatjs/intl-pluralrules/locale-data/vi'

// import '@formatjs/intl-relativetimeformat/polyfill'
// import '@formatjs/intl-relativetimeformat/locale-data/en'
// import '@formatjs/intl-relativetimeformat/locale-data/vi'

import { LanguageUtils } from '../utils'
import languageReducer, { languageSelector } from '../store/reducer/languageSlice'
import { useSelector } from 'react-redux'

function IntlProviderWrapper({ children }) {
    const messages = LanguageUtils.getFlattenedMessages()
    const { language } = useSelector(languageSelector)
    console.log('lang', language)
    return (
        <IntlProvider
            // locale='vi'
            locale={language}
            messages={messages[language]}
            // messages={messages.vi}
            defaultLocale='vi'
        >
            {children}
        </IntlProvider>
    )
}

export default IntlProviderWrapper
