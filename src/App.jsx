import { useSelector } from 'react-redux'

import { ThemeProvider } from '@material-ui/core/styles'
import { CssBaseline, StyledEngineProvider } from '@material-ui/core'

// routing
import Routes from './routes'

// defaultTheme
import theme from './themes'

// project imports
import NavigationScroll from './layout/NavigationScroll'
import { Toaster } from 'sonner'

function App() {
  const customization = useSelector((state) => state.customization)

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <Toaster />
          <Routes />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default App
