import { render } from "@testing-library/react"
import LoginView from "../../security/views/login"

describe('Pruebas en <LoginView />', () => {

    test('Debe hacer match con el Snapshot', () => {
        const { container } = render(<LoginView />)
        expect(container).toMatchSnapshot();
    })

})