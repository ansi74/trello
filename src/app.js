import { Route, Switch } from 'react-router-dom'
import GlobalStyle from './base/global_style'
import HomePage from './components/home_page'

const Main = styled.main`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`

export default class App extends React.Component {
    render() {
        return (
            <Main>
                <GlobalStyle />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                </Switch>
            </Main>
        )
    }
}
