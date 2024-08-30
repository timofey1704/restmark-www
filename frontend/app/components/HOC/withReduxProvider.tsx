import { Provider } from 'react-redux'
import store from '../../redux/store'

const withReduxProvider = (Component: React.ComponentType) => {
  return function WithReduxProvider(props: any) {
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    )
  }
}

export default withReduxProvider
